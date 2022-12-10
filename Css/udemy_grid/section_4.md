## 1. justify-items
* justify-items - 아이템을 수평으로 정렬
  * stretch - 기본값. grid area 전체 공간 차지.
  * start, center, end - grid area 내의 아이템 수평 정렬
  ```css
  .container {
    display: grid;
    grid-gap: 10px;
    grid-template: 100px 100px 100px / repeat(auto-fit, minmax(200px, 1fr));
    justify-items: center;
  }
  ```

## 2. align-items
* align-items - 아이템을 수직으로 정렬
  * stretch - 기본값. grid area 전체 공간 차지.
  * start, center, end - grid area 내의 아이템 수평 정렬
  ```css
  .container {
    display: grid;
    grid-gap: 10px;
    grid-template: 100px 100px 100px / repeat(auto-fit, minmax(200px, 1fr));
    align-items: center;
  }
  ```

## 3. justify-content
* justify-content - 컨테이너를 수평으로 정렬
  * stretch - 기본값.
  * start, center, end - grid container를 수평 정렬
  * space-around - 열의 왼쪽과 오른쪽에 여백을 추가됨
  * space-between - 각 열들 사이에만 공간이 추가됨
  * space-evenly - 각 열들 사이에 동일한 양의 공간이 추가됨
  * 
  ```css
  .container {
    display: grid;
    grid-gap: 10px;
    grid-template: 100px 100px 100px / 200px 200px;
    justify-content: center;
  }
  ```

## 4. align-content
* align-content - 컨테이너를 수직으로 정렬
  * stretch - 기본값.
  * start, center, end - grid container를 수직 정렬
  * space-around - 행의 왼쪽과 오른쪽에 여백을 추가됨
  * space-between - 각 행들 사이에만 공간이 추가됨
  * space-evenly - 각 행들 사이에 동일한 양의 공간이 추가됨
  * 
  ```css
  .container {
    display: grid;
    grid-gap: 10px;
    grid-template: 100px 100px 100px / 200px 200px;
    align-content: center;
  }
  ```

## 5. justify-self, align-self
* 정렬 무시하기
  ```css
  .container {
    display: grid;
    grid-gap: 10px;
    grid-template: 150px 150px / 200px 200px 200px;
    border: 1px solid #fff;
    padding: 10px;
    height: 400px;
    justify-content: center;
    align-content: center;
  } 

  .container div:nth-child(1) {
    justify-self: end;
  }
  ```