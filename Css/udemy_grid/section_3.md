## 1. grid-area
* grid-area - 4개의 그리드 라인으로 정의되어 있음. `grid-row-start / grid-column-start / grid-row-end / grid-column-end`
  ```css
  .grid_item {
    grid-area:  2 / 1 / 4 / 2;
    /* grid-row-start: 2;
    grid-row-end: 4;
    grid-column-start: 1;
    grid-column-end: 2; */
  }
  ```

## 2. grid-template-area
* grid-area-template - 지명된 템플릿 영역을 사용하여 아이템을 배치하는 작업. `.`을 입력하면 아이템을 비우기 가능
  ```css
  .grid {
    display: grid;
    grid-template: 100px 100px 100px / 200px auto 150px;
    grid-template-areas:
      "E E A"
      "B C A"
      "B D F";
  }

  .grid div:nth-child(1) {
    grid-area: A;
  }

  .grid div:nth-child(2) {
    grid-area: B;
  }
  .grid div:nth-child(3) {
    grid-area: C;
  }
  .grid div:nth-child(4) {
    grid-area: D;
  }
  .grid div:nth-child(5) {
    grid-area: E;
  }
  .grid div:nth-child(6) {
    grid-area: F;
  }
  ```

## 3. repeat()
* repeat(반복 횟수, 영역의 넓이) - 그리드의 행과 열을 반복하는 함수.
  ```css
  .grid {
    display: grid;
    grid-template: 100px 100px 100px / repeat(24, [col] 25px)
  }

  .grid div:nth-child(1) {
    grid-column: 1 / span 24;
  }

  .grid div:nth-child(2) {
    grid-column: col 3 / col 9; /* grid-column: 3/9 와 같다. 하지만 이름을 붙인 것이 가독성이 좋다*/
  }
  .grid div:nth-child(3) {
    grid-column: auto / span 6;
  }
  .grid div:nth-child(4) {
    grid-column: auto / span 6;
  }
  .grid div:nth-child(5) {
    grid-column: auto / span 12;
  }
  .grid div:nth-child(6) {
    grid-column: auto / span 12;
  } 
  ```

## 4. fr 단위
* fraction - 아이템들 사이의 남은 공간의 일부분. 사이즈를 분배할 떄 사용.
  ```css
  .grid {
    display: grid;
    grid-template: 100px 100px 100px / 1fr 1fr 1fr;
  }
  ```

## 5. minmax()
* mixmax - 행이나 열의 가능한 사이즈 범위를 지정
  ```css
  .grid {
    display: grid;
    grid-template: 100px 100px 100px / repeat(6, minmax(100px, 200px));
  } 
  ```

## 6. 행과 열로 그리드를 자동으로 채우기
* repeat(auto-fill) - 그리드 컨테이너가 더 이상 공간이 없을 때까지 열이나 행을 생성
  ```css
  .grid {
    display: grid;
    grid-gap: 10px;
    grid-template: 100px 100px 100px / repeat(auto-fill, minmax(100px, 200px))
  }
  ```

* repeat(auto-fit) - auto-fit과 동작은 비슷하지만 비어있는 열이나 행을 0픽셀로 축소
  ```css
  .grid {
    display: grid;
    grid-gap: 10px;
    grid-template: 100px 100px 100px / repeat(auto-fit, minmax(100px, 200px));
  }
  ```
