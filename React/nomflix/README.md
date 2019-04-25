# NOMAD CODERS

* [Popcorn Time Clone](https://academy.nomadcoders.co/p/react-for-beginners)

## 1. Fundamentals
  * 1-1 Arrow Functions
    * ES5 function 작성법 - function funcName(인자) { code }
    ```javascript 
    function sayHello(name) {
      return "Hello " + name;
    }

    const ian = sayHello("Ian");
    console.log(ian); // "Hello Ian"이 출력됨.
    ```
    * ES6 [arrow function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions) 작성법 - const funcName = (인자) => { code }
      * 중괄호{}가 없으면 return 생략가능, 있으면 return을 써줘야 함.
      ```javascript 
      <!-- 중괄호가 없을 때 -->
      const sayHello = name => "Hello " + name; //중괄호가 없으면 return을 생략 할 수 있다.

      <!-- 중괄호가 있을 때 -->
      const sayHello = name => {return "Hello " + name;} // 중괄호가 있으면 return을 써줘야 한다.
      ```
      * 인자가 1개면 소괄호() 생략 가능, 인자가 2개이상이면 소괄호() 써줘야함
      ```javascript 
      <!-- 인자가 1개 일 때 -->
      const sayHello = name => "Hello " + name; // 인자가 1개면 () 생략가능

      <!-- 인자가 2개 이상 일 때 -->
      const sayHello = (name, mark) => {return "Hello " + name + mark;} //인자가 2개이상이면 인자를 ()로 감싸줘야한다.
      ```