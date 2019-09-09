## 1. Set으로 유니한 배열만들기
* [Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set) - 중복없이 유일한 값을 저장하려고 할 때 사용. 이미 값이 존재하는지 체크할 때 유용하며, 배열과 유사한 형태이다.
```javascript
let mySet = new Set();
console.log(toString.call(mySet)); 

mySet.add('crong');
mySet.add('hary');
mySet.add('crong');

mySet.forEach(function(value) {
  console.log(value);
})
// 'crong', 'hary'

console.log(mySet.has('crong')) // true

mySet.delete('crong')
console.log(mySet.has('crong')) // false
```


## 2. WeakSet으로 효과적으로 객체타입 저장하기
* [WeakSet](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakSet) - 참조를 가지고 있는 객체만 저장이 가능하다. 객체 형태를 중복없이 저장하려고 할 때 유용하다.
```javascript
let arr = [1, 2, 3, 4];
let ws = new WeakSet();
ws.add(arr);
console.log(ws); // WeakSet {[1, 2, 3, 4]}
```

* Number, String, null등 참조를 가진 객체가 아니므로 WeakSet에 추가 할 수 없다.
```javascript
ws.add(111);
ws.add('hello');
ws.add(null);
console.log(ws); // TypeError: Invalid value
```

* 함수는 추가가 가능하다.
```javascript
ws.add(function(){}) // // WeakSet {[1, 2, 3, 4], function}
```

* 객체의 참조가 끊어지면 가비지 컬렉션 대상이 된다.
```javascript
let arr = [1, 2, 3, 4];
let arr2 = [5, 6, 7, 8];
let obj = {arr, arr2};
let ws = new WeakSet();
ws.add(arr);
ws.add(arr2);
ws.add(obj)

console.log(ws); //WeakSet {[1, 2, 3, 4], [5, 6, 7, 8], Object {arr: Array(4), arr2: Array(4)}}

arr = null;
console.log(ws); //WeakSet {[1, 2, 3, 4], [5, 6, 7, 8], Object {arr: Array(4), arr2: Array(4)}}
console.log(ws.has(arr), ws.has(arr2)); // false true
```