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
