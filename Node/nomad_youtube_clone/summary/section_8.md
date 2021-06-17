## 1. Edit Profile GET
* getEdit 컨트롤러와 edit-profile.pug 구현

## 2. Protector and Public Middlewares
* 로그인하지 않은 사람들이 로그인해서 볼 수 있는 페이지를 막기 위해 protectorMiddleware 구현
```js
router.route('url').all('공통 미들웨어 함수')
```

## 3. Edit Profile POST part One
* postEdit 컨트롤러 구현