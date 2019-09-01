## 1. let

* 함수 안의 스코프 변수를 찾고, 없다면 밖에서 값을 찾는다.

```javascript
var name = "global var";

function home() {
  var homevar = "homevar";
  for(var i = 0; i < 100; i++) {

  }
  console.log(i)
}

home(); // 100
```

* let는 블록단위의 스코를 가지고 있다.
```javascript
function home() {
  var homevar = "homevar";
  for(let) i = 0; i < 100; i++) {

  }
  console.log(i)

  if(true) {
    let myif = 'myif';
  }
   console.log(myif)
}

home(); // error
```


## 2. let과 closure

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
    <ul>
        <li>javascript</li>
        <li>java</li>
        <li>python</li>
        <li>django</li>
    </ul>
    <script src='./list.js'></script>
</body>
</html>
```

* closure - 내부함수가 외부함수의 context에 접근할 수 있는것으로 list를 클릭하면 4번째 리스트가 뜬다.
```javascript
// list.js
var list = document.querySelectorAll('li');

for (var i = 0; i < list.length; i++) {
  list[i].addEventListener('click', function(){
    console.log(i + '번째 리스트 입니다');
  })
}

// 4번째 리스트 입니다.

// 해결책
for (let i = 0; i < list.length; i++) {
  list[i].addEventListener('click', function(){
    console.log(i + '번째 리스트 입니다');
  })
}
```

## 3. const - 선언된 변수 지키기
* var로 변수를 선언한 후, 다른 값을 재할당 할 수 있었다.
```javascript
function home() {
  var homename = 'my house'
  homename = 'your house';
  console.log(homename)
}

home(); //your house
```
* 값 변경 막기 - 예전에는 HOME_NAME 컨벤션(대문자_)으로 해결했었음.
```javascript
function home() {
  const homename = 'my house' // 문자열이 아닌 배열도 바꿀수 없음.
  homename = 'your house';
  console.log(homename)
}

home(); // error
```

* const를 기본으로 사용
* 변경이 될수있는 변수는 let 사용
* var는 사용하지말기.

## 4. const 특성과 immutable array
* const - const로 선언한 변수는 다른 값을 재할당 할 수 없다.
```javascript
function home() {
  const list = ['apple', 'orange', 'watermelon']
  list = 'adf';
}

home(); //error
```

* const를 사용하더라도 배열과 오브젝트의 값을 변경하는것은 가능하다.
* 재할당은 안되지만 추가,삭제 가능
```javascript
function home() {
  const list = ['apple', 'orange', 'watermelon']
  list.push('banana')
  console.log(list)
}

home() // ['apple', 'orange', 'watermelon','banana']
```

* immutable array 를 어떻게 만들까?
```javascript
const list = ['apple', 'orange', 'watermelon'];
list2 = [].concat(list, 'banana')
console.log(list === list2)
```
  * concat이나 spread operator를 사용한다.
  * 리액트에서 state를 쓸때 immutable array를 씀.