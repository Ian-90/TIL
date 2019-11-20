# section 2. Request, Response 처리 기본

## 1. POST 요청처리

### 간단한 개념

- POST - 서버로 데이터를 보낼 때 쓰는 방법이다. 서버에서는 데이터를 받을 때 body parser가 필요하다. request의 본문을 해석해주는 미들웨어이다.
  그러나 [express 4.16](http://expressjs.com/en/4x/api.html#express.json)부터는 express에 내장되어있다. 물론 다른 형식을 해석해서 쓰려면 body-parser를 사용해야 한다.

### Project

- [body-parser 설치](https://github.com/expressjs/body-parser)

```bash
yarn add body-parser --dev
```

- body-parser 사용법

```javascript
// app.js
...
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
```

## 2. View engine을 활용한 응답처리

### 간단한 개념

- ejs view template - 응답을 줄 때, 데이터와 html을 결합해서 주는 방식.
- [express template engine](http://expressjs.com/en/guide/using-template-engines.html)

### Project

- [ejs 설치](https://github.com/mde/ejs)

```bash
yarn add ejs --dev
```

- [ejs 사용법](https://github.com/mde/ejs#example) - 공식문서 참조
