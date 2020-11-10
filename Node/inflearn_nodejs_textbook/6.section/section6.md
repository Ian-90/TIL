# 1. express-generator, npm scripts, bin/www
* [express-generator](https://github.com/expressjs/generator) - express를 쉽게 만들어 주는것
  * 설치
  ```
  npm install -g express-generator
  ```

  * 사용법
  ```
  express [folder name] --view=pug
  ```

# 2. express app.js 이해하기
```js
const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.send('Hello express')
})

module.exports = app
```

# 3. 미들웨어 이해하기
* app.set - express에 대한 설정 또는 값 저장
* app.use - 미들웨어 장착
* 미들웨어
```js
app.use((req, res, next) => {
  console.log('첫 번째 미들웨어')
  next() // 다음 미들웨어로 넘긴다.
})

app.use((req, res) => {
  console.log('두 번째 미들웨어')
})
```

# 4. 유명한 미들웨어들(morgan, body-parser, cookie-parser, express-session, flash)
* 미들웨어간 순서가 중요한 경우도 있다.
```js
const express = require('express')
const app = express()
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const flash = require('connect-flash')

// req, res 표시
app.use(logger('dev'))

// req의 데이터 해석
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// cookie 파싱
app.use(cookieParser('secret code'))

// 정적 파일용 라우터. 원하는 파일이 없을때만 next
app.use(express.static(path.join(__dirname, 'public')))

// 세션을 위한 미들웨어
app.use(seesion({
  resave: false, // 세선 객체에 수정 사항이 없더라도 저장을 할지 여부
  saveUnitialized: false, // 처음의 빈 세션 객체라도 저장을 할지 여부
  secret: 'secret code',
  cookie: {
    httpOnly: true,
    secure: false,
  }
}))

// 로그인 실패했을 때, 팝업메세지 표시
app.use(flash())
```

# 5. 라우팅 미들웨어(라우터도 미들웨어다!)
* app.use(미들웨어, 미들웨어, ...) - 미들웨어를 여러개 연동 가능
```js
const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.send('hello')
})

module.exports = router
```

# 6. 404 처리 미들웨어와 에러 처리 미들웨어
* 라우터 주소가 안걸린다면?
* next(error)시 에러처리 미들웨어로 이동
* 에러처리 미들웨어는 미들웨어 끝부분에 입력
```js
// 404 error 처리
app.use((req, res, next) => {
  res.status(404).send('NOT FOUND')
})

// 500 error 처리
app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).send('SERVER ERROR')
})
```

# 7. pug 기본 문법
* node에서는 fs모듈을 이용했지만, express에서는 res.sendFile 이용
* 들여쓰기로 부모 자식 태그를 구분
* 꺽쇠를 사용하지 않음
* - 뒤에 변수를 선언 가능
* = 뒤에 변수를 사용
* html 속성은 () 안에 작성
* div는 생략가능
* 내용은 태그다음 한칸 띄고 작성
* |로 여러줄 입력 가능
* html코드를 pug로 변환예제
```html
<!DOCTYPE html>
<html>
  <head>
    <title>익스프레스</title>
    <link rel="stylesheet" href="/stylesheets/style.css">
  </head>
</html>
```

```pug
doctype html
html
  head
    -const title = '익스프레스'
    title= title
    link(rel="stylesheet", href="/stylesheets/style.css")
    style.
      p {
        color: red;
      }
  body
    div(id='zerocho' width=500)
    div#zerocho(width=500)
    #zerocho(width=500)
    span(class='express nodejs')
    span.express.nodejs
    button(type='submit') 전송
    p
      | 안녕하세요
      | 여러 줄을 입력합니다
      br
      | 태그 삽입 가능
    script.
      const message = 'pug'
```

# 8. pug 심화(조건, 반복, include, layout)
* 조건문과 반복문
```pug
doctype html
html
  head
    -const variable = true
    -const title = '익스프레스'
    title= title
    link(rel="stylesheet", href="/stylesheets/style.css")
    style.
      p {
        color: red;
      }
  body
    #header 헤더입니다.
    #zerocho(width=500)
    span.express.nodejs
    if variable
      div 참입니다
    else
      div 거짓입니다
    for i in ['사과', '배', '오렌지']
      div= i
    p
      | 안녕하세요
      | 여러 줄을 입력합니다
      br
      | 태그 삽입 가능
    #footer
      span 푸터입니다.
    script.
      const message = 'pug'
```

* layout과 include
```pug
// header.pug
#header 헤더입니다.

// footer.pug
#footer
  span 푸터입니다.

// layout.pug
include header
block content
include footer

// layout 사용
extends layout.pug
blcok content
  #zerocho(width=500)
  span.express.nodejs
```

# 9. EJS 문법
* html과 비슷
* 변수선언 
```ejs
<%= 변수명 %>
```
* 반복문
```ejs
<% for (i in ['사과', '배', '오렌지']) { %>
  <p>wellcon <%= i %></p>
<% } %>
* include는 가능
```ejs
<% include header.ejs %>
```
* pug의 layout 안됨
* ejs보다 nunjucks를 더 선호

# 10. 미들웨어 꿀팁들
* template 엔진에 렌더링될 변수들 선언
  * res.locals
  ```js
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}
  ```
* req.app.get - 데이터 공유
* res.json