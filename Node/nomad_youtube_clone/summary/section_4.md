## 1. What are Routers
* 라우터는 컨트롤러와 URL관리를 쉽게해준다.
* 프로젝트에서 가장 먼저 생각해야 할 것 - 어떤 종류의 데이터를 이용할 것인가?(도메인)
  1. 비디오 데이터
  2. 유저 데이터
* URL
  * / -> Home
  * /join -> Join
  * /login -> Login
  * /search -> Search

  * 도메인으로 나누기
    * /users/edit -> Edit user
    * /users/delete -> Delete user

    * /videos/watch -> Watch Video
    * /videos/edit -> Edit
    * /videos/delete -> Delete Video
    * /videos/comments -> Comment on a video
    * /videos/comments/delete -> Delete A Comment of a Video

## 2. Making Our Routers
* server.js
```js
import express from 'express'

// 라우터 생성
const globalRouter = express.Router()
const userRouter = express.Router()
const videoRouter = express.Router()


app.use('/', globalRouter)

const handleHome = (req, res) => res.send('Home')
globalRouter.get('/', handleHome)

app.use('/users', userRouter)

const handleEdit = (req, res) => res.send('Edit User')
userRouter.get('/edit', handleEdit)

app.use('/videos', videoRouter)

const handleWatch = (req, res) => res.send('Watc Video')
videoRouter.get('/watch', handleWatch)
```

## 3. Cleaning the Code
* 코드를 작성한 시간만큼 정리하는데 시간을 들여야 한다.
* src/routers - 각 파일에 라우터 분리
  * /globalRouter.js
  * /userRouter.js
  * /videoRouter.js

## 4. Exports
* 라우터와 컨트롤러를 분리해야 한다.
* src/controllers
  * /userController.js
  * /videoController.js

## 5. Router Recap
* 라우터 - url이 어떻게 시작하는지에 따라 나누는 방법
* app.use로 라우터를 그룹화
* `express.router()`를 이용하여 그룹 안에 url을 메소드에 따라 나눈다.

## 6. Architecture Recap
* export default - 1개만 사용할 때
* export - 여러 개 사용할 때

## 7. Planning Routes
* 우리가 만들 라우터 주소 - 주소에 맞도록 라우터와 컨트롤러를 추가
* / -> Home
* /join -> Join
* /login -> Login
* /search -> Search

* /users/:id -> See User
* /users/lgout -> Log Out
* /users/edit -> Edit MY Profile
* /users/delete -> Delete MY Profile

* /videos/:id -> See Video
* /videos/:id/edit -> Edit
* /videos/:id/delete -> Delete Video
* /videos/upload -> Upload Video

## 8. URL Parameters part One
* url parameter - url안에 변수 넣도록 해준다. 콜론(:)은 변수라는걸 알려주는 표시
```js
// url parameter가 있는 라우터 컨트롤러에서 확인해보기
console.log('params', req.params)
```
* 만약 `/:id` 컨트롤러가 `/upload` 상단에 선언 되어 있다면 ?
  * id가 upload로 들어온다면, `:/id` 컨트롤러가 실행된다.

## 9. URL Parameters part Two
* `:id` parameter에 숫자만 받고 싶다면?
  * 정규표현식을 이용 - `/:id(\\d+)`
  * regexpal.com 테스트 홈페이지