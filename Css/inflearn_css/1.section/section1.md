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