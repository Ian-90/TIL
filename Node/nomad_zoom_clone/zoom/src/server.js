import express from 'express'
import http from 'http'
// import WebSocket from 'ws'
import SocketIO, { Server } from 'socket.io'
import { instrument } from '@socket.io/admin-ui'

const app = express()

app.set('view engine', 'pug')
app.set('views', __dirname + '/views')
app.use('/public', express.static(__dirname + '/public'))
app.get('/', (req, res) => res.render('home'))
app.get('/*', (req, res) => res.redirect('/'))

const handleListen = () => console.log('Listening on http://localhost:3000')

const server = http.createServer(app)
// const io = SocketIO(server)
const io = new Server(server, {
  cors: {
    origin: ['https://admin.socket.io'],
    credentials: true,
  }
})

instrument(io, {
  auth: false,
})

function publicRooms() {
  const {
    sockets: {
      adapter: { sids, rooms },
    }
  } = io
  const publicRooms = []
  rooms.forEach((value, key) => {
    if (sids.get(key) === undefined) {
      publicRooms.push(key)
    }
  })
  return publicRooms
}

function countRoom(roonName) {
  return io.sockets.adapter.rooms.get(roonName)?.size
}

io.on('connection', socket => {
  socket['nickname'] = 'Anonymous'

  socket.onAny((event) => {
    console.log(io.sockets.adapter)
    console.log(`Socket Event: ${event}`)
  })

  socket.on('enter_room', (roomName, done) => {
    socket.join(roomName)
    done()
    socket.to(roomName).emit('welcome', socket.nickname, countRoom(roomName))
    io.sockets.emit('room_change', publicRooms())
  })

  socket.on('disconnection', () => {
    socket.rooms.forEach(room => socket.to(room).emit('bye', socket.nickname, countRoom(roomName) - 1))
  })

  socket.on('disconnect', () => {
    io.sockets.emit('room_change', publicRooms())
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
