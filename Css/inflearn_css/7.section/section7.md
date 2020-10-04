# 1. Box1 - 제목, 내용, 더보기

* cross browsing - 여러 브라우저에서 기능 및 뷰가 똑같도록 하는것(ie8까지 맞추도록 작업해보기)

* input, select, textarea, button같은 서식 tage들은 body에 font를 적용해줘도 상속이 안되기 때문에, 따로 적용해주어야 한다

# 2. Box2 - 모서리 라운드 처리
* css3에선 border-radius를 이용하지만, position을 연습하기 위해서 예제 해보기. 하지만 border-radius를 이용하기
* line-height - box내의 텍스트가 여러줄이 되는 일이 생길 때 사용

# 3. Box3 - 수직 가운데 정렬
* 높이가 있는 box에서 content를 가운데로 지정(기존에는 table로 했었음)
* &#42;css property를 쓰면 하위브라우저에서만 css 적용하는 핵이다(ie6, ie7..)
```css
*position: absolute;
```

# 4. Button - 텍스트버튼, 아이콘 추가
* 요즘 button을 이렇게 안만들지만, 예전에 만들었던 방식 실습..?
* 요즘은 img로 border를 둥글게 하지않고, border-radius를 이용
* 아이콘도 img가 아닌 font를 이용해서 적용

# 5. paginate - 게시판의 페이징 부분
* box영역이 클릭 되도록 inline-block을 이용
* 글자와 숫자의 높이가 다를 때, line-height를 폰트사이즈만큼 추가
* icon 위치는 position abolsute로 해야 크로스 브라우징을 해결 할 수 있음

# 6. menu - 탭메뉴, 메뉴
* position: absolute를 사용하는 탭메뉴와 사용하지않는 탭메뉴

# 7. faq list - 질문과 답변 목록
* 접히는 형태는 js로

# 8. list - 갤러리 형식의 목록 1 ~ 2
* 8-1
  * img list에서 float을 해지하지말고, height를 넣어주기 (이미지가 몇개 들어갈지 모르기 때문)
  * img 공백제거 - img에 vertical-align: top
  * float을 지정하면, 꼭 해지를 잘해줘야 한다.(gallery 하위 부분에 내용을 추가해보면 왜해주는지 알 수 있다)
  * border가 겹쳤을 때, margin이나 position속성으로 조정

* 8-2
  * 일정한 이미지가 아닌 이미즈 사이즈들이 다 다를 때 적용
  * 이미지 높이가 다 다를 때, 이미지의 line-heigh를 제일 작은 이미지 높이에 맞추고, 글씨를 제일 큰 이미지 높이에 맞춘다. 나머지는 overflow: hidden으로 처리

# 9. list - 이미지와 텍스트 목록 1 ~ 2
* 9-1
  * 이미지와 텍스트 배치를 어떻게 할 것인가?
  * 이미지 옆에 텍스트가 많으면 어떻게 할 것인가 ?

* 9-2
  * 이미지 사이즈가 다를 때

# 10. list - 이미지 하단에 텍스트가 있는 목록 1 ~ 2
* 8 ~ 9와 비슷함

# 11. 다음 메인페이지 이미지 목록
* 또 float 복습..

# 12. 다음 부동산 메뉴
* 크로스 브라우징때문에 이미지를 넣는게 신기..

# 13. table - 테이블 작성 예제
* html5에선 summary property대신 caption으로 정리
* table은 항상 border-collapse를 지정

# 14. form - 로그인 만들기
* input의 경우 line-height으로 중앙정렬이 익스플로러 낮은버전에서 되지 않는다. height와 line-height를 같이 사용해야한다
* input은 브라우저마다 다르기 때문에 꼭 똑같이 하려고 하지 않아도 된다

# 15. layout - 레이아웃 실습
* index_1
  * box-sizing을 사용하지않으면서, 크로스 브라우징을 위해선, 영역내부에 div를 한개 더 감싼다.

* index_2
  * wrap이나 header에 크기가 없기 때문에, 창을 줄이고, 스크롤이 생긴다면 문제가 생긴다. 그러므로 min-width를 적용해서 해결 해야한다.

* index_3
  * content와 aside의 넓이가 %로 바꿔야 하며, 또한 div를 하나더 감싼다.

* index_4
  * wrap의 width를 변경할 일이 생길 수 있으므로, content나 aside는 반응형 시, %로 width를 만들어 주는 것이 좋다.

* index_5
  * nav, aside, content 순서

* index_6
  * content, nav, aside 순서
  * float은 center가 없기 때문에, div로 2개를 감싸서 float을 이용 하거나, position을 활용
