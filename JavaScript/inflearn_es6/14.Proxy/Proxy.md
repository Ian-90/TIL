## 1. Proxy로 interception 기능구현

* [Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) - object가 하던일을 가로채서 다른 작업을 할 수 있는 일을 제공해준다. 객체의 변화를 중간에서 접근해서 get이나 set을 할 수 있다. 2way 데이터 바인딩작업도 가능하다.

* 기본적인 Proxy
```javascript
const myObj = {
  name: 'ian'
};

const proxy = new Proxy(myObj, {});
console.log(proxy.name); // 'ian'
proxy.name = 'yohan';
console.log(proxy.name) // 'yohan'

toString.call(proxy) // [object Object]
console.log(proxy) // Proxy { name: 'yohan'}
console.log(myObj) // { name: 'yohan'}
console.log(proxy === myObj) // false
console.log(proxy.name === myObj.name) // true
```
* Proxy의 get과 set
```javascript
const myObj = {
  name: 'ian',
  changedValue: 0
};

const proxy = new Proxy(myObj, {
  get: function(target, property, receiver) {
    console.log('get value')
    return target[property]; // target[property] 대신 Reflect.get(target, property)도 동일하다.
  },
  set: function(target, property, value) {
    // target은 myObj임
    console.log('set value')
    target['changedValue']++
    target[property] = value;
  }
})

// 기본적으로 get함수가 불려짐
console.log(proxy.name); // get value, 'ian' 

//변화할때 set함수가 불려짐
proxy.name = 'yohan' // set value, 'yohan'
proxy.name = 'ryan' // set value, 'ryan'
console.log(myObj) // { name: 'ryan', changedValue: 2 }

console.log(proxy.name); // get value, 'ryan' 
console.log(proxy.changedValue); // get value, 2

myObj.name = 'startup'
console.log(proxy) // { name: 'startup', changedValue: 2 }
console.log(myObj) // { name: 'startup', changedValue: 2 }
```

* proxy를 통해서만 변수에 접근하려면?
```javascript
// 객체를 안에 선언해준다.
const proxy = new proxy({ name: 'ian', changedValue: 0 }, {
  get: function(target, property, receiver) {
    console.log('get value')
    return target[property];
  },
  set: function(target, property, value) {
    // target은 myObj임
    console.log('set value')
    target['changedValue']++
    target[property] = value;
  }
})
```

* property가 없을 때, error같은것을 알려주려면?
```javascript
// 객체를 안에 선언해준다.
const proxy = new proxy({ name: 'ian', changedValue: 0 }, {
  get: function(target, property, receiver) {
    console.log('get value')
    return (property in target) ? target[property] : 'anonymous';
  },
  set: function(target, property, value) {
    // target은 myObj임
    console.log('set value')
    target['changedValue']++
    target[property] = value;
  }
})

console.log(proxy.hello) // 'anonymous'
```