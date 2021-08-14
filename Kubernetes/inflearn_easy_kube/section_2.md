## 1. 쿠버네티스(Kubernetes)란
* 쿠버네티스가 하는 일
  ![쿠버네티스](./assets/kuber.png)
  * 컨테이너들을 관리해줌

* 도커가 뭔가요?
  ![container](./assets/container_evolution.svg)
  * 가상환경에 비해서 컨테이너 환경에서 좀 더 많은 애플리케이션들을 동작 가능

* 쿠버네티스를 배우기 위해 도커를 먼저 알아야 하나요?
  * 이미 만들어져있는 것을 이용하면 되기 때문에 현재는 아니다. 나중에 배워도 된다.

* 쿠버네티스는 누가 만들었고 관리하나요?
  * 구글의 Borg 시스템에서 시작 - > 구글이 CNCF에 기부(CNCF가 관리)

* 쿠버네티스 배포 종류
  * 관리형 쿠버네티스 - 사용자가 많이 관리하지 않아도 되는 것들(AWS, GCP, Azure..)
  * 설치형 쿠버네티스(RANCHER, RED HAT OPENSHIFT, ...)
  * 구성형 쿠버네티스 - 네이티브 쿠버네티스 배포(**Kubeadm**, kops, kubespray, krib, ...)
