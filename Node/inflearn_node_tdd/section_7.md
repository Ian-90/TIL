## 1. Delete 시작
* 해야 할 일
  * DB에 특정 Product 데이터 삭제

## 2. deleteProduct 단위 테스트 작성 (1)
* 해야 할 일
  * deleteProduct 함수를 호출할 때 Product Model의 findByIdAndDelete 메소드 호출
  * 데이터 삭제 성공 후, 성공 status와 deleted된 데이터를 클라이언트로 전송
