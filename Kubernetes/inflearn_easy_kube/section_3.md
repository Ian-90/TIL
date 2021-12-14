## 1. 배포를 통해 확인하는 파드(Pod)
* 애플리케이션(NGINX) 배포
  * 마스터노드에서 워커 노드에 NGINX 애플리케이션을 설치하도록 명령어를 전달

* Pod란?
  * 애플리케이션을 배포하는 쿠버네티스의 단위
  * 하나의 일을 하기위해 묶여진 컨테이너의 집합

* 실습
```
kubectl run nginx --image=nginx
kubectl get pod -o wide
curl <IP>
```

## 2. 파드를 외부에서도 접속하게 하는 서비스(Service)
* 배포한 파드가 외부에서 접근 안되는 것을 확인
  * 강의에서 외부는 우리가 사용하고 있는 노트북이며, curl로 호출하면 응답이 없다.
  ```
  curl <IP>
  ```

* 서비스
![service](./assets/kube_service.png)
  * NodePort를 통해 접속하여 Pod가 위치한 곳을 찾아감

* 실습
```
kubectl expose pod nginx --type=NodePort --port=80
kubectl get service
kubectl get nodes -o wide
```

* 브라우저에서 주소에 `<IP>:<port>` 입력하면 확인 가능
* `curl <IP>:<port>`로도 확인가능

## 3. 파드와 디플로이트먼트(Deployment) 차이
* 파드를 여러 개 사용하려면?
  * 디플로이먼트(Deplolyment)를 사용

* 디플로이먼트 배포 실습
  * create
    ```
    kubectl create deployment deploy-nginx --image=nginx
    kubectl get pods -o wide
    curl <IP>
    ```

* 디플로이먼트로 다수의 파드를 배포하는 방법
  * ReplicaSet 변경
  * 실습
    ```
    kubectl scale deployment deploy-nginx --replicas=3
    kubectl get pods
    ```

## 4. 외부로 노출하는 더 좋은 방법인 로드밸런서(LoadBalancer)
* 노드포트(NodePort)로 디플로이먼트 노출
  ```
  kubectl expose deployment deploy-nginx --type=NodePort --port=80
  kubectl get services
  ```

* 디플로이먼트를 노출하는 가장 좋은 방법
  * 로드밸런서 타입으로 노출
  * 로드밸런서 타입을 선언하기 위해서는 MetalLB를 이용
  * 어디로 접속되어있는지 확인하기 위해서 강사가 만든 chk-hn 이미지를 배포 후 노출

* 노드포트보다 로드밸런서가 좋은 점
  * 노드의 아이피를 알려 줄 부담이 없다
  * 로드밸런서를 사용하면 가야 될 경로를 최적화하여 구현가능

* 실습
  ```
  kubectl apply -f ~/_Lecture_k8s_starter.kit/ch2/2.4/metallb.yaml ## metallb 설치
  kubectl create deployment chk-hn --image=sysnet4admin/chk-hn
  kubectl scale deployment chk-hn --replicas=3
  kubectl get pods
  kubectl expose deployment chk-hn --type=LoadBalancer --port=80
  kubectl get services
  ```
  * EXTERNAL-IP를 브라우저에 입력하여 확인

## 5. 배포한 것들 삭제하기
* 배운 것 정리
  * 파드 - 컨테이너를 모아 놓은 것
  * 디플로이먼트 - 파드를 모아 놓은 것
  * 서비스 - 파드를 외부와 연결해주는 것

* 삭제 명령어
  ```
  kubectl get service
  kubectl delete service chk-hn
  kubectl delete service nginx

  kubectl get deployment
  kubectl delete deployment chk-hn
  kubectl delete deployment deploy-nginx

  kubectl get pods
  kubectl delete pod nginx

  kubectl delete -f ~/_Lecture_k8s_starter.kit/ch2/2.4/metallb.yaml
  ```