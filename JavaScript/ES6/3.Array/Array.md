## 1. for of - 순회하기
* [for of](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Statements/for...of)
  * for문이나 forEach문으로 순회
  ```javascript
  var data = [1, 2, undefined, NaN, null, ""];
  data.forEach(function(value){
    console.log(value);
  })

  // 1, 2, undefined, NaN, null, ""
  ```

  * for in문 사용 - Array에서 쓰면안된다. Array도 객체이므로 for in문으로 출력할 경우 아래 코드처럼 메소드가 추가되기 때문에 이슈가 생길 수 있다.
  ```javascript
  Array.prototype.getIndex = function() {};

  for(let idx in data) {
    console.log(data[idx]);
  }
  // 1, 2, undefined, NaN, null, "", function(){}
  ```

  * for of - 위 코드와 달리 메소드가 나오지 않는다. for of문은 배열을 순회할 때 for in문의 문제가 생기지않고, 사용 할 수 있다. 또한 스트링의 순회도 가능하다.
  ```javascript
  Array.prototype.getIndex = function() {};

  for(let value of data) {
    console.log(value)
  }
  // 1, 2, undefined, NaN, null, "", function(){}
  var str = "hello "
  for(let value of str) {
    console.log(value)
  }
  // h, e, l, l, o, " "
  ```

## 2. spread operator - 배열의 복사

* [spread operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax)
  * 기존의 참조를 끊고 완전히 복사를 한 것이다.
  ```javascript
  let pre = ["apple", "orange", 100];
  let newData = [...pre];
  console.log(pre, newData); // [["apple", "orange", 100], ["apple", "orange", 100]]

  console.log(pre === newData) // false
  ```

## 3. spread operator - 몇가지 활용
* 배열이나 데이터를 특정 순서에 넣기
```javascript
let pre = [100, 200, "hello", null];
let newData = [0, 1, 2, 3, ...pre, 4]
console.log(newData) // [0, 1, 2, 3, 100, 200, "hello", null, 4]
```

* 개별 파라미터로 값을 전달 할 수 있다. 즉, 배열 값을 매개변수로 할당가능.
```javascript
function sum(a, b, c) {
  return a + b + c;
}
let pre = [100, 200, 300];
// 예전
sum(pre[0], pre[1], pre[2])

// 예전 개선된 방법
sum.apply(null, pre);

// spread operator 활용
sum(...pre)
```

* 정리
  1. 배열을 바꾸지 않고, 새로운 값을 복사가능(Immutable Array)
  2. 배열을 합치거나, 펼쳐진 상태로 새로운 함수의 파라미터로 전달 가능