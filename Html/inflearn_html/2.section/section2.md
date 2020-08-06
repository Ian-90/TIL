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
  
  # 8. a요소 알아보기

  * a - webpage 연결하기 위해서 사용
    * href - 연결 할 주소
      * email은 mailto:email address로 사용
    * title - hover시 부연설명
    * target - _blank로 적용하면, 새로운 탭이 뜬다.
    * download - href에 맞는 파일을 다운로드 하도록 해준다. 
    * accesskey - 링크에 대한 단축키를 생성(크롬은 alt + 설정키)
    * tabindex - a, input, button, select, textarea등 tab이 적용되는데, tab의 순서를 바꾸고 싶을 때, 적용

  # 9. img요소 알아보기

  * img - 이미지를 나타내준다.
    * src - 이미지의 경로
    * alt - 경로가 잘못되거나 다운되지 않아서 이미지가 나타나지 않을 때, 대체 텍스트(필수)
    * title - 부가설명
    * longdesc - 긴 설명글
  
  # 10. 이미지맵 만들기

  * 이미지맵 - 클릭 할 수 있는 영역을 지닌 이미지
  * map
    * map의 name(또는 id) 속성은 img의 usemap과 동일해야 한다.
  
  * area - 이미지맵에 영역 지정

  # 11. 아이프레임 알아보기

  * iframe - 웹문서 안에 또 다른 웹문서를 넣는 방법
    * sandbox - iframe 요소에 보일 콘텐츠에 대한 추가적인 제한사항 명시(보안을 약간 확보가능)

  # 12. 폼 컨트롤 알아보기

  * form - 
    * action - 폼 데이터가 전송되는 url
    * method - 데이터 전송 방식
  
  * fieldset - 관련있는 폼 엘리먼트들을 그룹화
  * legend - 그룹화한 폼엘리먼트들의 제목

  * input은 label로 묶어주는것이 좋다.

  # 13. html5에서 추가 된 폼 컨트롤과 속성들

  * input 속성들
    * type
      * email - 입력값이 email양식에 맞는지 검증을 해준다. 검증을 하기 싫을 땐, form 태그에 속성 novalidate 추가
      * url - 웹사이트 주소양식이 맞는지 검증을 해준다.
      * number - 숫자를 컨트롤러로 입력가능하게 해준다. min과 max로 최소와 최댓값을 지정해 줄수 있다.
      * range - slider를 만든다. min과 max로 최소와 최댓값 지정, step로 이동 간격을 지정해줄 수 있다.
      * date - 캘린더를 생성해준다. 모든 브라우저를 지원하지는 않는다.
      * color - 색상을 선택할 수 있는 선택창 생성해준다. value는 hex코드를 입력해준다.
      * tel - 전화번호

    * placeholder - 입력 힌트 제공
    * autofocus - input창에 커서가 깜박거리게 한다.
    * required - 필수입력항목 생성
    * autocomplete - 자동완성