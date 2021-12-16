## 1. 쿠버네티스 구성 요소 확인(+EKS,AKS,GKE 관리형 쿠버네티스)
* 쿠버네티스를 이루는 것들
  ![쿠버네티스 컴포넌트](./assets/components-of-kubernetes.svg)
  ![쿠버네티스 구성요소](./assets/kubernetes_comp.png)

* 구역을 나누는 네임스페이스
  * default
  * kube-system
  * metallb-system

* 실습
  * `kubectl get pods -n <namespace>`
    ```
    kubectl get pods -n kube-system
    ```

* EKS, AKS, GKE
  * 기본설정으로 클러스터 생성 후 배포
  * 클라우드쉘에 접속하여 배포된 nodes, pods 확인
