## 1. 컨테이너란?
### 1.1 정의
* Linux 커널과 함께 Cgroups및 네임스페이스와 같은 커널의 기능을 사용하여 프로세스를 분리함으로써 독립적으로 실행하는 곳
* 코드와 모든 종속성을 패키지화하여 응용 프로그램이 한 컴퓨터 환경에서 다른 컴퓨팅 환경으로 빠르고 안정적으로 실행되도록 하는 소프트웨어 표준 단위

### 1.2 컨테이너 예시
  * 컨테이너를 동작시킬 플랫폼 - 도커
  * app.js
  ```js
  const http = require('http')
  const os = require('os')
  console.log('Test server starting...')
  http.createServer((req, res) => {
    res.writeHead(200)
    res.end(`Container Hostname: ${os.hostname()}`)
  }).listen(8080)
  ```

  * Dockerfile - 도커를 이용해 컨테이너 생성 가능
  ```docker
  FROM node:12
  COPY app.js
  ENTRYPOINT ['node', 'app.js']
  ```

### 1.3 도커의 아키텍쳐
![도커 아키텍쳐](./assets/section_1/docker_architecture.svg)
* 컨테이너 이미지 생성하기
  * webserver 컨테이너 생성
  * 도커 설치
  * 컨테이너 빌드
  * 저장소 저장

* 컨테이너 실행
  * 도커 이미지 다운
  * 실행

### 1.4 가상머신 vs 컨테이너
* 가상머신
  ![vm](./assets/section_1/vm.png)
  * 가장 적당한 하드웨어를 넣어서 운영
  * 하이퍼바이저 위에 가상 머신마다 게스트 운영체제가 있고 그 위에 앱이 위치
  * 하나의 가상머신을 동작시키기 위해서 OS가 설치되어야한다. 리소스가 많이 든다.

* 컨테이너
  ![containers](./assets/section_1/containers.png)
  * 호스트 운영체제 위에 도커 설치, 도커 위에 컨테이너
  * 실제 애플리케이션만 있기때문에 리소스가 적게 든다.
  * 호스트 운영체제를 공유함으로써 확장성도 빠르다.
  * 주목적은 배포

* **컨테이너가 구조상 레이어가 더 간단하므로 가상 머신보다 성능을 높이기 쉽다**

## 2. 컨테이너 오케스트레이션 시스템
## 2.1 컨테이너의 서비스 한계점
* 실제 상용서비스에서 컨테이너만 단독으로 사용할 때 시스템 전체가 다운된다면 컨테이너 또한 무용지물이 된다. 그래서 멀티호스트 도커 플랫폼이 나왔다. 하지만 모든 컨테이너를 일일히 엔지니어가 모니터링하고 배치하고 관리하는건 쉽지 않다.

## 2.2 컨테이너 오케스트레이션
![쿠버네티스 클러스터](./assets/section_1/kubernetes_components.svg)
* 컨테이너 오케스트레이션 시스템을 사용하면 수동 제어 부분을 모두 자동화하므로 시스템 운영이 수월해진다

## 3. 쿠버네티스
## 3.1 정의
* Kubernets는 배의 조타수란 그리스 단어에서 유래
* 구글에서 오랫동안 사용하면서 오픈 소스로 공개
* k와 s사이의 글자 개수가 8개이므로 k8s라고도 표기한다.
* 컨테이너화된 워크로드와 서비스를 관리하기 위한 이식성이 있고, 확장가능한 오픈소스 플랫폼

## 3.2 특징
* 선언적 API - 쿠버네티스가 준비 되어 있을 때, 웹서버 3개 실행해줘 - 이것이 바로 선언. 나머지는 쿠버네티스가 알아서 함
* 워크로드 분리 - 운영체제처럼 분산된 프로스세의 관리를 추상화하는 레이어
* 어디서나 실행 가능 - 웹, 온프레미스, 퍼블릭 클라우드 모두 사용 가능