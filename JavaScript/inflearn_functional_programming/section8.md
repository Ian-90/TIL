## 1. 결과를 만드는 함수 reduce, take
* reduce, take 
  * 이터러블이나 배열같은 내부의 값을 꺼내서 연산을 수행. 즉, 결과를 만드는 함수
  * 연산의 시작점을 알리는 함수

## 2. queryStr 함수 만들기
```js
const queryStr = (obj) => go(
  obj,
  Object.entries,
  map(([k, v]) => `${k}=${v}`),
  reduce((a, b) => `${a}&${b}`)
)

// pipe를 이용
const queryStr = pipe(
  Object.entries,
  map(([k, v]) => `${k}=${v}`),
  reduce((a, b) => `${a}&${b}`)
)

console.log(queryStr({ limit: 10, offset: 10, type: 'notice' }))
```

## 3. Array.prototype.join 보다 다형성이 높은 join
* 조합성이 더 높다
* 이터러블 프로토콜을 따르고 있다
* 만들어지는 값들을 지연 가능
```js
L.entries = function *(obj) {
  for (const k in obj) {
    yield [k, obj[k]]
  }
}

const join = curry(
  (sep = ',', iter) => reduce((a, b) => `${a}${sep}${b}`, iter)
)

const queryStr = pipe(
  L.entries,
  map(([k, v]) => `${k}=${v}`),
  join('&')
)
```

## 4. take, find
```js
const users = [
  { age: 32 },
  { age: 31 },
  { age: 37 },
  { age: 28 },
  { age: 25 },
  { age: 32 },
  { age: 31 },
  { age: 37 },
]

const find = curry((f, iter) => go(
  iter,
  L.filter(f), // L을 붙이면 효율적으로 바뀐다.
  take(1),
  ([a]) => a
))

console.log(find(u => u.age < 30, users))

go(users,
  L.map(u => u.age),
  find(n => n < 30),
  console.log
)
```

## 5. L.map, L.filter로 map과 filter 만들기
```js
// break point를 볼 때 사용했던 코드
L.map = curry(function *(f, iter) {
  iter = iter[Symbol.iterator]()
  let cur
  while (!(cur = iter.next()).done) {
    const a = cur.value
    yield f(a)
  }
})
// 간결한 코드
L.map = curry(function *(f, iter) {
  for (const a of iter) yield f(a)
})

const map = curry((f, iter) => {
  // let res = []
  // iter = iter[Symbol.iterator]()
  // let cur
  // while (!(cur = iter.next()).done) {
  //   const a = cur.value
  //   res.push(f(a))
  // }
  // return res
  return go(
    iter,
    L.map(f),
    take(Infinity)
  )
})

const map = curry(pipe(
  L.map,
  take(Infinity)
))

console.log(map(a => a + 10, L.range(4)))

L.filter = curry(function *(f, iter) {
  iter = iter[Symbol.iterator]()
  let cur
  while (!(cur = iter.next()).done) {
    const a = cur.value
    if (f(a)) {
      yield a
    }
  }
})

// 간결한 코드
L.filter = curry(function *(f, iter) {
  for (const a of iter) {
    if (f(a)) {
      yield a
    }
  }
})

const filter = curry(pipe(
  L.filter,
  take(Infinity)
))

console.log(filter(a => a % 2, range(4)))
```

## 6. L.flatten, flatten
```js
const isIterable = a => a && a[Symbol.iterator]

L.flatten = function *(iter) {
  for (const a of iter) {
    if (isIterable(a)) {
      for (const b of a) yield b
    } else {
      yield a
    }
  }
}
// 원하는만큼만 평가
const it = L.flatten([[1, 2], 3, 4, [5, 6], [7, 8, 9]])
console.log(it.next()) // 1
console.log(it.next()) // 2
console.log([...it]) // [1, 2, ..., 9]

const flatten = pipe(L.flatten, take(Infinity))
```

## 7. yield *, L.deepFlat
* yield * - `yield *iterable`은 `for (const val of iterable) yield val`과 같다.
```js
L.flatten = function *(iter) {
  for (const a of iter) {
    if (isIterable(a)) {
      yield *a
    } else {
      yield a
    }
  }
}

L.deepFlat = function *f(iter) {
  for (const a of iter) {
    if (isIterable(a)) {
      yield *f(a)
    } else {
      yield a
    }
  }
}
```

## 8. L.flatMap, flatMap
* flatMap - 전달된 함수를 이용하여, 내부의 값을 변화시켜서 사용
```js
console.log([[1, 2], [3, 4], [5, 6, 7]].flatMap(a => a.map(a => a * a))) // [1, 4, 9, 16, 25, 36, 49]

L.flatMap = curry(pipe(L.map, L.flatten)) // 평가를 한번더 미룸
const flatMap = curry(pipe(L.map, flatten)) // 즉시 평가

const it = L.flatMap(map(a => a * a), [[1, 2], [3, 4], [5, 6, 7]])
console.log([...it])
console.log(it.next())
console.log(it.next())
console.log(it.next())
```

## 9. 2차원 배열 다루기
```js
const arr = [
  [1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [9, 10],
]

// L 함수를 통해 지연적으로 동작하기 때문에 필요한 값들만 순회해서 효율적이다
go(arr,
  L.flatten,
  L.filter(a => a % 2),
  L.map(a => a * a),
  take(4),
  reduce(add),
  console.log,
)
```

## 10. 이터러블 중심 프로그래밍 실무적인 코드
* 객체지향 프로그래밍은 데이터를 우선적으로 정리를하고 메소드를 작성
* 함수형 프로그래밍은 이미 만들어져있는 함수조합이 있다면, 함수조합에 맞는 데이터를 구성하도록 프로그래밍을 하기 때문에 함수에 우선순위가 있다
```js
let users = [
  {
    name: 'a', age: 21, family: [
      { name: 'a1', age: 53 }, { name: 'a2', age: 47 },
      { name: 'a3', age: 16 }, { name: 'a4', age: 15 }
    ]
  },
  {
    name: 'b', age: 24, family: [
      { name: 'b1', age: 58 }, { name: 'b2', age: 51 },
      { name: 'b3', age: 19 }, { name: 'b4', age: 22 }
    ]
  },
  {
    name: 'c', age: 31, family: [
      { name: 'c1', age: 64 }, { name: 'c2', age: 62 }
    ]
  },
  {
    name: 'd', age: 20, family: [
      { name: 'd1', age: 42 }, { name: 'd2', age: 42 },
      { name: 'd3', age: 11 }, { name: 'd4', age: 7 }
    ]
  }
]

go(users,
  L.map(u => u.family),
  L.flatten,
  L.filter(u => u.age < 20),
  L.map(u => u.name),
  take(3),
  reduce(add),
  console.log
)
```
