# 1. 문자 실체 참조와 수치 문자 참조 적용

* 문자참조(entity name)
  * html 코드에서 <>같은걸 쓰면 태그로 인식하기 때문에 다른문자(entity)로 써야 한다.

* 수치 문자 참조(entity number)
  * xhtml에서는 수치 문자 참조 쓰는것을 권장하고 있다.

# 2. 구문을 강조하거나 하이라이팅 지정하기

* strong - 객관적인 강조
* em - 주관적인 강조
* mark - 참조 목적의 강조

# 3. 단의어 정의와 약어, 작품의 제목 표현

* 단의어 정의와 약어
  * dfn - 단어에 대한 뜻을 나타 낼 때 사용
  * abbr - 단어의 축약어를 풀어 썼을 때 사용

* 작품의 제목 표현
  * cite - 노래, 영화 등등 작품의 제목을 표현

* 부가 설명 요소
  * small

# 4. 루비 주석과 시간의 표현

* ruby - 동아시아 일부 지역의 언어의 문자의 발음이나 설명을 작은 크기의 윗첨자로 알려주는 루비 주석

* time - 시간의 특정 지점 또는 구간을 나타냅니다.

# 5. 제목, 문단, 연락처, 인용문

* h1 ~ h6 - 제목
* hr - 이전내용과 새로운 내용 사이에 구분 짓는 선
* p - 단락
* address - 주소, 연락처
* blockquote - 인용문
* pre - 입력값(공백, 줄바꿈, code 등..)을 그대로 표현

# 6. 목록 작성하기

* ul - 순서가 없는 목록(자식으로는 li만 올 수 있다)
* ol - 순서가 있는 목록(type을 지정하면, 숫자가 바뀐다.)
* dl - 일반적인 목록이며, 메뉴를 만드는데는 적합하지 않다. 하위에 dt가 여러개이고, dd가 한개인건 불가능 하다.
  * dt - 내부에는 inline tag만 가능
  * dd - 어떤 block tag던 가능

# 7. 테이블 작성하기

* table
  * caption - table의 제목
  * thead - table의 header를 나타낸다.
  * tbody - table의 body 영역을 나타낸다.
  * tfoot - table의 footer 영역을 나타낸다.
  * tr - table의 row
  * th - table의 header cell
    * scope(제목이 나타내주는 범위) 속성을 써준다.
      * col
      * row
      * colgroup
      * rowgroup
  * td - table의 cell
  * cell 합치기
    * colspan - column을 합칠 때 사용
    * rowspan - row를 합칠 때 사용
  * colgroup - 각 column의 넓이를 지정
    * col을 사용(맨마지막 col은 width를 지정하지 않으면, 나머지가 width로 지정된다 )