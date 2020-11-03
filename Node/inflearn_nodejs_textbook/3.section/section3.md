# 1. 노드 모듈 시스템
* require 함수 사용
```js
const variable_name = require(path)
```
* example
```js
// var.js
const odd = '홀수'
const even = '짝수'

module.exports = {
  odd,
  even,
}
// module.export와 동일 코드
exports.odd = odd
exports.even = even

// func.js
const { odd, even } = require('./var/)
console.log(odd)
console.log(even)
```
* module.exports는 모든 자료형을 내보낼수 있다

# 2. global 객체
* 브라우저의 window처럼 노드에는 global이 있다.
* global - 노드의 전역객체
```js
// globalA.js
module.exports = () => global.message

// globalB.js
const A = require('./globalA')

global.message = 'hello'
console.log(A()) // hello 
```

# 3. console 객체
* 많은 메서드들이 있다.
```js
const str = 'abc'
const number = 1
const boolean = true
const obj = {
  out: {
    int: {
      key: 'value'
    }
  }
}

console.time('전체시간')

console.log('str',str)
console.error('err msg')
console.dir(obj, { colors: true, depth: 2 }) // 객체전용

console.timeEnd('전체시간')

console.trace('에러 위치 추적') // 에러 위치 추적
```

# 4. 타이머(setTimeout, setInterval, setImmediate)
```js
// timeout이나 interval 실행
const timeout = setTimeout(() => {
  console.log('1.5초 후 실행')
}, 1500)

const interval = setInterval(() => {
  console.log('1초 후 실행')
}, 1000)

//  timeout이나 interval 제거
clearTimeout(timeout)
clearInterval(interval)

const timeout2 = setTimeout(() => {
  console.log('실행되지 않습니다')
}, 3000)

setTimeout(() => {
  clearTimeout(timeout2)
}, 2500)

// 왜 쓸까? 이벤트 루프로 보내져서 실행순서를 달라지게 하기위해서
const immediate = setImmediate(() => console.log('즉시 실행'))
clearImmediate(immediate)
```

# 5. __filename, __dirname, process
* __filename - 현재의 파일 이름
* __dirname - 현재의 파일이 들어있는 경로
* process - 스레드의 상위개념. 현재 실행중인 노드 프로그램의 정보가 들어있다.

# 6. os 모듈
* 운영체제와 관련된 모듈
```js
const os = require('os')
os.arch()
os.platform()
os.type()
os.uptime()
os.hostname()
os.release()
os.homedir()
os.cpus() // cpu 정보를 알려주며, 자주 쓰게 될 것
```

# 7. path 모듈
* 많이 쓰이는 모듈
```js
const path = require('path')
path.sep
path.delimiter
path.dirname(__filename)
path.extname(__filename)
path.basename(__filename)
path.parse(__filename) // 대칭되는건 path.format()
path.normalize
path.join(__dirname) // 절대 경로를 무시하고 합침
path.resolve(__dirname) // 절대경를 고려하고 합침
```

# 8. url 모듈
* url.parse - 기존의 주소방식
* url.URL - WHATWG 방식의 주소를 사용 // 장점은 search
```js
const url = require('url')
const URL = url.URL
```

# 9. querystring 모듈

```js
const url = require('url')
const qs = require('querystring')

const parsedUrl = url.parse('주소~')
const query = qs.parse(parsedUrl.query)
```

# 10. crypto 단방향 암호화(해시)
* 비밀번호는 hash방식으로 암호화를 하여 복호화되지 않는 문자열을 만듬
* 암호문(해시)를 저장한 후 사용자의 입력 비밀번호를 암호화한 것과 비교합니다.
```js
const crypto = require('crypto')

// 암호화
console.log(crypto.createHash('sha512').update('비밀번호').disgest('base'))

// 해시 충돌 공격을 어렵게 하기 위해 salt라는 문자열을 원래 비밀번호에 추가하고, iteration횟수를 높임.
// iteration이 높을수록 좋지만, 1초 정도가 걸릴때까지 올려주는게 좋다.
// 실무에서는 bcrypt, scrypt를 사용
crypto.randomBytes(64, (err, buf) => {
  const salt = buf.toString('base64')
  console.time('암호화')
  crypto.pbkd2('비밀번호', salt, 100000, 64, 'sha512', (err, key) => {
    console.log('password', key.toString('base64'))
    console.timeEnd('암호화')
  })
})
```

# 11. crpto 양방향 암호화
```js
const crypto = require('crypto')

// 암호화
const cipher = crypto.createCipher('aes-256-cbc', '열쇠')
// utf8 평문을 base64 암호문으로
let result = cihper.update('제로초바보', 'uff8', 'base64')
result += cipher.final('base64')
console.log('암호', result)

// 복호화
const decipher = crypto.createDecipher('aes-256-cbc', '열쇠')
// base64암호문을 utf8평문으로
let result2 = decipher.update(result, 'base64', 'utf8')
result2 += decipher.final('utf8')
console.log('평문', result2) // 제로초바보
```

# 12. util 모듈(deprecate, promisify)
* deprecate - 지원이 조만간 중단될 메서드임을 알려줄 때 사용
* promisify는 노드에서 중요
```js
const util = require('util')
const crypto = require('crypto')

const dontuseme = util.deprecate((x, y) => {
  console.log(x + y)
})

dontuseme(1, 2) //DeprecationWarning

// callback이 중첩.
crypto.randomBytes(64, (err, buf) => {
  const salt = buf.toString('base64')
  console.time('암호화')
  crypto.pbkd2('비밀번호', salt, 100000, 64, 'sha512', (err, key) => {
    console.log('password', key.toString('base64'))
    console.timeEnd('암호화')
  })
})

// promise를 지원하지 않을 땐, promisify를 이용
const randomBytesPromise = util.promisify(crypto.randomBytes);

randomBytesPromise(64)
  .then((buf) => {})
  .catch((err) => {})
```

# 13. fs 모듈(동기와 비동기)
* 폴더와 파일만들기
```js
// readme.txt 생성
// 1. 파일 읽기
const fs = require('fs')
fs.readFile('./readme.txt', (err, data) => {
  if (err) {
    throw err
  }
  console.log(data) // buffer 형식
  console.log(data.toString())
})

// 2. 파일 만들기
fs.writeFile('./writeme.txt', '글을 써주세요',(err, data) => {
  if (err) {
    throw err
  }
  fs.readFile('./writeme.txt', (err, data) => {
    if (err) {
      throw err
    }
    console.log(data.toString())
  })
})

/* 3. readFile이 여러개라면? 순서가 없다. 순서대로 실행 하려면?
  * 1. 콜백헬
  * 2. readFileSync 이용
*/
```

# 14. 버퍼와 스트림
* 스트림
  * 버퍼들의 흐름
  * 이벤트기 반으로 동작. 버퍼들이 들어올 때 마다 data이벤트 발생
  * 여러 개의 스트림을 이어 버퍼가 흘러가게 할 수 있다
```js
const fs = require('fs')

// 16바이트씩 버퍼를 읽는다
const readStream = fs.createReadStream('./readme.txt', { highWaterMark: 16})

readStream.on('data', (chunk) => {
  data.push(chunk)
  console.log('data', chunk, chunk,lenght)
})

readStream.on('end', () => {
  console.log('end', Buffer.concat(data).toString())
})

readStream.on('error', (err) => {
  console.log('error', err)
})

//파일 쓰기
const writeStream = fs.createWriteStream('./readme2.txt')
writeStream.on('finish', () => {
  console.log('파일ㅅ 쓰기 완료')
})
writeStream.write('글 쓰기\n')
writeStream.write('한번 더 쓰기')
writeStream.end()

// pipe - 파일복사
const zlib = require('zlib')
const zlibStream = zlib.createGzip()
readStream.pipe(zlibStream).pipe(writeStream)

// fs.copyFile을 이용하는 것이 더 편하다
const readStream = fs.copyFile('./readme.txt', './readme2.txt', (err) => {
  console.log(err)
})
```

# 15. 기타 fs 메서드
* fs.access('파일경로', 권한)
  * 권한은 F_OK(존재 여부), R_OK(읽기 여부), W_OK(쓰기 여부)

```js
const fs = require('fs')
fs.access('./folder', fs.constants.F_OK | fs.constants.R_OK | fs.constants.W_OK, (err) => {
  if (err) {
    if (err.code === 'ENOENT') {
      console.log('폴더 없음')
      fs.mkdir('./folder', (err) => {
        if (err) {
          throw err
        }
        console.log('폴더 만들기 성공')
        fs.open('./folder/file.js', 'w', (err, fd) => {
          if (err) {
            throw err
          }
          console.log('빈 파일 만들기 성공', fd)
          fs.rename('./folder/file.js', './folder/newfile.js', (err) => {
            if (err) {
              throw err
            }
            console.log('이름 바꾸기 성공')
          })
        })
      })
    }
  } else {
    console.log('이미 폴더 있음')
  }
})

fs.readdir('./folder', (err, dir) => {
  if (err) {
    throw err
  }
  console.log('폴더 내용 확인', dir)
  fs.unlink('./folder/newfile.js', (err) => {
    if (err) {
      throw err
    }
    console.log('파일 삭제 성공')
    fs.rmdir('./folder', (err) => {
      if (err) {
        throw err
      }
      console.log('폴더 삭제 성공')
    })
  })
})

```

# 16. events 모듈
* 이벤트 리스너 - 특정 이벤트가 발생했을 때 어떤 동작을 할지 정의하는 부분
```js
// 커스텀 이벤트 만들어 보기
const EventEmitter = require('events')

const myEvent = new EventEmitter()
myEvent.addListener('방문', () => {
  console.log('방문해주셔서 감사합니다')
  res.sendFile(html파일)
})
// 여러개 추가가 가능함
myEvent.on('종료', () => {
  console.log('안녕히 가세요')
})

myEvent.on('종료', () => {
  console.log('나가요')
})

myEvent.once('특별이벤트', () => {
  console.log('한번만 실행됨')
})

// 이벤트 호출
myEvent.emit('방문')
myEvent.emit('종료')
myEvent.emit('특별이벤트')

// 이벤트 제거
myEvent.removeAllListeners('종료')
myEvent.removeListener('종료', callback)

// 이벤트 개수 파악
myEvent.listenerCount(종료)
```

# 17. 예외 처리하기
* 에러를 잡을 땐, try catch 사용
```js
setInterval(() => {
  console.log('시작')
  try {
    throw new Error('서버 고장')
  } catch (err) {
    console.error(err)
  }
}, 1000)

setTimeout(() => {
  console.log('실행됩니다')
}, 2000)

// try catch를 사용하기 싫을 땐 process 이용
process.on('uncaughtException', (err) => {
  console.error('예기치 못한 에러',err)
})

```
