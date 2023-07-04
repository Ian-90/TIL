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
