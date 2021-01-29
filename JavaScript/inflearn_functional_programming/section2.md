## 1. 기존과 달라진 ES6에서의 리스트 순회
* 함수형 프로그래밍에서 리스트의 순회는 매우 중요
* for i++ - 기존 리스트 순회(ES5)
```js
const list = [1, 2, 3]
for (var i = 0; i < list.length; i++) {
  console.log(list[i])
}

const str = 'abc'
for (var i = 0; i < str.length; i++) {
  console.log(str[i])
}
```

* for of - ES6의 리스트 순회(선언적이고 명령적임)
```js
const list = [1, 2, 3]
for (const a of list) {
  console.log(a)
}

const str = 'abc'
for (const a of str) {
  console.log(a)
}
```

## 2. Array, Set, Map을 통해 알아보는 이터러블/이터레이터 프로토콜
* 이터러블 - 이터레이터를 리턴하는 Symbol.iterator 메소드를 가진 값
* 이터레이터 - `{ value, done }` 객체를 리턴하는 next 메소드를 가진 값
* 이터러블/이터레이터 프로토콜 - 이터러블을 for...of, 전개 연산자 등과 함께 동작하도록한 규약
```js
const arr = [1, 2, 3]
console.log(arr[Symbol.iterator]) // f values() { [native code] }
let iterator = arr[Symbol.iterator]()
iterator.next() // { value: 1, done: false }
iterator.next() // { value: 2, done: false }
iterator.next() // { value: 3, done: false }
iterator.next() // { value: undefined, done: true }
```

* Set이나 Map은 Array와 다르게 index로 접근이 불가능. 결국 for of문은 다르게 동작
  * Symbol.iterator - 어떤 객체의 키로 사용 가능
  * Array, Set, Map은 이터러블

* Array
```js
const arr = [1, 2, 3]
// arr[Symbol.iterator] = null 주석을 풀면 아래의 for of문이 error
for (const a of arr) {
  console.log(a)
}

// 결국 for of문은 value 값들을 출력하다가 value값이 undefined이 된다면 순회를 멈춤
```
* Set
```js
const set = new Set([1, 2, 3])
for (const a of set) {
  console.log(a)
}
```
* Map
```js
const map = new Map([['a', 1], ['b', 2], ['c', 3]])
for (const a of map) {
  console.log(a)
}

// 이터레이터를 리턴. 또한 Symbol.iterator를 가지고 있음.
const key = map.keys()
const values = map.values()
const entries = map.entries()
```

## 3. 사용자 정의 이터러블, 이터러블/이터레이터 프로토콜 정의
* 사용자 정의 이터러블
```js
const iterable = {
  [Symbol.iterator]() {
    let i = 3
    return {
      next() {
        return i === 0 ? { done: true } : { value: i--, done: false }
      },
      // 이것이 구현되어야만 잘구현된 이터레이터
      [Symbol.iterator]() {
        return this
      }
    }
  }
}

let iterator = iterable[Symbol.iterator]()
console.log(iterator.next())
console.log(iterator.next())
console.log(iterator.next())
console.log(iterator.next())

for (const a of iterable) {
  console.log(a)
}

const arr2 = [1, 2, 3]
let iter2 = arr2[Symbol.iterator]()
console.log(iter2[Symbol.iterator]() === iter2) // true
iter2.next()
for (const a of iter2) {
  console.log(a)
}
```

## 4. 전개 연산자
* 이것 또한 이터러블/이터레이터 프로토콜을 따른다.
```js
const a = [1, 2]
// a[Symbol.iterator] = null 주석을 풀면 에러
console.log([...a, ...[3, 4]])
```
