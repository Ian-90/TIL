[리액트를 다루는 기술](https://book.naver.com/bookdb/book_detail.nhn?bid=13799583)

* presentation component - 뷰만 담당. 리덕스 스토어에 접근하지 않고, 오직 props로만 데이터를 받음.

* container component - 리덕스 스토어에 접근 가능하고, state를 가지고, 데이터를 뷰 컴포넌트에 감싸주는 wrapper 컴포넌트

* combineReducer - reducer를 합침
```javascript
import { combineReducers } from 'redux'
import number from './number'
import color from './color'

const reducers = comcombineReducers({
  numberData: number,
  colorData: color,
  ...
})

export default reducers
```

* [redux dev tools](https://github.com/reduxjs/redux-devtools)
  * 크롬확장프로그램 설치 후, 아래 코드 추가
  ```javascript
  const store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
  ```

  * [yarn으로 설치](https://github.com/zalmoxisus/redux-devtools-extension#13-use-redux-devtools-extension-package-from-npm)
    * install
    ```
    yarn add redux-devtools-extension
    ```

    * 설정
    ```javascript
    import { createStore, applyMiddleware } from 'redux';
    import { composeWithDevTools } from 'redux-devtools-extension';

    const store = createStore(reducer, composeWithDevTools(
      applyMiddleware(...middleware),
    ));
    ```