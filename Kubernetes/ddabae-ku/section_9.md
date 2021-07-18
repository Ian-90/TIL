## 1. 레이블
### 1.1 [레이블](https://kubernetes.io/ko/docs/concepts/overview/working-with-objects/labels/)이란?
* Node를 포함하여 pod, deployment 등 **모든 리소스에 할당**
* 리소스의 특성을 분류하고, Selector를 이용하여 선택
* Key-value 한쌍으로 적용
  * key - Controller들이 Pod를 관리할 때 자신이 관리해야 할 파드를 구분하는 역할 
* 사용자가 클러스터 안에 오브젝트를 만들 때 메타데이터로 설정 가능

### 1.2 Label과 Selector 구성
* Label
```yml
...
metadata:]
  labels:
    rel: stable
    name: mainui
```

* Selector
```yml
selector:
  matchLabels:
    key: value
  matchExpressions:
    - { key: name, operator: In, values: [mainui] }
    - { key: rel, operator: NotIn, values: ['beta', 'canary'] }
```

### 1.3 실습
* testpod.yaml
```yml
apiVersion: v1
kind: Pod
metadata:
  name: pod-demo
  labels:
    environment: production
    app: nginx
spec:
  containers:
  - name: nginx
    image: nginx:1.14
    ports:
    - containerPort: 80
```

* label 확인
```
kubectl get pods --show-labels
```

* label명이 같은 pod 출력
```
kubectl get pods -l name=[label name]
```

* cli로 label 설정 - label이 있다면 `--overwrite` 옵션 추가
```
kubectl label [object] [object name] [key]=[value]
```

## 2. 워커 노드에 레이블 설정
### 2.1 Node Label
* Worker Node의 특성을 Label로 설정
```
kubectl label nodes [node name] [label key]=[label value]
```
* 노드를 선택해서 파드를 배치할 수 있다

### 2.2 실습
* testpod.yaml
```yml
apiVersion: v1
kind: Pod
metadata:
  name: testpod
spec:
  containers:
  - name: nginx
    image: nginx:1.14
  nodeSelector:
    key1: value1
    key2: value2
```

* label 확인
```
kubectl get nodes --show-labels
kubectl get nodes -L [label name]
```

* label 생성 및 변경
```
kubectl label node [name] key=value
kubectl label node [name] key=value --overwrite
```

* label 제거
```
kubectl label node [name] key-
```

## 3. 레이블과 애너테이션
### 3.1 Annotation
* Label이 동일하게 key-value를 통해 리소스의 특성을 기록
* 쿠버네티스에게 특정 정보 전달할 용도로 사용
  * 예를 들어 Deployment의 rolling update 정보기록
  ```yml
  annotations:
    kubernetes.io/change-cause: version 1.15
  ```
* 관리를 위해 필요한 정보를 기록할 용도로 사용
  * 릴리즈, 로깅, 모니터링에 필요한 정보들을 기록
  ```yml
  annotations:
    builder: "test(test@gmail.com)"
    buildData: "20210502"
    imageRegistry: https://hub.docker.com
  ```

### 3.2 실습
* anonpod.yaml
```yml
apiVersion: v1
kind: Pod
metadata:
  name: anon-pod
  annotations:
    imageregistry: "https://hub.docker.com"
spec:
  containers:
  - name: nginx
    image: nginx:1.14
```

## 4. 레이블을 이용한 카나리 배포
### 4.1 [카나리배포](https://kubernetes.io/ko/docs/concepts/cluster-administration/manage-deployment/#%EC%B9%B4%EB%82%98%EB%A6%AC-canary-%EB%94%94%ED%94%8C%EB%A1%9C%EC%9D%B4%EB%A8%BC%ED%8A%B8)란?
* 포드를 배포(업데이트)하는 방법
  * 블루 그린 업데이트 - 기존에 실행된 Pod 개수와 같은 개수의 신규 Pod를 모두 실행한 후 신규 Pod가 정상적으로 실행됐는지 확인하고, 그 후 트래픽을 한꺼번에 신규 Pod쪽으로 옮김.
  * 카나리 업데이트
  * 롤링 업데이트 - 배포된 Pod를 일정 개수씩 교체하면서 배포하는 방법
* Canary 배포
  * 기존 버전을 유지한 채로 일부 버전만 신규 버전으로 올려서 신규 버전에 버그나 이상은 없는지 확인

### 4.2 실습
* mainui-stable.yaml(blue)
```yml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: mainui-stable
spec:
  replicas: 2
  selector:
    matchLabels:
      app: mainui
      version: stable
  template:
    metadata:
      labels:
        app: mainui
        version: stable
    spec:
      containers:
      - name: mainui
        image: nginx:1.14
        ports:
        - containerPort: 80
```

* mainui-canary.yaml(green)
```yml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: mainui-canary
spec:
  replicas: 1
  selector:
    matchLabels:
      app: mainui
      version: canary
  template:
    metadata:
      labels:
        app: mainui
        version: canary
    spec:
      containers:
      - name: mainui
        image: nginx:1.15
        ports:
        - containerPort: 80
```

* mainui-svc.yaml(서비스 - 단일 진입점)
```yml
apiVersion: v1
kind: Service
metadata:
  name: mainui-svc
spec:
  selector:
    app: mainui
  ports:
  - port: 8080
    protocol: TCP
    targetPort: 8080
```
