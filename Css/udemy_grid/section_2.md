## 1. CSS Grid 사용하기
* grid 컨테이너 선언
  ```css
  .container {
    display: grid;
  }
  ```

## 2. Grid 정의하기
* 그리드는 기본적으로 좌측상단부터 순서대로 행방향으로 아이템들을 채움
* grid-template-rows - 각각 행의 높이 정의
* grid-template-columns - 각각 열의 넓이 정의
* grid-template - 각각 행과 열을 정의하는 단축 명령어
  ```css
  .container {
    grid-template-rows: 100px 200px;
    grid-template-columns: 200px auto 150px;
  }

  .container_shorthands {
    grid-template:  100px 200px / 200px auto 150px;
  }
  ```

## 3. Grid Item 배열하기
* grid-row-start, grid-row-end - 그리드 컨테이너 아이템의 행 위치 지정
* grid-row - 행 위치 지정 단축 명령어
* grid-column-start, grid-column-end - 그리드 컨테이너 아이템의 열 위치 지어
* grid-column - 열 위치 지정 단축 명령어
  ```css
  .item {
    grid-row-start: 1;
    grid-row-end: 2;
    grid-column-start: 1;
    grid-column-end: 2;
  }

  .item_shorthands {
    grid-row: 1 / 2;
    grid-column: 1 / 2;
  }
  ```

## 4. 고정된 개수의 행 또는 열 펼치기
* span - 행 또는 열 합치기
  ```css
  .item {
    grid-row: auto / span 2;
  }
  ```

## 5. 그리드 라인 이름 정하기
* 그리드 라인 이름 지정
  ```css
  .container {
    display: grid;
    grid-template: [row1-start] 100px [row1-end row2-start] 100px [row2-end]
      / [sidebar] 200px [content-start] auto [content-end] 150px;
  }

  .item {
    grid-row: row1-start / row1-end;
    grid-column: 1 / 3;
  }
  ```

## 6. 거터 정의하기
* grid-row-gap - 그리드 아이템들 사이의 행 간격
* grid-column-gap - 그리드 아이템들 사이의 열 간격
* grid-gap - 그리으 아이템들 사이의 행과 열 간격 단축 명령어
  ```css
  .container {
    display: grid;
    grid-template: 100px 100px / 200px auto 150px;
    grid-row-gap: 10px;
    grid-column-gap: 20px;
  }
  
  .container_shorthands {
    display: grid;
    grid-template: 100px 100px / 200px auto 150px;
    grid-gap: 10px 20px;
  }
  ```

## 7. 소스 순서 독립성: order
* order - 아이템들의 순서를 상대적으로 변경. 웹 접근성을 생각하면 많이 사용해서는 안된다.
  ```css
  .item_3 {
    order: 1;
  }
  ```
