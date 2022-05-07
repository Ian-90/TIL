## 1. 페럴랙스는 어떻게 구현되는가?
* 페럴랙스를 구현하기 위해서 레이어가 필요 
* 참고사이트
  * [스크롤 사용](https://neal.fun/deep-sea/)
  * [횡스크롤 사용](https://www.cabletv.com/the-walking-dead)

## 2. 스크롤 높이 값 구하기(scrollTop)
* scrollTop
  ```html
  ...
  <style>
    body {
      height: 10000px;
      background: linear-gradient(150deg, red, orange, yellow, green, indigo, purple, black)
    }

    h1 {
      color: #fff;
    }
  </style>
  <body>
    <h1>스크롤</h1>
  </body>
  ```

  ```js
  let scrollTop = 0

  window.addEventListener('scroll', function(e) {
    scrollTop = document.documentElement.scrollTop
    console.log(scrollTop)
  }, false)
  ```

  ## 3. '가로 진행 바' 제작 (스크롤 백분율 구하기)
  * 백분율
    ```html
    ...
    <style>
      .progress {
        position: fixed;
        width: 100%;
        height: 5px;
        top: 0;
        left: 0;
        background-color: black;
        z-index: 10;
      }
    
      .bar {
        position: absolute;
        width: 50%;
        height: 5px;
        top: 0;
        left: 0;
        background-color: yellow;
        z-index: 11;
      }
    </style>
    <body>
      ...
      <div class="progress">
        <span class="bar"></span>
      </div>
    </body>
    ```

    ```js
    let scrollTop = 0
    let bar;

    window.onload = function () {
      bar = document.getElementsByClassName('bar')[0]
    }

    window.addEventListener('scroll', function(e) {
      scrollTop = document.documentElement.scrollTop
      let per = Math.ceil(scrollTop / (document.body.scrollHeight - window.outerHeight) * 100)

      bar.style.width = `${per}%`
    })
    ```
