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
