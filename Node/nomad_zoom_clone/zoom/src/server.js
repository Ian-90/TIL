import express from 'express'
import http from 'http'
// import WebSocket from 'ws'
import SocketIO from 'socket.io'

const app = express()

app.set('view engine', 'pug')
app.set('views', __dirname + '/views')
app.use('/public', express.static(__dirname + '/public'))
app.get('/', (req, res) => res.render('home'))
app.get('/*', (req, res) => res.redirect('/'))

const handleListen = () => console.log('Listening on http://localhost:3000')

const server = http.createServer(app)
const io = SocketIO(server)

io.on('connection', socket => {
  socket['nickname'] = 'Anonymous'

  socket.onAny((event) => {
    console.log(`Socket Event: ${event}`)
  })

  socket.on('enter_room', (roomName, done) => {
    socket.join(roomName)
    done()
    socket.to(roomName).emit('welcome', socket.nickname)
  })

  socket.on('disconnection', () => {
    socket.rooms.forEach(room => socket.to(room).emit('bye', socket.nickname))
  })

  socket.on('new_message', (msg, roomName, done) => {
    socket.to(roomName).emit('new_message', `${socket.nickname}: ${msg}`)
    done()
  })

  socket.on('nickname', nickname => socket['nickname'] = nickname)
})

// const wss = new WebSocket.WebSocketServer({ server })
// 같은 메세지를 여러명에게 보내기 위해 사용(실제로는 DB연동이 필요)
// const sockets = []

// wss.on('connection', (socket) => {
//   sockets.push(socket)
//   socket['nickname'] = 'Anon'
//   console.log('Connected to Browser')

//   socket.on('message', (msg) => {
//     console.log(msg.toString())
//     const message = JSON.parse(msg)
//     switch(message.type) {
//       case "new_message":
//         sockets.forEach(aSocket => aSocket.send(`${socket.nickname}: ${message.payload.toString()}`))
//       case "nickname":
//         socket['nickname'] = message.payload
//     }
//   })

//   socket.on('close', () => {
//     console.log('Disconnected from the Broswer')
//   })
// })

server.listen(3000, handleListen)
