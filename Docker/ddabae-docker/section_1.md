## 1. 컨테이너이와 도커의 이해(컨테이너가 뭐에요?)
### 1.1 왜 컨테이너를 배워야 하나요?
* 소프트웨어 운영 플랫폼이 바뀌고 있음(시대가 컨테이너 환경을 요구하고 있음)
  * Bare Metal -> Virtualization -> Any Infrastructure
* 컨테이너 - app을 동작시키는데 필요한 환경(라이브러리 등등)을 설치한 독립된 공간

### 1.2 왜 굳이 리눅스에서 돌려요?
* 컨테이너는 리눅스 커널의 기능을 가지고 만들어 졌음. 리눅스 커널 기능을 써야하기 때문에 리눅스에서 사용
* 리눅스 커널의 기능
  * chroot - 독립된 공간 형성
  * namespace - isolate 기능 지원
  * cgroup - 필요한 만큼 HW 지원
* windows나 macos에서는 리눅스 커널이 없기 때문에 hypervisor 활성화

### 1.3 일반 프로그램과 컨테이너는 어떻게 다른가요?
* 하는 일은 똑같지만, 생긴 모양이 다르다
  * app.js
  ```js
  const http = require('http')
  const os = require('os')
  console.log('Test server starting...')
  const handler = (req, res) => {
    res.writeHead(200)
    res.end(`Container Hostname: ${os.hostname()}\n`)
  }
  const www = http.createServer(handler)
  www.listen(8080)
  ```
* 컨테이너는 도커를 이용하여 빌드
  * Dockerfile
  ```
  FROM node:12
  COPY app.js /app.js
  ENTRYPOINT ['node', 'app.js']
  ```

### 1.4 왜 쓰나요?
* 개발자가 만든 그대로 어디서든 돌릴 수 있다
* 확장/축소(scale out, scale in)가 쉽고, MSA, DevOps에 적합
