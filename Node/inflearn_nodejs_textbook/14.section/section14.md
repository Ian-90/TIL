# 1. 패키지 배포 환경으로 전환하기
* 노드버드를 배포용으로 변경해보기
  * morgan
  ```js
  if (process.env.NODE_ENV === 'production') {
    app.use(morgan('combined'))
  } else {
    app.use(morgan('dev'))
  }
  ```

  * session
  ```js
  const sessionOption = {
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
    }
  }

  if (process.env.NODE_ENV === 'production') {
    sessionOption.proxy = true
    sessionOption.cookie.secure = true // https용
  }
  ```

  * config/config.json => config.js로 변경
  ```js
  require('dotenv').config()
  module.exports = {
    "development": {
      "username": "root",
      "password": process.env.SEQUELIZE_PASSWORD,
      "database": "nodebird",
      "host": "127.0.0.1",
      "dialect": "mysql"
    },
    "test": {
      "username": "root",
      "password": null,
      "database": "database_test",
      "host": "127.0.0.1",
      "dialect": "mysql"
    },
    "production": {
      "username": "root",
      "password": null,
      "database": "database_production",
      "host": "127.0.0.1",
      "dialect": "mysql",
      "logging": false,
    }
  }
  ```

  * mysql 한글 깨질 때 설정
  ```
  // 아래 코드들을 모델에 전부 추가
  chartset: 'utf-8',
  collate: 'utf8_general_ci',
  ```

# 2. cross-env, pm2
1. package.json에 개발환경과 배포환경 분리 - production에서는 서버를 재시작할일이 없음
```json
...,
"scripts": {
  "dev": "nodemon app",
  "start": "cross-env NODE_ENV=production PORT=80 node app"
}
```

2. cross-env - window에서도 "NODE_ENV=production PORT=80 node app" 명령어를 사용하기위해(env를 설정하기위해) 설치
```
yarn add cross-env
```

3. `npm audit`으로 패키지들 취약점 파악 및 `npm audit fix`로 자동해결 할 수 있는것들만 해결

4. pm2 - 배포환경에서는 nodemon대신 pm2 사용(클라우드에서 서버 유지용)
  * 설치
  ```
  yarn add pm2
  ```

  * 명령어 변경(package.json)
  ```json
  ...,
  "scripts": {
    // 멀티코어를 돌리려면 -i [돌릴 코어 개수 || 컴퓨터가 가진 개수만큼 돌릴려면 0 || 전체코어에서 1개의 코어를 남기기위해서는 -1]
    "start": "cross-env NODE_ENV=production PORT=80 pm2 start app.js"
  }
  ```

  * 장점
    * 노드를 백그라운드로 돌려주기 때문에 다른 일을 할 수 있다
    * 노드는 싱글쓰레드이지만 멀티코어를 쓸 수 있도록 도와줌
    * 서버가 죽으면 재시작해주는 기능이 있음
  
  * 간단한 명령어
    * `pm2 list` - 현재 돌아가고 있는 프로세스들 표시
    * `pm2 restart all` - 서버들 재시작
    * `pm2 monit` - 실시간으로 서버 모니터링
    * `pm2 kill` - 서버 끄기

# 3. winston, helmet, hpp
* winston - 클라우드 환경에서 console.log만 해도 로깅이 기록이 되지만, 클라우스 서비스를 사용하지 않을 때, console.log로 했을 때 서버가 재시작 되면, 로깅이 날라가서 모르기 때문에 사용
  * 설치
  ```
  yarn add winston
  ```

  * logger.js
  ```js
  const { createLogger, format, transports } = require('winston')

  const logger = createLogger({
    level: 'info',
    format: format.json(),
    transports: [
      new transports.File({ filename: 'combined.log'}),
      new transports.File({ filename: 'error.log', level: 'error' }),
    ],
  })

  if (process.env.NODE_ENV !== 'production') {
    logger.add(new transports.Console({ format:simple() }))
  }

  module.exports = logger
  ```

  * 실행해서 에러가 나면, log파일로 생성된다.
  * 날짜별로 기록하고 싶을 때, `yarn add winston-daily-rotate-file`로 플러그인 설치

* 보안을 위해서 설치하는 패키지
  * [helmet](https://www.npmjs.com/package/helmet)
  * [hpp](https://www.npmjs.com/package/hpp)

# 4. connect-redis
* redis - 서버를 재시작해도 session을 유지하기 위해서 사용
* redis labs 공홈 가입 후, 무료로 제공되는 것 사용해보기
  * configuration을 보고 .env에 REDIS_HOST='endpoint 복사', REDIS_PORT='endpoint port',REDIS_PASSWORD='private key 복사'
* app.js
```js
const session = require('express-session')
const RedisStore = require('connect-redis')(session)

const sessionOptions = {
  ...,
  store: new RedisStore({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PROT,
    pass: process.env.REDIS_PASSWORD,
    logErrors: true,
  })
}
```

# 5. nvm, n
* nvm - 노드 버전 매니저. window에선 nvm이 편함
  * 명령어
    * `nvm list` - 내컴퓨터의 설치된 노드버전 리스트
    * `nvm install latest` - 최신버전 노드 설치
    * `nvm use [사용할 버전]` - 사용하고 싶은 노드 버전 적용
* n - 노드 버전매니저. mac이나 linux에서 편함

# 6. GCP, AWS에 배포하기(feat. GitHub)
1. git repo public으로 생성
2. .gitignore 추가
3. git config 추가
4. git에 소스코드 push

* GCP에 배포
  1. GCP 접속
  2. GCP에 프로젝트 생성 후, 접속
  3. 좌측메뉴에 Compute Engine 선택
  4. VM 인스턴스
    * 지역 도쿄 선택(연습용은 미국 오리건)
    * 초소형
    * 부팅 디스크는 우분투
    * HTTP, HTTPS 트래픽 허용 체크
    * 만들기 클릭
  5. 개인 서버 완성
  6. 외부 아이피로 접속 가능
  7. SSH 클릭 하면, 우분투로 접속
  8. git에 올린 소스코드 git clone
  9. node 및 mysql 설치
  ```
  sudo apt-get update
  sudo apt-get install -y build-essential
  sudo apt-get install curl
  curl sL https://deb.nodesource.com/setup_14.x | sudo -E bash --
  sudo apt-get install -y nodejs
  sudo npm i -g npm
  sudo apt-get update
  sudo apt-get install -y mysql-server
  // mysql 설치 후, 비밀번호 입력
  mysql_secure_installation // 전부 no 입력
  // mysql 설치 확인
  mysql -h localhost -u root -p

  ```
  10. 다운받은폴더로 접속
  11. `npm i`로 모든 패키지 설치
  12. `sudo npm i -g pm2 cross-env sequelize-cli`
  13. `vim .env`로 .env 생성(gitignore로 무시되었기 때문)
  14. `sequelize db:create --env production`으로 db 생성
  15. `sudo npm start`
  16. `sudo pm2 monit`
  17. 외부 아이피로 접속

* AWS에 배포
  1. 회원가입
  2. 컴퓨팅 Lightsail 접속
  3. 인스턴스 생성
    * 서울, 리눅스, 노드 설치 후, 생성
  4. 인스턴스 접속 후, ssh 사용하여 연결
  5. git clone
  6. `cd /opt/bitnami`
  7. `sudo ./ctlscript.sh stop apache`
  8. GCP처럼 node 및 mysql 설치 후 실행.
