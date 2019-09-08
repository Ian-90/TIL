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