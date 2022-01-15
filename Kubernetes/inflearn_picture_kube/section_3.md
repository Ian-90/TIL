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

## 6. 잡(Job)
* Job을 이루는 코드
  ```yml
  apiVersion: batch/v1
  kind: Job
  metadata:
    name: job-curl-succ
  spec:
    template:
      spec:
        containers:
        - name: net-tools
          image: sysnet4admin/net-tools
          command: ['curlchk', 'nginx']
        restartPolicy: Never ## 문제가 있으면 다시 시작하는 옵션
  ```

* Job의 기본 동작
  * 성공하는 경우
    ```
    kubectl apply -f _Lecture_k8s_learning.kit/ch3/3.6/0-nginx-svc.yaml
    kubectl get svc
    kubectl get pod
    kubectl apply -f _Lecture_k8s_learning.kit/ch3/3.6/1-1-job-curl-succ.yaml ## ngixn curl check
    kubectl get pod -w
    kubectl logs job-curl-succ--1-lnmpq ## pod 이름
    kubectl logs job-curl-succ--1-lnmpq
    ```

  * 실패하는 경우
    ```
    kubectl apply -f _Lecture_k8s_learning.kit/ch3/3.6/1-2-job-curl-fail.yaml
    kubectl get pod
    kubectl logs job-curl-fail--1-qnd6w
    ```

  * restartPolicy가 없는 경우 - 로그가 기록되지 않는다
    ```
    kubectl apply -f _Lecture_k8s_learning.kit/ch3/3.6/1-3-job-make-fail.yaml
    kubectl get pod
    kubectl logs job-curl-fail--1-qnd6w
    ```

* Job의 목적
  * 어떤 명령을 실행을 하고, 추후의 확인을 하고자 Complete 상태를 유지

* Job의 병렬 실행
  * job을 1개씩 순차적으로 확인
    ```yml
    apiVersion: batch/v1
    kind: Job
    metadata:
      name: job-completions
    spec:
      completions: 3
      template:
        spec:
          containers:
          - name: net-tools
            image: sysnet4admin/net-tools
            command: ['curlchk', 'nginx']
          restartPolicy: Never
    ```

  * job을 동시에 병렬적으로 3번을 확인
    ```yml
    apiVersion: batch/v1
    kind: Job
    metadata:
      name: job-parallelism
    spec:
      parallelism: 3
      template:
        spec:
          containers:
          - name: net-tools
            image: sysnet4admin/net-tools
            command: ['curlchk', 'nginx']
          restartPolicy: Never ## 문제가 있으면 다시 시작하는 옵션
    ```

  * 실습
    ```
    kubectl apply -f _Lecture_k8s_learning.kit/ch3/3.6/2-1-job-completions.yaml
    kubectl get pod -w ## 순차적으로 확인
    kubectl apply -f _Lecture_k8s_learning.kit/ch3/3.6/2-2-job-parallelism.yaml
    kubectl get pod -w ## 병렬적으로 동시에 확인
    ```

* Job의 자동 종료
  * job이 설정한시간 동안 동작하고 있다면 자동종료 - 예측되는 동작 이상으로 시간을 설정해주는 것이 좋음
    ```yml
    apiVersion: batch/v1
    kind: Job
    metadata:
      name: job-activedeadlineseconds
    spec:
      backoffLimit: 3
      activeDeadlineSeconds: 30
      template:
        spec:
          containers:
          - name: net-tools
            image: sysnet4admin/net-tools
            command: ['/bin/sh', '-c']
            args:
            - sleep 60;
              curlchk nginx;
          restartPolicy: Never
    ```

  * job이 종료되고 나서 설정한 시간 이후 종료 - 보통 이것을 쓰는 것이 좋다.
    ```yml
    apiVersion: batch/v1
    kind: Job
    metadata:
      name: job-ttlsecondsafterfinished
    spec:
      backoffLimit: 3
      ttlSecondsAfterFinished: 30
      template:
        spec:
          containers:
          - name: net-tools
            image: sysnet4admin/net-tools
            command: ['/bin/sh', '-c']
            args:
            - sleep 60;
              curlchk nginx;
          restartPolicy: Never ## 문제가 있으면 다시 시작하는 옵션
    ```

  * 실습
    ```
    kubectl apply -f _Lecture_k8s_learning.kit/ch3/3.6/3-1-job-activeDeadlineSeconds.yaml
    kubectl get pod -w
    kubectl apply -f _Lecture_k8s_learning.kit/ch3/3.6/3-2-job-ttlSecondsAfterFinished.yaml
    kubectl get pod -w
    ```

## 7. 크론잡(CronJob)
* 크론잡
  * 잡이 실행됬을 때, 반복적으로 작업해야 할 일이 있을 때 사용
  ```yml
  apiVersion: batch/v1
  kind: CronJob
  metadata:
    name: cj-1m-hist10-curl
  spec:
    schedule: "*/1 * * * *"
    successfulJobsHistoryLimit: 10 ## 10회까지 동작한 크론잡 보존
    jobTemplate:
      spec:
        template:
          spec:
            containers:
            - name: net-tools
              image: sysnet4admin/net-tools
              command: ['curlchk', 'nginx']
            restartPolicy: Never
  ```

* 크론 규칙
  * 10분마다 실행하고 싶다면? - `*/10 * * * *`
  * 매일 2시에 실행하고 싶다면? `0 2 * * *`

* 실습
  ```
  kubectl apply -f _Lecture_k8s_learning.kit/ch3/3.7/0nginx-svc.yaml
  kubectl apply -f _Lecture_k8s_learning.kit/ch3/3.7/cronjob-1m-hist10-curl.yaml
  kubectl get pod -w
  ```

## 8. 데몬셋(DaemonSet)
* 데몬셋 - 노드마다 1개씩 배포되는 Pod
  ```yml
  apiVersion: apps/v1
  kind: DaemonSet ## 대소문자 구분해야함
  metadata:
    labels:
      app: ds-nginx
    name: ds-nginx
  spec:
    selector:
      matchLabels:
        app: po-nginx
    template:
      metadata:
        labels:
          app: po-nginx
      spec:
        containers:
        - name: nginx
          image: nginx
  ```

* 실습
  ```
  kubectl apply -f _Lecture_k8s_learning.kit/ch3/3.8/daemonset.yaml
  kubectl get pod -o wide
  kubectl get daemonsets.apps -A ## 모든 네임스페이스의 데몬셋 보기
  ```

## 9. 스테이트풀셋(StatefulSet)
* 스테이트풀셋 - 상탯값을 가지는 Pod. 순서를 가지는 고정이름을 가짐. 순서를 가지거나 고정된 이름을 가져야할 때 사용.
  ```yml
  apiVersion: apps/v1
  kind: StatefulSet
  metadata:
    name: sts-chk-hn
  spec:
    replicas: 3
    serviceName: sts-svc-domain ## 필수값
    selector:
      matchLabels:
        app: sts
    template:
      metadata:
        labels:
          app: sts
      spec:
        containers:
        - name: chk-hn
          image: sysnet4admin/chk-hn
  ```

* 실습
  ```
  kubectl apply -f _Lecture_k8s_learning.kit/ch3/3.9/statefulset.yaml
  kubectl get pod -w
  kubectl scale statefulset sts-chk-hn --replicas=10
  kubectl get pod -w
  ```
