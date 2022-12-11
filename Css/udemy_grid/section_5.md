## 1. grid-auto-rows, grid-auto-columns
* 기본 선언한 grid container를 초과하여 아이템을 생성할 경우 암묵적으로 auto로 생성된다. 그러므로 grid-auto-rows, grid-auto-columns를 이용하기.
* grid-auto-rows, grid-auto-columns - 암묵적인 그리드 생성
  ```css
  .grid {
    display: grid;
    grid-gap: 10px;
    grid-template: 150px 150px / 150px 150px;
    grid-auto-rows: 100px;
  }

  .grid div:nth-child(2) {
    grid-column: 2 / sapn 2
  }
  ```

## 2. grid-auto-flow
* grid-auto-flow - 그리드 아이템을 채우는 방식
  * row - 기본값
  * column
  * dense - 빈 공간을  채움
  ```css
  .grid {
    display: grid;
    grid-gap: 10px;
    grid-template: 150px 150px / 150px 150px;
    grid-auto-rows: 100px;
    grid-auto-columns: 150px;
    grid-auto-flow: row dense;
  }

  .grid div:nth-child(2) {
    grid-column: 1 / span 3;
  }
  ```

## 3. grid shorthands
* grid - grid-template-rows, grid-template,columns 정의와 auto-flow를 통하여 grid-auto-columns와 grid-auto-rows, grid-auto-flow를 정의할 수 있다.
  ```css
  .grid {
    display: grid;
    grid: 150px 150px / auto-flow 150px;
    /*
    grid-auto-flow: column;
    grid-template-columns: none;
    grid-auto-columns: 150px;
    */
    grid-gap: 10px;
  }
  ```
