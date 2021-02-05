## 1. 총 수량,총 가격
```js
const products = [
  {
    name: '반팔티',
    price: 15000,
    quantity: 1,
    is_selected: true,
  },
  {
    name: '긴팔티',
    price: 20000,
    quantity: 2,
    is_selected: false,
  },
  {
    name: '핸드폰케이스',
    price: 15000,
    quantity: 3,
    is_selected: true,
  },
  {
    name: '후드티',
    price: 30000,
    quantity: 4,
    is_selected: false,
  },
  {
    name: '바지',
    price: 20000,
    quantity: 5,
    is_selected: false,
  },
]

const add = (a, b) => a + b

// 총 수량
const total_quantity = products => pipe(products,
  map(p => p.quantity),
  reduce(add)
)

// 총 가격
const total_price = products => pipe(products,
  map(p => p.price * p.quantity),
  reduce(add)
)

// 추상화레벨 높이기
const sum = (f, iter) => go(
  iter,
  map(f),
  reduce(add),
)

// curry를 이용하면 더 간단해짐.
const total_quantity = sum(p => p.quantity)
const total_price = sum(p => p.price * p.quantity) // total_price(products)
```

## 2. HTML로 출력하기
```js
// 1강의 함수를 그대로 이용
// 함수형 프로그래밍은 다형성이 높다
document.querySelector('#cart').innterHTML = `
  <table>
    <tr>
      <th></th>
      <th>상품 이름</th> 
      <th>가격</th> 
      <th>수량</th> 
      <th>총 가격</th> 
    </tr>
    ${go(products,
      sum(p => `
        <td><input type="checkbox" ${p.is_selected ? 'checked' : ''}></td>
        <td>${p.name}</td>
        <td>${p.price}</td>
        <td><input type="number" value="${p.quantity}"></td>
        <td>${p.price * p.quantity}</td>
      `),
    )}
    <tr>
      <td>반팔티</td>
      <td>10000</td>
      <td><input type="number" value="3"></td>
      <td>30000</td>
    </tr>
    <tr>
      <td>반팔티</td>
      <td>10000</td>
      <td><input type="number" value="3"></td>
      <td>30000</td>
    </tr>
    <tr>
      <td colspan="2">합계</td>
      <td>${total_quantity(filter(p => p.is_selected, products))}</td>
      <td>${total_price(filter(p => p.is_selected, products))}</td>
    </tr>
  </table>
`
```
