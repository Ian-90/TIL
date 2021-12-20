## 1. 쿠버네티스에서 오브젝트란
* 오브젝트
  * 모두 상태를 가지고 있다
  * 추구하는 상태를 기술해 둔 것

* 추구하는 상태와 현재 상태 확인
  ```
  kubectl get pods
  kubectl edit deployment del-deploy
  ```
  * spec은 추구하는 상태이고, status는 현재 상태
