# 1. npm 설명과 패키지 만들기(package.json)
* 패키지 - 다른사람들이 만든 모듈(프로그램)
* package.json 생성
```
npm init
```

# 2. 패키지 설치하기
* 다른 패키지 설치
```
npm install [pkg name]
```
* 하나의 패키지를 설치해도, 그패키지가 사용하던 패키지들도 같이 설치된다.
* --save-dev - 배포환경이 아닌 개발환경에서만 사용
* 여러개 설치시 패키지 명을 띄워쓰기로 입력
```
npm i -D jest nodemon
```

# 3. SemVer 버전 이해하기
* semantic versioning - major.minor.patch
  * major - 대규모 변화
  * minor - 신기능 추가
  * patch - 버그 수정
* ^(minor, patch 업데이트)
* ~(patch 업데이트)
* 부등호 - 부등호의 의미
* X.X.X - 고정된 버전

# 4. npm 명령어 알아보기
* 패키지 최신정보 - 패키지의 업데이트 할 수 있는 버전을 알려줌
```
npm outdated
```
* 패키지 업데이트 - 패키지 버전 업데이트. 패키지 명을 입력하지 않으면, 설치된 모든것을 업데이트
```
npm update [pkg name]
```
* 패키지 제거
```
npm remove [pkg name]
```
* 패키지 검색
```
npm search [pkg name]
```
* 패키지의 정보
```
npm info [pkg name]
```
* 자신의 패키지의 dependency 파악
```
npm ls [pkg name]
```
* npm login
```
npm adduser
```
* npm user 정보
```
npm whoami
```
* 버전
```
npm version patch
npm version minor
npm version major
```

# 5. 패키지 배포하기
* npm login
* npm publish
* 24시간안에 패키지 지우기
```
npm unpublish
```