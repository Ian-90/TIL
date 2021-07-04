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

## 5. MongoDB Atlas
1. MongoDB Atlas 계정 생성
2. Create Project
3. cluster 추가
4. free만 이용하기!
5. 아시아면 싱가포르 지역 선택
6. 평생무료 선택
7. IP 주소 추가
8. DB 유저 생성
9. application을 선택하면 DB_URL이 생성됨
10. heroku setting에서 config Vars로 환경변수 추가
  * DB_URL 추가
  * COOKIE_SECRET 추가

## 6. Environment Variables
* heroku가 생성해준 포트로 연결해야됨
* 깃헙 로그인을 위해 setting에 GH_CLIENT, GH_SECRET를 환경변수 추가

## 7. Github and AWS S3 part One
* Github 로그인 callback URL 변경
* 백엔드 서버를 업로드하는 방법
  * Github
    * repository 추가 및 connect
    * git에 push할 때 마다 재배포
    