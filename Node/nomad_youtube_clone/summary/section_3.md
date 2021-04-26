## 1. Your First Server
* 서버 - 항상 켜져있고, 인터넷에 연결되어 있는 컴퓨터
* express를 이용한 서버생성
```js
import express from 'express'

const app = express()

const handleListening = () => console.log('server listening on port 4000')

app.listen(4000, handleListening)
```

## 2. GET Requests
* http - 서버끼리 통신하는 방법
* 브라우저는 웹사이트를 request하여 페이지를 가져온다.

## 3. GET Requests part Two
* request - 유저가 어떤 요청을 하는 것
```js
import express from 'express'

const PORT = 4000
const app = express()

app.get('/', () => console.log('response'))

const handleListening = () => console.log(`server listening on port http://localhost:${PORT}`)

app.listen(PORT, handleListening)
```

## 4. Responses
* request - 유저가 요청을 하면, 서버에서 대답해주는 것
```js
import express from 'express'

const PORT = 4000
const app = express()

app.get('/', (req, res) => {
  return res.send('hello world')
})

const handleListening = () => console.log(`server listening on port http://localhost:${PORT}`)

app.listen(PORT, handleListening)
```

## 5. Recap
*  [express](https://expressjs.com/ko/) 문서보면서 서론 설명

## 6. Middlewares part One
* middleware - request와 response 사이에서 중간에 다른일을 해주는 것. 모든 controller는 미들웨어가 될 수 있다.
```js
import express from 'express'

const PORT = 4000
const app = express()

const gossip = (req, res, next) => {
  console.log('in the middleware')
  next()
}

app.get('/', gossip, (req, res) => {
  return res.send('hello world')
})

app.get('/login', (req, res) => {
  return res.send('Login here')
})

const handleListening = () => console.log(`server listening on port http://localhost:${PORT}`)

app.listen(PORT, handleListening)
```
## 7. Middlewares part Two
* app.use - global middleware를 만들 수 있게 해준다. **사용시 순서가 중요하다. 그리고 모든 route에 적용된다.**