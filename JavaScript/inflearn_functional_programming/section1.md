## 1. 평가와 일급
* 평가 - 코드가 계산(Evaluation)되어 값을 만드는 것
```js
1 + 2 // 3 평가
[1, 2 + 3] // [1, 5] 배열로 평가
```

* 일급
  * 값으로 다룰 수 있다.
  * 변수에 담을 수 있다.
  * 함수의 인자로 사용될 수 있다.
  * 함수의 결과로 사용될 수 있다.
  ```js
  // 위의 모든 조건을 만족
  const a = 10 
  const add10 = a => a+ 10
  const r = add10(a)
  console.log(r)
  ```

## 2. 일급 함수
* 일급함수 - 함수를 값으로 다룰 수 있다.
* 조합성과 추상화의 도구 - 함수형 프로그래밍에서는 일급 함수를 이용하여 많은 조합성을 만들어 내고, 추상화 도구로 사용
* js에서 함수는 일급!
```js
const add5 = a => a + 5
console.log(add5)
console.log(add5(5))

const f1 = () => () => 1
console.log(f1())

const f1 = f1()
console.log(f2)
console.log(f2())
```

## 3. 고차 함수
* 고차함수 - 함수를 값으로 다루는 함수
  1. 함수를 인자로 받아서 실행하는 함수
  ```js
  // applicative 프로그래밍
  const apply1 = f => f(1) // (a => a + 2)(1)
  const add2 = a => a + 2
  console.log(apply1(add2)) // 3

  const times = (f, n) => {
    let i = -1;
    while (++i < n) f(i)
  }

  times(a => console.log(a + 10), 3)
  ```

  2. 함수를 만들어 리턴하는 함수 (클로저를 만들어 리턴하는 함수)
  ```js
  // b => a + b가 a를 기억하기 때문에 클로저
  const addMaker = a => b => a + b
  const add10 = addMaker(10)
  console.log(add10) // 함수를 리턴
  console.log(add10(5)) // 15
  ```