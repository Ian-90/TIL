## 1. Installation
* [express-flash](https://www.npmjs.com/package/express-flash)를 이용해 사용자에게 flash message를 남기기위해 설치
  * 설치
  ```
  yarn add express-flash
  ```

  * 사용
  ```js
  req.flash('메세지 종류', '전달할 메세지')
  ```

## 2. Sending Messages
* flash 미들웨어는 `res.locals.messages`를 만들어준다
* message.pug로 메세지 구현
