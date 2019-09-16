## 1. module(export & import)의 이해

* [import](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import)
* [export](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export)

* 폴더구조
```sh
├─ ES6_module
│  │  
│  ├─ dist
│  ├─ node_moudels
│  ├─ src
│  ├─── app.js  
│  ├─── myLogger.js
│  ├─── utility.js
│  ├─ index.html
│  ├─ package.json
│  └─ webpack.config.js
```

* index.html
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
  <div id='root'></div>
  <script src='dist/bundle.js'></script>
</body>
</html>
```

* app.js
```javascript
import log from './myLogger.js'
const root = document.querySelector('#root')
root.innerHTML = `<p>Hello World ! </p>`;

log('test') // error; why? export를 안했기때문
```

* myLogger.js
```javascript
function log(data) {
  console.log(data);
}
```

* 해결책
  * myLogger.js
  ```javascript
  export function log(data) {
    console.log(data);
  }
  ```

  * app.js
  ```javascript
  import {log} from './myLogger.js' // export default를 하면 {}를 안해도됨.
  const root = document.querySelector('#root')
  root.innerHTML = `<p>Hello World ! </p>`;

  log('test') // error; why? export를 안했기때문
  ```

  ## 2. module(export & import)기반 서비스코드 구현방법
  * import와 export로 의존성을 해결 할 수 있다.
  * 위의 코드와 이어져 있음
  * myLogger.js에 함수 추가
  ```javascript
  export default function log(data) {
    console.log(data);
  }

  export const getTime = () => {
    return Date.now();
  }

  export const getCurrentHour = () => {
    return (new Date).getHours();
  }
  ```
  * app.js
  ```javascript
  import log, {getTime, getCurrentHour} from './myLogger.js' // export default를 하면 {}를 안해도됨.
  const root = document.querySelector('#root')
  root.innerHTML = `<p>Hello World ! </p>`;

  log('test') // test
  log(getTime()) // 1498012138047
  log(getCurrentHour()) //11
  ```

  * class를 사용하는 방법
    * myLogger.js
    ```javascript
    export default function log(data) {
      console.log(data);
    }

    export class MyLogger {
      constructor(props) {
        this.lectures = ['js', 'ios']
      }

      getLectures() {
        return this.lectures;
      }

      getTime() {
        return Date.now();
      }

      getCurrentHour() {
        return (new Date).getHours();
      }
    }
    ```

    * app.js
    ```javascript
    import log, { MyLogger } from './myLogger.js'

    const logger = new MyLogger();
    log(logger.getLectures()) // ['js', 'ios']
    ```

  * utility 만드는 방법
    * utility.js
    ```javascript
    // const를 export default 이용하는 방법
    const _ = {
      log(data) {
        if (window.console) console.log(data);
      }
    }

    export default _;
    ```

    * app.js
    ```javascript
    import _ from './utility.js'

    _.log('TEST') // 'TEST'
    ```
