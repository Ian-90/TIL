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

## 7. Planning Routes

## 8. URL Parameters part One

## 9. URL Parameters part Two
