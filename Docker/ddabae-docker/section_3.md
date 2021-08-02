## 3. 도커 컨테이너 살펴보기
### 3.1 컨테이너와 컨테이너 이미지의 구조
* [컨테이너](https://docs.docker.com/get-started/#what-is-a-container) - 하나의 애플리케이션 프로세스. 하드웨어 리소스가 독립된 공간으로 분리되어 운영된다.
* [컨테이너 이미지](https://docs.docker.com/get-started/#what-is-a-container-image) - 여러 개의 레이어로 구성되어 하나의 애플리케이션이 잘 실행될 수 있도록 모아져 있는 이미지들의 조합
* 컨테이너와 컨테이너 이미지의 다른 점
  * 컨테이너 이미지는 하드디스크에 파일별로 저장되어 있다(저장된 상태, readonly)
  * 컨테이너는 저장된 이미지들을 실행 하는 곳(host입장에서는 단순히 동작중인 process)

### 3.2 컨테이너 동작 방식
![도커 아키텍쳐](./assets/docker_architecture.svg)
* hub.docker.com - 이미지들이 저장되어 있는 창고
* docker host - 도커 데몬이 동작되고 있는 시스템
* docker daemon - 내가 설치한 도커
* docker client command - 도커 데몬에게 작업 요청하는 명령어
* docker hub - 이미지들이 저장되어있는 곳(직접 만들어 쓸 수도 있음)
* container images - 이미지 레이어별로 따로 저장되는 것
* container - 실제 이미지들이 동작되면 하나의 프로세스 형태로 동작되는 것

### 3.3 실습
1. Docker Hub에서 컨테이너 이미지 검색
  ```
  docker search [image name]
  ```
2. 컨테이너 이미지 다운로드 후 image layer 보기
  * 이미지 다운
  ```
  docker pull [image name]
  ```

  * 이미지 확인
  ```
  docker images
  ```
3. 컨테이너 실행하고 확인해보기
  * 이미지 실행
  ```
  doc
  docker run --name [name] -dp 80:80 [image name]
  ```

  * 동작중인 컨테이너 확인
  ```
  docker ps
  ```

  * 중단
  ```
  docker [name]
  ```

  * 컨테이너 삭제
  ```
  docker rm web
  ```

  * 이미지 삭제
  ```
  docker rmi [image name]
  ```