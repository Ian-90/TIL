const Koa = require('koa')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')

const app = new Koa()
const router = new Router()

const api = require('./api')

router.get('/', (ctx) => {
  ctx.body = '홈'
})

router.use('/api', api.routes())

app.use(bodyParser())
app.use(router.routes())
app.use(router.allowedMethods())

app.listen(4000, () => {
  console.log('listeing to port 4000')
})