## 1. 서버 구성요소 모듈화
* `typeDef`와 `resolver`를 모듈화
* 예제코드 3-1를 확인해보기

## 2. GraphQL의 기본 타입들
* 스칼라 타입
  * GraphQL 내장 자료형
  ```
  type EquipmentAdv {
      id: ID!
      used_by: String!
      count: Int!
      use_rate: Float
      is_new: Boolean!
  } 
  ```
  
  | type | description |
  |------|-------------|
  | ID | 기본적으로는 String이나, 고유 식별자 역할임을 나타냄|
  | String | UTF-8 문자열 |
  | Int | 부호가 있는 32비트 정수 |
  | Float | 부호가 있는 부동소수점 값 |
  | Boolean | 참 / 거짓 |

  * ! 붙인 것들 - Non Null. null을 반환할 수 없음

* 열거 타입
  * 미리 지정된 값들 중에서만 반환

* 리스트 타입
  * 특정 타입의 배열을 반환

* 객체 타입
  * 사용자에 의해 정의된 타입들

## 3. 유니언과 인터페이스
* 유니언 - 타입 여럿을 한 배열에 반환하고자 사용
* 인터페이스
  * 유사한 객체 타입을 만들기 위한 공통 필드 타입
  * 추상 타입 - 다른 타입에 implement 되기 위한 타입

## 4. 인자와 인풋 타입
* 인자와 인풋 타입을 통해 데이터를 필터링
