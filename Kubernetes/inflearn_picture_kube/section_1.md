## 1. 쿠버네티스 환경을 구성하는 코드
* 환경구성
  * k8s_env_build.sh - 쿠버네티스 환경 구성
  * k8s_pkg_cfg.sh - 쿠버네티스 관련 패키지 설치
  * k_cfg)n_git_clone.sh - 쿠버네티스 편의적 구성
  * Vargrantfile - 베이그런트 메인 호출 스크립트
* 마스터 및 워커 노드 구성
  * WO_master_node.sh - 쿠버네티스 마스터 노드를 구성
  * WO_work_nodes.sh - 쿠버네티스 워커 노드를 구성

## 2. 베이그런트파일(Vagrantfile)
* 1 ~ 11
  * ruby로 이루어져있다.
  * `N = 3` - 워커노드의 최대 개수
  * 8 ~ 10 - 쿠버네티스, 도커, Containerd 버전

* 13 ~ 35
  * 마스터 노드 설정

* 41 ~ 60
  * 워커 노드 설정

## 3. 쿠버네티스 환경 구성(k8s_env_build.sh)
* 1 ~ 21
  * 쿠버네티스 repository 구성

* 23 ~ 46
  * 도커 구성
  * 네트워크 설정

## 4. 쿠버네티스 관련 패키지 설치(k8s_pkg_cfg.sh) 및 실습 편의성 높이기(k_cfg_n_git_clone.sh)
* `k8s_pkg_cfg.sh`
  * 쿠버네티스 관련 패키지 설치 및 쿠버네티스에서 동작

* `k_cfg_n_git_clone.sh`
  * 실습 편의성을 높이기 위해 bash-completion 및 쿠버네티스 alias 추가

## 5. 쿠버네티스 설치 바로 전까지 구성하기(Just Vagrant up)
* 베이그런트로 쿠버네티스용 가상 머신 배포
* git repo clone 후, ch1.5에서 `vagrant up`으로 가상머신 실행 후 kubectl과 kubeadm 확인

## 6. kubeadm을 통한 쿠버네티스 설치(WO_master_node.sh, WO_work_nodes.sh)
* kubeadm을 통해서 마스터 노드 및 워커 노드 구성
* 마스터 노드에서 `_Lecture_k8s_learning.kit/ch1/1.6/WO_master_node.sh`를 실행 및 `kubectl get pod -A`로 파드 확인
* 워커 노드에서 `_Lecture_k8s_learning.kit/ch1/1.6/WO_worker_nodes.sh`를 실행 및 `kubectl get pod`로 파드 확인
* 모든 가상머신 삭제 - `vagrant destory -f`
