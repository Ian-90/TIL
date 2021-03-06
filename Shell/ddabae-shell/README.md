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

## 3. Bash shell과 Rules 1
### 3.1 Quoting Rule
* Metacharacters
  * shell에서 특별히 의미를 정해 놓은 문자들
  * `₩ ? ( ) $ ... * % { } [ ]`등
    ```
    echo * // 전체를 의미
    echo a* // a로 시작하는 것
    echo ???? // 4개의 글자수를 가진 것들
    touch myFile{1..3} // 1 ~ 3까지 파일을 생성
    ```

* Quoting Rule
  * 메타문자의 의미를 제거하고 단순 문자로 변경
  * Backslash(\) - `\` 바로 뒤의 메타 문자는 특별한 의미를 제거
    ```
    touch \*\*\*
    ```
  * Double Quotes("") - `""` 내의 모든 메타문지의 의미를 제거. 단 $,``은 제외
  * Single Quotes('') - `''` 내의 모든 메타문자의 의미를 제거

### 3.2 Nesting commands
* Command 치환
  * 명령어의 실행 결과를 치환하여 명령을 실행

* Nesting Commands
  * `${command}`, ``command``
  ```
  echo "Today is $(date)"
  echo "Today is `date`"
  echo "Today is $(date +%Y-%m-%d)"
  echo 'Today is $(date +%Y-%m-%d)' // 위의 결과와는 다르다
  ```
### 3.3 Alias
* alias
  * shell의 명령에 새로운 이름을 부여
  * 명령들을 조합하여 새로운 이름의 명령을 생성

* alias 관리 명령
  * alias 등록 - `alias name='command'`
  * alias 확인 - `alias or alias name`
  * alias 삭제 - `unalias name`

### 3.4 Prompt
* shell의 prompt란?
  * PS1 변수를 이용해 shell의 기본 프롬프트 모양을 설정
  * Bash shell에서만 Prompt 모양에 적용 가능한 특수 문자가 존재
    | 특수문자 | 의미 |
    |:------:|-----|
    |\h|호스트 이름|
    |\u|사용자 이름|
    |\w|작업 디렉토리 - 절대경로|
    |\W|작업 디렉토리 - 상대경로|
    |\d|오늘 날짜|
    |\t|현재 시간|
    |\$|$ 또는 # 프롬프트 모양|
  * 실습
    ```
    PS1='\u@\h:\W\$'
    ```

## 4. Bash shell과 Rules 2
### 4.1 Redirection
* Communication Channels
  * 계정에게 메일 보내기
    ```
    mailx [게정명]
    ```
    * 표준 입력장치를 키보드로 사용

* Redirection
  | Communication channels | Redirection characters | 의미|
  |------------------------|------------------------|----|
  | STDIN | 0< / 0<< | 입력을 키보드가 아닌 파일을 통해 받음 |
  | STDOUT | 1> / 1>> | 표준 출력을 터미널이 아닌 파일로 출력 |
  | STDERR | 2> / 2>> | 표준 에러 출력을 터미널이 아닌 파일로 출력 |

* 0과 1은 생략이 가능하다
* 실습
  * STDOUT
  ```
  date 1> date.out
  date 1>> date.out // 누적
  ```

  * STDERR
  ```
  ls a.txt 2> error.txt
  ls file1 file100 2> /dev/null // 에러메세지 생략
  ```

### 4.2 Pipeline
* 명령의 실행결과를 다음 명령의 입력으로 전달
* 리눅스의 명령어를 조합하여 사용
* 기호: command1 | command2 | command3
* 실습
  ```
  wc -l // 파일의 총 라인 수 출력
  ls -l | wc -l
  ls -l | more
  ```

## 5. Bash shell script란
### 5.1 Shell Script란?
* 리눅스 command들을 모아놓은 ASCII Text 파일(*.sh 파일)
* 실행 퍼미션을 할당해야 실행 가능
* Bash shell script에서 특별히 의미가 정해진 기능
  * `#` - 주석
  * `#!/bin/bash` - 셔뱅,해시뱅, 스크립트를 실행할 sub shell 이름
* Shell 구문은 기본 top-down 방식으로 해석해서 실행됨
* Sub shell
```
ls /bin/bash
pwd
/bin/bash
# sub-shell
  cd /
  pwd
  exit
pwd
```

### 5.2 실습
* df 명령어 - 파일시스템 별 디스크사용량을 점검하는 명령어
```
df (-h) 명령어
```

* 예제 1
  * `sample.sh` 파일 생성
    ```sh
    #!/bin/bash
    #: Title        :Sample bash script
    #: Date         :2021-05-16
    #: Author       :"Ian" <hello@gmail.com>
    #: Version      :1.0
    #: Description  :Print Hello World
    echo "Today: $(date +%Y-%m-%d)"
    echo "Hello, Linux World!"
    ```

  * 실행 - path를 생략하려면 `PATH=$PATH:~/bin`
    ```
    chmod +x sample.sh
    [path] sample.sh
    ```

* 예제 2
  * `varUsage.sh` 파일 생성
  ```sh
  #!/bin/bash
  #: Author       :"Ian" <hello@gmail.com>
  #: Description  :Print Hello World
  echo "[/var Directory]"
  echo "==========================================="
  date +%Y-%m-%d
  echo "==========================================="
  du -sh /var 2> /dev/null
  echo
  ```

  * 실행 - path를 생략하려면 `PATH=$PATH:~/bin`
    ```
    chmod +x varUsage.sh
    [path] varUsage.sh
    ```

## 6. Positional Parameters
### 6.1 Positional Paramters란?
* 위치 매개변수
* 입력하는 argument들은 $0, $1, $2와 같은 변수에 저장되어 script에 전달
  * name of shell script: $0
  * first argument - $1
  * second argument - $2
  * Number of arguments in $#
  * List of all parmeters in $@, $*
* Special shell variables
  * 로그인 shell의 PID - $$
  * 현재 작업 디렉토리 - $PWD
  * 부모 프로세스 ID - $PPID

### 6.2 실습
* 예제 1
  * parameter-exam1.sh
  ```sh
  #!/bin/bash
  #: Usage: parameter-exam1.sh arg1 arg2 arg3
  echo "The script name: $0"
  echo "The first argument: $1"
  echo "The second argument: $2"
  echo "The number of arguments: $#"
  echo "The list of arguments: $@"
  echo "The list of arguments: $*"
  ```

  * 실행
  ```
  chomod +x parameter-exam1.sh
  [path]/paramter-exam1.sh red blue
  ```

* 예제 2
  * parameter-exam2.sh
  ```sh
  #!/bin/bash
  #: Usage: parameter-exam1.sh directory_name
  echo "[$1 Directory]"
  echo "====================================="
  date +%Y-%m-%d
  echo "====================================="
  du -sh $1 2> /dev/null # $1 디렉토리의 사이즈
  echo
  ```

  * 실행
  ```
  chomod +x parameter-exam2.sh
  [path]/paramter-exam2.sh red blue
  ```

