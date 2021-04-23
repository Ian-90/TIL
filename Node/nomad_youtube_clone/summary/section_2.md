## 1. Your First NodeJS Project
* package.json
  * 생성 - `yarn init`

* index.js 생성

## 2. Installing Express
* cli 실행 - node index.js
* package.json에 scripts 추가
```json
{
  ...,
  "scripts": {
    "start": "node index.js"
  }
}
```
* express 설치 - `yarn add express`
* dependencies - 프로젝트가 동작하기 위한 패키지들
* devDependencies - 개발자에게 필요한 패키지들

## 3. Understanding Dependencies
* package.json의 기존 dependencies들 설치 - `yarn`
* yarn.lock - 다른사람이 같은버전의 패키지를 설치하기 위해 생성되는 파일

## 4. The Tower of Babel
* Babel
  * 정의 - 자바스크립트 컴파일러
  * 사용이유 - 최신 자바스크립트문법을 사용하기 위해서
  * @babel/preset-env - 최신 자바스크립트 구문을 사용하게 도와주는 것

## 5. Nodemon
* babel 컴파일 스크립트를 위해 @babel/node 설치 - `yarn add -D @babel/node`
* nodemon - 우리가 만든 파일이 수정되는걸 감시해주는 패키지
  * 설치 - `yarn add -D nodemon`
  * 명령어 추가
  ```json
  {
    ...,
    "scripts": {
      "dev": "nodemon --exec babel-node index.js"
    }
  }
  ``