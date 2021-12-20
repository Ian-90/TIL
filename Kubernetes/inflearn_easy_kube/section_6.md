## 1. 쿠버네티스에서 오브젝트란
* 오브젝트
  * 모두 상태를 가지고 있다
  * 추구하는 상태를 기술해 둔 것

* 추구하는 상태와 현재 상태 확인
  ```
  kubectl get pods
  kubectl edit deployment del-deploy
  ```
  * spec은 추구하는 상태이고, status는 현재 상태

## 2. 쿠버네티스 기본 오브젝트
* 기본 오브젝트
  * 파드
    * api, etcd, scheduler, ...
  * 서비스
    * NodePort, LoadBalancer, ...
  * 네임스페이스
    * default
    * kube-system
  * 볼륨
    * 영속적인 데이터 보존
    * 볼륨 실습
      ```
      kubectl delete deployment del-deploy
      ~/_Lecture_k8s.starterkit/ch5/5.2/nfs-exporter.sh log
      cat /etc/exports
      ls /nfs_shared/
      cat ~/_Lecture_k8s.starterkit/ch5/5.2/dpy-chk-log.yaml
      kubectl apply -f ~/_Lecture_k8s.starterkit/ch5/5.2/dpy-chk-log.yaml
      kubectl get pods -o wide
      curl [ip 주소] ## 접속을 시도하여 로그 기록 생성
      kubectl exec [접속을 시도할 pod 명] -it -- /bin/bash
      ls audit ## 생성된 audit 로그 확인
      exit
      kubectl delete -f ~/_Lecture_k8s.starterkit/ch5/5.2/dpy-chk-log.yaml
      kubectl get pods
      kubectl apply -f ~/_Lecture_k8s.starterkit/ch5/5.2/dpy-chk-log.yaml ## 다시 생성후 기존의 접속기록을 확인하면 audit에서 로그가 확인된다.
      ```
