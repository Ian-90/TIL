## 1. 쿠버네티스 파드에 문제가 생겼다면
* 파드를 실수로 지웠다면?
  * 파드만 배포된 경우
    * 단일 객체로 존재하기 때문에 지우면 난감한 상황 발생
  * 디플로이먼트 형태로 배포된 파드
    * 지우면 새로운 파드를 생성

* 실습
  ```
  kubectl apply -f ~/_Lecture_k8s.starterkit/ch4/4.1
  kubectl get pods
  kubectl delete pod del-pod ## 파드만 삭제
  kubectl get pods
  kubectl delete pod del-deploy-[hash id]-[hash id]
  kubectl get pods ## 새로운 파드가 생성된 것을 확인 가능
  kubectl delete deployment del-deploy ## deployment 삭제
  kubectl get pods
  ```

## 2. 쿠버네티스 워커 노드의 구성 요소에 문제가 생겼다면
* 실제로 파드가 배포되는 워커노드 kubelet 중단
  * 워커노드
    ```
    systemctl stop kubelet
    systemctl status kubelet
    ```

  * 마스터노드
    ```
    kubectl apply -f ~/_Lecture_k8s.starterkit/ch4/4.1/del-deploy.yaml
    kubectl get pods -o wide ## kubelet이 종료된 워커노드만 Pending 상태
    ```
  * kubelet이 죽은 경우, api-server에 알려줄 수 없기 때문에 pending 상태

* 컨테이너 런타임(도커) 중단
  * 워커노드
    ```
    systemctl stop docker
    systemctl status docker
    ```
  * 마스터 노드
    ```
    kubectl scale deployment del-deploy --replicas=6
    kubectl get pods -o wide ## 컨테이너 런타임이 중단된 워커노드에 배포하지 않는다
    ```
  * 컨테이너 런타임에 문제가 생긴 경우, kubelet이 api-server에 알려주고 스케줄러가 문제가 생긴 컨테이너 런타임에 배포를 스케줄링 하지 않음

* 추가 배포를 통해 스케줄러 역할 확인
  * 컨테이너 런타임이 중단된 워커 노드
    ```
    systemctl start docker
    ```
  
  * 마스터 노드
    ```
    kubectl scale deployment del-deploy --replicas=9
    kubectl get pods -o wide ## 스케줄러가 균형있게 pod들을 배포
    ```
