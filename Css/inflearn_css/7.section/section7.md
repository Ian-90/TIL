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