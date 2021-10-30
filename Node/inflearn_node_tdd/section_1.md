## 1. 강의 소개
* 테스트를 해야하는 이유
  * 안정적인 앱을 만들기 위해
* 테스트로 얻는 이점
  * 디버깅 시간을 단축
  * 안정적인 앱
  * 재설계 시간의 단축

## 2. Node.js 설치하기
* [nodejs 공식 홈페이지](https://nodejs.org/ko/)에서 다운로드 및 설치
* 설치 확인
  ```
  node -v
  ```

## 3. package.json 파일 작성하기
* package.json - 프로젝트의 정보와 프로젝트에서 사용 중인 패키지의 의존성을 관리하는 곳
  * 생성
    ```
    npm init
    ```
  * 패키지 추가
    ```
    yarn add express jest mongoose node-mocks-http supertest -D
    ```

## 4. server.js 파일 작성하기
* `express_tdd/server.js` 작성

## 5. express.json()
* Post 요청으로 들어오는 Body 부분을 받기 위해 `express.json()` 추가
* `express.json()`은 bodyParser 모듈이다
* 사용법
```js
...
app.use(express.json())
```

## 6. route, controller 생성
* 많이 사용하는 구조
  * 복잡한 애플리케이션
    * `Routers 폴더`
      * 각 route 파일들
    * `Controllers 폴더`
      * 각 controller 파일들

  * 간단한 애플리케이션
    * `routes.js`
    * `Controllers 폴더`

  * 구현 방법
  ```js
  const router = express.Router()

  // 라우터 미들웨어 함수 로드
  router.get('/', (req, res) => {
    // controller 로직
  })

  // 기본앱에 라우터 모듈 마운트
  app.use('url', router module)
  ```

## 7. MongoDB 클러스터 생성
* 몽고 DB 회원가입 후 Cluster 생성
  * 한국은 무료버전이 없어서, 싱가폴 선택
  * 클러스터 티어 설정
  * 클러스터 이름 설정
* MongoDB 유저 생성
  * 클러스터에서 connect 클릭
  * 이름과 비밀번호 입력 후, 유저 생성

## 8. 몽구스 Model, Schema 생성
* 몽구스(mongoose)란?
  * 몽고DB 사용을 위한 다양한 기능을 추가하고 몽고 DB를 더 편리하게 이용하기 위해서 사용하는 모듈
  * 몽구스를 이용해서 데이터를 만들고 스키마를 만들고, 스키마로 모델을 만듬
* 몽고DB는 JSON 형식으로 되어있으며, Javascript로 접근하기 위해 몽구스가 Model Class(Collection)와 Model Instance(Documents)를 제공해줌
* Schema란?
  * 문서(Document)의 구조, 기본값, 유효성 검사등을 정의하는 곳
* Model이란?
  * 레코드 생성, 쿼리, 업데이트, 삭제 등을 위한 데이터베이스 인터페이스 제공

## 9. 단위 테스트 ?
* 단위(Unit) 테스트란?
  * 단위 테스트는 개발자가 수행하고 자신이 개발 한 코드 단위(모듈, 구성요소)를 테스트 합니다. 소스 코드의 개별 단위를 테스트하여 사용할 준비가 되었는지 확인하는 테스트 방법입니다. 개발 라이프 사이클의 초기 단계에서 버그가 식별되므로 버그 수정 비용을 줄이는 데 도움이 됩니다. 간단하게 생각하면 메소드를 테스트하는 또 다른 메소드라고 생각하시면 됩니다.

* 단위 테스트의 조건
  * 독립적이어야 하며, 어떤 테스트도 다른 테스트에 의존하지 않아야 합니다
  * 격리 되어야 합니다. Ajax, Axios 등 테스트 대상이 의존하는 것을 다른 것으로 대체해야 합니다

* 왜 단위 테스트를 하나요?
  * 프로그램이 크고, 메모리가 많이 들고, 다른 리소스(데이터 베이스)가 필요한 경우 로컬 환경에서 쉽게 코드를 실행시켜보기 어렵다. 이런 프로그램을 개발하는 개발자들은 유닛테스트를 만들어서 빠르게 자신의 코드가 정상적으로 작동하는지 확인 할 수 있다
  * 종속성이 있는 다른 클래스들에서 버그가 나는것을 방지하기 위해서 입니다

## 10. Jest ?
* Jest란 무엇인가요?
  * 페이스북에서 만든 테스팅 프레임워크
  * 최소한의 설정으로 동작하며, 테스트 케이스를 만들어서 앱의 코드가 잘 돌아가는지 확인 해줌
  * 단위 테스트를 위해서 이용

* Jest 시작하기
  * 설치
    ```
    yarn add jest -D
    ```
  * package.json에 script 추가
    ```
    {
      ...,
      "scripts: {
        ...,
        "test": "jest"
      }
    }
    ```

  * Jest가 Test 파일을 찾는 방법
    * `*.test.js` or `*.spec.js` or `tests` 폴더 하위 파일들

  * 단위 테스트 - `*.test.js`
  * 통합 테스트 - `*.test.int.js`
