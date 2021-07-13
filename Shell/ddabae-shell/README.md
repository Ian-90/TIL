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
