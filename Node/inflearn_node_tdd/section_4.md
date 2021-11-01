## 1. 통합 테스트란?
* 통합 테스트
  * 모듈을 통합하는 단계에서 수행하는 테스트
  * 단위 테스트를 먼저 수행하여 모듈들이 잘 작동되는 것을 확인했다면, 이 모듈들을 연동해서 테스트를 수행

* 통합 테스트를 하는 이유
  * 모듈들의 상호 작용이 잘 이루어지는지 검증하기 위해서
  * 통합하는 과정에서 발생할 수 있는 오류를 찾기 위해서

* Supertest
  * nodejs http 서버를 테스트하기 위해 만들어진 모듈

* Supertest를 이용해서 통합 테스트 구현하는 법
  ```js
  const request = require('supertest')
  const express = require('express')

  const app = express()

  app.get('/user', (req, res) => {
    res.status(200).json({ name: 'john'})
  })

  request(app)
    .get('/user')
    .expect('Content-Type', /json/)
    .expect('Content-Length', '15')
    .expect(200)
    .end((err ,res) => {
      if (err) throw err
    })
  ```

## 2. 통합 테스트 작성하기
* `/test/intergration/prouducts.int.test.js`에 첫번째 테스트 구현

## 3. 에러 처리를 위한 통합 테스트 작성하기
* `/test/intergration/prouducts.int.test.js`에 두번쨰 테스트 구현

## 4. Express.js 에러 처리에 대해서
* express 에러처리
  * 동기 요청 에러처리
  ```js
  // 미들웨어에 에러가 발생하면 이 에러를 에러 handler로 보내준다
  app.get('*', (req, res, next) => {
    throw new Error('woops')
  })
  // 위에 에러가 발생했기 때문에 이 미들웨어는 생략
  app.get('*', (req, res, next) => {
    console.log('this will not print')
  })
  // 첫번째 미들웨어에서 발생한 에러 메세지를 이곳에서 처리
  app.use('*', (error, req, res, next) => {
    res.json({ message: error.message })
  })
  ```

  * 비동기 요청 에러처리 - next에 에러를 넣어준다
  ```js
  app.get('*', (req, res, next) => {
    setImmediate(() => next(throw new Error('woops')))
  })

  app.use('*', (error, req, res, next) => {
    res.json({ message: error.message })
  })
  ```

  * 에러처리는 미들웨어에서 가장 하단에 있어야 한다.