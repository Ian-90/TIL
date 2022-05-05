## 1. 파일 찾기 - find
* `find [OPTIONS] path EXPR` - 조건에 맞는 파일을 찾아 명령을 수행한다
* 자주 사용되는 옵션
  * -name : 이름으로 검색
  * -regex : regex에 매치로 검색
  * -empty : 빈 디렉터리 혹은 빈 검색
  * -size : 사이즈로 검색(M, G로 표기 가능)
    * -N : 이하
    * +N : 이상
  * -type : 파일 타입으로 검색
    * d : directory
    * p : named pipe
    * f : regular file
    * l : softlink
    * s : socket
  * -perm : 퍼미션으로 검색
    * mode :  정확히 일치하는 파일
    * +mode : 모든 flag가 포함된 파일
    * /mode : 어떤 flag라도 포함된 파일

* 액션
  * -delete : 파일 삭제
  * -ls : ls -dils 명령 수행
  * -print : 파일 이름 출력
  * -printf : 파일 이름을 포맷에 맞게 출력
  * -exec : 주어진 명령 수행
  * -execdir : 해당 디렉터리로 이동하여 명령 실행
  * -ok : 사용자에게 확인 후 exec
  * -okdir : 사용자에게 확인 후 실행 execdir

* example
  ```
  find . | wc -l
  find . -name "*.md"
  find `pwd` -name "*.md" ## 절대경로로 출력
  find `pwd` -regextype egrep -regex '.*section.*.$'
  find . -empty
  find . -type d
  find . -perm 0777
  find . -name "*.md" -exec stat
  find . -name "*.md" -ok rm -f
  ```

## 2. 텍스트 검색 - grep
* `grep [OPTIONS] PATTERN [FILE...]` - 파일 내용 중 원하는 내용을 찾는다.
* 자주 사용되는 옵션
  * -r : recurive
  * -i : ignore case
  * -v : invert match
  * -q : quiet mode
* example
  ```
  grep ## *.md
  grep fork *.c -q
  grep "\<for\>" *.md
  grep "^" *.md ## 라인의 시작 찾기
  ls -al | grep posix
  find . | grep posix
  ```
