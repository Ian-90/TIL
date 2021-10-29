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
