# NOMAD CODERS

* [Nomflix](https://academy.nomadcoders.co/p/react-for-beginners) - Learning React and ES6 by building a Movie Discovery App.

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

  * 1-2 Template Literals

    * ES5 문자 + 변수 작성법 - 'text' + 변수

    ```javascript
    function sayHello(name) {
      return "Hello " + name;
    }
    ```

    * ES6 [template literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals) - `(back-tick)으로 열고 닫는다. 변수는 \${변수}로 사용한다.

    ```javascript
    function sayHello(name) {
      return `Hello ${name}`;
    }
    ```

  * 1-3 Object Destructuring

    * ES5 - const 변수명 = 담을객체.속성명 or 담을객체[속성명]

    ```javascript
    const human = {
      name: 'Ian',
      lastName: 'John',
      nationality: 'Wish I was Korean'
    }
    const name = human.name;
    const lastName = human,lastName;
    console.log(name, lastName) // "Ian John"이 출력
    ```

    * ES6 - [Object Destructuring](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment) - 객체의 속성을 해체하여 그 값을 변수에 담는 방법
      cosnt { 속성명 } = 객체

    ```javascript
    const human = {
      name: "Ian",
      lastName: "John",
      nationality: "Wish I was Korean"
    };
    const { name, lastName } = human;

    console.log(name, lastName); // "Ian John"이 출력
    ```

    기존 코드와 비교하면, 상당히 간편해진다는걸 알 수 있다.

    * 다른 이름을 쓰고 싶을 때 - const { 속성명: 변경할 속성명 } = 객체

    ```javascript
    const human = {
      name: "Ian",
      lastName: "John",
      nationality: "Wish I was Korean"
    };
    //ES5
    const difName = human.nationality;

    //ES6
    const { nationality: difName } = human;
    console.log(difName); // "Wish I was Korean"이 동일하게 출력됨
    ```

    코드가 많아 질수록 ES6가 간결한걸 알 수 있다.

    * 객체가 중첩됬을 때

    ```javascript
    const human = {
      name: "Ian",
      lastName: "John",
      nationality: "Wish I was Korean",
      favFood: {
        breakfast: "hamberger",
        lunch: "pizza",
        dinner: "chicken"
      }
    };
    //ES5
    const breakfast = human.favFood.breakfast;
    const lunch = human.favFood.lunch;
    const dinner = human.favFood.dinner;

    //ES6
    const {
      favFood: { breakfast, lunch, dinner }
    } = human;
    console.log(breakfast, lunch, dinner); // "hamberger, pizza, chicken"이 동일하게 출력됨
    ```

  * 1-4 Spread Operator

    * [spread operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax) - 배열이라 객체를 unpack하고 싶을 때 사용하면 유용하다.

    ```javascript
    const days = ["Mon", "Tue", "Wed"];
    const otherDays = ["Thu", "Fri", "Sat"];

    const allDays = [days, otherDays];
    console.log(allDays); // [["Mon","Tue","Wed"],["Thu","Fri","Sat"]] 출력

    const allDays2 = [...days, ...otherDays, "Sun"];
    console.log(allDays2); // ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"] 출력

    const ob = {
      first: "hi",
      second: "hello"
    };

    const ab = {
      third: "bye bye"
    };

    const two = { ob, ab };
    console.log(two); // {{first: "hi", second: "hello"}, {third: "bye bye"}} 출력

    const two2 = { ...ob, ...ab };
    console.log(two2); // {first: "hi", second: "hello", third: "bye bye"}
    ```

  * 1-5 Classes

    * ES5

    ```javascript
    function Human(name, lastName) {
      this.name = name;
      this.lastName = lastName;
    }
    const ian = new Human("Ian", "John");
    console.log(ian); // Human {name: "Ian", lastName: "John", constructor: Object} 출력

    function Baby() {
      Human.apply(this, arguments);
    }

    Baby.prototype = Object.create(Baby.prototype);
    Baby.prototype.constructor = Baby;
    Baby.prototype.cry = function() {
      console.log("Waaaaaaaa");
    };
    Baby.prototype.sayName = function() {
      console.log(`My name is ${this.name}`);
    };
    const myBaby = new Baby("mini", "me");
    console.log(myBaby);
    console.log(myBaby.cry(), myBaby.sayname());
    ```

    * [ES6 Classes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)

    ```javascript
    class Human {
      constructor(name, lastName) {
        this.name = name;
        this.lastName = lastName;
      }
    }

    const ian = new Human("Ian", "John");
    console.log(ian); // Human {name: "Ian", lastName: "John", constructor: Object} 출력

    class Baby extends Human {
      cry() {
        console.log("Waaaaaaaa");
      }

      sayName() {
        console.log(`My name is ${this.name}`);
      }
    }

    const myBaby = new Baby("mini", "me");
    console.log(myBaby);
    console.log(myBaby.cry(), myBaby.sayname());
    ```

  * 1-6 [Array.map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)

  ```javascript
  const days = ["Mon", "Tue", "Wed", " Thu", "Fri"];
  const addSmile = day => `☺️ ${day}`;
  const smilingDays = days.map(addSmile);

  console.log(similingDays);
  ```

  * 1-7 [Array.filter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)

  ```javascript
  const numbers = [1, 2, 5, 6, 11, 17, 24, 67];

  const biggerThan15 = numbers.filter(n => n > 15);

  console.log(biggerThan15); // [17, 24, 67]
  ```

  * 1-8 .forEach..includes .push

    * [Array.forEach](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach) - 배열의 각각의 아이템에 대하여 어떤 시행을 한다.

    ```javascript
    let posts = ["Hi", "Hello", "Bye"];

    posts.forEach(post => console.log(post));
    ```

    * [Array.push](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push) - 새로운 아이템을 배열에 추가하는 역할을 한다.
    ```javascript
    let posts = ["Hi", "Hello", "Bye"];
    posts.push("new")
    console.log(posts) // ["Hi", "Hello", "Bye", "new"]
    ```

    * [Array.includes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes) - 배열 안에 지정한 아이템이 포함되어있는지 확인해준다.
    ```javascript
    let greetings = ["Hi", "Howdy", "Suup"];
    if(!greetings.includes("Hello")) {
      greetings.push("Hello")
    }

    console.log(greetings) // ["Hi", "Howdy", "Suup", "Hello"]
    ```
## Project Setup
