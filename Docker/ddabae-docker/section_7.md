## 7. 컨테이너 리소스를 관리하기
### 7.1 컨테이너 하드웨어 리소스 제한 하는 방법
* 기본으로 컨테이너는 호스트 하드웨어 리소스의 사용 제한을 받지 않는다
* Docker command를 통해 제한할 수 있는 리소스
  * CPU
  * Memory
  * Disk I/O(Block I/O)

* Memory 리소스 제한
  * 제한 단위는 b, k, m, g로 할당
    | 옵션 | 의미 |
    |-----|-----|
    |`--memory, -m`|컨테이너가 사용할 최대 메모리 양을 지정|
    |`--memory-swap`|컨테이너가 사용할 스왑 메모리 영역에 대한 설정. 메모리+스왑 생략시 메모리의 2배가 설정됨|
    |`--memory-reservation`|--memory 값보다 적은 값으로 구성하는 소프트 제한 값 설정|
    |`--oom-kill-disable`|OOM Killer가 프로세스 kill하지 못하도록 보호|
    ```
    docker run -d -m 512m nginx:1.14
    docker run -d -m 1g --memory-reservation 500m nginx:1.14
    docker run -d -m 200m --memory-swap 300m nginx:1.14
    docekr run -d -m 200m --oom-kill-disable nginx:1.14
    ```

* CPU 리소스 제한
  | 옵션 | 의미 |
  |-----|-----|
  |`--cpus`|컨테이너에 할당할 CPU core수를 지정. --cpus="1.5" 컨테이너가 최대 1.5개의 CPU 파워 사용가능|
  |`--cpuset-cpus`|컨테이너가 사용할 수 있는 CPU나 코어를 할당. cpu index는 0부터. --cpuset-cpus=0-4|
  |`--cpu-share`, `-c`|컨테이너가 사용하는 CPU qlwnddmf 1024값을 기반으로 설정. --cpu-share 2048 기본 값보다 두 배 많은 CPU 자원을 할당|
  ```
  docker run -d --cpus=".5" nginx:1.14
  docker run -d --cpu-shares 2048 nginx:1.14
  docker run -d --cpuset-cpus 0-3 nginx:1.14
  ```

* Block I/O 제한
  | 옵션 | 의미 |
  |-----|-----|
  |`--blkio-weight`, `--blkio-weight-device`|Block IO의 Quota를 설정할 수 있으며 100 ~ 1000까지 선택. defautl 500|
  |`--device-read-bps`, `--device-write-bps`|특정 디바이스에 대한 읽기와 쓰기 작업의 초당 제한을 kb, mb, gb 단위로 설정|
  |`--device-read-iops`, `--device-write-iops`|컨테이너의 read/write 속도의 쿼터를 설정한다. 초당 quota를 제한해서 I/O를 발생시킴. 0 이상의 정수로 표기. 초당 데이터 전송량 = IOPS * 블럭크기(단위 데이터 용량)|
  ```
  docker run -it --rm --blkio-weight 100 ubuntu /bin/bash
  docker run -it --rm --device-write-bps /dev/vda:1mb ubuntu /bin/bash
  docker run -it --rm --device-write-bps /dev/vda:10mb ubuntu /bin/bash
  docker run -it --rm --device-write-iops /dev/vda:10 ubuntu /bin/bash
  docker run -it --rm --device-write-iops /dev/vda:100 ubuntu /bin/bash
  ```

### 7.2 컨테이너 사용 리소스를 확인하는 모니터링 툴
* docker monitoring commands
  * `docker stat [options] [container name]` - 실행중인 컨테이너의 런타임 통계를 확인
  * `docker event` - 도커 호스트의 실시간 event 정보를 수집해서 출력
    ```
    docker events -f container=[name]
    docker image -f container=[name]
    ```
* cAdivisor

### 7.3 실습
* 컨테이너 리소스 제한
  * 메모리 리소스 제한
    ```
    docker run -m 100m --memory-swap 200m stress:latest stress -vm 1 --vm-bytes 90m -t 5s
    docker run -m 100m --memory-swap 100m stress:latest stress -vm 1 --vm-bytes 150m -t 5s
    docker run -m 100m --memory-swap stress:latest stress -vm 1 --vm-bytes 150m -t 5s
    ```

  * OOM-Killer 보호
    ```
    docker run -d -m 100M --name m4 --oom-kill-disable=true nginx
    ```

  * CPU 리소스 제한
    ```sh
    # CPU 개수를 제한하여 컨테이너를 실행
    docker run --cpuset-cpus 1 --name c1 -d stress stress --cpu 1
    top
    docker run --cpuset-cpus 0-1 --name c2 -d stress stress --cpu 1
    top
    docker rm c1

    # 컨테이너별로 CPU 상대적 가중치를 할당하여 실행
    docker run -c 2048 --name cload1 -d stress:latest
    docker run --name cload2 -d stress:latest
    docker run -c 512 --name cload3 -d stress:latest
    docker run -c 512 --name cload4 -d stress:latest
    ```
  
  * Block I/O 제한
    ```
    docker run -it --rm --device-write-iops /dev/vda:10 ubuntu:latest /bin/bash
    ```
* 컨테이너 모니터링 하기
  ```
  docker stats [container name]
  ```

* [cAdvisor](https://github.com/google/cadvisor) 설치해서 사용하기
  * 설치
  ```
  VERSION=v0.36.0 # use the latest release version from https://github.com/google/cadvisor/releases
  sudo docker run \
    --volume=/:/rootfs:ro \
    --volume=/var/run:/var/run:ro \
    --volume=/sys:/sys:ro \
    --volume=/var/lib/docker/:/var/lib/docker:ro \
    --volume=/dev/disk/:/dev/disk:ro \
    --publish=8080:8080 \
    --detach=true \
    --name=cadvisor \
    --privileged \
    --device=/dev/kmsg \
    gcr.io/cadvisor/cadvisor:$VERSION
  ```

  * [접속](https://github.com/google/cadvisor/blob/master/docs/web.md)
