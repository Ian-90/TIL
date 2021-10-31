## 1. Create Product 함수 생성
* 해야 할 일
  * DB에 Product 저장
* 테스트 작성
* 테스트에 맞는 함수 구현

## 2. Create Method로 데이터 저장하기
* 해야 할 일
  * createProduct 함수를 호출할 때, Product Model의 Create 메소드가 호출이 되는지 확인
* 테스트 작성
  * 직접적으로 모델에 영향을 받으면 안되기 때문에 mock 함수 작성
* 테스트에 맞는 함수 구현

## 3. Node.js 앱을 테스트하기 위한 Jest 설정
* mongoose는 jsdom을 지원하지 않기 때문에, jest의 테스트 기본환경을 node로 변경
  * `jest.config.js`
    ```js
    module.exports = {
      ...,
      testEnvironment: 'node'
    }
    ```

## 4. node-mocks-http
* 단위 테스트 작성
  * 몽구스 모델을 이용해서 데이터를 저장할 때, `req.body`를 이용해야 하기 때문에, 테스트에도 req 객체가 필요. 단위 테스트에서 req 객체를 얻기위해서 `node-mocks-http` 모듈을 사용.
  * http 객체 얻는 법
    ```js
    req = httpMocks.createRequest()
    res = httpMocks.createRespones()
    ```

## 5. beforeEach
* beforeEach - 여러 개의 테스트에 공통된 코드가 있다면, 반복을 줄여 줄 수 있는 테스트 함수

## 6. 상태 값 전달
* 해야 할 일
  * DB에 데이터를 저장했으니 결과값을 클라이언트에게 보내줘야 하기 때문에, 상태 결과 값을 보내줘야 함
* 단위테스트 작성
  * 데이터 Create를 성공하면 201 Status를 Response로 보냄

## 7. 결과 값 전달
* 해야 할 일
  * 새로 생성된 데이터를 결과값으로 보내주기
* 단위테스트 작성
  * 가짜 함수가 어떠한 결과값을 반환할지 직접 알려줄 때 `mockReturnValue` 를 이용
