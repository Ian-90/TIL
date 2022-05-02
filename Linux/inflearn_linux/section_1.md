## 1. 앞쪽만 보여줘 - head
* `head` - 문서 내용의 앞부분 출력(기본값은 10줄)
* 자주 사용되는 옵션
  * -c, --bytes=[-]NUM :NUM byte만 출력
  * -n, --lines=[-]NUM :NUM line만 출력
  * NUM
    * byte 입력 시 K, M, G, T 입력 가능(ex. 10M)
    * `-` 입력 시 문서의 마지막 NUM byte/line을 제외하고 출력

* ex
  ```
  head /etc/passwd
  head -n 1 /etc/passwd
  cat /etc/passwd | head -n 15
  ```

## 2. 뒷쪽만 보여줘 - tail
* `tail` - 문서 내용의 뒷부분 출력(기본값은 10줄)
* 자주 사용되는 옵션
  * -c, --bytes=[-]NUM :NUM byte만 출력
  * -n, --lines=[-]NUM :NUM line만 출력
  * -f, --follow[={name | descr }] : 추가되는 내용 대기. 추가되는 내용은 append하여 출력
  * -F : 파일이 truncate 되는 경우 re-open하여 follow 함(logrotate 되는 파일에 유용)
  * NUM
    * byte 입력 시 K, M, G, T 입력 가능(ex. 10M)
    * `+` 입력 시 문서의 마지막 NUM byte/line 지점에서 출력 시작

* ex
  ```
  tail /etc/passwd -n 1
  tail /etc/passwd -n +5
  cat /etc/passwd | tail -n 15
  cat /etc/passwd | tail -n +5
  ```

## 3. 몇 줄이나 적혀있니? - wc
* `wc` - line/word/byte count 출력
* 자주 사용되는 옵션
  * -l :라인수 만 출력
* ex
  ```
  wc [FILENAME]
  wc -l [FILENAME]
  cat [FILENAME] | wc -l
  ```

## 4. 줄번호 좀 보여줘 - nl
* `nl` - 파일 내용을 라인 넘버와 함께 출력
* 자주 사용되는 옵션
  * -ba :모든 라인에 대해 라인 넘버링
  * -v N :시작 라인 넘버를 N으로 지정
  * -s :라인 넘버 출력 후 출력할 separator 지정
* ex
  ```
  cat FILENAME
  nl FILENAME
  nl -ba FILENAME
  nl -ba -s ":" FILENAME
  nl -ba -s ":" FILENAME | tail
  ```

## 5. 정렬 좀 해볼래? - sort
* `sort` - 정렬하여 출력
* 자주 사용되는 옵션
  * 위치 지정
    * -k, --key=KEYDEF :key에 의한 정렬 수행
    * -t, --filed-seperator :필드 구분자(기본값은 공백문자)
  * 정렬 기준
    * -f, --ignore-case
    * -g, --general-numeric-sort
    * -n, --numeric-sort
    * -r, --reverse
    * -u, --unique
  * 키 지정 방법
    * `F[.C][OPTS][,F[.C][OPTS]]`
      * F - filed number
      * C - character position
      * OPTS - ordering option
      
* ex
  ```
  cat /etc/passwd | sort
  cat /etc/passwd | sort -t: -k 3
  cat /etc/passwd | sort -t: -k 3 -n
  cat /etc/passwd | sort -t: -k 3 -n --debug
  cat /etc/passwd | sort -t: -k 2,2 --debug
  cat /etc/passwd | sort -t: -k 5,5 -k 1,1 --debug
  ```

## 6. 중복 좀 없애줄래? - uniq
* `uniq` - 중복된 내용 제거하고 출력. 연속적으로 중복된 것만 제거
* 자주 사용되는 옵션
  * -d, --repeated :중복된 내용만 출력
  * -u, --unique : 중복되지 않은 내용만 출력
  * -i, --ignore-case : 대소문자 무시

* ex
  ```
  nl uniq_sample
  uniq uniq_sample | nl
  sort uniq_sample | uniq | nl
  sort uniq_smaple | uniq -i | nl
  sort uniq_sample | uniq -d | nl
  sort uniq_sample | uniq -u | nl
  grep "shm_open" *.c | awk -F: '{print $1}' | uniq
  ```
  * uniq_sample - 랜덤 이름이 들어간 파일

## 7. 텍스트 자르기 - cut
* `cut` - 컬럼 잘라내기
* 자주 사용되는 옵션
  * -b, --bytes=LIST :byte 선택
  * -c, --characters=LIST :character 선택
  * -f, --fields=LIST :필드(컬럼) 선택
  * -d, --delimiter=DELIM :tab 대신 사용할 구분자 지정
  * --complement :선택 반전
  * --output-delimiter=STRING :출력시 사용할 구분자 지정

* ex
  ```
  head /etc/passwd | cut -d ':' -f 1,7
  head /etc/passwd | cut -d ':' -f 1,7 --output-delimiter=': '
  ls -al | cut -b -10
  ls -al | cut -b -10 --complement
  ```

## 8. 텍스트 찾아 바꾸기 - tr
* `tr` - 어떤 내용을 변환한다.
* 자주 사용되는 옵션
  * -c, -C, --complement
  * -d, --delete
  * SET
    - CHAR1-CHAR2 : CHAR1부터 CHAR2까지(예: 'a-z')
    - [:alnum:] : 문자 + 숫자
    - [:alpha:] : 문자
    - [:blank:] : 공백
    - [:space:] : 공백 + newline
    - [:digit:] / [:xdigit:] : 10진수 숫자 / 16진수 숫자
    - [:lower:] / [:upper:] : 소문자 / 대문자
* ex
  ```
  tr [OPTION]... SET1 [SET2]
  head /etc/passwd | tr -d '/' ## 모든 / 삭제
  head /etc/passwd | tr ':' '%' ## :를 %으로 변환
  head /etc/passwd | [:lower:] [:upper:] ## 모든 소문자가 모든 대문자로 변환
  ```

## 9. 줄단위 작업 - sed
* `sed` - stream editor
* 자주 사용되는 옵션
  * {RANGE}p : range 내의 라인을 출력
  * {RANGE}d : range 내의 라인을 삭제
  * /SEARCHPATTERN/p : SEACHPATTERN과 매치되는 라인을 출력
  * /SEARCHPATTERN/d : SEACHPATTERN과 매치되는 라인을 삭제
  * s/REGEX/REPLACE/ : REGEX에 매치되는 부분을 REPLACE로 교체(substitue)
* ex
  ```
  head /etc/passwd | sed -n '1,3p'
  head /etc/passwd | sed '1,3d'
  head /etc/passwd | sed -n '/nologin/p'
  head /etc/passwd | sed 's/daemon/DAEMON/'
  head /etc/passwd | sed 's/daemon/DAEMON/g'
  head /etc/passwd | sed '3,5 s/:/^/g'
  head /etc/passwd | sed -n '/games/,+2p' ## 검색된 결과부터 2번째줄까지 출력(상대적인 경로)
  head /etc/passwd | sed -n '/games/,10p' ## 검색된 games부터 10번쨰 줄까지 출력
  ```

## 10. 강력한 스크립팅 - awk
* `awk` - 텍스트 처리 script language. `awk options 'selection _criteria {action}' input-file`
* 자주 사용되는 옵션
  * -F : filed seperator 지정
* 주요 내장 변수
  * $1, $2, $2, ... : Nth field
  * NR : number of records
  * NF : number of fields
  * FS : field separator(default `white space`)
  * RS : record separator(default `new line`)
  * OFS : Output field separator
  * ORS : Output record separator
* ex
  ```
  wc /etc/passwd | awk '{ print $1 }'
  head /etc/passwd | awk -F: '{ print $1 }'
  head /etc/passwd | awk -F: '/sy/ { print $1 }' ## sy 검색해서 출력
  head /etc/passwd | awk -F: '{ print NR, $1 }'
  ```