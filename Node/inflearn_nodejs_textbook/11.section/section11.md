# 1. API 서버의 개념과 필요성
* api - 남이 만든 코드를 사용 할 수 있게 해주는 창구

# 2. NodeBird-API 프로젝트 세팅하기
1. npm init으로 package.json 생성
2. 10강에서 사용한 패키지 설치 및 uuid 설치
3. 10강의 config, models, passport, routes, .env 재사용
4. app.js 생성
5. 사용자에게 발급할 시크릿키와 도메인주소를 저장할 모델을 model/domain.js 구현 및 model/index.js에 연동
6. view/login.pug 구현
7. index router 구현

# 3. clientSecret과 UUID
* 도메인 주소는 프론트 요청시, 클라이언트시크릿은 서버 요청 시 검사

# 4. JWT와 jsonwebtoken 패키지
* jsonwebtoken 패키지 설치
* .env에 JWT_SECRET(남한테 노출이 되면 안됨) 추가
* clientSecret은 프론트에서 사용하면 해킹당하기 때문에, 프론트나 서버 둘 다에서 인증용도로 사용하기 위해 jwt 사용
* jsonwebtoken을 이용하여, routes/middlewares에 verifyToken 및 routes/v1 코드 작성
* API서버의 응답형식을 하나로 통일해주는게 좋으며, 에러코드를 고유하게 지정해서 에러가 뭔지 쉽게 알 수 있게 해주는것이 좋다.
* jwt 토큰 내용은 다 보이므로 민감한 내용은 저장하지 말아야 한다. 대신 내용을 변조 할 수없으므로 믿고 사용해도 된다.

# 5. API호출 서버 만들기
* nodebird-call 폴더 및 package.json 생성
* app.js 및 routes/index.js 생성 및 코드 구현
* nodebird-api에서 routes/v1에 test routes 작성

# 6. API 작성 및 호출하기
* nodebird-api에서 routes/v1에 `/posts/my`와 `/posts/hashtag/:title` 작성
* nodebird-call에서 routes/index에 `/mypost`와 `/search` 작성

# 7. API 사용량 제한 구현하기
* nodebird-api에서 express-rate-limit 패키지 설치
* nodebird-api의 routes/middlewares에 ratelimit 관련 코드 작성
  * windowMs - 이 시간 동안
  * max - 최대 횟수
  * delayMs - 요청 간 간격
  * handler() - 어겼을 경우 메세지
* nodebird-api의 routes/v2 작성
* router.use(middleware)로 라우터에 공통되는 미들웨어 한 번에 적용 가능

# 8. CORS 해결하기
* CORS(cross origin resource sharing) - 프론트에서 다른 오리진의 서버로 요청을 보내면 에러 발생
* 해결방법
  * Access-Control-Allow-Origin 헤더를 응답 헤더에 넣어주면 된다.
  * 강의에서는 cors 패키지 활용. 왜냐하면 자동으로 Access-Control-Allow-Origin 헤더를 응답 헤더에 넣어준다.