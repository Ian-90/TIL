# 1. const와 let
* 변수선언 - 기존은 var(함수 스코프)로 사용했지만, 이제는 const와 let을 사용하도록 권장된다.
* 블록스코프
```js
if (true) {
  var x = 3
}

console.log(x) // 3

if (true) {
  const y = 3
}

console.log(y) // ReferenceError: y is not defined
```
* const - 상수로 선언 시, const로 선언. 단, 변수에 새로운 값은 할당 할 수 없지만, 배열이나 객체 속성의 값들은 변경 할 수 있다.
* let - 변할 수 있는 값은, let으로 선언

# 2. 템플릿 문자열(백틱, `)
* 기존
```js
const a = 'hello'
const b = 'world'
const d = a + ' ' + b
```

* 템플릿 문자열 사용 - 문자열을 만들 때, 쉽게 사용 가능
```js
const a = 'hello'
const b = 'world'
const d = `${a} ${b}`
```

# 3. 객체 리터럴의 변화
* 예전
```js
var sayNode = function() {
  console.log('Node')
}
var es = 'ES'
var oldObject = {
  sayJS: function() {
    console.log('JS')
  },
  sayNode: sayNode,
}

oldObject[es + 6] = 'Fantastic'
```

* 객체 리터럴 사용
```js
const newObject = {
  sayJS() {
    console.log('JS')
  }m
  sayNode,
  [es + 6]: 'Fantastic'
}
```


# 4. 화살표 함수
* 기존
```js
// 선언문
function add1(x, y) {
  return x + y
}
// 표현식
var add1 = function(x, y) {
  return x + y
}
```

* 화살표 함수 사용
```js
// 표현식
const add1 = (x, y) => {
  return x + y
}

// return을 생략가능
const add1 = (x, y) => x + y
```

* this의 bind 방식 차이
```js
var relationship1 = {
  name: 'zero',
  friends: ['nero', 'hero', 'xero'],
  logFriends: function() {
    var that = this // 여기서 this는 relationship1
    this.friends.forEach(function(friend) {
      console.log(that.name, friend)
    })
  }
}

relationship1.logFriends()


const relationship2 = {
  name: 'zero',
  friends: ['nero', 'hero', 'xero'],
  logFriends() {
    this.friends.forEach((friend) => {
      console.log(this.name, friend)
    })
  }
}

relationship2.logFriends()
```

# 5. 비구조화 할당
* 객체
  * 기존
  ```js
  var candyMachine = {
    status: {
      name: 'node',
      count: 5,
    },
    getCandy: function() {
      this.status.count--
      return this.status.count;
    }
  }

  var getCandy = candyMachine.getCandy
  var count = candyMachine.status.count
  ```

  * 비구조화 할당 사용
  ```js
  const candyMachine = {
    status: {
      name: 'node',
      count: 5,
    },
    getCandy() {
      this.status.count--
      return this.status.count
    }
  }

  const { getCandy, status: { count } } = candyMachine

  // candyMachine.getCandy() vs getCandy()
  // 그냥 getCandy는 this를 찾지 못한다. candyMachine.getCandy()로 해야 this를 찾아서 count를 return.
  ```

* 배열
  * 기존
  ```js
  var array = ['nodejs', {}, 10, true]
  var node = array[0]
  var obj = array[1]
  var bool = array[array.length - 1]
  ```

  * 비구조화할당 사용
  ```js
  const array = ['nodejs', {}, 10, true]
  const [node, obj, , bool] = array
  ```

# 6. rest 문법과 Q&A
```js
const array = ['nodejs', {}, 10, true]
const [node, obj, ...bool] = array
console.log(bool) // [10 ,true]

const n = (x, ...y) => console.log(x, y)
n(5, 6, 7, 8, 9) // 5 [6, 7, 8, 9]
```

# 7. 콜백과 프로미스(Promise) 비교
* 콜백이 많은 경우 실행 순서를 알기 어렵다.
* 콜백지옥을 막으려고 변수로 빼서 시도했지만, 그래도 가독성이 좋지 않았다.
* 개선하기위해 나온 문법이 프로미스

# 8. 프로미스(Promise) 이해하기
* 프로미스 생성 
```js
new Promise((resolve, reject) => {
  // 성공하면
  resolve()
  // 실패하면
  reject()
})


const plus = new Promise((resolve, reject) => {
  const a = 1
  const b = 2
  if (a + b) {
    resolve(a + b)
  } else {
    reject(a + b)
  }
})

plus
  .then((success) => console.log(success))
  .catch((fail) => console.log(fail))
```

# 9. 프로미스(Promise) API
* .then()이 여러개일 때, 프로미스가 실패하면 바로 catch문으로 간다
```js
const handleMessage = (msg) => {
  return new Promise((resolve, reject) => {
    resolve(msg)
  })
}

const handleMessage2 = (msg2) => {
  console.log(msg2)
  return new Promise((resolve, reject) => {
    resolve(msg2)
  })
}
promise
  .then(handleMessage)
  .then(handleMessage2)
  .then((msg3) => console.log(msg3))
  .catch((err) => console.error(err))

const successPromise = Promise.resolve('성공')
const failurePromise = Promise.reject('실패')
```
* Promise.all - 여러개 프로미스를 모아서 한번에 실행. 하지만 1개라도 실패하면, catch문으로 넘어간다
```js
Promise.all([User.fildeOne(), Users.remove(), Users.update()])
  .then((results) => {})
  .catch((err) => {})
```

# 10. async/await
* Promise는 then이나 catch로 넘어가면 모든로직이 그 내부에서 이루어져야 한다
* 프로미스의 단점을 보완하기위해, generator를 활용하여, async/await이 나옴
* error를 잡기 위해, try...catch문을 사용해야 한다.
```js
async func() => {
  try {
    const user = await User.findOne('a')
    const updateUser = await User.update('a', 'b')
    const removeUser = await User.remove('b')
    console.log('hi')
  } catch (err) {
    console.error(err)
  }
}

func()
```
