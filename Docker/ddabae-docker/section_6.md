## 6. 컨테이너 사용하기
### 6.1 컨테이너 이미지 사용하기
* 이미지 검색 - `docker search [option] [image name:tag]`
* 이미지 다운로드 - `docker pull [option] [image name:tag]`
* 다운 받은 이미지 목록 출력 - `docker images`
* 다운 받은 이미지 상세보기 - `docker inspect [option] [image name:tag]`
* 이미지 삭제 - `docker rmi [option] [image name]`

### 6.2 컨테이너를 실행하고 종료하기
* 컨테이너 생성 - `docker create [option] [image name:tag]`
  ```
  docker create --name webserver nginx:1.14
  ```
* 컨테이너 실행 - `docker start [option] [container name]`
  ```
  docker start webserver
  ```
* 컨테이너 생성/실행 - `docker run [option] [image name:tag]`
  ```
  docker run --name webserver -d nginx:1.14
  ```
* 실행중인 컨테이너 목록 확인 - `docker ps`
* 동작중인 컨테이너 중지 - `docker stop [option] [container name]`
  ```
  docker stop webserver
  ```
* 컨테이너 삭제 - `docker rm [option] [container name]`


### 6.3 동작중인 컨테이너를 관리하는 명령어
* 실행중인 컨테이너 목록 확인 - `docker ps [option]`
* 포그라운드로 실행중인 컨테이너에 연결 - `docker attach [option] [container name]`
* 동작중인 컨테이너에 NEW 명령어 추가 실행 - `docker exec [option] [container name]`
  ```
  docker attch centos
  docker exec -it webserver /bin/bash
  ```
* 컨테이너에서 동작되는 프로세스 확인 - `docker top [option] [container name]`
  ```
  docker top
  ```
* 동작중인 컨테이너가 생성한 로그 보기- `docker logs [option] [container name]`
  ```
  docker logs
  docker logs -f
  ```

### 6.4 실습
* 컨테이너 이미지 사용
  ```sh
  docker search nginx
  docker pull nginx:1.14
  docker images
  # 이미지 아이디 풀네임 표시
  docker images --no-trunc
  ```

* 컨테이너 실행
  ```sh
  docker ps
  docker create --name webserver nginx:latest
  docker start webserver
  # 동작중인지 확인
  docker ps -a
  docker inspect webserver
  docker inspect --format '{{.NetworkSettings.IPAddress}}' webserver
  docker stop webserver
  docker rm webserver
  ```
