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

## 3. JSON 활용한 Ajax처리

### 간단한 개념

- [AJAX](https://developer.mozilla.org/ko/docs/Web/Guide/AJAX/Getting_Started) - 비동기 자바스크립트와 XML (Asynchronous JavaScript And XML)을 말한다. 간단히 말하면, 서버와 통신하기 위해 XMLHttpRequest 객체를 사용하는 것을 말합니다. JSON, XML, HTML 그리고 일반 텍스트 형식 등을 포함한 다양한 포맷을 주고 받을 수 있습니다.

### Project

- form에서 AJAX 해보기
  - [XMLHttpRequest 객체 이용](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest)
  ```javascript
  const xhr = new XMLHttpRequest();
  xhr.open("POST", url);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(JSON.stringify(sendData));
  xhr.addEventListener("load", () => {
    const result = JSON.parse(xhr.responseText);
    if (result.result !== "ok") return;
    document.querySelector(".result").innerHTML = result.email;
  });
  ```

* 서버에서 처리 - [app.post](https://expressjs.com/ko/4x/api.html#app.post.method) 이용

```javascript
app.post("/", function(req, res) {
  res.send("POST request to homepage");
});
```
