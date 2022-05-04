## 1. mouse move 값 활용
* mousemove
  ```html
  ...
  <style>
  body {
    position: relative;
  }

  .cursor_item {
    position: absolute;
    width: 100px;
    height: 100px;
    background-color: red;
    top: 0;
    left: 0;
  }
  </style>
  <body>
    <h1>test</h1>
    <div class="cursor_item"></div>
  </body>
  ```

  ```js
  window.onload = function () {
    let h1 = document.getElementsByTagName(h1)[0]
    let cursor_item = document.getElementsByClassName('cursor_item')[0]
    function mouseFunc (e) {
      h1.innerHTML = `x: ${e.clientX} y: ${e.clientY}`
      console.log(e.clientX, e.clientY)
  
      cursor_item.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
    }
    window.addEventListener('mousemove', mouseFunc, false)
  }
  ```

## 2. requestAnimationFrame (loop, 자연스러운 움직임)
* requestAnimationFrame
  ```js
  let i = 0
  function loop () {
    console.log(i += 1)
    window.requestAnimationFrame(loop)
  }

  window.onload = function () {
    ...
    loop()
  }
  ```

## 3. transform, translate 값 변경
* 마우스가 움직일 값 =+ (현재 마우스 위치 - 바로 전 위치 값) * 속도
* 마우스 값 부드럽게 가져오기
  ```js
  let x = 0
  let y = 0
  let mouseX = 0
  let mouseY = 0
  let speed = 0.1
  let h1
  let cursor_item

  function loop () {
    mouseX += (x - mouseX) * speed
    mouseY += (y - mouseY) * speed
    h1.innerHTML = `x: ${x} mouseX: ${mouseX}`
    cursor_item.style.transform = `translate(${mouseX}px, ${mouseY}px)`
    window.requestAnimationFrame(loop)
  }
  window.onload = function () {
    h1 = document.getElementsByTagName(h1)[0]
    cursor_item = document.getElementsByClassName('cursor_item')[0]
    function mouseFunc (e) {
      x = e.clientX
      y = e.clientY
      console.log(e.clientX, e.clientY)
  
    }
    window.addEventListener('mousemove', mouseFunc, false)
  }
  ```

## 4. transition, easing (가속도)
* 클릭할 떄 마다 이동
  * [cubic-bezier](https://matthewlein.com/tools/ceaser) 값을 복사해서 이용
  * transition
  ```css
  .cursor_item {
    ...
    margin: -50px 0 0 -50px;
    transition: all 1s cubic-bezier(0.815, 0.020, 0.300, 1.005);
  }

  button {
    font-size: 40px;
    font-weight: bold;
    background: #fff;
    color: red;
    padding: 30px 80px;
    margin: 50px;
    cursor: pointer;
    transition: all .5s cubic-bezier(0.815, 0.020, 0.300, 1.005);
  }

  button:hover {
    background: red;
    color: #fff;
    font-size: 150px;
    padding: 100px 160px;
  }
  ```

  ```js
  let x = 0
  let y = 0
  let mouseX = 0
  let mouseY = 0
  let speed = 0.1
  let h1
  let cursor_item
  /*
  function loop () {
    mouseX += (x - mouseX) * speed
    mouseY += (y - mouseY) * speed
    h1.innerHTML = `x: ${x} mouseX: ${mouseX}`
    cursor_item.style.transform = `translate(${mouseX}px, ${mouseY}px)`
    window.requestAnimationFrame(loop)
  }
  */
  window.onload = function () {
    h1 = document.getElementsByTagName(h1)[0]
    cursor_item = document.getElementsByClassName('cursor_item')[0]
    function mouseFunc (e) {
      x = e.clientX
      y = e.clientY
      console.log(e.clientX, e.clientY)
  
    }
    window.addEventListener('click', mouseFunc, false)
  }
  ```