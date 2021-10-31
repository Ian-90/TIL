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