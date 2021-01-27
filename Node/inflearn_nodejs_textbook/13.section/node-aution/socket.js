module.exports = (server, app) => {
  const io = require('socket.io')(server, { path: '/socket.io' })

  app.set('io', io)

  io.on('connection', (socket) => {
    const req = socket.request
    const { headers: { referer } } = req
    // req.cookies, req.session 접근 불가, 접근하려면 io.use 미들웨어를 연결
    const roomId = referer.split('/')[referer.split('/').length - 1]
    socket.on('disconnection', () => {
      socket.leave(roomId)
    })
  })
}
