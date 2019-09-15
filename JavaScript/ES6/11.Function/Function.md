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
## 2. Arrow function의 this context

  * this 문제
  ```javascript
  const myObj = {
    runTimeout() {
      setTimeout(function(){
        console.log(this === window)
        this.printData()
      }, 200);
    },
    printData() {
    console.log('hi codesquad!')
    }
  }

  myObj.runTimeout(); // true , TypeError: this.printData is not a function
  ```

  * printData function을 실행시키기위한 기존 방법 - bind 사용
  ```javascript
  const myObj = {
    runTimeout() {
      setTimeout(function(){
        console.log(this === window)
        this.printData()
      }.bind(this), 200);
    },
    printData() {
    console.log('hi codesquad!')
    }
  }

  myObj.runTimeout(); // false , hi codesquad!
  ```

  * printData function을 실행시키기위한 ES6 방법 - arrow function 사용
  ```javascript
  const myObj = {
    runTimeout() {
      setTimeout(() => {
        console.log(this === window)
        this.printData()
      }, 200);
    },
    printData() {
    console.log('hi codesquad!')
    }
  }

  myObj.runTimeout(); // false , hi codesquad!
  ```
  
  * this 문제 2
  ```html
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
  </head>
  <body>
    <p>myDiv</p>
  </body>
  </html>
  ```

  ```javascript
  const el = document.querySelector('p');
  const myObj = {
    register() {
      el.addEventListener('click', function(evt) {
        this.printData();
      })
    },

    printData() {
      console.log('clicked!!')
    }
  }

  myObj.register(); // TypeError: this.printData is not a function
  ```

  * ES6 해결책
  ```javascript
  const el = document.querySelector('p');
  const myObj = {
    register() {
      el.addEventListener('click', evt => {
        this.printData(evt.target);
      })
    },

    printData() {
      console.log('clicked!!', el.innerText)
    }
  }

  myObj.register(); // clicked!! myDiv
  ```

  * 결론 - bind를 하지않아도 된다는 장점때문에 편리하다.