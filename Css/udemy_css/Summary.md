# 1. How to css works: a look behind the scenes
## 1.1 Three Pillars of Writing Good HTML and CSS
1. Responsive design
  * fluid layouts
  * media queries
  * responsive images
  * correct units
  * desktop-first vs mobile-first

2. Maintainable and scalable code
  * clean
  * easy to understand
  * growth
  * resuable
  * how to organize files
  * how to name classes
  * how to structure HTML

3. web performance
  * less HTTP requests
  * less code
  * compress code
  * use a css preprocessor
  * less images
  * compress images

## 1.2 What happens to CSS when we load up a webpage
* Load HTML -> Parse HTML -> Document Object Model(DOM)
* Parse HTML
  * Load CSS -> Parse CSS(Resolve confilicting CSS declarations(cascade), Process final CSS values) -> CSS Object Model(CSSOM)
* DOM && CSSOM -> Render tree -> Website rendering

## 1.3 How CSS is Parsed
### 1.3.1 The Cascade and Specificity
* css-rule
  ```css
  .my-class {
    color: blue;
    text-align: center;
    font-size: 20px
  }
  ```
  * selector - .my-class
  * declaration block
    * 하나 이상의 css 선언을 작성 가능
    * 선언은 css property와 value로 이루어짐

* CSS 구분 분석 1단계 - cascade
  * 다른 스타일 시트를 결합하고, 다른 CSS 규칙과 선언 사이의 충돌을 해결하는 프로세스
  * 스타일 우선순위 결정
    * Importance(weight) > specificity(inline, id, class, element) > source order
    * `!important` 키워드가 가장 우선순위가 높다
    * inline style은 외부 스타일시트에서 작성하는 스타일보다 항상 우선 순위가 높다
    * id 1개만 있는 selector가 class가 1000개를 가진 selector보다 더 구체적이다.
    * class 1개만 있는 selector가 element가 1000개를 가진 selector보다 더 구체적이다.
    * *(유니버셜) selector에는 구체적인 값이 없다.

### 1.3.2 Value Processing
* px이외의 unit을 사용해도 궁극적으로 px로 전환됨
  ```html
  <div class="section">
      <p class="amazing">CSS is absolutely amazing</p>
  </div>
  ```

  ```css
  .section {
    font-size: 1.5rem;
    width: 280px;
    background-color: orangered;
  }

  p {
    width: 140px;
    background-color: green;
  }

  .amazing {
    width: 66%
  }
  ```

  |           |width(paragraph)|padding(paragraph)|font-size(root)|font-size(section)|font-size(paragraph)|
  |:---------:|:--------------:|:----------------:|:-------------:|:----------------:|:------------------:|
  |1.declared value|140px, 66% |         -        |        -      |       1.5rem     |          -         |
  |2.cascaded value|   66%     |         -        |16px(browser default)| 1.5rem     |          -         |
  |3.specified value|  66%     |0px(initial value)|       16px    |       1.5rem     |  24px(inheritance) |
  |4.computed value|   66%     |         0px      |       16px    | 24px(1.5 * 16px) |         24px       |
  |5.used value    |184.8px(66% of 280px)|  0px   |       16px    |        24px      |         24px       |
  |6.actual value  |  185px    |         0px      |       16px    |        24px      |         24px       |

* how units are converted from relative to absolute(px)
  ```css
  html, body {
    font-size: 16px;
    width: 80vw;
  }

  header {
    font-size: 150%;
    padding: 2em;
    margin-bottom: 10rem;
    height: 90vh;
    width: 1000px;
  }

  .header-child {
    font-size: 3em;
    padding: 10%;
  }
  ```

  |        |Example(x)|How to convert to pixels|Result in pixels|
  |:------:|:--------:|:----------------------:|:--------------:|
  |%(fonts)|   150%  |x% * parent's computed font-size|  24px  |
  |%(length)|  10%  | x% * parent's computed width |   100px   |
  |em(font)|  3em  |x * parent's computed font-size|72px(3 * 24)|
  |em(length)|  2em  |x * current element computed font-size|48px|
  |rem|  10rem  | x * root computed font-size |   160px   |
  | vh |  90vh  | x * 1% of viewport height |90% of the current viewport height|
  | vw |  80vw  | x * 1% of viewport width |80% of the current viewport width|

### 1.3.3 Inheritance
* 부모로부터 자식에게 특정 속성의 계산된 value를 전달하는 방법
  ```css
  .parent {
    font-size: 20px;
    line-height: 150%;
  }

  .child {
    font-size: 25px
  }
  ```
  * child에 line-height는 없지만, 부모에게 상속을 받는다.
* 상속으로 유지보수가 좋은 코드를 작성할 수 있다.
* text와 관련된 속성들(font-family, font-size, color, etc)은 상속된다.

## 1.4 How and Why to use rem units in project
* why
  * 반응형 구현할 때, 페이지의 모든 수치를 동시에 변경하기 위해서

* root의 기본사이즈를 이용하여 rem을 설정하는 방법
  * (원하는 수치 / 16) %

## 1.5 How CSS Renders a Website: The Visual Formatting Model
* CSS Visual Formaating Model
  * 아래의 모든 요소들을 종합해서 웹사이트가 어떻게 보일지 계산
  * Dimensions of boxes - [the box model](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_box_model/Introduction_to_the_CSS_box_model)
  * Box type - inline, block, inline-block
  * Positioning scheme - float and positioning
    * normal flow(position: relative), floats, absolute positioning(position: absolute, fixed)
  * Stacking contexts
    * 페이지에 어떤 순서로 그림을 그릴지 결정하는 것(z-index)
  * Other elements in the render tree

## 1.6 Components and BEM
1. THINK
* component driven design
  * modular building blocks
  * re-usable
  * independent

2. BUILD
* BEM
  * Block Element Modifier
    * Block - standalone component that is meaningful on its own
    * Element - part of a block that has no standalone meaning
    * Modifier - a different version of a block or an element

3. ARCHITECT
* 7-1 parttern
  * 7 different folders for partial Sass files, and 1 main Sass file to import all other files into a complied CSS styledsheet
  * THE 7 FOLDERS
    * base/
    * components/
    * layout/
    * pages/
    * themes/
    * abstracts/
    * vendors/

# 2. Sass
## 2.1 Variable and Nesting Selector
```scss
$color-primary: #f9ed69;

div {
  background-color: $color-primary;

  button {
    display: block;
    &:first-child {
      margin: 0;
    }
  }
}
```
* Variable - `$변수명: 값`
* Nesting Selector - {} 내부에 selector 선언

## 2.2 Mixins, Extends and Functions
* Mixins
  ```scss
  @mixin clearfix {
    &::after {
      content: '';
      clear: both;
      display: table;
    }
  }

  @mixin style-link-text($textColor) {
    text-decoration: none;
    text-transform: uppercase;
    color: $textColor;
  }

  nav {
    @include clearfix;

    a {
      @include style-link-text($color-text-dark);
    }
  }
  ```
  * 여러 줄의 코드로 된 거대한 변수

* Functions
  ```scss
  @function divide($a, $b) {
    @return $a / $b
  }

  div {
    margin: divide(60, 2) * 1px; // 30px
  }
  ```

* extend
  ```scss
  %btn-placeholder {
    padding: 10px;
    display: inline-block;
    text-align: center;
    width: $width-button;
    @include style-link-text($color-text-light);
  }

  .btn-main {
    &:link {
      @extend %btn-placeholder;
    }
  }

  .btn-hot {
    &:link {
      @extend %btn-placeholder;
    }
  }
  ```

## 3. Responsive Design Principles
1. FLUID LAYOUTS
  * To allow webpage to adapt to the current viewport width(or even height)
  * Use %(or vh / vw) unit instead of px ofr elements that should adapt to viewport(usually layout)
  * Use max-width instead of width

2. RESPONSIVE UNITS
  * Use rem unit instead of px for most lengths
  * To make it easy to scale the entire layout down(or up) automatically

3. FLEXIBLE IMAGES
  * By default, images don't scale automatically as we change the viewport, so we need to fix that
  * Always use % for image dimensions,togehter with the max-width property

4. MEDIA QUERIES
  * To change CSS styles on certain viewport widths(called breakpoints)

## 4. Advanced Responsive Design
### 4.1 Mobile First vs Desktop First, Break Point
* Desktop First
  * 큰 화면의 CSS작성 -> 작은 화면에 맞게 미디어 쿼리 작성
  * 전통적인 방식이면서 배우기 쉬움
  * 미디어 쿼리 max-width를 이용

* Mobile First
  * 작은 화면의 CSS 작성 -> 큰 화면에 맞게 미디어 쿼리 작성
  * 미디어 쿼리 min-width를 이용
  * 장점
    * 웹이나 앱으로 인터페이스를 좁힘
    * 작은 화면에 디자인 제약 조건이 있어서 콘텐츠를 우선
  * 단점
    * 데스크탑 버전에서 여백이 많아서 공허함을 느낌
    * 데스크탑 버전에서는 공간이 넓기 때문에 디자인에 대한 제약이 없음
    * 클라이언트들은 데스크탑 버전의 프로토타입을 보기를 원함
    * 특정 비즈니스 영역에서는 모바일 보다는 데스크탑을 많이 사용할 수 있다

* Break Point 결정 방법
  * BAD
    * 특정 인기장치에 맞게 최적화된 브레이크 포인트 설정
  * GOOD
    * 전체 인터넷에서 가장 많이 사용된 장치의 넓이들로 브레이크 포인트 설정
  * PERFECT
    * 모든 장치를 무시하고 콘텐츠와 디자인만 보는 방식
    * 화면 넓이를 늘리거나 줄일 때 디자인이 깨지는 순간을 브레이크 포인트로 설정
    * 매우 어려움

### 4.2 Responsive Images
* Responsive Image
  * screen 또는 device 사이즈에 맞게 이미지를 제공하는 것
* 사용 케이스
  * resolution switching(해상도 전환)
    * 더 작은화면에서 작은 버전의 이미지를 처리
  * density switching(밀도 전환)
    * 크기는 상관없이 픽셀 밀도(1센치 또는 1인치에서 발견되는 픽셀의 양)가 중요. 저화질 또는 고화질 제공
  * art direction
    * 더 작은 해상도로 다른 스크린 크기와 완전히 다른 이미지로 구현

### 4.3 CSS Build Process
```json
{
  ...,
  "scripts": {
    ...,
    "watch:sass": "node-sass sass/main.scss css/style.css -w",
    "compile:sass": "node-sass sass/main.scss css/style.comp.css",
    "concat:css": "concat -o css/style.concat.css css/icon-font.css css/style.comp.css",
    "prefix:css": "postcss -use autoprefixer -b 'last 10 versions' css/style.concat.css -o css/style.prefix.css",
    "compress:css": "node-sass css/style.prefix.css css/style.css --output-style compressed"
  }
}
```
1. main.sass
2. style.comp.css(compilation)
3. style.concat.css(concatenation)
4. style.prefix.css(prefixing)
5. style.compressing.css

## 5. FlexBox Master
### 5.1 FlexBox
![flex concept](https://developer.mozilla.org/ko/docs/Learn/CSS/CSS_layout/Flexbox/flex_terms.png)
* container
  * flex-direction - 주축(main axis)의 방향을 지정
  * flex-wrap - 아이템이 새 라인에 wrapping해야 할 경우, container의 공간이 충분하지 않을 경우 정의
  * justify-content - flex item이 중심축(main axis)을 따라 어떻게 정렬할지 정의
  * align-item - 가로축(cross axis)을 따라 정렬하도록 정의
  * align-content - row가 1개 이상일 때만 적용되는 것

* item
  * align-self - align-item과 비슷하지만 1개의 item에만 적용
  * order - container 안에 item이 나타나야하는 순서
  * flex-grow - container 안에서 item에 할당 가능한 공간의 정도 
  * flex-shrink - item이 container 공간보다 클 때, 공간을 축소하는 정도
  * flex-basis - 기본 폭

### 5.2 Basic to Flex Container, Item
```html
<div class="container">
  <div class="item">1</div>
  <div class="item i2">2</div>
  <div class="item i3">3</div>
  <div class="item i4">4</div>
  <div class="item">5</div>
  <div class="item">6</div>
  <div class="item">7</div>
  <div class="item">8</div>
  <div class="item">9</div>
  <div class="item">10</div>
</div>
```

```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.container {
  background-color: #ccc;
  padding: 10px;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  align-content: flex-start;
}

.item {
  background-color: #f1425d;
  padding: 30px;
  margin: 30px;
  color: #fff;
  font-size: 40px;
}

.i2 {
  height: 200px;
  /*
  flex-basis: 300px;
  flex-shrink: 0;
  */
  flex: 0 0 300px;
}

.i3 {
  order: 1;
  flex: 1;
}

.i4 {
  font-size: 90px;
  align-self: flex-end;
  order: -1;
}
```