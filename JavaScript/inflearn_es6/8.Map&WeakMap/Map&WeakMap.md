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

## 2. WeakMap 클래스 인스턴스 변수 보호하기
* 클래스에서 Private한 변수를 만들려면 ?  
  * 예제 코드
  ```javascript
  function Area(height, width) {
    this.height = height;
    this.width = width;
  }

  Area.prototype.getArea = function() {
    return this.height * this.width;
  }

  let myArea = new Area(10, 20);
  console.log(myArea.getArea()); // 200
  console.log(myArea.height); // 10
  ```

  * 기존 ES5의 방식
  ```javascript
  function Area(height, width) {
    var height = height;
    var width = width;
    this.getArea = function() {
    return height * width;
    }
  }

  let myArea = new Area(10, 20);
  console.log(myArea.getArea()); // 200
  console.log(myArea.height); // undefined
  ```

  * ES6방식 - WeakMap 활용
  ```javascript
  const wm = new WeakMap();
  function Area(height, width) {
    wm.set(this, {height, width});
  }

  Area.prototype.getArea = function() {
    const { height, width } = wm.get(this)
    return height * width;
  }

  let myArea = new Area(10, 20);
  console.log(myArea.getArea()); // 200
  console.log(myArea.height); // undefined
  console.log(wm.has(myArea)) // true  
  
  // 가비지 컬렉션 작동
  myArea = null;
  console.log(wm) // WeakMap {Area {} => Object {height: 10, width: 20}}
  console.log(wm.has(myArea)) // false
  ```

  * WeakMap을 활용 안하고 객체를 활용하는 경우
  ```javascript
  const obj = {};
  function Area(height, width) {
    obj.height = height;
    obj.width = width;
  }

  Area.prototype.getArea = function() {
    return obj.height * obj.width;
  }
  
  let myArea = new Area(10, 20);
  console.log(myArea.getArea()); // 200
  console.log(myArea.height); // undefined
  ```
  