## 1. Building the Backend
* 백엔드를 배포하도록 babel-cli를 이용하여 환경 변경

## 2. Building the Backend part Two
* view는 옮기지 않아도 된다.
* 백엔드 코드 빌드

## 3. Building the Frontend
* webpack을 development와 production build 구분

## 4. Deploying to Heroku
1. heroku 가입
2. dashboard에서 app 추가 및 지역 추가
3. 백엔드 서버를 업로드하는 방법
  * Heroku Git
    * Heroku cli 설치 필요
    * 설치 후 heroku login으로 확인 가능
    * heroku는 나의 git history만 보기 때문에 코드변경시 항상 커밋을 해야한다.
    * `heroku logs --tail` - 실시간 서버 로그 보기
