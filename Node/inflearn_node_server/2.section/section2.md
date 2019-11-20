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
