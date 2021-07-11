## 1 Service 개념과 종류
### 1.1. [Service](https://kubernetes.io/ko/docs/concepts/services-networking/service/)란?
* 동일한 서비스를 제공하는 **Pod 그룹의 단일 진입점**을 제공(로드밸런서 IP를 만듬)
* 정의
```yml
apiVersion: v1
kind: Service
metadata:
  name: webui-svc
spec:
  clusterIP: 10.96.100.100
  selector:
    app: webui
  ports:
  - protocol: TCP
    port: 80
    targetPort: 80
```

### 1.2 Service 타입
* ClusterIP(default)
  * Pod 그룹의 단일 진입점(Virtual IP)생성
* NodePort
  * ClusterIP가 생성된 후, 모든 Worker Node에 외부에서 접속가능 한 포트가 예약
* LoadBalancer
  * 클라우드 인프라스트럭처(AWS, Azure, GCP 등)나 오픈스택 클라우드에 적용
  * LoadBalancer를 자동으로 프로 비전하는 기능 지원
* ExternalName
  * 클러스터 안에서 외부에 접속 시 사용할 도메인을 등록해서 사용
  * 클러스 도메인이 실제 외부 도메인으로 치환되어 동작

## 2. Service 4가지 종류 실습
### 2.1 ClusterIP
* selector의 label이 동일한 파드들의 그룹으로 묶어, 단일 진입점(Virtual_IP)를 생성
* 클러스터 내부에서만 사용가능
* type 생략시 default 값으로는 10.96.0.0./12 범위에서 할당됨(정하지 않으면 랜덤하게 생성됨)
* ClusterIP를 고정시키지 않는 이유 - 충돌을 예방하기 위해

### 2.2 ClusterIP 실습
* 우선 deployment 실행
* clusterip-nginx.yaml
```yml
apiVersion: v1
kind: Service
metadata:
  name: clusterip-service
spec:
  type: ClusterIP
  clusterIP: 10.100.100.100
  selector:
    app: webui
  ports:
  - protocol: TCP
    port: 80 # ClusterIP의 포트
    targetPort: 80 # Pod의 포트
```

* 실습
```
kubectl create -f clusterip-nginx.yaml
kubelctl get svc
curl [ClusterIP]
kubectl describe svc clusterip-service
kubectl delete svc clusterip-service
```

### 2.3 NodePort
* 모든 노드를 대상으로 외부 접속 가능한 포트를 예약
* Default NodePort 범위: 30000 ~ 32767
* ClusterIP를 생성 후 NodePort를 예약

### 2.4 NodePort 실습
* 우선 deployment 실행
* nodeport-nginx.yaml
```yml
apiVersion: v1
kind: Service
metadata:
  name: nodeport-service
spec:
  type: NodePort
  clusterIP: 10.100.100.200
  selector:
    app: webui
  ports:
  - protocol: TCP
    port: 80
    targetPort: 80
    nodePort: 30200 # 생략하면 랜덤으로 포트 생성
```

* 실습
```
kubectl create -f nodeport-nginx.yaml
kubelctl get svc
curl [ClusterIP]:[NodePort]
kubectl describe svc nodeport-service
kubectl delete svc nodeport-service
```

### 2.5 LoadBalancer
* Public 클라우드(AWS, Azure, GCP등)에서 운영가능
* LoadBalancer를 자동으로 구성 요청
* NodePort를 예약 후 해당 nodeport로 외부 접근을 허용

### 2.6 LoadBalancer 실습
* loadbalancer-nginx.yaml
```yml
apiVersion: v1
kind: Service
metadata:
  name: loadbalancer-service
spec:
  type: LoadBalancer
  selector:
    app: webui
  ports:
  - protocol: TCP
    port: 80
    targetPort: 80
```

* 실습 - 실습시 퍼블릭 클라우드는 아니기 때문에 loadbalancer ip는 나오지 않는다
```
kubectl create -f loadbalancer-nginx.yaml
kubectl get svc
kubectl delete svc loadbalancer-service
```

### 2.7 ExternalName
* 클러스터 내부에서 외부의 도메인을 설정(DNS를 지원)

### 2.8 ExternalName 실습
* externalname.yaml
```yml
apiVersion: v1
kind: Service
metadata:
  name: externalname-svc
spec:
  type: ExternalName
  externalName: google.com
```

* 실습
```
kubectl create -f externalname.yaml
kubectl get svc
kubectl run testpod -it --image=centos:7
/# curl externalname-svc.default.svc.cluster.local
/# exit

kubectl delete pod testpod
kubectl delete svc externalname-svc
```

## 3. Headless Service
### 3.1 [Headless Service](https://kubernetes.io/ko/docs/concepts/services-networking/service/#%ED%97%A4%EB%93%9C%EB%A6%AC%EC%8A%A4-headless-%EC%84%9C%EB%B9%84%EC%8A%A4)란? 
* ClusterIP가 없는 서비스로 단일 진입점이 필요 없을 떄 사용
* Service와 연결된 Pod의 endpoint로 DNS 레코드가 생성됨(Pod들의 endpoint에 DNS resolving Service 지원)
* Pod의 DNS 주소: pod-ip-addr.namespace.pod.cluster.local

### 3.2 Headless Service 실습
* headless-nginx.yaml
```yml
apiVersion: v1
kind: Service
metadata:
  name: headless-service
spec:
  type: ClusterIP
  clusterIP: None
  selector:
    app: webui
  ports:
  - protocol: TCP
    port: 80
    targetPort: 80
```

* 실습
```
kubectl create -f headless-nginx.yaml
kubectl get svc
kubectl describe svc headless-service
```

* Pod Endpoint DNS 서비스 조회
```
kubectl run testpod -it --image=centos:7 /bin/bash
/# curl [ip-addr].default.pod.cluster.local
/# exit
```

## 4. kube-proxy
### 4.1 [kube-proxy](https://kubernetes.io/ko/docs/reference/command-line-tools-reference/kube-proxy/)란?
* 쿠버네티스 Service의 백엔드 구현
* endpoint 연결을 위한 iptables 구성
* nodePort로의 접근과 Pod 연결을 구현(iptables 구성)

### 4.2 kube-proxy mode
* userspace
  * 클라이언트의 서비스 요청을 iptables를 거쳐 kube-proxy가 받아서 연결
  * 쿠버네티스 초기버전에 잠깐 사용

* iptables
  * default kubernets network mode
  * kube-proxy는 service API 요청 시 iptables rule이 생성
  * 클라이언트 연결은 kube-proxy가 받아서 iptables 룰을 통해 연결

* IPVS
  * 리눅스 커널이 지원하는 L4 로드밸런싱 기술을 이용
  * 별도의 ipvs 지원 모듈을 설정한 후 적용가능
  * 지원 알고리즘: rr(round-robin), lc(least connection), dh(destination hashing), sh(source hashing), sed(shortest expected delay), nq(never queue)
