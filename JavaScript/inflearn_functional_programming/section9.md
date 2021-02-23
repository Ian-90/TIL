## 1. callback과 Promise
* JS에서 비동기 프로그래밍 하는 방식
  1. callback
  ```js
  function add10(a, callback) {
    setTimeout(() => callback(a + 10), 100)
  }

  add10(5, (res) => {
    console.log(res)
  })

  // callback을 여러번 사용
  add10(5. (res) => {
    add10(res, (res) => {
      add10(res, (res) => {
        console.log(res)
      })
    })
  })
  ```

  2. Promise - 코드가 더 간결하고 유지보수가 편하다
  ```js
  function add20(a) {
    return new Promise(resolve => setTimeout(() => resolve(a + 20), 100))
  }

  add20(5)
    .then(console.log)

  // Promise로 여러번
  add20(5)
    .then(add20)
    .then(add20)
    .then(console.log)
  ```

## 2. 비동기를 값으로 만드는 Promise
* Promise가 callback과 가장 큰 차이는 callback 지옥보다 비동기 상황을 일급상황으로 다룬다는 것이 가장 큰 차이
* Promise로 만들어진 인스턴스를 통해 대기, 성공, 실패를 다루는 일급 값으로 이루어짐
* 비동기 상황에서도 값으로 다룰 수 있기 때문에 일급이다.
```js
let a =  add10(5. (res) => {
  add10(res, (res) => {
    add10(res, (res) => {
      console.log(res)
    })
  })
})

console.log(a) // undefined, 어떠한 값도 나오지 않는다.

let b = add20(5)
  .then(add20)
  .then(add20)
  .then(console.log)

console.log(b) // Promise pending, Promise 라는 값을 리턴
```

## 3. 값으로서의 Promise 활용
```js
// go1이 잘 동작하려면, f가 동기적이여야 하며, a라는 값도 동기적으로 바로 알수 있는 값이어야 한다.
const go1 = (a, f) => f(a)
const add5 = a => a + 5

console.log(go1(10, add5)) // 15

// 만약 10이 비동기적인 값이라면, 어떻게 go1을 정상 동작 시킬까?
const delay100 = a => new Promise(resolve => setTimeout(() => resolve(a), 100))
const go1 = (a, f) => a instanceof Promise ? a.then(f) : f(a)
go1(delay(10), add5).then(console.log) // 15

// 같은 값
go1(go1(10, add5), console.log)
go1(go1(delay(10), add5), console.log)
```

## 4. 합성 관점에서의 Promise와 모나드
* 함수 합성 - `f . g => f(g(x))`
* 모나드 - 연속적으로 함수를 합성할 때, 상황에 따라 안전하게 합성 할 수 있게 하는 개념
  * [1] - 컨테이너에 값이 들어있고, 함수 합성을 안전하게 하는 것
  ```js
  const g = a => a + 1
  const f = a => a * a

  console.log(f(g(1))) // 4, 유의미한 값이기 때문에 연속적으로 이어지고 정상 동작 함
  console.log(f(g())) // NaN, 알 수 없는 값이 왔을 때, 문제가 발생하기 떄문에 안전하게 합성이 되지 않음
  // Array.of(1) => [1]
  Array.of(1).map(g).map(f).forEach((result) => console.log(result)) // 컨테이너 내부의 값이 중요
  [].map(g).map(f).forEach((result) => console.log(result)) // 내부의 값이 없기 때문에 합성이 일어나지 않음

  Promise.resolve(1).then(g).then(f).then((result) => console.log(result)) // Promise는 비동기 상황을 안전하게 합성
  new Promise(
    (resolve) => setTimeout(() => resolve(2), 100)
  ).then(g).then(f).then((result) => console.log(result)) // 어떤 특정 상황을 안전하게 합성하기 위한 도구
  ```

## 5. Kleisli Composition 관점에서의 Promise
* Kleisli Composition - 오류가 있을 수 있는 상황에서의 함수 합성을 안전하게 하는 하나의 규칙
  * 오류가 있는 상황
    * 들어오는 인자가 잘못된 인자가 들어와서 함수가 오류가 나는 상황
    * 정확한 인자가 들어왔지만 외부의 의존성있는 함수에 정확한 결과를 전달 할 수 없는 상황

```js
/*
  * Kleisli Composition
  f . g
  f(g(x)) = f(g(x))
  f(g(x)) = g(x) // g에서 에러가 나면 g에서 에러난 결과나, f(g(x)) 합성한 값에서도 같은 에러난 결과가 나온다
*/

let users = [
  { id: 1, name: 'aa' },
  { id: 2, name: 'bb' },
  { id: 3, name: 'cc' },
]

const getUserById = id => find(u => u.id === id, users)

const f = ({ name }) => name
const g = getUserById
const fg = id => f(g(id))

console.log(fg(2), fg(2) === fg(2)) // bb, true

// users 상태가 변한다면? 함수 두개를 합성한 상황에서 위험한 상황이 생김.
const r = fg(2)
console.log(r)
users.pop()
users.pop()

const r2 = fg(2)
console.log(r2)

// Kleisli Composition 하려면?
const getUserById = id => find(u => u.id === id, users) || Promise.reject('없어요!')
const fg = id => Promise.resolve(id).then(g).then(f).catch((err) => err)

fg(2).then(console.log)

users.pop()
users.pop()

fg(2).then(console.log) === g(2) // 결과가 같다.
```

## 6. go, pipe, reduce에서 비동기 제어
```js
// 비동기 상황이 합성되면, 정상동작을 하지 않는다
go(1,
  a => a + 10,
  a => Promise.resolve(a + 100),
  a => a + 1000,
  console.log
)

// 정상 동작 하려면?
const go = (...args) => reduce((a, f) => f(a), args)
const pipe = (f, ...fs) => (...as) =>(f(...as), ...fs)
const reduce = curry((f, acc, iter) => {
  if (!iter) {
    iter = acc[Symbol.iterator]()
    acc = iter.next().value
  } else {
    iter = iter[Symbol.iterator]()
  }
  // 기존 코드
  // let cur
  // while (!(cur = iter.next()).done) {
  //   const a = cur.value
  //   // acc = f(acc, a) 기존코드
  //   // acc = acc instanceof Promise ? acc.then((acc) => f(acc, a)) : f(acc, a) // 이렇게 작성하게 되면, 불필요한 로드가 생김.
  // }
  // return acc

  // 재귀 함수 이용
  return (function reucr() {
      let cur
      while (!(cur = iter.next()).done) {
        const a = cur.value
        acc = f(acc, a) 기존코드
        if (acc instanceof Promise) {
          return acc.then(recur)
        }
      }
      return acc
  })(acc)
})

// go함수의 첫번째 인자가 Promise 라면?
const go1 = (a, f) => a intanceof Promise ? a.then(f) : f(a)
const reduce = curry((f, acc, iter) => {
  ...
  return go1(acc, function reucr() {
      let cur
      while (!(cur = iter.next()).done) {
        const a = cur.value
        acc = f(acc, a) 기존코드
        if (acc instanceof Promise) {
          return acc.then(recur)
        }
      }
      return acc
  })
})
```

## 7. promise.then의 중요한 규칙
```js
// 프로미스가 중첩되더라도 원하는 곳에서 한번의 then으로 원하는 값을 볼 수 있다
Promise.resolve(Promise.resolve(Promise.resolve(1))).then(console.log)
new Promise((resolve) => resolve(new Promise((resolve) => resolve(1)))).then(console.log)
```
