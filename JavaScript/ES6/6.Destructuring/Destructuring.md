## 1. Destructuring Array
* [Array Destructuring](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#Array_destructuring)
  * 기존 배열의 할당
    ```javascript
    let data = ['crong', 'honux', 'jk', 'jinny'];
    let jisu = data[0];
    let jung = data[2];
    console.log(jisu, jung); // 'crong', 'jung'
    ```
    * ES6에서의 할당 - 더 간편하다.
    ```javascript
    let data = ['crong', 'honux', 'jk', 'jinny'];
    let [jisu,,jung] = data;
    console.log(jisu, jung); // 'crong', 'jung'
    ```

## 2. Destructuring Object
* [Object Destructuring](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#Object_destructuring)

  * 기존 객체의 할당
  ```javascript
  let obj = {
    name: 'crong',
    address: 'Korea',
    age: 10
  }
  let name = obj.name;
  let age = obj.age;

  console.log(name, age) // 'crong', '10'
  ```

  * ES6
  ```javascript
  let obj = {
    name: 'crong',
    address: 'Korea',
    age: 10
  }
  let { name, age } = obj
  let { name: myName, age: myAge } = obj // 이름을 바꿔서 할당도 가능하다.
  console.log(name, age) // 'crong', '10'
  console.log(myName, myAge) // 'crong', '10'
  ```

