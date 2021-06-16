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

## 9. Sessions and Cookies part Two
* 서버를 재시작하면 세션이 사라진다. 메모리에 저장하기 때문이다.
* 브라우저를 방문할 때, express가 알아서 브라우저를 위한 세션id를 만들고, 브라우저에게 보내준다.
* 브라우저가 쿠키dp 세션id를 저장하고, express도 세션을 세션 db에 저장한다.

## 10. Logged In User part One
* id 정보 db를 만들어서 id를 확인하는 기능 추가
* 로그인하면 유저에 대한 정보를 세션에 담기(유저마다 서로 다른 req.session.obj를 가짐)

## 11. Logged In User part Two
* pug template는 res.locals에 접근가능
* localMiddleware 구현
  * `req.session`에 접근하기 위해 session 미들웨어보다 뒤에 선언해주어야 한다.

## 12. Recap
* 복습
  * 쿠키 - 정보를 주고 받는 방법
  * 세션ID - 쿠키에 저장된다. 백엔드에도 저장된다.
  * 세션store - 세션을 저장하는 곳
  * locals - template이 접근할 수있는 response object

## 13. MongoStore
* 세션 데이터는 쿠키에 저장되지 않고, 세션ID만 저장된다. 세션데이터는 서버에만 저장된다.
* 서버의 세션 스토리지는 메모리 스토어이고, 실제 사용하기 위해 있는건 아니다.
* 서버를 재시작하면 세션이 날라가기떄문에, db를 이용해서 저장하자
* connect-mongo를 이용하여 세션 데이터를 mongodb에 저장
  * 설치
  ```
  yarn add connect-mongo
  ```

  * 사용법
  ```js
  import session from 'express-session'
  import MongoStore from 'connect-mongo'

  app.use(session({
    secret: 'foo',
    store: MongoStore.create(options)
  }))
  ```
* 서버를 재시작해도 이제는 세션 데이터가 날라가지 않는다.

## 14. Uninitialized Sessions
* 로그인한 사용자의 세션만 저장하는 것이 좋다. 많은 수의 방문자가 있을 때 모두 다 저장하면 DB에 문제가 생긴다.
```js
app.use(session({
  ...,
  resave: false,
  saveUninitialized: false, // 세션을 수정할때만 세션을 DB에 저장하고 쿠키를 넘겨주는 옵션
}))
```
* 세션인증에 대한 문제점 해결책은 토큰 인증

## 15. Expiration and Secrets
* 쿠키의 프로퍼티
  * secret - 쿠키에 sign할 때 사용하는 문자열. 백엔드가 쿠키를 줬다는걸 보여주기 위함.
  * Domain - 쿠키를 만든 백엔드가 누구인지 알려줌
  * Expires - 만료날짜가 지정되지않으면 session cookie로 됨
  * Max-Age - 세션이 언제 만료되는지 알려줌
  ```js
  app.use(session({
    ...,
    cookie: {
      maxAge: 20000,
    },
  }))
  ```
* 환경변수 파일 만들기 -  `.env`
  * .gitignore에 .env 추가
  * .env는 관습적으로 대문자로 적는다

## 16. Environment Variables
* [dotenv](https://www.npmjs.com/package/dotenv)를 이용하여 .env 파일의 변수들을 읽는다.
  * 설치
  ```
  yarn add dotenv
  ```

  * 사용법
  ```js
  // 가능한 최상단에에서 실행한다.
  // require를 이용하면 사용처마다 require를 선언해주어야한다.
  require('dotenv').config()
  // root파일에 선언
  import 'dotenv/config'
  ```

## 17. Github Login part One
* 깃헙 OAuth 로그인 과정
  1. 사용자를 깃헙으로 보낸다. 그러면 사용자는 아이디와 패스워드를 입력하고 정보 공유 승인을 누른다.
  2. 깃헙은 사용자를 토큰과 함께 우리 웹사이트로 돌려 보낸다.
  3. 우리는 그 토큰으로 사용자의 정보를 받아온다.

* 깃헙에서 OAuth 사용
  1. 깃헙 개발자 세팅 접속
  2. 새 어플리케이션 등록
  3. 이름 및 url, callback url 입력
  4. 등록

* 원하는 정보를 얻기 위한 파라미터들 - [공식문서](https://docs.github.com/en/developers/apps/building-oauth-apps/authorizing-oauth-apps#parameters)

## 18. Github Login part Two
* scope parameter - 유저에게서 얼마나 많이 정보를 읽어내고 어떤 정보를 가져올 것인지에 대한 것
  * [이용가능한 scope 공식문서](https://docs.github.com/en/developers/apps/building-oauth-apps/scopes-for-oauth-apps#available-scopes)
  * 기존의 긴 oauth url 대신 `/github/start` 라우터와 컨트롤러를 구현
  * `URLSearchParams`를 이용하여 옵션들을 인코딩

## 19. Github Login part Three
* client_id, client_secret, code를 이용하여 github 토큰 얻기
* client_id, client_secret은 환경변수에 추가
* `github/finish` 라우터와 컨트롤러 구현

## 20. Github Login part Four
* node-fetch를 이용하여 fetch 이용
* github 프로필 정보 가져오기 연동

## 21. Github Login part Five
* github의 email이 public이 아닐 때 access_token을 이용하여 가져오기
* primary와 verified가 true인 이메일 얻기

## 22. Github Login part Six
* 로그인 규칙
  * DB의 유저가 이메일을 가지고 있을 때, github 로그인한 유저가 이메일이 똑같다면?
    1. 깃헙말고 기존 DB 유저의 패스로워드로 로그인 하여라
    2. 같은 이메일이 증명되었으니 깃헙으로 로그인 가능
    3. 계정이 없다면 어떻게 할 것인가? - 계정생성
* User 스키마에 socialOnly 추가, password required 옵션 제거(깃헙로그인 시 비밀번호가 빈스트링으로 저장하기 때문에)
