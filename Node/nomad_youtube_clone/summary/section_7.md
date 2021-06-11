## 1. Create Accoun part One
* User 모델 생성 - unique 옵션 적용
* join 컨트롤러 생성
* join.pug 생성

## 2. Create Accoun part Two
* postJoin 컨트롤러 작성
* db에 password를 그대로 저장하면 안된다. 보안처리(해싱)를 해주어야 한다

## 3. Create Accoun part Three
* 해싱된 password를 db에 저장 할 것이다.
* hash는 단방향 함수. 출력값으로 입력값을 알 수 없다.
* bcrypt라는 라이브러리를 이용하여 hash 처리
  * 설치
  ```
  yarn add bcrypt
  ```
  * 사용법
  ```js
  import bcrypt from 'bcrypt'
  bcrypt.hash()
  ```
  * rainbow table 공격을 막아준다

## 4. Form Validation
* user 컨트롤러에 email 및 username 중복체크 로직 추가
```js
const usernameExists = await User.exists({ $or: [{ username }, { email }] })
if (usernameExists) {
  return res.render('join', { pageTitle: 'Join', errorMessage: 'This username is already taken.'})
}
const emailExists = await User.exists({ email })
if (emailExists) {
  return res.render('join', { pageTitle: 'Join', errorMessage: 'This email is already taken.'})
}
```

* $or를 이용하여 리팩토링
```js
const exists = await User.exists({ $or: [{ username }, { email }] })
if (exists) {
  return res.render('join', { pageTitle: 'Join', errorMessage: 'This email is already taken.'})
}
```

## 5. Status Codes
* status code 추가
```js
res.status([code])
```

## 6. Login part One
* user 컨트롤러에서 getLoing, postLogin 컨트롤러 및 login.pug 구현

## 7. Login part Two
* 로그인 유효성 체크 구현
  * 비밀번호가 해시값으로 DB에 저장되기 때문에, 비교도 해시값으로 해야한다.
  * `bcrypt.compare`를 이용한다.

## 8. Sessions and Cookies part One
* 유저를 기억하게 만들기
  1. 유저에게 쿠키를 보내주기
  2. 세션 - 백엔드와 브라우저 간에 어떤 활동을 했는지 기억하는 것. 브라우저와 백엔드 사이의 memory history 같은 것
* express-session을 이용해보자
  * 설치
  ```
  yarn add express-session
  ```

  * 사용법
  ```js
  import session from 'express-session'
  // 모든 라우터 앞에 선언
  app.use(session({
    secret: 'Hello',
    resave: true,
    saveUninitialized: true,
  }))
  ```

  * 브라우저에서 세션을 보내면 서버에서 저장한다.