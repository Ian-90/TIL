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