## 1. Read 시작
* 해야 할 일
  * DB에서 Product 데이터를 가져오는 것
  * Product를 가져오는 함수 생성
* 단위 테스트 작성
  * 타입이 함수인 테스트 추가

## 2. getProducts 단위 테스트 작성 (1)
* 해야 할 일
  * getProducts 함수를 호출할 때 Product Model의 Find 메소드가 호출되는지 확인
* VSCode 익스텐션 추천
  * jest runner - 원하는 테스트만 부분 테스트 가능

## 3. getProducts 단위 테스트 작성 (2)
* 해야 할 일
  * DB에서 Product 데이터를 가져왔을 때, 200의 Status 값을 전달
  * DB에서 가져온 Product 데이터를 클라이언트에 전달

## 4. getProducts 에러 처리 단위 테스트 작성
* `/test/unit/product.test.js`에 error handle 테스트 추가
