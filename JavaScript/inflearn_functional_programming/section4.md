## 1. map
* map이라는 보조함수를 통해서, 1:1로 매핑되는 값을 얻는다.
```js
const products = [
  {
    name: '반팔티',
    price: 15000,
  },
  {
    name: '긴팔티',
    price: 20000,
  },
  {
    name: '핸드폰케이스',
    price: 15000,
  },
  {
    name: '후드티',
    price: 30000,
  },
  {
    name: '바지',
    price: 20000,
  },
]

const map = (f, iter) => {
  let res = []
  for (const a of iter) {
    res.push(f(a))
  }
  return res
}

let names = []
for (const p of products) {
  names.push(p.name)
}
console.log(names)

// map을 이용 할 경우
console.log(map(p => p.name, prouducts))

let prices = []
for (const p of products) {
  prices.push(p.price)
}
console.log(prices)
console.log(map(p => p.price, prouducts))
```

## 2. 이터러블 프로토콜을 따른 map의 다형성1
* map함수는 이터러블 프로토콜을 따르기 때문에 다형성이 높다.
* 브라우저에서 사용하는 함수들도 이터러블 프로토콜을 따르기 때문에, 다른 헬퍼함수들과 조합성이 좋아진다.
```js
// 배열처럼 생겼지만, 배열의 map함수를 사용 불가능.
console.log(document.querySelectorAll('*'))
// 1강의 map함수는 이터러블이므로, 이용 가능
console.log(map(el => el.nodeName, document.querySelectorAll('*')))

// const it = document.querySelectorAll('*')[Symbol.iterator]()
// console.log(it.next())
// console.log(it.next())
// console.log(it.next())
// console.log(it.next())
// console.log(it.next())
// console.log(it.next())
```

## 3. 이터러블 프로토콜을 따른 map의 다형성2
```js
let m = new Map()
m.set('a', 10)
m.set('b', 20)
const it = m[Symbol.iterator]()
console.log(it.next())
console.log(it.next())
console.log(it.next())
console.log(map(([k, a]) => [k, a * 2] , m))
```

## 4. filter
```js
const filter = (f. iter) => {
  let res = []
  for (const a of iter) {
    it (f(a)) {
      res.push(p)
    }
  }
  return res
}

let under20000 = []
for (const p of products) {
  it (p.price < 20000) {
    under20000.push(p)
  }
}
console.log(...under20000)
console.log(...filter(p => p.price < 20000, products))
```

## 5. reduce
```js
const reduce = (f, acc, iter) => {
  if (!iter) {
    iter = acc[Symbole.iterator]()
    acc = iter.next().value
  }

  for (const n of iter) {
    acc = f(acc, a)
  }

  return acc
}

const nums = [1, 2, 3, 4, 5]

let total = 0
for (const n of nums) {
  total = total + n
}
console.log(total)
```

## 6. reduce2
```js
reduce((total_price, product) => total_price + product.price, 0, products)
```

## 7. map + filter + reduce 중첩 사용과 함수형 사고
```js
const add = (a, b) => a + b
reduce(
  add,
  map(p => p.price,
    filter(p => p.price < 20000, products))
)

reduce(
  add,
  filter(n => n < 20000,
    map(p => p.price, products))
)
```