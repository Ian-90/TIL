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
