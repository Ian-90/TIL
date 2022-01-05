## 1. 쿠버네티스 실습 환경 업그레이드
* 쿠버네티스 버전 및 메모리 용량 변경
  * 쿠버네티스 - `k8s_V = '1.22.0'`
  * 메모리
    ```
    vb.memory = 2048 ## 마스터노드
    vb.memory = 1536 ## 워커노드
    ```

* k_cfg_n_git_clone.sh를 마스터노드에 포함
* 새로운 쿠버네티스 클러스터 구축
  * `cd ch2.1`
  * `vagrant up`
  * `kubectl get node`로 버전 확인
  * `kubectl run nginx --image=nginx`로 배포 확인

## 2. 혼동되는 용어 정리(Pod/파드, 컨테이너, 애플리케이션)
* 파드, 컨테이너
  * 구조적인 단위

* 애플리케이션
  * nginx, mysql 등등 파드, 컨테이너의 관점과 다르게 동작하는 단위, 기능의 단위
  * 단일컨테이너 또는 복수의 컨테이너가 될 수 있음
  * 파드랑 1:1 매핑이 될 수 있고, 여러 개의 파드로 동작하는 애플리케이션이 될 수 있음

## 3. 자주 쓰이는 kubectl 옵션 명령어(get, run, create, apply, delete, exec, scale, edit) 복습
* get - 오브젝트 조회
* run, create, apply - 오브젝트 생성
* delete - 오브젝트 삭제
* exec - 파드 내부에 컨테이너로 접속
* scale - 파드 갯수를 늘리거나 줄임
* edit - 배포된 오브젝트를 수정

## 4. 자주 쓰이는 kubectl 옵션 명령어(-o yaml, --dry-run=client) - 1
* 코드를 확인하는 명령어
  * `-o yaml` - 배포된 오브젝트의 yaml 코드 출력
  * 실습
    ```
    kubectl run nginx --image-nginx -o yaml
    ```

* 코드를 생성하는 명령어
  * `--dry-run=client` - 실행이 된 것 처럼 코드를 보여줌
  * 실습
    ```
    kubectl run nginx --image-nginx --dry-run=client -o yaml
    ```
