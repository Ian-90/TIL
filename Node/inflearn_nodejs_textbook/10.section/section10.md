# 1. SMS(NodeBird) 프로젝트 구조 세팅
1. package.json 생성
2. 데이터베이스 패키지 설치
```
yarn add mysql2 sequelize sequelize-cli
```
3. 시퀄라이즈 초기화(데이터베이스 - 테이블 - 로우)
```
npx sequelize init
```

4. 데이터베이스 생성
```
npx sequelize db:create
```

5. nodemon 설치
```
yarn add nodemon --dev
```

6. 나머지 패키지 설치 후 app.js 셋팅

# 2. dotenv 사용하기
* nodejs에서 환경변수 설정을 도와주는 패키지
* 설치
```
yarn add dotenv
```
* 사용법 - app.js에 적용. 아래 호출후 process.env.[환경변수 이름]으로 접근 가능
```js
require('dotenv').config()
```

# 3. 기본 라우터와 pug 파일 세팅
* 라우터 생성
  1. routes 폴더 및 app.js에 연동
* pug 생성 - 책 레포에서 복사

# 4. 모델/테이블 만들기
* models에 파일별로 테이블 생성
  * user
  * post
  * hashtag
* provider: local vs kakao
* timestamps: 생성일, 수정일
* paranoid: 삭제일(복구용)

# 5. 다대다 관계 이해하기
* 게시글 하나에 해시태그 여러개
* 해시태그 하나에 게시글 여러개
* 다대다 관계는 belongToMany
* through는 새로 생기는 모델에 이름을 넣어준다(매칭 테이블)
* as: 매칭 테이블 이름
* foreignKey: 상대 테이블 아이디
```
A.belongsToMany(B, { as: 'Bname', foreignKey: 'A_id' })
```

# 6. passport 세팅과 passport-local 전략
* passport 세팅
```
yarn add passport passport-local passport-kakao bcrypt
```

* bcrypt - 비밀번호를 암호화해주는 알고리즘중 하나

# 7. 회원가입 구현
* auth.js - join router

# 8. 로그인 로그아웃 구현
* auth.js - login, logout router

# 9. passport serializeUser/deserializeUser
* page.js - passport.serializeUser/deserializeUser
* req.login시에 serialzeUser 호출 -> 유저 정보 중 아이디만 세션에 저장
* 매 요청 시마다 passport.session() 여기서 deserializeUser가 실행. user.id를 DB조회 후 req.user로
* deserializeUser는 모든 요청에 실행되기 때문에 DB 조회를 캐시애서 효율적으로 만들어야 한다.

# 10. 카카오 로그인하기(passport-kakao)
* clientID - 카카오앱 아이디
* callbackURL - 카카오 리다이렉트 주소
* 카카오 rest api 키 이용

# 11. 카카오 앱 등록 & 실행 & 디버깅
* 카카오 개발자 사이트에서 Redirect Path에 /auth/kako/callback 라우터 등록
* 사용자관리 on -> 프로필 정보 이메일 on

# 12. multer로 이미지 업로드하기
* 프론트에서 이미지를 전송시 multipart/form-data 이용
* 백엔드에서는 해석하기 위해 multer를 사용
* 파일명 중복을 막기 위해 현재시간 파일명에 포함
* single - 이미지 하나(필드명)
* array - 이미지 여러 개(단일 필드)
* fields - 이미지 여러 개(여러 필드)
* none - 이미지 X

# 13. 게시글 업로드 구현하기
* post.js - router.post('/', ...) 구현
* A.getB - 관계있는 로우 조회
* A.addB - 관계 생성
* A.setB - 관계 수정
* A.removeB - 관계 제거

# 14. 해시태그 검색 & 팔로잉 구현 & 마무리
* 해시태그 검색 - post.js의 router.get('/hashtag', ...)
* 팔로잉 - user.js router.post('/:id/follow', ...)