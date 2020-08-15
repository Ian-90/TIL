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