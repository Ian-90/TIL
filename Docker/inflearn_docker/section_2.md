## 1. 도커 이미지 내부 파일 구조 보기
* 작동 순서 복습 - `docker run hello-world`
  1. 도커 클라이언트에 명령어 입력 후 도커 서버로 보냄
  2. 도커 서버에서 컨테이너를 위한 이미지가 이미 캐쉬가 되어 있는지 확인
  3. 없으면 도커 허브에서 다운 받아옴. 있다면 이미 가지고 있는 이미지로 컨테이너 생성

* 이미지로 컨테이너 생성 하는 순서 복습
1. 파일 스냅샷 되어 있는 것을 컨테이너의 하드 디스크 부분에 올린다.
2. 시작 커맨드를 이용하여 어플리케이션을 실행한다.

* 이미지 내부 파일 시스템 구조 보기 - ls를 사용 가능하게 하는 파일이 없으면 에러가 남
```
docker run [image name] ls
```

## 2. 컨테이너들 나열하기
* 컨테이너 나열
```
docker ps
```

* 이미지 설명

|   name   |       description       |
|:--------:|-------------------------|
|CONTAINER ID| 컨테이너의 고유한 아이디 해쉬값|
|  IMAGE  | 컨테이너 생성시 사용한 도커이미지|
| COMMAND | 컨테이너 시작시 실행될 명령어. 별도 설정 X|
| CREATED | 컨테이너가 생성된 시간|
| STATUS | 컨테이너의 상태. 실행중은 Up, 종료는 Exited, 일시정지 Pause|
|PORTS| 컨테이너가 개방한 포트와 호스트에 연결한 포트. 특별한 설정을 하지 않은 경우 출력 X|
|NAMES| 컨테이너의 고유한 이름. --name 옵션으로 이름을 설정하지 않으면 도커엔진이 임의로 설정. 이름 변경 명령어 `docker rename original-name changed-name`|

* 원하는 항목만 보기
```
docker ps --format 'table{{.Names}}\table{{.Image}}'
```

* 모든 컨테이너 나열
```
docker ps -a
```

## 3. 도커 컨테이너의 생명주기
* 생명주기 - `생성(Create) => 시작(Start) => 실행(Running) => 중지(Stopped) => 삭제(Deleted)`
  * 생성 - `docker create [image name]`
  * 시작 - `docker start [시작할 컨테이너 아이디/이름]`
  * 실행 - `docker run [이미지 이름]` = 생성 + 시작
  * 중지 - `docker stop [중지할 컨테이너 아이디/이름]`
  * 삭제 - `docker rm [삭제할 컨테이너 아이디/이름]`

## 4. Docker Stop vs Docker Kill
* 공통점
  * 둘다 실행중인 컨테이너를 중지 시킴

* 차이점
  * Stop(`docker stop [중지할 컨테이너 아이디/이름]`) - Gracefully하게 중지를 시킵니다. 자비롭게 그동한 하던 작업들을 완료하고 컨테이너를 중지 시킴
  * Kill(`docker kill [중지할 컨테이너 아이디/이름]`) - Stop과 달리 어떠한 것도 기다리지 않고 바로 컨테이너를 중지 시킴


## 5. 컨테이너 삭제하기
* 삭제 - `docker rm [삭제할 컨테이너 아이디/이름]`
  * 실행중인 컨테이너를 중지 한 후, 삭제 가능
* 모든 컨테이너 삭제 - ``` docker rm `docker ps -a -q` ```(백틱 써야됨)
* 도커 이미지 삭제 - `docker rmi [image id]`
* 컨테이너, 이미지, 네트워크 모두 삭제 - `docker system prune`
  * 도커를 쓰지 않을때 모두 정리하고 싶을때 사용해주면 좋음
  * 실행중인 컨테이너에는 영향을 주지 않는다.

## 6. 실행 중인 컨테이너에 명령어 전달
* 실행중인 컨테이너 명령어 전달 - `docker exec [container id] [명령어]`
* `docker run`은 **새로운 컨테이너**를 만들어서 실행
* `docker exec`은 **실행중인 컨테이너**에 명령어를 전달

## 7. 레디스를 이용한 컨테이너 이해
* 레디스는 서버가 먼저 작동해야함. 그래야 redis-cli 실행가능
* 레디스의 서버가 컨테이너 안에서 작동중이기 때문에, redis-cli 또한 컨테이너 안에서 실행시켜야 함
* exec을 이용 - `docker exec -it [container id] redis-cli`
  * it - 명령어를 실행한 후 게속 명령어를 적을 수 있다.

## 8. 실행 중인 컨테이너에서 터미널 생활 즐기기
* 실행중인 컨테이너의 쉘환경 접속 - `docker exect -it [container id] [sh | bash | zsh | powershell]`
* 실행중인 컨테이너의 쉘환경 접속 나가기 - `ctrl + d`
