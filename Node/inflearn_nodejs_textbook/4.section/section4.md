# 1. http 모듈, localhost, 포트
* 기본포트는 생략가능
  * http는 80
  * https는 443
```js
const http = require('http')

http.createServer((req, res) => {
  console.log('서버 실행')
  res.write(`<h1>Hello Node</h1>`)
  res.write(`<h2>Hello Node</h2>`)
  res.write(`<h3>Hello Node</h3>`)
  res.write(`<h4>Hello Node</h4>`)
  res.end(`<p>Hello Server!</p>`)
}).listen(8080, () => {
  console.log('8080번 포트에서 서버 대기중입니다.')
})
```

# 2. 응답으로 파일 읽어 보내기
```js
const http = require('http')
const fs = require('fs')

const server = http.createServer((req, res) => {
  console.log('서버 실행')
  fs.readFile('./index.html', (err, data) => {
    if (err) {
      throw err
    }
    res.end(data)
  })
}).listen(8080, () => {
  console.log('8080번 포트에서 서버 대기중입니다.')
})

server.on('listening', () => {
  console.log('8080번 포트에서 서버 대기중입니다')
})

// 에러로그를 남겨주는것이 좋다
server.on('error', (err) => {
  console.log(err)
})
```

# 3. 쿠키 설정하기, req.url
```js
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
  res.writeHead(200, { 'Set-Cookie': 'mycookie=test' })
  res.end('Hello cookie')
}).listen(8080, () => {
  console.log('8080번 포트에서 서버 대기중입니다.')
})
```

# 4. 라우터 분기 처리와 쿠키
* writeHead의 302는 다른페이지로 이동
```js
const http = require('http')
const fs = require('fs')
const url = require('url')
const qs = require('querystring')


const server = http.createServer((req, res) => {  
  if (req.url.startWith('/login')) {
    const { query } = url.parse(req.url)
    const { name } = qs.parse(query)
    const expires = new Date()
    expires.setMinutes(expires.getMinutes() + 5)
    res.writeHead(302, {
      Location: '/',
      'Set-Cookie': `name=${encodeURIComponent(name)};Expires=${expires.toGMTString()}; HttpOnly; Path=/`
    })
    res.end('login action')
  } else if (cookies.name) {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
    res.end(`${cookies.name}님 안녕하세요`)
  } else {
    fs.readFile('./index2.html', (err, data) => {
      res.end(data)
    })
  }
}).listen(8080)
```

# 5. 메모리 세션 구현해보기
* 쿠키와 세션은 밀접한 관계가 있다.
```js
const http = require('http')
const fs = require('fs')
const url = require('url')
const qs = require('querystring')

const session = {

}

const server = http.createServer((req, res) => {  
  if (req.url.startWith('/login')) {
    const { query } = url.parse(req.url)
    const { name } = qs.parse(query)
    const randomInt = +new Date()
    const expires = new Date()
    expires.setMinutes(expires.getMinutes() + 5)
    session[randomInt] = {
      name,
      expires
    }
    res.writeHead(302, {
      Location: '/',
      'Set-Cookie': `session=${randomInt};Expires=${expires.toGMTString()}; HttpOnly; Path=/`
    })
    res.end('login action')
  } else if (cookies.session && session[cookies.session].expires > new Date()) {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
    res.end(`${session[cookies.session].name}님 안녕하세요`)
  } else {
    fs.readFile('./index2.html', (err, data) => {
      res.end(data)
    })
  }
}).listen(8080)
```

# 6. REST API의 개념과 프론트 코드 설명
* 서버의 자원을 구조화 한 것
  * www.zerocho.com/users/1
  * GET 
  * POST
  * PUT - 전체 수정
  * PATCH - 부분 수정
  * DELETE

# 7. HTTP 메서드(req.method)로 분기 처리하기
* example 4-6 server.js

# 8. 요청 본문 처리하기(POST, PUT, PATCH, DELETE)
* example 4-6 server.js

# 9. 라우터 리팩토링
* express는 그룹화 가능
* 순수 노드로할 때
```js
const router = {
  GET: {
    '/': (req, res) => {
      fs.readFile('/index.html', (err, data) => {
        if (err) {
          throw err
        }
        res.end(data)
      })
    },
    '/users': (req, res) => {
      res.end(JSON.stringify(users))
    },
    '*': (req, res) => {
      fs.readFile(`.${req.url}`, (err, data) => {
        return res.end(data)
      })
    }
  },
  POST: {
    '/users': (req, res) => {
      let body = ''
      res.on('data', (data) => {
        body += data
      })
      return req.on('end', () => {
        const { name } = JSON.parse(body)
        const id = Date.now()
        users[id] = name
        res.writeHead(201, { 'Content-Type': 'text/html; charset=utf-8' })
        res.end('등록 성공')
      })
    }
  },
  PATCH: {
    '/users': () => {

    }
  },
  PUT: {
    '/users': () => {
      const key = req.url.split('/')[2];
      let body = '';
      req.on('data', (data) => {
        body += data;
      });
      return req.on('end', () => {
        console.log('PUT 본문(Body):', body)
        users[key] = JSON.parse(body).name
        return res.end(JSON.stringify(users))
      })
    }
  },
  DELETE: {
    '/users': () => {
      const key = req.url.split('/')[2]
      delete users[key]
      return res.end(JSON.stringify(users))
    }
  }
}

const matchedUrl = router[req.method][req.url]
(matchedUrl || router['GET']['*'])(req, res)
```

# 10. https, http2
* 요즘은 https를 쓰길 권장한다.
* https를 사용하려면 인증서 필요 - letsencrypt 인증서 발급(무료)
```js
const https = require('https')
const http2 = require('http2');
const fs = require('fs');

https.createServer({
  cert: fs.readFileSync('도메인 인증서 경로'),
  key: fs.readFileSync('도메인 비밀키 경로'),
  ca: [
    fs.readFileSync('상위 인증서 경로'),
    fs.readFileSync('상위 인증서 경로'),
  ],
}, (req, res) => {
  res.write('<h1>Hello Node!</h1>');
  res.end('<p>Hello Server!</p>');
}).listen(443, () => {
  console.log('443번 포트에서 서버 대기중입니다!');
});

http2.createSecureServer({
  cert: fs.readFileSync('도메인 인증서 경로'),
  key: fs.readFileSync('도메인 비밀키 경로'),
  ca: [
    fs.readFileSync('상위 인증서 경로'),
    fs.readFileSync('상위 인증서 경로'),
  ],
}, (req, res) => {
  res.write('<h1>Hello Node!</h1>');
  res.end('<p>Hello Server!</p>');
}).listen(443, () => {
  console.log('443번 포트에서 서버 대기중입니다!');
});
```

# 11. cluster로 멀티 프로세싱 하기
* 클러스터링 - 노는 코어를 다 활용하는 방법
* cluster에는 master(관리자) 프로세스와 worker(일꾼) 프로세스가 있다. cluster.fork()가 워커를 생성
```js
const http = require('http')
const cluster = require('cluster')
const os = require('os')
const numCPUs = os.cpus().length


if (cluster.isMaster) {
  console.log('마스터 프로세스 아이디', precess.pid)
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork()
  }
  cluster.on('exit', (worker, code, signal) => {
    console.log(worker.process.pid, '워커가 종료됨')
    cluster.fork()
  })
} else {
  http.createServer((req, res) => {
    res.end('http server')
    setTimeout(() => {
      process.exit(1)
    }, 1000)
  }).listen(8080)
  console.log(precess.pid, '워커 실행')
}

```