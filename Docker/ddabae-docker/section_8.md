## 8. 도커 컨테이너 스토리지
### 8.1 컨테이너 볼륨
* 컨테이너 이미지는 readonly(수정이 불가능한 상태)
* 컨테이너에 추가되는 데이터들은 별도의 RW 레이어에 저장

### 8.2 데이터를 보존하는 방법
* 컨테이너가 만들어주는 데이터를 영구적 보존 - 볼륨 마운트(실제 host 컴퓨터에 데이터가 쌓이게 한다. 컨테이너를 실수로 삭제해도 호스트의 db 데이터는 남는다)
  ```
  dokcer run -d --name db -v /dbdata:/var/lib/mysql -e MYSQL_ALLOW_EMPTY_PASSWORD=pass mysql:latest
  ```

* volume 옵션 사용
  ```
  -v [host path]:[container mount path]
  -v [host path]:[container mount path]:[read write mode]
  -v [container mount path]
  ```

### 8.3 컨테이너끼리 데이터 공유하기
```
docker run -v /webdata:/webdata -d --name df smlinux/df:latest
docker run -d -v /webdata:/usr/share/nginx/html:ro -d ubuntu:latest
```

### 8.4 실습
* mysql db data 영구 보존하기
  ```sh
  # -v [host path]:[container mount path] - 볼륨 마운트를 통해 연결하여 mysql 데이터들이 /dbdata에 영구적으로 보존
  docker run -d --name db -v /dbdata:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=pass mysql:latest
  docker exec -it db /bin/bash
  mysql -u root -ppass
  show databases;
  create database ttabae;
  exit
  cd /dbdata
  ls
  ```

  ```sh
  # -v [container mount path] - 볼륨 마운트를 통해 연결하여 mysql 데이터들이 /dbdata에 영구적으로 보존. mac의 경우 preference/resource/fileshare에서 경로를 추가해주어야 한다
  docker run -d --name db -v /var/lib/mysql -e MYSQL_ROOT_PASSWORD=pass mysql:latest
  # Mounts[0].Source 확인
  docker inspect db
  ```

  * 볼륨 확인
    ```
    docker volume ls
    ```
  * 볼륨 삭제
    ```
    docker volume rm [volume name]
    ```

* 웹 데이터 readonly 서비스로 지원하기
  * `-v [host path]:[container path]:[read write mode]`
  ```sh
  mkdir /webdata
  cd /webdata
  # index.html 생성
  docker run -d --name web -v /webdata:/var/share/nginx/html:ro -p 80:80 nginx:latest
  ```

* 컨테이너끼리 데이터 공유하기
  * df.sh
    ```sh
    #!/bin/bash
    mkdir -p /webdata
    while true
    do
      df -h / > /webdata/index.html
      sleep 10
    done
    ```
  * dockerfile
    ```Dockerfile
    FROM unbuntu:18.04
    ADD df.sh /bin/df.sh
    RUN chmod +x /bin/df.sh
    ENTRYPOINT ["/bin/df.sh"]
    ```
  
  * 빌드
    ```
    docker build -t username/df:latest
    ```

  * 공유하기
    ```
    docker run -d --name df -v /webdata:/webdata username/df:latest
    # 웹페이지에서 데이터 공유
    docker run -d --name web -v /webdata:/usr/share/nginx/html:ro -p 80:80 nginx:latest
    ```
