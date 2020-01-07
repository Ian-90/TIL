# section 7. 패스포트기반 인증 로직 구현(회원가입, 로그인, 로그아웃)

## 1. passport 환경구축

### 간단한 개념

- session : 클라이언트가 로그인했을 때, 서버에서 로그인정보를 아이디값을 만들어서 디비에 저장.
- 사용자가 특별한 페이지에 접근을 했을 때, 로그인했다는 정보를 서버에서 확인하고 상태값을 유지 해야함.
- [passport](https://github.com/jaredhanson/passport) - 인증관련된 모듈 처리하는 미들웨어
- [passport-local](https://github.com/jaredhanson/passport-local) - 일반적인 로그인 처리하는 미들웨어
- [express-session](https://github.com/expressjs/session) - express에서 세션 관련된 처리해주는 미들웨어
- [connect-flash](https://github.com/jaredhanson/connect-flash) - 에러메세지들을 쉽게전달

## 2. middleware, strategy 설정

- 위에 미들웨어 사용법들 참고해서 설정

## 3. passport 기반 router 설정

- routing 처리

## 4. local-strategy 콜백완성

## 5. passport기반 세션처리

## 6. 로그인 로직 구현

## 7. Ajax 기반의 passport 인증처리

## 8. 로그아웃 처리
