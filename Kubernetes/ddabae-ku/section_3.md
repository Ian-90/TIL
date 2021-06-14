## 1. kubectl
### 1.1 정의
* 쿠버네티스 클러스터를 관리하는 커맨드라인 인터페이스.즉, 내가 쿠버네티스에게 원하는 명령어 요청할 때 쓰는 명령어
  * 쿠버네티스 자원들의 생성, 업데이트, 삭제
  * 디버그, 모니터링, 트러블 슈팅
  * 클러스터 관리

### 1.2 설치
* 공식문서 참조 - [OS별 설치가이드](https://kubernetes.io/ko/docs/tasks/tools/)
* 도커 데스크톱은 이미 설치 되어 있음

## 1.3 기본사용법
```
kubectl [command] [TYPE] [NAME] [flags]
```
* command - 자원에 실행하려는 동작(create, get, delete 등등..)
* TYPE - 자원의 타입(node, pod, service, ingress 등등..)
* NAME - 자원의 이름
* FLAG - 부가적으로 설정할 옵션(-help, -o options 등등...)

## 1.4 kubectl 명령어 자동완성
* [bash 또는 zsh 공식문서 참조](https://kubernetes.io/ko/docs/tasks/tools/install-kubectl-macos/#%EC%85%B8-%EC%9E%90%EB%8F%99-%EC%99%84%EC%84%B1-%ED%99%9C%EC%84%B1%ED%99%94)

## 1.5 실습
### 1.5.1 기본
* [명령어 쿠버네티스 공식문서](https://kubernetes.io/ko/docs/reference/kubectl/overview/#%EB%AA%85%EB%A0%B9%EC%96%B4), [kubectl cheatsheet](https://kubernetes.io/ko/docs/reference/kubectl/cheatsheet), [reference command](https://kubernetes.io/docs/reference/generated/kubectl/kubectl-commands)
* kubeconfig 환경 변수
```
kubectl api-resources
```

* 도움말
```
kubectl --help
```

### 1.5.2 작업 노드 정보 보기
* 노드 정보 보기
```
kubectl get nodes -o wide
```

* 노드에 대한 자세한 정보 보기
```
kubectl describe node [노드 이름]
```

### 1.5.3 컨테이너를 실행하면서 kubectl 명령어 실행해보기
* 컨테이너 팟 1개 실행
```
kubectl run [이름] --image=[image name] --port=[port number]
kubectl run webserver --image=nginx:1.14 --port 80
```

* 팟 확인
```
kubectl get pods
```

* 팟의 자세한 상태 확인
```
kubectl describe pod [pod name]
```

* yaml 형태로 보기
```
kubectl get pod [pod name] -o yaml
```

* json 형태로 보기
```
kubectl get pod [pod name] -o json
```

* curl을 이용한 브라우저 상태보기
```
curl [ip address]
```

* 컨테이너 여러개 실행
```
kubectl create deployment mainui --image=httpd --replicas=3
```

* 컨테이너 내부로 접속 - exec는 pod에서만 쓰이는 명령어
```
kubectl exec [pod name] --it -- /bin/bash
```

* 컨테이너 동작 로그 보기
```
kubectl logs [pod name]
```

* 포트 포워딩
```
kubectl port-forward [pod name] [local port]:[remote port]
```

* 동작중인 컨테이너 개수 수정
```
kubectl edit deployments [deployment name]
```

* 실행 체크
```
kubectl run [pod name] --image=[image name] --port=[port number] --dry-run -o yaml
```

* 파드를 실행하는 yaml 파일 생성
```
kubectl run [pod name] --image=[image name] --port=[port number] --dry-run -o yaml > [file name].yaml
```

* 컨테이너 삭제
```
kubectl delete pod [pod name]
```

## 2. 디플로이먼트를 이용해 컨테이너 실행하기
### 2.1 kubectl run으로 컨테이너 실행하기
* 디플로이먼트 실행
```
kubectl run [deployment name] --image=[image name] --port=[port number]
kubectl run webserver --image=nginx --port=80
```

* 디플로이먼트 확인
```
kubectl get deployments
```

* 동작중인 컨테이너 개수 변경
```
kubectl scale deploy [deployments name] --replicas=[count]
```

### 2.2 템플릿으로 컨테이너 실행하기
* nginx-app.yml 생성
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-app
  labels:
    app: nginx-app
spec:
  replicas: 1
  selector:
    matchLabels:
      app: nginx-app
  template:
    metadata:
      labels:
        app: nginx-app
    spec:
      containers:
      - name: nginx-app
        image: nginx
        ports:
        - containerPort: 80
```

* 실행
```
kubectl create -f [yaml file name]
또는
kubectl apply -f nginx-app.yml
```

## 3. 클러스터 외부에서 클러스터 안 앱에 접근하기
* 외부에서 접근하려면 쿠버네티스 service를 사용해야한다.
* 서비스 타입 - ClusterIP, NodePort, LoadBalancer, ExternalName
* 서비스 하나에 모든 노드의 지정된 포트를 할당
```
kubectl expose deployment [deployment name] --type=NodePort
```
* 서비스 확인
```
kubectl get services
```

* 서비스 자세한 상태 확인
```
kubectl describe service [container name]
```
