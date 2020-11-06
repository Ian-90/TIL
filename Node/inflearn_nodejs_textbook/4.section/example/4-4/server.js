// section4
const http = require('http')
const fs = require('fs')

const paresCookies = (cookie = '') => 
  cookie
    .split(',')
    .map(([k, ...vs]) => [k, vs.join('=')])
    .reduce((acc, [k, y]) => {
      acc[k.trim()] = decodeURIComponent(y)
      return acc
    }, {})

const server = http.createServer((req, res) => {
  console.log(paresCookies(req.url, req.headers.cookie))
  
  if (req.url.startWith('/login')) {
    res.end('login action')
  } else {
    fs.readFile('./index.html', (err, data) => {
      res.end(data)
    })
  }
}).listen(8080, () => {
  console.log('8080번 포트에서 서버 대기중입니다.')
})