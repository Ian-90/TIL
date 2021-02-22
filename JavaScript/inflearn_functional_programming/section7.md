## 1. range와 느긋한 L.range
* range
```js
const add = (a, b) => a + b

const range = l => {
  let i = -1
  let res = []
  while (++i < l) {
    console.log('range', i)
    res.push(i)
  }
  return res
}

console.log(range(5)) // [0, 1, 2, 3, 4]
console.log(range(2)) // [0, 1]

const list = range(4) // 즉시 배열로 평가
console.log(list) // [0, 1, 2, 3]
console.log(reduce(add, list)) // 6
```

* 느긋한 L.range
```js
const add = (a, b) => a + b

const L = {}
L.range = function *(l) {
  let i = -1
  while (++i < l) {
    console.log('L.range', i)
    yield i
  }
}

const list = L.range(4) // 
console.log(list) // iterator
// 언제 list 값들이 평가 될 것인가? => 이터레이터가 내부의 값을 순회할 때 평가됨
console.log(list.next().value)
console.log(list.next().value)
console.log(list.next().value)
console.log(list.next().value)

console.log(reduce(add, list)) // 6
```

## 2. range와 느긋한 L.range 테스트
* 효율성이 얼마나 있는가 - 사실 많이 차이는 안난다.
```js
function test(name, time, f) {
  console.time(name)
  while (time--) {
    f()
  }
  console.timeEnd(name)
}

test('range', 10, () => reduce(add, range(100000)))
test('L.range', 10, () => reduce(add, L.range(100000)))
```

## 3. take
```js
const take = curry((limit, iter) => {
  let res = []
  for (const a of iter) {
    res.push(a)
    if (res.length === limit) {
      return res
    }
  }
  return res
}) 
console.log(range(100)) // [0, 1, 2, ..., 99]
console.log(take(5, range(100))) // [0, 1, 2, 3, 4]
console.log(take(5, L.range(100))) // [0, 1, 2, 3, 4], 조합성이 높고 효율성 측면에서 더 좋다.

// take에 curry 적용 후,
go(
  L.range(10000),
  take(5),
  console.log
)
```

## 4. 제너레이터/이터레이터 프로토콜로 구현하는 지연 평가
* 이터러블 중심 프로그래밍에서 지연 평가(Lazy Evaluation)
  * 제때 계산법
  * 느긋한 계산법
  * 제너레이터/이터레이터 프로토콜을 기반으로 구현

## 5. L.map
* 평가를 미루는 성질을 가지고, 평가 순서를 달리 조작 할 수 있는 준비가 되어 있는 이터레이터를 반환하는 제너레이터 함수
```js
L.map = function *(f, iter) {
  for (const a of iter) {
    yield f(a)
  }
}

const it = L.map(a => a + 10, [1, 2, 3])
// 원하는 값 평가
console.log(it.next())
console.log(it.next()) 
console.log(it.next())
// 전체 평가
console.log([...it]) // [11, 12, 13]
```

## 6. L.filter
```js
L.filter = function *(f, iter) {
  for (const a of iter) {
    if (f(a)) {
      yield a
    }
  }
}

const it = L.filter(a => a % 2, [1, 2, 3, 4])
console.log(it.next())
console.log(it.next())
console.log(it.next())
console.log([...it]) // [1, 3]
```

## 7. range, map, filter, take, reduce 중첩 사용
* 즉시 평가
```js
// 개발자 도구에서 break point를 찍어서 동작 확인

/*
map, filter, take, reduce의 for of문을
iter = iter[Symbol.iterator]()
let cur
while(!(cur = iter.next()).done) {
  const a = cur.value
  각 함수 로직(map, filter, reduce, take) 추가
}
로 대체
*/

go(
  range(10),
  map(n => n + 10),
  filter(n => n % 2),
  take(2),
  console.log
) // [11, 13]
/*
- range를 다 평가 후, map을 실행하여 평가하고, filter를 평가 한 후, take로 평가
[0, 1, 2, ..., 9] => [10, 11, ..., 19] => [11, 13, ..., 19] => [11, 13]
*/
```

## 8. L.range, L.map, L.filter, take의 평가 순서
* 지연 평가
```js
/*
L.map, L.filter, take의 for of문을
iter = iter[Symbol.iterator]()
let cur
while(!(cur = iter.next()).done) {
  const a = cur.value
  각 함수 로직(map, filter, reduce, take) 추가
}
로 대체
*/
go(
  L.range(10),
  L.map(n => n + 10),
  L.filter(n => n % 2),
  take(2),
  console.log
) // [11, 13]
/* 
- 실행시 어떤함수에 break point가 먼저 들어 갈 것인가 ? => take
- take => filter => map => range => take에 추가
0 => 10 => false
1 => 11 => true
*/
```

## 9. 엄격한 계산과 느긋한 계산의 효율성 비교
* 7 ~ 8강에서 했던 것 을 개발자 도구에서 break point를 찍어서 다시 비교해보았다.
* 지연평가가 더 효율적이다!!!!!!!!!!!!

## 10. map, filter 계열 함수들이 가지는 결합 법칙
* 결합 법칙 - 특정한 방식으로 다르게 평가 순서를 바꾸어도 똑같은 결과를 만드는 법칙
  * 사용하는 데이터가 무엇이든지
  * 사용하는 보조 함수가 순수 함수라면 무엇이든지
  * 아래와 같이 결합한다면 둘 다 결과가 같다
  `[[mapping, mapping], [filtering, filtering], [mapping, mapping]] = [[mapping, filtering, mapping], [mapping, filtering, mapping]]`

## 11. ES6의 기본 규약을 통해 구현하는 지연 평가의 장점
* 이전의 자바스크립트에서는 지연 평가를 하는 것이 복잡하고 지저분하였지만, 리턴 값을 통하여 원하는 시점에 지연하고 평가하는 것이 ES6에서 가능하게 되었다.
* 안전하게 합성 가능하게 됨
* 다른 라이브러리 및 다른 함수에서도 사용 가능(조합성이 높음)
