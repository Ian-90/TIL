## 4. 도커 컨테이너 만들어보기
### 4.1 무엇을 컨테이너로 만드는 건가요?
* 컨테이너 - 개발한 애플리케이션(실행파일)과 운영환경이 모두 들어있는 독립된 공간
* 개발한 프로그램과 실행환경을 모두 컨테이너로 만듬
* MSA 환경의 Polyglot(다양한 언어를 사용하여 프로그래밍 하는 것) 애플리케이션 운영
* 각각의 애플리케이션 서비스에 맞춰 컨테이너를 만듬

### 4.2 컨테이너 어떻게 만들어요? Dockerfile이 뭐죠?
* Dockerfile
  * 컨테이너를 만들 수 있도록 도와주는 명령어 집합
  * 쉽고, 간단, 명확한 구문을 가진 text file로 Top-Down 해석
  * 컨테이너 이미지를 생성할 수 있는 고유한 지시어(Instruction)를 가짐
  * 대소문자 구분하지 않으나 가독성을 위해 사용함  

* Dockerfile 문법
  | 지시어 | 의미 |
  |------|------|
  |#| 주석|
  |FROM|컨테이너의 BASE IMAGE(운영환경)|
  |MAINTAINER|이미지를 생성한 사람의 이름 및 정보|
  |LABEL|컨테이너이미지에 컨테이너의 정보를 저장|
  |RUN|컨테이너 빌드를 위해 base image에서 실행할 commands|
  |COPY|컨테이너 빌드시 호스트의 파일을 컨테이너로 복사|
  |ADD|컨테이너 빌드시 호스트의 파일(tar, url포함)을 컨테이너로 복사|
  |WORKDIR|컨테이너 빌드시 명령이 실행될 작업 디렉터리 설정|
  |ENV|환경변수 지정|
  |USER|명령 및 컨테이너 실행시 적용할 유저 설정|
  |VOLUME|파일 또는 디렉토리를 컨테이너의 디렉토리로 마운트|
  |EXPOSE|컨테이너 동작 시 외부에서 사용할 포트 지정|
  |CMD|컨테이너 동작 시 자동으로 실행할 서비스나 스크립트 지정|
  |ENTRYPOINT|CMD와 함께 사용하면서 command 지정 시 사용|

* Dockerfile을 이용하여 컨테이너를 빌드
  ```
  docker build -t [imagename:tag] .
  ```

### 4.3 내가 만든 컨테이너를 배포하려면?
* 빌드 -> 도커허브에 푸시
* ex
  ```
  docker build -t hello.js:latest .
  docker login
  docker push hellojs:lastest
  ```

### 4.4 실습
* nodejs 애플리케이션 컨테이너 만들기: hellojs - example_4/hellojs
  * 빌드
  ```
  docker build -t hellojs:latest .
  ```

  * 실행
  ```
  docker run -d -p 8080:8080 --name web hellojs:latest
  curl localhost:8080
  ```

* 우분투 기반의 웹 서버 컨테이너 만들기 - example_4/webserver
  * 빌드
  ```
  docker build -t webserver:v1 .
  ```

  * 실행
  ```
  docker run -d -p 80:80 --name web webserver:v1
  curl localhost:80
  ```

  * 컨테이너 삭제
  ```
  docker rm -f web
  ```

* 만들어놓은 컨테이너 배포하기
  * 로그인
  ```
  docker login
  ```

  * 이름바꾸지
  ```
  docker tag hellojs:latest accounts/hellojs:latest
  docker tag webserver:v1 accounts/webserver:v1
  ```

  * 푸시
  ```
  docker push accounts/hellojs:latest
  docker push accounts/webserver:v1
  ```