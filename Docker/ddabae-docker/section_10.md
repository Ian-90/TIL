## 10. 빌드에서 운영까지(도커 컴포즈 사용)
### 10.1 도커 컴포즈가 뭐에요?
* 여러 컨테이너를 일괄적으로 정의하고 실행할 수 있는 툴
  * 하나의 서비스를 운영하기 위해서는 여러 개의 애플리케이션이 동작해야 함
  * 컨테이너화 된 애플레케이션들을 통합 관리할 수 있음

### 10.2 도커 컴포즈로 컨테이너 실행이 가능하나요?
* compose 문법
| name | description |
|------|-------------|
|version|compose 버전. 버전에 따라 지원 문법이 다름|
|services|compose를 이용해서 실행할 컨테이너 옵션을 정의|
|build|컨테이너 빌드|
|image|compose를 통해 실행할 이미지를 지정|
|command|컨테이너에서 실행될 명령어 지정|
|port|컨테이너가 공개하는 포트를 나열|
|link|다른 컨테이너와 연계할 때 연게할 컨테이너 지정|
|expose|포트를 링크로 연계된 컨테이너에게만 공개할 포트|
|volumes|컨테이너에 볼륨을 마운트|

* 컨테이너 실행
1. 서비스 디렉토리 생성
  ```
  mkdir webserver
  cd webserver
  ```

2. docker-compose.yml 생성
  ```yml
  version: 3
  services:
    web:
      image: httpd:latest
      ports:
        - 80:80
      links:
        - mysql:db
      command: apachectl -DFOREGROUND
    mysql:
      image: mysql:latest
      command: mysqld
      environment:
        MYSQL_ROOT_PASSWORD: pass
  ```

3. docker-compose 명령어
  ```
  docker-compose up d
  docker-compose ps
  docker-compose scale mysql-2
  docker-compose ps
  docker-compose down
  ```

### 10.3 빌드에서 운영까지 해보기
1. 서비스 디렉토리 생성
  ```
  mkdir composetest
  cd composetest
  ```

2. 빌드를 위한 dockerfile 생성
  ```
  FROM python:3.7-alpine
  WORKDIR /code
  ENV FLASK_APP=app.py
  ENV FLASK_RUN_HOST=0.0.0.0
  RUN apk add --no-cache gcc musl-dev linux-headers
  COPY requirements.text requirements.tsx
  RUN pip install -r requirements.tsx
  EXPOSE 5000
  COPY ..
  CMD ["flask", "run"]
  ```

3. docker-compose.yml 생성
  ```yml
  version: "3.9"
  services:
    web:
      build: .
      ports:
        - "5000:5000"
    redis:
      image: "redis:alpine"
  ```

4. dcoker-compose 명령어
  ```
  docker-compose up -d
  ```

### 10.4 실습
* [도커 컴포즈 설치하기](https://docs.docker.com/compose/install/#install-compose-on-macos)
  * OS 별로 다르다

* [컨테이너 빌드에서 운영까지](https://docs.docker.com/compose/gettingstarted/)
  1. 서비스 디렉토리 생성
    ```
    mkdir composetest
    cd composetest
    ```
  
  2. app.py 생성

  3. requirements.txt 생성

  4. 빌드를 위한 dockerfile 생성
    ```
    FROM python:3.7-alpine
    WORKDIR /code
    ENV FLASK_APP=app.py
    ENV FLASK_RUN_HOST=0.0.0.0
    RUN apk add --no-cache gcc musl-dev linux-headers
    COPY requirements.text requirements.tsx
    RUN pip install -r requirements.tsx
    EXPOSE 5000
    COPY ..
    CMD ["flask", "run"]
    ```
  

  5. docker-compose.yml 생성
    ```yml
    version: "3.9"
    services:
      web:
        build: .
        ports:
          - "5000:5000"
        volumes:
          - .:/code
        environment:
          FLASK_ENV: development
      redis:
        image: "redis:alpine"
    ```

  6. dcoker-compose 명령어
    ```
    docker-compose up -d
    ```

  7. `localhost:5000에 접속해서 확인`

  8. 도커 컴포즈의 컨테이너 제거
    ```
    docker-compose down --volumes
    ```

* [MySQL 데이터베이스를 사용하는 wordpress 운영하기](https://docs.docker.com/samples/wordpress/)
