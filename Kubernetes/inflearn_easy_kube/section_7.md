## 1. kubectl 쉽게 쓰는 법
* `kubectl <tab> <tab>`
  * bash completion 설정을 통해 k를 누르고 tab tab을 누르면 kubectl 명령어가 나온다

* bash에 alias 설정하기
  * alias
    * k=kubectl
    * ka = 'kubectl apply -f'
    * keq = 'kubectl exec ...'

## 2. 쿠버네티스 버전 업그레이드
* 업그레이드 순서(Lab 환경 기준)
  1. 계획 수립
  2. kubeadm 업그레이드
  3. kubelet 업그레이드
  4. 업그레이드 완료 확인

* 실습
  * 마스터 노드
  ```
  kubectl get nodes ## 버전 확인
  kubeadm upgrade plan ## 계획 수립
  yum list kubeadm --showduplicates ## 현재 환경에서 kubeadm 올릴 수 있는 버전 확인
  yum upgrade -y kubeadm-1.20.4 ## kubeadm 버전 업그레이드
  kubeadm updage apply 1.20.4
  kubeadm version ## 버전확인
  yum upgrade kubelet-1.20.4 -y ## kubelet 버전 업그레이드
  systemctl restart kubelet ## kubelet 재시작
  systemctl daemon-reload
  ```

  * 워커노드
    * 마스터노드와 달리 kubelet 업그레이드 후 재시작

## 3. 오브젝트 예약 단축어
* 단축어
  | 이름 | 축약어 | 오브젝트 이름 | 
  |:---:|:-----:|:----------:|
  |nodes| no | Node |
  |namespaces| ns | Namespace |
  |deployments| deploy | Deployment |
  |pods| po | Pod |
  |services| svc | Service|
