## 1. Apollo 서버 구축하기
* `ex_2-1` 폴더에 구현
* typeDef
  * GraphQL 명세에서 사용될 데이터, 요청의 타입 지정
  * `gql(template literal tag)로 생성됨
* resolvers
  * 서비스의 액션들을 함수로 지정
  * 요청에 따라 데이터를 반환, 입력, 수정, 삭제
* GraphQL Playground
  * 작성한 GraphQL type, resolver 명세 확인
  * 데이터 요청 및 전송 테스트

## 2. Query 구현하기
* `ex_project` 폴더에 구현
  * typeDef에 명세 타입 추가
  * resolvers에 요청에 따른 데이터 반환 추가
