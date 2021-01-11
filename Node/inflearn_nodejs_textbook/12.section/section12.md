# 1. 웹소켓 설명과 프로젝트 세팅
* 많은 api 요청을 하면 비효율적이기 때문에, 웹소켓을 활용
* 웹소켓 - 양방향 실시간 통신 기술
* 프로젝트 코드는 노드교과서 깃헙 참고
* 웹소켓을 쓸 때, ws나 websocket.io 모듈을 사용
* http와 ws는 포트를 공유해서 따로 포트 연결할 필요가 없다.

# 2. ws 패키지
* 프록시를 거치기전 아이피 - `req.headers['x-forwarded-for']`
* 최종 아이피 - `req.connection.remoteAddress`
* 웹소켓 연결상태
  * CONNECTING - 연결 중
  * OPEN - 연결 수립
  * CLOSING - 종료중
  * CLOSED - 종료
* 프론트에서는 웹소켓 사용시 프로토콜만 ws나 wss(https를 쓰는 경우)로 변경
* 다른 브라우저로 접속하면 서버에서는 다른사람이 접속했다고 인식

# 3. Socket.IO 패키지
* 설치 - `yarn add socket.io`
* socket.js에서 기존 ws패키지를 socket.io로 변경
* Socket.IO에서는 메세지 이벤트를 키와 값으로 구분 가능
* Socket.IO는 처음에 HTTP 요청으로 웹소켓 사용 가능 여부를 물음

# 4. 실시간 GIF 채팅방 DB & pug 세팅
* mongoose multer axios color-hash(사용자 이름에 색깔을 넣어주는 패키지) 설치
* schemas 구현 및 연결
* 필요한 pug 파일(layout, main, room, chat) 생성

# 5. Socket.IO 네임스페이스
* 네임스페이스로 실시간 데이터가 전달될 주소를 구별 할 수 있다. 기본 네임스페이스는 `/`이다.
* 네임스페이스가 필요한 이유는 실시간으로 데이터를 주고 받을 때, 필요한 데이터만 소켓으로 받기 위함이다

# 6. color-hash, app.set, io,use
* color-hash - 익명 사용자를 컬러로 구분하기위한 패키지
* express 변수 저장 방법 - `app.set('변수명', 변수)`

# 7. 실시간 GIF 채팅방 라우터 구현
* routes/index에 라우터 구현

# 8. 실시간 채팅 구현
* routes/index에 `router.delete('/room/:id')` 구현
* routes/index에 `router.post('/room/:id/chat')` 구현

# 9. 실시간 이미지 업로드 구현
* chat.pug에 gif를 formData를 이용하여 전송하도록 구현
* router/index에 `fs.readdir('upload', ...)` 구현
* app.js에 미들웨어 연결