## 1. for of - 순회하기

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
 - 기존의 참조를 끊고 완전히 복사를 한 것이다.
  ```javascript
  let pre = ["apple", "orange", 100];
  let newData = [...pre];
  console.log(pre, newData); // [["apple", "orange", 100], ["apple", "orange", 100]]

  console.log(pre === newData) // false
  ```