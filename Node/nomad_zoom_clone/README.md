# NOMADCODERS
[zoom 클론코딩](https://nomadcoders.co/noom)

Zoom Clone using NODEJS, WebRTC and Websockets

## 1. CHAT WITH WEBSOCKETS

### 1.1 HTTP vs WebSockets
![http와websocket](./assets//1-1.png)
* HTTP
  * 유저 request를 보내면 서버가 response를 보냄
  * stateless - 백엔드는 유저를 기억하지 못함. response를 보낸 후 유저를 잊어버림.

* WebSockets
  * http와는 전혀 다른 프로토콜
  * 브라우저가 서버로 websocket request를 보내면 서버가 요청을 받거나 거절함. 서버가 받아들이면 연결되서 계속 유저를 기억할 수 있음. 브라우저나 서버가 서로에게 어느때나 메세지를 보낼 수 있음.
  * 양방향 통신

### 1.2 Websockets in NodeJS
* [ws](https://www.npmjs.com/package/ws)
  * websocket의 core
  * 설치
  ```
  yarn add ws
  ```

### 1.3 WebSocket Events
* [MDN WebSocket](https://developer.mozilla.org/ko/docs/Web/API/WebSocket)