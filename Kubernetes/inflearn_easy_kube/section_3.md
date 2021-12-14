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
