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
