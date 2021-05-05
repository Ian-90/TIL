## 1. Returning HTML
* HTML을 리턴하는 방법
  1. 문자열로 html을 보내서 브라우저가 실행하는 방법
  2. template engine 이용. 강의에서는 pug 사용

## 2. Configuring Pug
* pug 설치
```
yarn add pug
```

* express 설정을 server.js에 추가
```js
// view engine은 기본적으로 /views 폴더에서 템플릿 엔진 파일을 찾는다.
app.set('view engine', 'pug')
```

## 3. Partials
* template engine의 default 경로 수정
```js
app.set('views', './src/views')
```

* pug의 장점
  * 코드를 반복할 필요가 없다. include를 이용!

## 4. Extending Templates
* inheritance(상속)를 이용하여, 베이스 만들기
  * extends를 이용
  ```pug
  extends <base pug file>
  ```
  * block을 이용 - base 파일에 block 선언. pug 파일들이 내용을 채워넣을 공간을 마련
  ```pug
  block <variable>
  ```

## 5. Variables to Templates
* template engine에 변수 보내기 - pug에 #으로 변수 선언 후, 컨트롤러에서 변수로 전달
  * 컨트롤러에서 `res.render(view file, variable obj)`
  ```js
  res.render('home', { pageTitle: 'Home' })
  ```

## 6. Recap
* pug 복습

## 7. MVP Styles

## 8. Conditionals

## 9. Iteration

## 10. Mixins

## 11. Recap
