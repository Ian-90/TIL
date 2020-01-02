# NOMAD CODERS

- [React Context](https://academy.nomadcoders.co/p/antiredux-new-react-context-api) - React Context API를 배우는 강의입니다.

## 1. Setup

- React 설치

```bash
npx create-react-app [project folder name]
```

- 필요한 library 설치

```bash
yarn add styled-components styled-reset styled-flex-component typography --dev
```

## 2. Creating the Store

- [Context API](https://ko.reactjs.org/docs/context.html#api)
  - Provider - Store에 데이터를 제공해준다.
  - Consumer - Store에서 데이터를 받아서 사용 할 수 있다.

* prop-types와 react-fontawesome 설치

```bash
yarn add prop-types react-fontawesome --dev
```

## 3. Consuming the Store

- 파일 구조

```
├─ Root
│  │
│  └─App
│     └─Notification
│         └─NotificationPresenter

```

- App의 data를 Notification으로 전달해주려면 ?

  - 기존에는 props를 연달아서 내려줘야 했다.

- Context를 사용하면?

  - App.js - data를 전달해주고 싶은 컴포넌트

  ```javascript
  import Store from "store";
  class App extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        data: "a"
      };
    }
    render() {
      return (
        <Store.Provider value={this.state.data}>
          <AppPresenter />
        </Store.Provider>
      );
    }
  }
  ```

  - NotificationPresenter.js - data를 받아서 사용하는 컴포넌트

  ```javascript
  import Store from "store";
  class NotificationPresenter extends React.Component {
    render() {
      return (
        <Store.Consumer>
          {store => console.log(store.data)} // App의 state.data인 "a"가
          console창에 출력 된다.
        </Store.Consumer>
      );
    }
  }
  ```
