## 1. 제너레이터와 이터레이터
* 제너레이터 - 이터레이터이자 이터러블을 생성하는 함수. yield를 통하여 몇번의 next를 통하여 값을 꺼내줄 수 있을지 제어 가능.
```js
function *gen() {
  yield 1;
  yield 2;
  yield 3;
  return 100
}

let iter = gen()
console.log(iter[Symbol.iterator]() === iter) // true
console.log(iter.next()) // { value: 1, done: false }
console.log(iter.next()) // { value: 2, done: false }
console.log(iter.next()) // { value: 3, done: false }
console.log(iter.next()) // { value: 100, done: true }

for (const a of iter) {
  // 순회시 return 값은 나오지 않음.
  console.log(a)
}
```

## 2. odds
* 제너레이터 예제 - 홀수만 리턴
```js
function *infinity(i = 0) {
  while (true) {
    yield i++
  }
}

function *limit(limit, iter) {
  for (const a of iter) {
    yield a
    if (a === limit) return
  }
}

function *odds(limit) {
  // for (let i = 0; i < limit; i++) {
  //   if (i % 2) yield i;
  // }

  for (const a of limit(limit, infinity(1))) {
    if (a % 2) yield a
  }
}

let iter = odds(10)
console.log(iter.next()) // 1
console.log(iter.next()) // 3
console.log(iter.next()) // 5
console.log(iter.next()) // 7
console.log(iter.next()) // 9
```

## 3. for...of, 전개 연산자, 구조 분해, 나머지 연산자
* 제너레이터, 이터러블, 이터레이터를 잘 활용하면 조합성이 높은 프로그래밍 가능
```js
// 전개 연산자
console.log(...odds(10))
console.log([...odds(10), ...odds(20)])

// 구조 분해
const [head, ...tail] = odds(5)
console.log(head)
console.log(tail)

// 나머지 연산자
const [a, b, ...rest] = odds(10)
console.log(a)
console.log(b)
console.log(rest)
```