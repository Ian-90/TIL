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

## 3. 디플로이먼트(Deployment)
* deployment.yaml
  ```yml
  apiVersion: apps/v1
  kind: Deployment
  metadata:
    labels:
      app: deploy-nginx
    name: deploy-nginx
  spec:
    replicas: 3 ## ReplicaSet을 몇 개 생성할지를 결정
    selector: ## 템플릿을 선택
      matchLabels:
        app: po-nginx
    template: ## 템플릿
      metadata:
        labels:
          app: po-nginx
      spec: ## 템플릿에서 사용할 컨테이너 이미지 지정
        containers:
        - name: nginx
          image: nginx
  ```

* 실습
```
kubectl apply -f _Lecture_k8s_learning.kit/ch3/3.3/deployment.yaml
kubectl get pod
```

## 4. 레플리카셋(ReplicaSet)
* replicaset.yaml
  ```yml
  apiVersion: appls/v1
  kind: ReplicaSet
  metadata:
    labels:
      app: rs-nginx
    name: rs-nginx
  spec:
    replicas: 3
    selector:
      matchLabels:
        app: po-nginx
    template:
      metadata:
        labels:
          app: po-nginx
      spec:
        containers:
        - image: nginx
          name: nginx
  ```

* replicaset이 아닌 deployment를 쓰는 이유
  * 컨테이너 버전 업데이트를 할 때, 롤링 업데이트를 하기 때문. deployment를가 replicaset을 만들고, replicaset이 복제본을 만들어서 업데이트

* 실습
```
kubectl apply -f _Lecture_k8s_learning.kit/ch3/3.4/replicaset.yaml
kubectl get pod
kubectl get replicasets.apps
kubectl get deployments.apps
kubectl delete replicasets.apps rs-nginx
```

## 5. 커맨드(command)와 인자(args)
```yaml
...
spec:
  containers:
  ...
    command: ['/bin/sh', '-c']
    args:
    - |
      echo run multiple-command-w-args
      echo add commentary
      sleep 3600
```

* command - 컨테이너에서 실행되는 커맨드
* args - 커맨드에 전달되는 인자들
* 컨테이너에 명령이 필요한 이유
  1. 컨테이너를 계속 동작하게 하고 싶을 때
  ```
  kubectl apply -f _Lecture_k8s_learning.kit/ch3/3.5/simple-wo-command.yaml
  kubectl get pod -w
  kubectl delete pod simple-wo-command
  kubectl apply -f _Lecture_k8s_learning.kit/ch3/3.5/simple-command.yaml
  kubectl get pod -w
  kubectl exec simple-command -it -- /bin/bash
  nslookup kubernetes
  ```

  2. 사용자가 원하는 명령을 내리고 싶을 때
  ```
  kubectl apply -f _Lecture_k8s_learning.kit/ch3/3.5/multiple-command-v1.yaml
  kubectl get pod
  kubectl logs multiple-command-v1
  ```
