// socket.ui
const SocketIO = require('socket.io')
const axios = require('axios')
const cookieParser = require('cookie-parser')

module.exports = (server, app, sessionMiddleware) => {
  const io = SocketIO(server, { path: '/socket.io' })
  // express 변수 저장 방법
  app.set('io', io)
  // 네임스페이스
  const room = io.of('/room')
  const chat = io.of('/chat')

  // 익스프레스 미들웨어를 Socket.IO에서 쓰는 방법
  const wrap = middleware => (socket, next) => middleware(socket.request, {}, next);
  chat.use(wrap(cookieParser(process.env.COOKIE_SECRET)));
  chat.use(wrap(sessionMiddleware));

  room.on('connection', (socket) => {
    console.log('room 네임스페이스에 접속')
    socket.on('disconnect', () => {
      console.log('room 네임스페이스 접속 해제')
    })
  })

  chat.on('connection', (socket) => {
    console.log('chat 네임스페이스에 접속')
    const req = socket.request
    const { headers: { referer } } = req
    const roomId = referer
      .split('/')[referer.split('/').length - 1]
      .replace(/\?.+/, '')
    socket.join(roomId)
    socket.to(roomId).emit('join', {
      user: 'system',
      chat: `${req.session.color}님이 입장하셨습니다.`,
    })
    socket.on('disconnect', () => {
      console.log('chat 네임스페이스 접속 해제')
      socket.leave(roomId) // 방 나가기

      // 방에 인원이 하나도 없으면 방 삭제
      const currentRoom = socket.adapter.rooms[roomId]
      const userCount = currentRoom ? currentRoom.length : 0
      if (userCount === 0) {
        // 라우터를 통하여 디비를 조작하면 코드가 깔끔.
        axios.delete(`http://localhost:8005/room/${roomId}`)
          .then(() => {
            console.log('방 제거 요청 성공')
          })
          .catch((error) => {
            console.error(error)
          })
      } else {
        socket.to(roomId).emit('exit', {
          user: 'system',
          chat: `${req.session.color}님이 퇴장하셨습니다.`,
        })
      }
    })
  })
  // io.on('connection', (socket) => {
  //   const req = socket.request
  //   const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
  //   console.log('새로운 클라이언트 접속', ip, socket.id, req.ip)
  //   socket.on('disconnect', () => {
  //     console.log('클라이언트 접속 해제', ip, socket.id)
  //     clearInterval(socket.interval)
  //   })

  //   socket.on('error', (error) => {
  //     console.error(error)  
  //   })
  
  //   socket.on('reply', (data) => {
  //     console.log(data)
  //   })

  //   socket.interval = setInterval(() => {
  //     socket.emit('news', 'Hello Socket.IO')
  //   }, 3000)
  // })
}

// ws 패키지
// const WebSocket = require('ws')

// module.exports = (server) => {
//   const wss = new WebSocket.Server({ server })

//   wss.on('connection', (ws, req) => {
//     const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
//     console.log('클라이언트 접속', ip)
//     ws.on('message', (message) => {
//       console.log(message)
//     })

//     ws.on('error', (error) => {
//       console.error(error)
//     })

//     ws.on('close', () => {
//       console.log('클라이언트 접속해제', ip)
//       clearInterval(ws.interval)
//     })

//     const interval = setInterval(() => {
//       if (ws.readyState === ws.OPEN) {
//         ws.send('서버에서 클라이언트로 메세지를 보냅니다.')
//       }
//     }, 3000)
//     // 이용자가 접속종료시 해제하기 위해서
//     ws.interval = interval
//   })
// }
