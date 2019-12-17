# section 5. Router 개선 - 모듈화

## 1. Routing 모듈화, 2. Routing 모듈화 2(DB연결부분)

### 간단한 개념

- 기존에는 라우터를 만들 때 메서드와 주소별로 분기 처리를 하느라 코드가 매우 복잡. 다른파일로 분리해서 관리하면 좋음.
  - [express.Router](https://expressjs.com/ko/4x/api.html#express.router)를 활용하자.

### Project

- [Router](https://expressjs.com/ko/4x/api.html#router) 사용예시

```javascript
const app = express();
const router = express.Router();
// invoked for any requests passed to this router
router.use(function(req, res, next) {
  // .. some logic here .. like any other middleware
  next();
});

// calendar.js
router.get("/calendar", function(req, res, next) {
  // ..
});

// only requests to /calendar/* will be sent to our "router"
app.use("/calendar", calendar);
```

## 3. Routing 리팩토링

### 간단한 개념

- index.js에서 router를 모두다 처리한다. 그러면 app.js는 깔끔해지고, 미들웨어만 처리하게 된다.
