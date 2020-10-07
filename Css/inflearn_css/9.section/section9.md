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