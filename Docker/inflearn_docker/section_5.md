## 1. Docker Compose란 무엇인가?
* Docker Compose - 다중 컨테이너 도커 어플리케이션을 정의하고 실행하기 위한 도구

## 2. 어플리케이션 소스 작성하기
* 레디스
  * 정의 - Redis(Remote Dictionary Server)는 메모리 기반의 키-값 구조 데이터 관리 시스템이며, 모든 데이터를 메모리에 저장하고 빠르게 조회할 수 있는 비 관계형 데이터베이스(NoSql)이다.
  * 쓰는 이유 - 메모리에 저장을 하기 때문에 Mysql같은 데이터베이스에 데이터를 저장하는 것과 데이터를 불러올때 훨씬 빠르게 처리할수 있으며, 비록 메모리에 저장하지만 영속적으로도 보관이 가능하다. 서버를 재부팅해도 데이터를 유지할수 있는 장점이 있다.

* Node.js 환경에서 Redis 사용 방법
  * redis-server 작동
  * redis 모듈 다운(package.json에 dependency 추가)
  * 레디스 클라이언트를 생성하기 위해서 redis.createClient로 생성
  * redis server가 작동하는 곳과 Node.js 앱이 작동하는 곳이 다르다면 host와 port 인자 설정
  * 도커환경에서는 host를 docker-compose.yml 파일에 명시한 컨테이너 이름으로 주면 된다

## 3. Dockerfile 작성하기
* 기본적인 도커파일 작성

## 4. Docker Containers간 통신 할 때 나타나는 에러
* 앱 - 컨테이너(NodeJS 앱 + 레디스 클라이언트) + 컨테이너(레디스 서버)
* 에러가 나는 이유 - 서로 다른 컨테이너에 있는데 컨테이너 사이에는 아무런 설정없이는 접근 할 수 없기 때문에 NodeJS 앱에서 레디스 서버에 접근 불가
* 멀티 컨테이너 상황에서 네트워크 연결을 해주는 것이 **Docker Compose**를 이용하면 된다.


## 5. Docker Compose 파일 작성하기
* yml - YAML ain't markup language의 약자이며, 일반적으로 구성 파일 및 데이터가 저장되거나 전송되는 응용 프로그램에서 사용되며, 사람이 읽기 쉬운 포맷으로 나타낸 것
* docker-compose.yml
```yml
version: 도커 컴포즈의 버전
services: 실행하려는 컨테이너들을 정의
  redis-server: 컨테이너 이름
    image: "redis" 컨테이너에서 사용하는 이미지
  node-app: 컨테이너 이름
    build: 도커파일 사용
    ports: 포트 맵핑 로컬 포트:컨테이너포트
```
* 실행
```
// 기본 실행법
docker-compose up

// 소스 코드 변경시
docker-compose up --build
```

## 6. Docker Compose로 컨테이너를 멈추기
* 한꺼번에 중단
```
docker-compose down
```

* 앱을 백그라운드에서 실행하는 옵션 - `-d`
* `docker-compose up` - 이미지가 없을 때, 이미지를 빌드하고 컨테이너 시작
* `docker-compose up --build` - 이미지가 있든 없든, 이미지를 빌드하고 컨테이너 시작
