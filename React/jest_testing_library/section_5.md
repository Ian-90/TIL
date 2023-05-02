## 1. Mock Service Worker와 Handler 소개
* MSW 사용 이유
  * 기능 테스트에서 서버 응답에 기반한 테스트 조건을 설정하기 떄문에, 서버에 대한 응답을 MSW를 이용
  * POST 요청에 따른 값을 반환하고 싶을 때 핸들러 함수로 가능
  * 쿠키, 이미지 데이터 등 여러 가지를 처리 가능

* MSW Setup
  1. 설치
    ```
    yarn add msw
    ```
  2. Define mocks - create handler(src/mocks/handlers.js)
    * 특정한 URL과 라우트에 무엇을 반환할지 결정하는 함수
  3. Integrate - create test server(src/mocks/server.js)
    * 요청을 처리하여 응답을 보낼 서버를 생성
  4. make sure test server listens during all tests(setupTest.js)
    * 테스트 전에 서버가 요청을 리스닝하도록 설정
  5. reset after each test

## 2. await findBy
* 페이지에서 비동기 작업이 있을 때, 테스트에서 `await`과 `findBy`를 사용해야 한다.

## 3. Jest Debugging Tools
* 여러 파일중 1개의 파일만 실행하기
  * p 옵션을 이용하여 파일명 입력하여 실행

* 한개의 파일에서 여러 테스트중 1개의 테스트만 실행하기
  * `it.only`를 붙여서 테스트 실행
  * 실행하고 싶은 테스트 외 나머지에 `it.skip`을 붙여서 실행

## 4. waitFor
* 테스트에서 네트워크 속도 상관없이 race condition에 영향을 받지 않도록 하기 위해 사용
