## 1. 설치 없이 쿠버네티스 사용하기
### 1.1 카타코다 쿠버네티스 플레이그라운드
* [카타코다에서 제공하는 쿠버네티스 플레이 그라운드](https://www.katacoda.com/courses/kubernetes/playground)
* 마스터와 노드가 미리 구성되어 있음
* kubectl 실행가능
### 1.2 Play with Kubernetes
* [도커에서 제공하는 쿠버네티스 실습용 웹 환경](https://labs.play-with-k8s.com/)
* 4시간 사용 가능
* 마스터와 노드가 미리 구성되어 있지 않음

## 2. 도커 데스크톱을 이용한 쿠버네티스 설치
* [도커 문서](https://docs.docker.com/desktop/#download-and-install)를 참고하면 OS별로 설치 가능

## 3. 클라우드 서비스에서 제공하는 쿠버네티스 도구
### 3.1 구글 쿠버네티스 엔진
* [GKE](https://cloud.google.com/kubernetes-engine?hl=ko) 참고

### 3.2 아마존 쿠버네티스 엘라스틱 컨테이너 서비스
* [EKS](https://aws.amazon.com/ko/eks/?whats-new-cards.sort-by=item.additionalFields.postDateTime&whats-new-cards.sort-order=desc&eks-blogs.sort-by=item.additionalFields.createdDate&eks-blogs.sort-order=desc) 참고

### 3.3 애저 쿠버네티스 서비스
* [AKS](https://azure.microsoft.com/ko-kr/services/kubernetes-service/) 참고

## 4. 쿠버네티스 클러스터를 직접 구성하는 도구
### 4.1 CNI(Container Network Interface)
* 컨테이너간 통신을 지원하는 VxLAN. Pod Network라고도 부름
* 다양한 플러그인이 존재(플라넬, 칼리코 등등..)

### 4.2 쿠버네티스 클러스터 구성
* control plane(master node)
  * 워커 노드들의 상태를 관리하고 제어
  * single master
  * 상용서비스에서는 multi master(3, 5개의 master nodes)

* worker node
  * 도커 플랫폼을 통해 컨테이너를 동작하며 실제 서비스 제공
  * kubelet이라는 프로세스가 동작하며, 마스터 노드의 명령을 받아 사용자가 선언한 파드나 잡을 실행

### 4.3 Kubeadm
* 쿠버네티스에서 공식 제공하는 클러스 생성/관리 도구
* 싱글, 멀티 마스터 구현 가능

### 4.4 Kubuspray
* 쿠버네티스 클러스터를 배포하는 오픈소스 프로젝트
* 멀티 마스터 구현하기에 적합
* 온프레미스 환경에서 상용 서비스의 쿠버네티스 클러스터를 구성할 때 유용