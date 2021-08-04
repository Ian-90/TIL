## 5. 컨테이너 보관창고
### 5.1 컨테이너 보관 창고(Registry)
* Registry - 컨테이너 이미지를 저장하는 저장소
* Docker Hub - hub.docker.com
* Private Registry - 사내의 컨테이너 저장소

### 5.2 docker hub(registry)를 사용하기
* hub.docker.com 회원가입 및 로그인
* 이미지 검색
  * 사이트에서 직접 검색
  * cli
    ```
    docker search [keyword]
    ```

### 5.3 Private Registry를 사용하기
* 사내에서 private registry 만들기
  * registry 컨테이너를 이용
  ```
  docker run -d 5000:5000 --restart always --name registry registry:2
  ```

  * image repository - hub에서 push나 pull할 때 컨테이너 repository 이름을 hostname 및 port number를 사용해야 한다
  ```
  localhost:5000/ubuntu:18.04
  ```

### 5.4 실습
* Public Registiry 사용
  * 이미지 검색
    ```
    docker search [image name]
    ```
  
  * 이미지 다운
    ```
    docker pull [image name]
    ```

  * 이미지 확인
    ```
    docker images
    ```
  
  * tag 변경
    ```
    docker tag [원래 image name] [accounts/image name]
    ```
  
  * docker hub에 이미지 업로드
    ```
    docker push [image name]
    ```

* Private Registry 사용
  * registry 이미지 컨테이너 사용
    ```
    docker run -d 5000:5000 --restart always --name registry registry:2
    ```

  * 동작중인 컨테이너 확인
    ```
    docker ps
    ```

  * 태그 이름바꾸기 - 이름우리가 만든 저장소에 업로드할 때는 이름이 중요
    ```
    docker tag [기존 image name] [hostname:portnumber/image name]
    ```

  * 업로드한 이미지 화인 - `ls /var/lib/docker/volumes/[uuid]/_data/docker/registry/v2/repositories/`
