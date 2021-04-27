import express from 'express'
import morgan from 'morgan'

const PORT = 4000
const app = express()

const logger = morgan('dev')

const privateMiddleware = (req, res, next) => {
  const url = req.url
  if (url === '/protected') {
    return res.send('<h1>Not Allowed</h1>')
  }
  console.log('Allowed, you may continue')
  next()
}

app.use(logger)
app.use(privateMiddleware)

app.get('/', (req, res) => {
  return res.send('hello world')
})

app.get('/login', (req, res) => {
  return res.send('Login here')
})

app.get('/protected', (req, res) => {
  return res.send('Welcome to the private lounge')
})

const handleListening = () => console.log(`server listening on port http://localhost:${PORT}`)

app.listen(PORT, handleListening)
