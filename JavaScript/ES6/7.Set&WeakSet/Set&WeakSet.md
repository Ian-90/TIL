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