## 1. 배포한 애플리케이션을 노출하는 방법
* 서비스
  * NodePort
  * LoadBalancer
  * ExteranlName

* 서비스는 아니지만 서비스와 관련된 것들
  * ClusterIP
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