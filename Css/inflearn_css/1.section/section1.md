# 1. html 문서에 css 적용하기,css 연결하기

* inline style - html tag에 style 속성으로 적용. 여러 style을 사용할 땐 ;로 구분한다. 일반적으로는 사용하지 않는다. 중복된 코드 작성이 많다.
```html
<body>
  ...
  <h1 style="border: 1px solid blue; color: red;">example</h1>
</body>
```

* html 문서에 css 적용하기 - head tag 내부에 style tag 적용(html 예전버전에는 style tag에 type속성으로 text/css를 정해주어야 했음)
```html
<head>
  <style>
    /* css style */
    selector {
      property: value;
    }
  </style>
  ...
</head>
```

* 외부 스타일시트 연결하기
  * link - head tag 내부에 link를 이용하여 연결(html 예전버전에는 link tag에 type속성으로 text/css를 정해주어야 했음)
  ```html
  <head>
    <link rel="stylesheet" href="css 파일 경로">
  </head>
  ```

  * @import url() - head tag 내부에 style tag에서 @import url을 이용(url대신 바로 경로를 작성해도 가능). 보통 css파일에서 다른 css파일을 로드 할 때 사용.
  ```html
  <head>
    <style>
    /* css style */
    @import url('css 파일 경로');
    @import "css 파일 경로";
    </style>
    ...
  </head>
  ```

* css 주석 - 시작(/&#42;)과 종료(&#42;/)사이에 작성을 해준다.
```css
/* 주석을 작성해주세요 */
selector {
  /*
    주석을 작성해주세요.
  */
}
```

* css 문자 코드셋 적용
```css
@charset "utf-8";
...
```

# 2. css값, 길이와 색상 알아보기

* 색상 - 보통 hex를 많이 사용한다.
  * hex
    * 16진수 - 0~9, a~f이며, 0에서 f로 갈수록 컬러가 선명해진다.
    * rrggbb(red, green, blue)
      * example - #ff0000 red 두개가 꽉차있다.
    * 두개씩 값이 같으면, 한개씩만 써도 된다.
      * example - #f00

  * rgb
    * 0~255 사이 값으로 적용한다. 0에서 255로 갈수록 컬러가 선명해진다.(비율도 적용 가능)
    * rgb(red value, green value, blue value)

  * hsl(html5에서 추가됨, 익스플로러 9버전 이상)
    * h - 색상값(0 ~ 359)
    * s - 채도
    * l - 밝기(default는 50%)

  * color에서 투명도 지정법
    * rgba(red value, green value, blue value, alpha value)
    * hsla(색상값, 채도, 밝기, 투명도)

* 길이의 단위(가장 많이 쓰는 단위들로만..)
  * px - 모니터 해상도에 상대적인 값이다.
  * em - 글자 크기를 기준으로 하는 단위(ex. font-size가 12px이면, 50em은 50 * 12px로 600px이다.)
  * rem - em과 비슷함. root의 글자 크기를 기준으로 하는 단위(html5에서 새로 생김)(ex. html의 font-size가 20px이면, 50rem은 50 * 20px로 1000px이다.)
  * % - 비율

# 3. css 선택자와 선택자의 우선순위

* inheritance(상속)

* 선택자
  * tag - 모든 태그를 선택
  ```css
  p {
    /* style */
  }
  ```

  * class - 중복 스타일을 적용할 때, 사용
  ```css
  .classname {
    /* style */
  }
  ```

  * id - 고유한 이름
  ```css
  #idname {
    /* style */
  }
  ```

  * 여러개의 선택자를 사용하려면? 콤마(,)로 구분한다.
  ```css
  tagname, .class, #id, ... {
    /* style */
  }
  ```

  * 자손선택자 - 부모 하위에 있는 모든것을 선택 가능
  ```css
  selector selector {
    /* style */
  }
  ```

  * 자식선택자 - 부모 바로 밑에 있는 것만 선택 가능
  ```css
  selector > selector {
    /* style */
  }
  ```

  * 인접형제 선택자 - 첫번째 selecor 다음에 있는(인접한) 두번째 selector를 선택
  ```css
  selector + selector {
    /* style */
  }
  ```

  * 속성 선택자
    * 속성 모든것을 선택
    ```css
    [attribute] {
      /* style */
    }
    ```

    * 속성이 value와 같은것을 선택
    ```css
    [attribute = value] {
      /* style */
    }
    ```

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

  * 가상 클래스 선택자 - 우선순위때문에 link, visited, hover, active 순서로 사용하는 것이 좋다.
    * a:link - 방문하지않은 link 선택
    * a:visited - 방문을 했었던 link 선택
    * tag:hover - 마우스가 올라가있는 동안 선택
    * tag:active - 마우스 클릭 또는 마우스 엔터가 눌린 동안 선택
    * tag:focus - tab등 포커싱 되었을 때, 선택

  * 가상 엘리먼트 선택자
    * tag::first-line - 요소의 첫번째 라인만 선택
    * tag::first-letter - 요소의 첫번째 글자만 선택
    * tag::before - 요소의 시작지점을 선택. float를 해지 할 때 활용
    * tag::after - 요소의 마지막지점을 선택. float를 해지 할 때 활용

* 우선순위
  * 선택자 우선순위가 같을 때, 뒤에 선언된 css 적용
  * tag - 1
  * class - 10
  * id - 100
    * 우선순위 계산
    ```css
    /* 1 + 10 + 100 = 111 */
    div.sample#sample {
      /* style */
    }
    ```
  * inline - 1000
  * !important - 무조건 적용되는 값
  ```
  !important > inline > id > class > tag
  ```