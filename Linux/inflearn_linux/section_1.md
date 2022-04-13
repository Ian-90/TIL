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
  header -n 1 /etc/passwd
  cat /etc/passwd | head -n 15
  ```