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
* `/test/intergration/prouducts.int.test.js`에 구현
