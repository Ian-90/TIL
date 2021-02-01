## 1. go
```js
// 함수형 프로그래밍에서는 코드를 값으로 다루어서 표현력을 높이고, 읽기 좋게 함
const go = (...args) => reduce((a, f) => f(a), args)

go(
  0,
  a => a + 1,
  a => a + 10,
  a => a + 100,
  console.log
)
```

## 2. pipe
```js
// pipe - 함수를 리턴하는 함수
// 인자를 여러개 받아도 동작해야 한다.
// s는 복수를 뜻함
const pipe = (f, ...fs) => (...as) => go(f(...as), ...fs)

const f = pipe(
  a => a + 1,
  a => a + 10,
  a => a + 100,
)

console.log(f(0))
```

## 3. go를 사용하여 읽기 좋은 코드로 만들기
```js
// 4강 코드
const add = (a, b) => a + b
reduce(
  add,
  map(p => p.price,
    filter(p => p.price < 20000, products))
)
// go를 적용한 코드. 조금 더 읽기 편해짐.
go(
  products,
  products => filter(p => p.price < 20000, products),
  products => map(p => p.price, products),
  prices => reduce(add, prices),
  console.log
)
```

## 4. go+curry를 사용하여 더 읽기 좋은 코드로 만들기
* curry - 함수를 값으로 다루면서, 받아둔 함수를 원하는 시점에 평가시키는 함수. 함수를 받아서 함수를 리턴, 인자를 받아서 인자가 원하는 개수만큼 들어왔을 때, 받아들였던 함수를 나중에 평가시킴.
```js
const curry = f => (a, ..._) => _.length ? f(a, ..._) : (..._) => f(a, ..._)

const mult = curry((a, b) => a * b)
console.log(mult(2)) // (..._) => f(a, ..._)
console.log(mult(2)(3)) // 6

const mult3 = mult(3)
console.log(mult3(2)) // 6
console.log(mult3(3)) // 9
console.log(mult3(4)) // 12
console.log(mult3(5)) // 15

// curry를 적용한 map, filter, reduce
const map = curry((f, iter) => {
  let res = []
  for (const a of iter) {
    res.push(f(a))
  }
  return res
})

const filter = curry((f, iter) => {
  let res = []
  for (const a of iter) {
    it (f(a)) {
      res.push(p)
    }
  }
  return res
})

const reduce = curry((f, acc, iter) => {
  if (!iter) {
    iter = acc[Symbole.iterator]()
    acc = iter.next().value
  }

  for (const n of iter) {
    acc = f(acc, a)
  }

  return acc
})

// 간결해짐
go(
  products,
  // filter(p => p.price < 20000)(products)
  filter(p => p.price < 20000),
  // map(p => p.price)(products)
  map(p => p.price),
  // reduce(add)(prices) 
  reduce(add),
  console.log
)
```

## 5. 함수 조합으로 함수 만들기
```js
const total_price = pipe(
  map(p => p.price),
  reduce(add)
)

const base_total_price = predi => pipe(
  filter(predi),
  total_price
)

// total_price으로 코드 중복 제거
go(
  products,
  filter(p => p.price < 20000),
  total_price,
  // map(p => p.price),
  // reduce(add),
  console.log
)

go(
  products,
  filter(p => p.price >= 20000),
  total_price,
  // map(p => p.price),
  // reduce(add),
  console.log
)
```