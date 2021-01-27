# 1. 실시간 경매 시스템 프로젝트 세팅1 ~ 2
* 필요한 패키지 설치
* sequelize init
* 모델 생성(auction, good, user)
* db 생성 - sequelize db:create
* passport 설치 및 세팅 (9장과 동일)
* routes 세팅(auth.js와 middlewares도 9장과 거의 동일)
* 결론은 [환경셋팅](https://github.com/Ian-90/nodejs-book/tree/old/ch12/12.1/node-auction) 다운로드

# 2. 서버센트이벤트(SSE)
* SSE - 한 번 열결을 하면 서버에서 계속 데이터를 내려받는 기술
* sse와 socket.io 설치 및 sse.js와 socket.js 생성
```
yarn add sse socket.io
```
* 클라이언트의 데이터를 되도록 믿지말자.

# 3. 입찰 라우터 구축하기
* aution.pug 추가
* `/good/:id` get 라우터 추가
* `/good/:id/bid` post 라우터 추가

# 4. 스케줄링 구현하기
* 남은시간이 지난 후 낙찰되도록 타이머 구현
* 예약 이벤트들을 처리하기 위해 node-schedule을 사용
* routes/index에서 node-schedule require
* sql 직접 사용시 sequelize.literal 이용
* list.pug 추가
* `/list` get 라우터 추가
