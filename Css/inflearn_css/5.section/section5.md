# 1. 플롯 지정하기

* float - contents를 왼쪽이나 오른쪽으로 옮긴다. 보통 메뉴나 레이아웃을 짤 때, 사용
  * left - element의 순서대로 왼쪽으로 정렬
  * right - element의 순서대로 오른쪽 정렬

* float의 영향을 받지 않으려면 ?
  * clear - 영향받지 않을 element에 적용해준다.
    * left
    * right
    * both

# 2. 플롯 해지하기

* img 간격 없애기
```css
img {
  vertical-align: top
}
```

* 감싸는 영역에 ::after로 clear를 적용해야 한다(공식)
  * 익스플로러 7버전이하는 안된다. 그렇다면 ?
    * 감싸는 영역에 *zoom 적용
    ```css
    selector {
      *zoom: 1;
    }
    ```

* 다른 방법은 ?
  * 감싸는 영역에 overflow:hidden 적용
  * 보통은 위에 방법을 사용한다.

# 3. 포지션 지정하기

* position
  * relative - absoulte의 기준을 잡을 때, 부모에 사용
  * absolute - 절대적인 위치
  * fixed - 고정위치(무조건 가장 바깥쪽이 기준)
  * static

* z-index - 사용을 하면 큰숫자가 맨앞으로 나온다.