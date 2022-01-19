## 1. 배포한 애플리케이션을 노출하는 방법
* 서비스
  * NodePort
  * LoadBalancer
  * ExteranlName
  * ClusterIP

* 서비스는 아니지만 서비스와 관련된 것들
  * Headless
  * Endpoints
  * Ingress

* 간단하게 서비스형태로 외부에 노출하는 방법
  * port-forworad
  * HostPort
  * hostNetwork

## 2. 간단한 방법(Port-forward, HostPort, hostNetwork)
* 포트 포워딩
  ```yml
  apiVersion: v1
  kind: Pod
  metadata:
    name: fwd-chk-hn
  spec:
    containers:
    - name: chk-hn
      image: sysnet4admin/chk-hn
  ```

  * 실습
    ```
    kubectl apply -f _Lecture_k8s_learning.kit/ch4/4.2/port-forward.yaml
    kubectl get pod
    kubectl port-forward fwd-chk-hn 80:80 ## 포트포워드 설정
    ```

* HostPort - 사용자가 어디에 배포되었는지 알아야 접속가능
  ```yml
  apiVersion: v1
  kind: Pod
  metadata:
    name: hp-chk-hn
  spec:
    containers:
    - name: chk-hn
      image: sysnet4admin/chk-hn
      ports:
      - containerPort: 80
        hostPort: 8080 ## 8080으로 접속하면 80으로 이동
  ```

* hostNetwork - 사용자가 어디에 배포되었는지 알아야 접속가능. 컨테이너 포트를 그대로 외부로 노출.
  ```yml
  apiVersion: v1
  kind: Pod
  metadata:
    name: hnet-chk-hn
  spec:
    hostNetwork: true
    containers:
    - name: chk-hn
      image: sysnet4admin/chk-hn
  ```

* 실습
  ```
  kubectl apply -f _Lecture_k8s_learning.kit/ch4/4.2/hostport.yaml
  kubectl apply -f _Lecture_k8s_learning.kit/ch4/4.2/hostnetworkt.yaml
  kubectl get pod -o wide
  ```

## 3. 노드포트(NodePort)
* nodeport.yaml - 30000(node) -> 80(svc - port) -> 80(pod - targetPort)
  ```yml
  apiVersion: apps/v1
  kind: Deployment
  metadata:
    name: deploy-nginx
    labels:
      app: deploy-nginx
  spec:
    replicas: 3
    selector:
      matchLabels:
        app: deploy-nginx
    template:
      metadata:
        labels:
          app: deploy-nginx
      spec:
        containers:
        - name: nginx
          image: nginx
  --- ## 두개의 오브젝트를 배포할 떄 구분
  apiVersion: v1
  kind: Service
  metadata:
    name: np-nginx
  spec:
    selector:
      matchLabels:
        app: deploy-nginx ## 노출할 deployment 이름
    ports:
      - name: http
        port: 80 ## 서비스에 대한 포트
        targetPort: 80 ## 파드에 대한 포트
        nodePort: 30000
    type: NodePort
  ```

* 실습
  ```
  kubectl apply -f _Lecture_k8s_learning.kit/ch4/4.3/nodeport.yaml
  kubectl get pod
  kubectl get service
  ```


## 4. 로드밸런서(LoadBalancer)
* loadbalancer-11.yaml
  ```yml
  apiVersion: apps/v1
  kind: Deployment
  metadata:
    name: deploy-nginx
    labels:
      app: deploy-nginx
  spec:
    replicas: 3
    selector:
      matchLabels:
        app: deploy-nginx
    template:
      metadata:
        labels:
          app: deploy-nginx
      spec:
        containers:
        - name: nginx
          image: nginx
  --- ## 두개의 오브젝트를 배포할 떄 구분
  apiVersion: v1
  kind: Service
  metadata:
    name: lb-nginx
  spec:
    selector:
      app: deploy-nginx ## 노출할 deployment 이름
    ports:
      - name: http
        port: 80
        targetPort: 80
    type: LoadBalancer
  ```

  * 실습
  ```
  kubectl apply -f _Lecture_k8s_learning.kit/ch4/4.4/loadbalancer-11.yaml
  kubectl get pod
  kubectl get service
  ```

## 5. 외부이름(ExternalName)
* exteranlname-1.yaml
  ```yml
  apiVersion: v1
  kind: service
  metadata:
    name: ex-url-1
    namespace: default
  spec:
    type: ExteranlName
    externalName: sysnet4admin.github.io ## 외부도메인 주소
  ```

* 실습
  ```
  kubectl apply -f _Lecture_k8s_learning.kit/ch4/4.5/externalname-1.yaml
  kubectl apply -f _Lecture_k8s_learning.kit/ch4/4.5/externalname-2.yaml
  kubectl get service
  kubectl net --image-sysnet4admin/net-tools-ifn
  kubectl exec net -it -- /bin/bash
  nslookup ex-url-1
  ```

## 6. 클러스터주소(ClusterIP), 헤드리스(Headless)
* clusterip.yaml
  ```yml
  apiVersion: apps/v1
  kind: Deployment
  metadata:
    name: deploy-nginx
    labels:
      app: deploy-nginx
  spec:
    replicas: 3
    selector:
      matchLabels:
        app: deploy-nginx
    template:
      metadata:
        labels:
          app: deploy-nginx
      spec:
        containers:
        - name: nginx
          image: nginx
  --- ## 두개의 오브젝트를 배포할 떄 구분
  apiVersion: v1
  kind: Service
  metadata:
    name: cl-nginx
  spec:
    selector:
      app: deploy-nginx
    ports:
      - name: http
        port: 80
        targetPort: 80
    type: ClusterIP # Pod - ClusterIP - Pod, 파드와 파드의 연결을 위한 내부의 IP
  ```

* headless.yaml - 클러스터 IP와 동일한 기능을 하지만, IP가 없는 상태
  ```yml
  ...
  --- ## 두개의 오브젝트를 배포할 떄 구분
  apiVersion: v1
  kind: Service
  metadata:
    name: hdl-nginx
  spec:
    selector:
      app: deploy-nginx
    ports:
      - name: http
        port: 80
        targetPort: 80
    clusterIP: None
  ```

* 실습
  ```
  kubectl apply -f _Lecture_k8s_learning.kit/ch4/4.6/clusterip.yaml
  kubectl get pod
  kubectl apply -f _Lecture_k8s_learning.kit/ch4/4.6/headless.yaml
  kubectl get pod
  ```

* statefulset은 고정된 이름을 가지고 있으며, headless는 ip는 없지만, 내부에서 도메인이름으로 통신가능하기 때문에 도메인이름과 statefulset의 서비스 네임을 연동할 수 있다.
  * 실습
    ```
    kubectl apply -f _Lecture_k8s_learning.kit/ch4/4.6/sts-svc-domain-headless.yaml
    kubectl get pod
    kubectl get service
    kubectle exec net -it -- /bin/bash
    nslookup sts-svc-domain
    nslookup stst-chk-hn-1.sts-svc-domain
    exit
    kubectl apply -f _Lecture_k8s_learning.kit/ch4/4.6/sts-no-answer-headless.yaml
    kubectl get service
    kubectle exec net -it -- /bin/bash
    nslookup test
    nslookup sts-chk-hn-0.test ## statefulset에 이름을 넣어도 동작하지 않는다.
    exit
    kubectl apply -f _Lecture_k8s_learning.kit/ch4/4.6/sts-lb.yaml ## statefulset을 lb타입으로 노출가능
    ```

## 7. 엔드포인트(Endpoints)
* loadbalancer.yaml
  ```yml
  apiVersion: apps/v1
  kind: Deployment
  metadata:
    name: deploy-chk-ip
    labels:
      app: deploy-chk-ip
  spec:
    replicas: 3
    selector:
      matchLabels:
        app: deploy-chk-ip
    template:
      metadata:
        labels:
          app: deploy-chk-ip
      spec:
        containers:
        - name: chk-ip
          image: sysnet4admin/chk-ip
  ---
  apiVersion: v1
  kind: Service
  metadata:
    name: lb-chk-ip
  spec:
    selector:
      app: deploy-chk-ip
    ports:
      - name: http
        port: 80
        targetPort: 80
    type: LoadBalancer
  ```

* endpoints - 로드밸런서를 통해 도달하는 파드의 ip
* 실습 - 로드밸런서의 엔드포인트 확인
  ```
  kubectl apply -f _Lecture_k8s_learning.kit/ch4/4.7/loadbalancer.yaml
  kubectl get pod,service
  kubectl get endpoints
  kubectl get pod -o wide
  ```

* service-endpoints.yaml
  ```yml
  apiVersion: v1
  kind: Service
  metadata:
    name: exteranl-data
  spec:
    ports:
      - name: hppt
        port: 80
        targetPort: 80 # 따로 type이 선언이 안되었기 때문에 ClusterIP가 기본값이다
  ---
  apiVersion: v1
  kind: Endpoints
  metadata:
    name: external-data ## 클러스터 IP와 동일한 이름
  subsets:
    - addresses:
        - ip: 192.168.1.11
      ports:
        - name: http
          port: 80
  ```

* 실습 - 메뉴얼하게 엔드포인트 생성
  ```
  kubectl get service
  kubectl apply -f _Lecture_k8s_learning.kit/ch4/4.7/service-endpoints.yaml
  kubectl get service
  kubectl get endpoints
  kubectl exec net -it -- /bin/bash
  nslookup external-data
  curl external-data
  ```

## 8. 인그레스(Ingress)
* 인그레스와 서비스의 차이
  * 서비스가 없다면 존재할 수 없음
  * 실제로 가야되는 경로에 대한 라우팅 정보 제공

* deploy-nginx.yaml
  ```yml
  apiVersion: apps/v1
  kind: Deployment
  metadata:
    name: deploy-hn
    labels:
      app: deploy-hn
  spec:
    replicas: 3
    selector:
      matchLabels:
        app: deploy-hn
    template:
      metadata:
        labels:
          app: deploy-hn
      spec:
        containers:
        - name: chk-hn
          image: sysnet4admin/chk-hn
  ---
  apiVersion: v1
  kind: Service
  metadata:
    name: ing-hn
  spec:
    selector:
      app: deploy-hn
    ports:
      - name: http
        port: 80
        targetPort: 80
    type: ClusterIP
  ```

* ingress.yaml
  ```yml
  apiVersion: networking.k8s.io/v1
  kind: Ingress
  metadata:
    name: nginx-ingress
    annotations:
      nginx.ingress.kubernetes.io/rewrite-target: /
  spec:
    rules:
    - http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: ing-default
                port:
                  number: 80
          - path: /hn
            pathType: Prefix
            backend:
              service:
                name: ing-hn
                port:
                  number: 80
          - path: /ip
            pathType: Prefix
            backend:
              service:
                name: ing-ip
                port:
                  number: 80
  ```

* labels와 annotations의 차이
  * labels - 별명, 별칭
    * pod, service, ingress, kubernetes object에 대해서 사람들이 관리하려고 쓰는 것
  * annotations
    * pod, service, ingress, kubernetes object에서 선언 할 수 있는데 시스템이 인지하는데 쓰는 것

* 실습
  ```
  kubectl apply -f _Lecture_k8s_learning.kit/ch4/4.8/deploy-nginx.yaml
  kubectl apply -f _Lecture_k8s_learning.kit/ch4/4.8/deploy-hn.yaml
  kubectl apply -f _Lecture_k8s_learning.kit/ch4/4.8/deploy-ip.yaml
  kubectl get pod,service

  kubectl apply -f _Lecture_k8s_learning.kit/ch4/4.8/ingress.yaml
  kubectl get ingress -o yaml

  kubectl apply -f _Lecture_k8s_learning.kit/ch4/4.8/ingress_ctrl_nodeport.yaml
  kubectl get pod -n ingress-nginx
  kubectl delete -f _Lecture_k8s_learning.kit/ch4/4.8/ingress_ctrl_nodeport.yaml

  kubectl apply -f _Lecture_k8s_learning.kit/ch4/4.8/ingress_ctrl_loadbalancer.yaml
  kubectl get pod -n ingress-nginx
  ```
