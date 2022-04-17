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
