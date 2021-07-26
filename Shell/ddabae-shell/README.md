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

## 7. Input & Output
### 7.1 echo
* prints text to standard output
  ```
  echo [options] [message]
  ```

* options
  * `-n` - 메세지 출력 후 newline 문자를 추가하지 않는다
  * `-e` - backslash escapes문자를 해석하여 특별한 의미를 지정한다
    * `\t` - TAB 키
    * `\n` - 줄 바꿈
    * `\a` - alert(bell)

* example
  ```
  echo 'hello linux'
  echo 'Your time is up > time.txt'
  echo -n "Name:"
  echo -e "First\tSecond"
  ```

### 7.2 read
* reads text from standard input
  ```
  read [opitons] [variable name]
  ```

* options
  * `-n` - 지정한 문자수만큼 입력 받는다
  * `-t` - 지정된 시간안에 입력 받는다
  * `-s` - silent mode로 입력하는 글자가 보이지 않는다.

* read 명령에서 변수 명 생략 시 기본 REPLY 변수에 채워진다.

* example
  ```
  read name score
  # 변수 값 입력
  lee 80
  echo $name $score
  read -t10 -n8 password
  read -t10 -n8 -s password
  read
  echo -n 'Name: '; read name
  ```

## 7.3 printf
* 서식 format에 맞춰서 출력할 수 있는데, C언어의 printf 함수와 동일
  ```
  printf [format] [message]
  ```

* format
  * `%d or %i` - 숫자
  * `%s` - 문자열
  * `%f` - 실수형 숫자

* example
  ```
  printf 'hello linux shell\n'
  printf 'Name: %s \t Score: %i\n' lee 90

  today=`date +%Y%m%d`
  printf 'date is %s\n' $today
  
  printf 'number is %.3f\n' 20
  # %10s는 10글자 칸 맞춰서 출력. %10.2f 10글자 칸 맞춰서 소수점 2번째자리 까지 출력
  printf |%10s|%10s|%10.2f\n' ubuntu lee 10
  printf |%-10s|%-10s|%10.2f\n' ubuntu lee 10
  ```

## 8. Branching
### 8.1 exit
* 실행된 프로그램이 종료된 상태를 전달
  ```bash
  exit [숫자]
  ```
  * 0 - 프로그램 또는 명령이 성공으로 종료했음을 의미
  * 1 ~ 255 - 프로그램 또는 명령이 실패로 종료했음을 의미
    * 1 - 일반 에러
    * 2 - Syntax error
    * 126 - 명령을 실행할 수 없음
    * 127 - 명령(파일)이 존재하지 않음
    * 128 + N - 종료 시그널 + N(kill -9 PID로 종료시 128+9=137)

* 종료 코드 값 출력
  ```bash
  $?
  ```

* example
  ```bash
  cp file1
  echo $?
  sleep 100
  # Ctrl + c
  echo $?
  ```

### 8.2 test
* 비교 연산자
  ```
  test <명령어>
  ## or
  [ 명령어 ]
  ```
* 명령어 실행결과를 true(0) 또는 false(1)로 리턴한다
* test 명령어는 다양한 연산자를 지원한다
  | 연산자 | 설명 |
  |------|-----|
  |`x -eq y`| x값과 y값이 같으면 true를 리턴|
  |`x -gt y`| x값이 y값보다 크면 true를 리턴|
  |`x -ge y`| x값과 y값보다 크거나 같으면 true를 리턴|
  |`x -lt y`| x값이 y값보다 작으면 true를 리턴|
  |`x -le y`| x값이 y값보다 작거나 같으면 true를 리턴|
  |`x -ne`| x값과 y값이 같지 않으면 true를 리턴|
  |`-e file`| 파일이 존재하면 true를 리턴|
  |`-d file`| 파일이 디렉토리이면 true를 리턴|
  |`-f file`| 파일이 디렉토리이면 true를 리턴|
  |`-x file`| 파일이 디렉토리이면 true를 리턴|

* 기본 산술 연산 명령어
  ```bash
  let
  expr
  ```

* example
  ```bash
  x=10
  ## [ $x -lt 5 ]
  test $x -lt 5
  echo $?
  ## [ $x -gt 5 ]
  test $x -gt 5
  echo $?
  ## [ -e /etc/passwd ]
  test -e /etc/passwd
  ## [ -f /tmp ]
  test -f /tmp
  ```

### 8.3 if-then-fi
* 조건 명령어. command 실행 결과에 따라 서로 다른 command를 실행
  ```bash
  if command
  then
    command1
  else
    commnad2
  fi
  ```

* example
  * if-exam1.sh
  ```bash
  #!/bin/bash
  echo -n "input number: "
  read x
  if test $x -gt 5
  then
    echo "x is greater than 5"
  fi
  ```

  * if-exam2.sh - `/etc/passwd` 입력 해보기
  ```bash
  #!/bin/bash
  echo -n "input filename: "
  read filename
  if [ -e $filename ]
  then
    ls -l $filename
  else
    echo "$filename file does not exist"
  fi
  ```

  * 실습
  ```
  chmod -x if-exam1.sh
  if-exam1.sh

  chmod -x if-exam2.sh
  if-exam2.sh
  ```

### 8.4 case
* $var의 값에 따라 선택해서 명령어를 실행
  ```bash
  case "$variable" in
    pattern1) command1 ;;
    pattern2) command2 ;;
    *) command3 ;;
  esac
  ```

* example
  * case-exam1.sh
  ```bash
  echo -n "What do you want?"
  read answer
  case $answer in
    [yY]es) echo "System restart.";;
    [nN]o) echo "shutdown the system";;
    *) echo "entered incorrectly";;
  esac
  ```