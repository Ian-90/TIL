# 1. css3 선택자 알아보기
* 형제 선택자
  * a + b - a 다음에 오는 형제 b 요소
  * a ~ b - a 다음에 오는 모든 형제 b 요소

* 속성 선택자
    * 속성이 value로 시작 하는것을 선택(많이 쓰임)
    ```css
    [attribute ^= value] {
      /* style */
    }
    ```

    * 속성이 value로 끝나는 것을 선택(많이 쓰임)
    ```css
    [attribute $= value] {
      /* style */
    }
    ```

    * 속성이 특정 value문구(단어여야됨)를 포함하는것을 선택
    ```css
    [attribute ~= value] {
      /* style */
    }
    ```

    * 속성이 특정 value문구(단어가 아니여도 됨)를 포함하는것을 선택
    ```css
    [attribute *= value] {
      /* style */
    }
    ```

* 의사 클래스(pseudo-class)
  * :empty - 비어있는 요소를 찾는다
  * :first-child - 첫번째 요소 선택
  * :last-child - 마지막 요소 선택
  * :nth-child(n) - n번째 자식 요소. 물론 n에 식을 넣어서 여러개 선택 가능
  * :nth-last-child(n) - 뒤에서 부터 n번째 자식 요소. 물론 n에 식을 넣어서 여러개 선택 가능
  * :nth-of-type(n) - selector들 중에서 n번째로 나오는 요소
  * :root - 상속을 많이받으면, em은 헷갈린다. 그래서 rem을 사용하기 위해 사용한다.
    * rem은 html 글자크기만 가지고 계산
  * :target - tabmenu에서 활용

# 2. 그림자처리, 말줄임표현, 투명도 지정하기
* 접두어 - 필요한 속성에 따라 써줘야 한다(css3 generator를 이용하면, 접두어가 필요한 속성을 사용하기 편함)
  * -webkit-attribute: value; Chrome, Safari
  * -moz-attribute: value; Firefox
  * -ms-attribute: value; IE, Outlook
  * -o-attribute: value; Opera

* 그림자 처리
  * text-shadow - 가로방향 세로방향 blur 색상
  * box-shadow - inset 가로방향 세로방향 blur spread 컬러

* 말줄임 표현
  * text-overflow
    * 적용하기 위해선 width가 있어야 된다
    * 줄바꿈 금지가 있어야 한다
    * overflow: hidden이 필요하다
    * inline을 적용하려면 display: block 추가

* 투명도 지정하기
  * 색상만 투명하게 하기
    * rgba(red, green, blue, alpha) - 주로 이용
    * hsla(각도, 채도, 밝기, 투명도)
  * 요소전체 투명하게 하기
    * opacity 이용

# 3. 멀티칼럼&둥근모서리 지정하기
* 멀티칼럼
  * column-count - 해당 요소를 몇개의 칼럼으로 나눌것인가?
  * column-gap - 컬럼 사이의 간격
  * column-rule - 컬럼 사이의 보더
  * column-width - 컬럼의 넓이 지정
  * columns: column-width column-count ...;
  * column-span - n개의 칼럼을 병합

* 둥근모서리
  * border-radius
    * 한개의 값 - 전체
    * 한 줄 - 상 우 하 좌
    * 두 줄 - 가로방향 상 우 하 좌 / 세로방향 상 우 하 좌;

# 4. 추가 된 배경처리 알아보기 & 그라데이션 적용
* 추가 된 배경처리
  * background
    ```css
    selector {
      background:
        url(path),
        url(path),
        ...,
        url(path);
    }
    ```
    * 콤마로 나누어서 여러개 사용가능 
    * 먼저 선언된 것이 상단으로 온다
  * background-clip
    * content-box - padding영역에서는 background가 보이지 않게 한다. 즉, content영역에서만 나온다.
  * background-origin - background에 시작영역을 지정

* 그라데이션 적용
  * linear-gradient(방향, 영역별 색상) - 선형 그라데이션
  * radial-gradient(방향, 영역별 색상) - 원형 그라데이션

# 5. 박스사이징&플렉스 지정하기
* box-sizing
  * border-box - width는 margin을 제외한 전체 영역
  * content-box - width는 content 영역

* flex
  ```css
  selector {
    display: flex;
  }
  ```
  * float처럼 해지를 하지 않아도 된다
  * layout 영역은 flex 속성으로 비율을 지정

# 6. transition 지정하기
* transition - 변화되는 과정에 효과를 줄 수 있다
  * shorthand
  ```css
  selector {
    transition: property durantion delay timing-function;
  }
  ```
  * transition-property
  * transition-duration
  * transition-delay
  * [transition-timing-function](https://developer.mozilla.org/en-US/docs/Web/CSS/easing-function) - 진행속도의 변화 지정
    * linear
    * ease
    * ease-in
    * ease-in-out
    * ease-out
    * cubic-bezier - 원하는 곡선 생성 가능
    * steps(count, start | end)

# 7. animation 지정하기
* animation
  * shorthand
  ```css
  @keyframes name {
    /* from {}
    to {} */
    0% {
      property: value;
    }

    100% {
      property: value;
    }
  }

  selector {
    animation: name duration timing-function delay iteration-count direction fill-mode;
  }
  ```
  * animation-duration - 진행시간
  * animation-delay - 대기시간
  * animation-name - 이름
  * animation-timing-function - 진행속도의 변화 지정
  * animation-direction - normal | reverse | alternate | alternate-reverse 진행방향
  * animation-iteration-count - 진행횟수
  * animation-play-state - running | paused 멈추거나 진행
  * animatin-fill-mode - forwards | backwards 애니메이션이 끝나면 마지막 설정상태 유지를 하거나 초기상태로