require('dotenv').config()

const Koa = require('koa')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const mongoose = require('mongoose')
const session = require('koa-session')

const {
  PORT: port = 4000,
  MONGO_URI: mongoURI,
  COOKIE_SIGN_KEY: signKey
} = process.env

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useFindAndModify: false
}).then(() => {
  console.log('connected to mongodb')
}).catch((e) => {
  console.error(e)
})

const app = new Koa()
const router = new Router()

const api = require('./api')

router.get('/', (ctx) => {
  ctx.body = '홈'
})

router.use('/api', api.routes())

const sessionConfig = {
  maxAge: 86400000,
}
app.use(bodyParser())
app.use(session(sessionConfig, app))
app.use(router.routes())
app.use(router.allowedMethods())

app.keys = [signKey]

app.listen(port, () => {
  console.log('listeing to port', port)
})