# 1. 폰트와 텍스트 스타일

* font
  * font-family - 서체, 콤마(,)로 구분하여 없는 서체에 따라서 뒤쪽서체를 적용한다.
  ```css
  selector {
    font-famliy: '첫번째 서체', '두번째 서체',..;
  }
  ```
    * serif - 명조
    * sans-serif - 고딕
    * cursive - 필기
    * monospace - 고정폭

  * font-weight - 폰트의 두께
    * bold
      * 600 ~ 900 - 보통 웹폰트에서 사용
    * normal
    * lighter
      * 100 ~ 500

  * font-style - 폰트의 기울기
    * normal
    * italic
    * oblique

  * font-variant
    * small-caps

  * color - 폰트의 컬러

* text
  * letter-spacing - 글자의 간격
  * line-height - 줄 간격
  * text-align - 정렬
    * left
    * center
    * right
    * justify - 양쪽 정렬
  * text-decoration - 텍스트의 밑줄
    * underline - 밑줄
    * overline - 상단줄
    * line-through - 취소선
    * none - 제거
  * text-indent - 들여쓰기
  * text-transform - 텍스트의 대,소문자
    * uppercase
    * lowercase
    * capitalize - 첫글자만 대문자
  * vertical-align - 위아래 정렬
    * top
    * middle
    * baseline - 0
    * bottom
  * white-space
    * nowrap - 줄바꿈이 안된다.
  * word-spacing - 단어 간격(띄어쓰기 한자리라고 생각하면 됨)