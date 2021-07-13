# [따라하면서 배우는 셸 프로그래밍](https://www.youtube.com/playlist?list=PLApuRlvrZKog2XlvGJQh9KY8ePCvUG7Je)

## 1. Linux Shell이란?
### 1.1 Shell의 역할
* 사용자 명령어 해석기
* 사용자가 프롬프트에 입력한 명령을 해석해서 운영체제에게 전달

### 1.2 Shell의 종류
* Bourne shell(sh) - AT&T 벨 연구소의 스티븐 본이 개발한 Original shell
* C shell(sch, tcsh) - Bill Joy가 C언어의 기술을 넣어서 만든 shell
* Korn shell - David Korn이 AT&T에서 기존 bourne shell에 C shell의 기능을 포함시켜 생성
* Bourne-again shell(bash) - GNU Project로 만들어졌고, csh,ksh가 가진 기능을 포함하면서 bouren shell과 호환성을 많이 높인 shell로 리눅스, 맥 OS의 기본 shell이고, 윈도우에서도 사용가능

### 1.3 기본 Shell 구성하기
* 사용 가능한 shell 리스트 확인하기
  ```
  cat /etc/shells
  ```

* 현재 작업 shell 확인
  ```
  echo $SHELL
  ```

* 로그인 Shell 변경
  ```
  sudo chsh [username]
  // 사용할 shell 입력
  /bin/bash

  // 변경사항 확인
  sudo grep [username] /etc/passwd
  ```

## 2. Bash shell과 변수
### 2.1 Shell의 변수
* Shell의 변수
  * 데이터를 넣는 그릇
  * 선헌할 필요없이 사용 가능
  * 변수명 - 문자, 숫자, _로 구성될 수 있지만, 시작은 반드시 문자나 _로 시작

* 변수 선언 - `[변수명]=[값]`
  ```
  fname=hello
  score=90
  ```

* 변수 확인 - `echo $[변수명]`, `set`
  ```
  echo $fname
  // 변수 목록 보기
  set
  ```

* 변수 제거 - `unset [변수명]`
  ```
  unset fname
  ```

### 2.2 Shell의 환경변수
* Shell 환경 변수 - 동작 되는 프로그램에게 영향을 주는 변수

* 환경 변수 선언 - `export [변수명]=[값]`
  ```
  export NAME=lee
  echo $NAME
  ```

* 시스템에 적용된 환경변수 확인
```
env
```

* 기억해야할 환경변수
  * PATH - 명령어 탐색 경로
  * HOME - 홈디렉토리의 경로
  * USER - 로그인 사용자 이름
  * SHELL - 로그인 SHELL 이름
