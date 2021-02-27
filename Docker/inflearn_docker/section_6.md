## 1. 섹션 설명
* 개발 => 테스트 => 배포
* 개발 => github push(feature branch pull => master branch) => travis ci에서 푸쉬된 코드 테스트 => Hosting(AWS, Azure, ...)

## 2. 리액트 앱 설치하기
* CRA 이용 - `npx create-react-app [app name]`
* 시작 - `yarn start`
* 테스트 - `yarn test`
* 빌드(배포시) - `yarn build`

## 3. 도커를 이용하여 리액트 앱 실행하기
* 도커파일도 개발환경을 위한 파일과 운영환경을 위한 파일을 나눠서 작성하는 것이 좋다.
* Dockerfile.dev(개발환경용)
  * 이미지 빌드
  ```
  docker build -f Dockerfile.dev .
  ```
* 도커환경에서 리액트 앱을 실행하려면, 로컬에 node_modules가 필요하지 않다. 로컬에 node_modules가 있으면 빌드 시간이 늘어난다. 모든 파일들을 카피하기 때문이다.

## 4. 생성된 도커 이미지로 리액트 앱 실행해보기
* 포트맵핑을 이용
```
docker run -p 3000:3000 [image name]

// 실행이 안되면 -it 옵션을 붙인다.
docker run -p 3000:3000 [image name]
```

## 5. 도커 볼륨을 이용한 소스 코드 변경
* 도커 볼륨 - 소스 코드가 변경되었을 때, 빌드하지 않아도 변경한 소스 부분이 어플리케이션에 반영하게 하는 것
```
docker run -p 3000:3000 -v /usr/src/app/node_modules -v $(pwd):/usr/src/app [image name]
```

## 6. 도커 컴포즈로 좀 더 간단하게 앱 실행해보기
* docker-compose.yml
```yml
version: 도커 컴포즈 버전
services: 실행 컨테이너 정의 
  react: 컨테이너 이름
    build: 현 디렉토리 Dockerfile 사용
      context: 도커 이미지를 구성하기 위한 파일과 폴더들이 있는 위치
      dockerfile: 도커파일 지정
    ports: 포트 맵핑
      - 로컬 포트:컨테이너 포트
    volumes: 로컬 머신에 있는 파일들 맵핑
    stdin_open: 리액트 앱을 끌 때 필요
```

* 실행
```
docker-compose up
```

## 7. 리액트 앱 테스트 하기
* 도커환경에서 테스트
```
docker run -it [image name] npm run test
```

* 테스트 코드도 변경된걸 반영 - docker-compose.yml에 test 추가
```yml
tests:
  build:
    context: .
    dockerfile: Dockerfile.dev
  volumes:
    - /usr/src/app/node_modules
    - ./:/usr/src/app
  command: ["npm", "run", "test"]
```

## 8. 운영환경을 위한 Nginx
* Nginx가 필요한 이유 - 운영환경에서는 개발서버 대신 Nginx가 react app이 build된 정적 파일들을 제공
* 왜 개발환경 서버와 운영환경 서버를 다르게 쓰는 것인가?
  * 개발에서 사용하는 서버는 소스를 변경하면 자동으로 전체 앱을 다시 빌드해서 변경 소스를 반영해주는 것 같이 개발 환경에 특화된 기능이 있다. 그리고 운영환경에서는 소스를 변경할 때 다시 반영해줄 필요가 없으며, 개발에 필요한 기능들이 필요하지 않기 때문에 더 깔끔하고 빠른 Nginx를 웹서버로 사용

## 9. 운영환경 도커 이미지를 위한 Dockerfile 작성하기
* 리액트 운영환경 이미지 생성
* 개발환경 도커파일 vs 운영환경 도커 파일 비교
  * 운영환경은 build를 이용하여, build 파일을 만들고, Nginx 도커 이미지를 이용하여 Nginx 시작

  | property | Dockerfile.dev | Dockerfile |
  |:--------:|----------------|------------|
  |  FROM  | node:alpine | node:alpine as builder |
  | WORKDIR | /usr/src/app | /usr/src/app |
  |  COPY  | package.json ./ | package.json ./ |
  |  RUN  | npm install | npm install |
  |  COPY  | ./ ./ | ./ ./ |
  |  CMD  | "npm", "run", "start" | "npm", "run", "build" |

* 운영환경을 위한 도커파일
  1. Builder Stage - 빌드 파일 생성
  ```
  FROM node:alpine as builder

  WORKDIR /usr/src/app

  COPY package.json ./

  RUN npm install

  COPY ./ ./

  RUN npm run build
  ```

  2. Run Stage - Nginx를 가동하고, 빌드폴더의 파일들을 웹 브라우저의 요청에 따라 제공
  ```
  FROM nginx

  COPY --from=builder /usr/src/app/build /usr/share/nginx/html
  ```
    * `/usr/src/app/build` - build stage에서 생성된 파일들
    * `/usr/share/nginx/html` - 이 장소에 파일을 넣어두면 Nginx가 알아서 정적 파일들을 제공해주며, 설정을 통해 변경 가능
  
  3. 이미지 생성 - `docker build -t [image name] .`
  4. 실행 - `docker run -p 8080:80 [image name]` (nginx의 기본 포트는 80)

