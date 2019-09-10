## 1. Map & WeakMap 추가정보를 담은 객체저장하기
* [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) - ES6로 오면서 자료구조를 개선했다. Array는 Set과 WeakSet으로, Object는 Map과 WeakMap으로 개선했다. Map은 key/value 구조를 이루며, 기존 Object와 달리 key값에 함수, 객체, 원시자료형등 어떠한 값이든 사용 할 수 있다. 객체에 대한 부연적인 설명이나 추가적인 정보를 넣을 때 유용하다.

* [WeakMap](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap) - WeakMap은 Map과 달리 key값이 객체만 허용된다. 이것 또한 WeakSet처럼 객체의 참조가 끊어지면 가비지 컬렉션 대상이 된다. 
```javascript
// 강의에서는 WeakMap만 다룬다.
//  이 함수가 얼마나 실행 되었는가?를 알려고 할 때,

let wm = new WeakMap();
let myfun = function() {};
wm.set(myfun, 0);

console.log(wm) // WeakMap {function => 0}

for (let i = 0; i < 10; i++) {
  count = wm.get(myfun); // get value
  count++;
  wm.set(myfun, count)
}

console.log(wm); // WeakMap {function => 10}

myfun = null
console.log(wm) // WeakMap {function => 10}
console.log(wm.get(myfun)) // undefined;
console.log(wm.has(myfun)) // false
```
