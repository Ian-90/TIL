# Box1 - 제목, 내용, 더보기

* cross browsing - 여러 브라우저에서 기능 및 뷰가 똑같도록 하는것(ie8까지 맞추도록 작업해보기)

* input, select, textarea, button같은 서식 tage들은 body에 font를 적용해줘도 상속이 안되기 때문에, 따로 적용해주어야 한다

# Box2 - 모서리 라운드 처리
* css3에선 border-radius를 이용하지만, position을 연습하기 위해서 예제 해보기. 하지만 border-radius를 이용하기
* line-height - box내의 텍스트가 여러줄이 되는 일이 생길 때 사용

# Box3 - 수직 가운데 정렬 1
* 높이가 있는 box에서 content를 가운데로 지정(기존에는 table로 했었음)
* &#42;css property를 쓰면 하위브라우저에서만 css 적용하는 핵이다(ie6, ie7..)
```css
*position: absolute;
```