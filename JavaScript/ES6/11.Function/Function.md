## 1. Arrow function 활용
  * [Arrow function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)

    * 콜백함수를 더 짧게 구문을 쓸 수 있다.
    ```javascript
    // 기존 함수
    setTimeout(function() {
      console.log('settimeout')
    }, 1000)

    // ES6
    setTimeout(() => {
      console.log('settimeout')
    }, 1000)
    ```
    * 한줄로 작성시 return을 생략 할 수 있다.
    ```javascript
    //기존
    let newArr = [1, 2, 3, 4, 5].map(function(value, index, object) {
      return value * 2
    });

    //ES6
    let newArr = [1, 2, 3, 4, 5].map(v => v * 2)
    ```