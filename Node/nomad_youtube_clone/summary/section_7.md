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