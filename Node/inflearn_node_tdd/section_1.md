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
