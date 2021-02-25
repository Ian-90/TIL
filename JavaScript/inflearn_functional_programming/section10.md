## 1. 지연 평가 + Promise - L.map, map, take
* 비동기 상황에서도 잘 제어 할 수 있는 L.map, map, take 만들기
```js
go([Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)],
  L.map((a) => a + 10),
  take(2),
  // map((a) => a + 10), L.map과 take가 Infinity일 때, 합쳐서 간단하게 되는 코드
  console.log
)

L.map = curry(function *(f, iter) {
  for (const a of iter) {
    // yield f(a) 기존코드
    yield go1(a, f)
  }
})

const take = curry((l, iter) => {
  let res = []
  iter = iter[Symbol.iterator]()
  return (function recur() {
    let cur
    while (!(cur = iter.next()).done) {
      const a = cur.value
      if (a instanceof Promise) {
        return a.then((a) => {
          res.push(a)
          return res.length === l ? res : recur()
        })
      }
      res.push(a)
      if (res.length === l) return res
    }
    return res
  })()
})
```

## 2. Kleisli Composition - L.filter, filter, nop, take
* filter에서 지연평가와 비동기 동시성을 함께 지원하려면 Kleisli Composition을 활용
```js
go([1, 2, 3, 4],
  L.map((a) => Promise.resolve(a * a)),
  L.filter((a) => a % 2),
  L.map((a) => a * a),
  take(2),
  console.log
)

const nop = Symbol('nop') // nop 구분자를 통하여, catch시 nop이면 아무일이 일어나지 않도록 처리

L.filter = curry(function *(f, iter) {
  for (const a of iter) {
    // 동기상황 해결
    const b = go1(a, f)
    if (b instanceof Promise) {
      yield b.then((b) => b ? a : Promise.reject(nop)) // Promise.reject로 두번째 L.map으로 들어가지 않음. Promise의 catch 성질을 생각해보면 됨
    } else if (b) yield a
  }
})

const take = curry((l, iter) => {
  let res = []
  iter = iter[Symbol.iterator]()
  return (function recur() {
    let cur
    while (!(cur = iter.next()).done) {
      const a = cur.value
      if (a instanceof Promise) {
        return a.then((a) => {
          res.push(a)
          return res.length === l ? res : recur()
        }).catch((e) => e === nop ? recur() : Promise.reject(e))
      }
      res.push(a)
      if (res.length === l) return res
    }
    return res
  })()
})
```

## 3. reduce에서 nop 지원
```js
go([1, 2, 3, 4],
  L.map((a) => Promise.resolve(a * a)),
  L.filter((a) => Promise.resolve(a % 2)),
  reduce(add),
  console.log
)

const reduceF = (acc, a, f) => {
  return a instanceof Promise ? a.then((a) => f(acc, a), e => e === nop ? acc : Promise.reject(e)) : f(acc, a)
}

const head = iter => go1(take(1, iter), ([h]) => h)

const reduce = curry((f, acc, iter) => {
  if (!iter) {
    return reduce(head(iter = acc[Symbol.iterator]()), iter)
  }

  return go1(acc, function reucr() {
      let cur
      while (!(cur = iter.next()).done) {
        const a = cur.value
        // acc = f(acc, a)
        acc = reduceF(acc, a, f)
        if (acc instanceof Promise) {
          return acc.then(recur)
        }
      }
      return acc
  })
})
```

## 4. 지연 평가 + Promise의 효율성
```js
// 1이 한번만 들어오고 끝나기 때문에 효율적이다.
go([1, 2, 3, 4],
  L.map((a) => new Promise((resolve) => setTimeout(() => resolve(a * a), 1000))),
  L.filter((a) => a % 2),
  take(1),
  console.log,
)
```

## 5. 지연된 함수열을 병렬적으로 평가하기 - C.reduce, C.take [1]
* 브라우저나 nodejs같은 환경에서는 자바스크립트가 비동기 I/O로 동작
```js
const delay1000 = (a) => new Promise((resolve) => setTimeout(() => resolve(a), 1000))

go([1, 2, 3, 4, 5],
  L.map((a) => delay1000(a * a)),
  L.filter((a) => a % 2),
  reduce(add), // reduce 전까지는 L.map이나 L.filter는 대기중
  console.log
)
const C = {}
// 배열 내부의 1, 2, 3, 4, 5를 동시에 출발하려면? C는 Concurrence의 약자
C.reduce = curry((f, acc, iter) => {
  return iter ? reduce(f, acc, [...iter]) : reduce(f, [...acc])
})
```

## 6. 지연된 함수열을 병렬적으로 평가하기 - C.map, C.filter
* 비동기적으로 에러를 미리 캐치하려면 ?
```js
// 실제로 함수 대기열이 얼마나 많아도, 병렬적으로 실행을 하여 코드의 효율성을 높임
go([1, 2, 3, 4, 5],
  L.map((a) => delay1000(a * a)),
  L.filter((a) => delay1000(a % 2)),
  L.map((a) => delay1000(a * a)),
  C.reduce(add),
  console.log
)

function noop() {}
const catchNoop = (arr) => {
  arr.forEach((a) => a instanceof Promise ? a.catch(noop) : a)
  return arr
}

C.reduce = curry((f, acc, iter) => {
  const iter2 = catchNoop(iter ? [...iter] : [...acc])
  // iter2.forEach((a) => a.catch(noop)) // 실제로 catch err를 출력 안함
  return iter ? reduce(f, acc, iter2) : reduce(f, iter2)
})

C.take = curry((limit, iter) => {
  return take(limit, catchNoop([...iter]))
})
```

## 7. 즉시 병렬적으로 평가하기 - C.map, C.filter
* 특정 함수라인에서만 병렬적으로 평가해보기
```js
C.takeAll = C.take(Infinity)
C.map = curry(pipe(L.map, C.takeAll))
C.filter = curry(pipe(L.filter, C.takeAll))

C.map((a) => delay1000(a * a), [1, 2, 3, 4]).then(console.log)
C.filter((a) => delay1000(a % 2), [1, 2, 3, 4]).then(console.log)
```

## 8. 즉시, 지연, Promise, 병렬적 조합하기
```js
const arr = [1, 2, 3, 4, 5, 6, 7, 8]

const delay1000 = (a, name) => new Promise((resolve) => {
  console.log(`${anme}: ${a}`)
  setTimeout(() => resolve(a), 1000)
})
// 모두 평가
go(arr,
  map((a) => delay1000(a * a, 'map 1')),
  filter((a) => delay1000(a % 2, 'filter 2')),
  map((a) => delay1000(a + 1, 'map 3')),
  take(2),
  console.log
)

// 평가를 최소화(지연 평가)
go(arr,
  L.map((a) => delay1000(a * a, 'map 1')),
  L.filter((a) => delay1000(a % 2, 'filter 2')),
  L.map((a) => delay1000(a + 1, 'map 3')),
  take(2),
  console.log
)

// 병렬적인 평가
go(arr,
  L.map((a) => delay1000(a * a, 'map 1')),
  C.filter((a) => delay1000(a % 2, 'filter 2')),
  L.map((a) => delay1000(a + 1, 'map 3')),
  take(3),
  console.log
)
```

## 9. 코드 간단히 정리
```js
C.reduce = curry((f, acc, iter) => {
  return iter ? reduce(f, acc, catchNoop([...iter])) : reduce(f, catchNoop([...acc]))
})
```

## 10. Node.js에서 SQL 병렬 평가로 얻은 효율
* mql에서 짠 코드 테스트에서 병렬 평가를 하여 속도를 비교
