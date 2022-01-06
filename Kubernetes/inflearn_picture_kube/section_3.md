## 1. 애플리케이션으로 배포되는 오브젝트 형태
* 기본 오브젝트
  * 파드
    * 디플로이먼트
    * 레플리카셋
    * 잡
    * 크론잡
    * 데몬셋
    * 스테이트풀셋
  * 서비스
  * 네임스페이스
  * 볼륨

## 2. 파드(Pod)
* pod.yaml
  ```yml
  apiVersion: v1 ## 배포에 적합한 api 버전 명시
  kind: Pod ## 오브젝트 종류
  metadata: ## 정보 데이터
    labels:
      run: po-nginx ## 오브젝트의 레이블
    name: po-nginx ## 오브젝트의 이름
  spec: ## 실제로 배포할 컨테이너의 여러가지 값들
    containers:
    - image: nginx ## 컨테이너 이미지
      name: nginx ## 컨테이너 이미지 이름
  ```

* 실습 - 베이그런트로 실행 후
```
kubectl apply -f _Lecture_k8s_learning.kit/ch3/3.2/pod.yaml
kubectl get pod
kubectl delete -f pod po-nginx
```
