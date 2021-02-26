## 1. 섹션 설명
* Node.js를 도커환경에서 실행함으로써 도커를 배운다.
* Dockefile을 어떤식으로 작성하는지 중점적으로 다룸

## 2. Node.js 앱 만들기
* node project 생성
  1. package.json 생성
  ```
  npm init
  ```

  2. express 설치
  ```
  npm i express
  ```

  3. server.js 생성
  ```js
  const express = require('express')

  const PORT = 8000
  const HOST = '0.0.0.0'

  const app = express()

  app.get('/', (req, res) => {
  res.send('Hello world')
  })

  app.listen(PORT, HOST)
  console.log(`Running on http//:${HOST}:${PORT}`)
  ```

## 3. Dockerfile 작성하기
* Nodejs 앱을 도커환경에서 실행 하기 위한 방법
  1. Dockerfile 작성
  2. 이미지 생성

* npm - Node.js로 만들어진 모듈을 웹에서 받아서 설치하고 관리해주는 프로그램
* `npm install` - NPM Registry 모듈들이 저장되어있는 저장소에서 package.json에 적힌 종속성들을 자동으로 다운받아서 설치 해주는 명령어
* `node server` - 노드를 웹서버로 작동

## 4. Package.json 파일이 없다고 나오는 이유
* 임시컨테이너에서 Pacakge.json 및 다른파일들이 들어있지 않기 때문에 `npm install`을 하면 에러가 난다.
* 해결 방법 - package.json 및 다른파일들을 도커 컨테이너에 지정된 장소에 복사
  * ./ - root파일 모두 복사
  ```
  COPY ./ ./
  ```
* 기존 소스가 변경되면, build를 다시해주어야 한다.

## 5. 생성한 이미지로 어플리케이션 실행 시 접근이 안되는 이유
* 로컬 네트워크에 있던 것을 컨테이너 내부에 있는 네트워크에 연결을 해주어야 접근이 된다.(포트 매핑)
  * `docker run -p 49160:8080 [image name]`

## 6. Working Directory 명시해주기
* WORKDIR - 이미지안에서 어플리케이션 소스 코드를 갖고있을 디렉토리를 생성하는 것이다. 이 디렉토리가 어플리케이션에 working directory가 되는 것이다.
* WORKDIR를 지정하지 않았을 때 문제점
  1. 원래 이미지에 있던 파일과 이름이 같다면, 덮어씌어져서 문제가 생김
  2. 파일 정리 정돈이 안되어 있음
* Working Directory 명시
  * Dockerfile
  ```
  FROM baseImage

  WORKDIR Working Directory Path

  ...
  ```

## 7. 어플리케이션 소스 변경으로 다시 빌드하는 것에 대한 문제점
* 문제점 - 다시 이미지를 build하고 run해야되기 때문에 비효율적
  * `도커 파일 작성` => `도커 파일로 도커 이미지 생성` => `도커 이미지로 컨테이너 생성 후 앱 실행`
  * COPY ./ ./로 인하여 소스를 변화시킨 부분은 server.js이지만, 모든 node_modules를 다시 다운받아주어야한다.
  * 소스하나 변경 시켰을 뿐인데 이미지를 다시 생성하고 다시 컨테이너를 실행시켜주어야 하기 때문에 비효율적

## 8. 어플리케이션 소스 변경으로 재빌드 시 효율적으로 하는 법
* Dockerfile - 소스 변경시 `npm install`을 다시 하는 것은 비효율적이기 때문에, package.json COPY 후, 모듈 변화가 생길때에만 모듈을 다시 다운 받아주는 것으로 효율성을 높여준다. 즉, 캐싱을 이용하는 것이다.
```
FROM node:10

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install

COPY ./ ./

CMD [ "node", "server.js" ]
```

## 9. Docker Volume에 대하여
* Volume 사용 이유
  * 소스를 변경할 때 마다 변경된 소스 부분은 COPY 한 후 이미지를 다시 빌드를 해주고 컨테이너를 다시 실행해줘야 변경된 소스가 화면에 반영되는데, 이러한 작업은 많은 시간소요가 되며, 이미지도 많이 빌드하게 되는 문제점이 있다. 이러한 문제점을 해결하기 위해서 Volume을 사용한다.

* Volume
  * 도커 컨테이너에서 로컬의 파일들을 참조(Mapping)

* 사용법
```
docker run -p 5000:8080 -v /usr/src/app/node_modules -v $(pwd):/usr/src/app [image id]
```
  * `/usr/src/app/node_modules` - 호스트 디렉토리에 node_modules는 없기 때문에 컨테이너에서 참조 하지 말라는 명령어
  * `$(pwd):/user/src/app` - pwd 경로에 있는 디렉토리 혹은 파일을 /user/src/app 경로에서 참조