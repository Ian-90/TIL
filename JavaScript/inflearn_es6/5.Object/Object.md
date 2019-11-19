## 1. 간단한 객체 생성하기
* 기존의 Object를 만드는 방법 - Object literal 방식으로 만듬
```javascript
const name = 'ian90';
const age = '31';

const obj = {
  name: name,
  age: age
}

function getObj() {
  const name = 'ian90';
  const getName = function() {
    return name;
  }

  const setName = function(newName) {
    name = newName
  }

  const printName = function() {
    console.log(name)
  }

  return {
    getName: getName,
    setName: setName
  }

  var obj2 = getObj();
  console.log(obj2)
```

* ES6에서는 Object에서 key와 value값이 같으면 [Object literal](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer#Property_definitionss) 작성이 편해진다.
```javascript
const name = 'ian90';
const age = '31';

// 위에서 작성한 코드와 같은 결과가 나온다.
const obj = {
  name,
  age
}
console.log(obj)
```