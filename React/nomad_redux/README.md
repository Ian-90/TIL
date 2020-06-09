# NOMAD CODERS

- [초보자를 위한 리덕스 101](https://academy.nomadcoders.co/p/build-a-timer-app-with-react-native-and-redux)

## 1. Pure Redux: Counter

* install
```
yarn add redux
```

* redux는 데이터를 관리해주기 위해 만들어 졌다.

* store - 데이터를 저장하는 장소
* reducer - 앱의 데이터를 리턴하는 함수
* action - reducer와 소통 하는 방법(데이터를 변경하는 함수)
* dispath - action을 받아서 store에 보내는 함수
* subscribe - state의 변화에 대응하는 함수

## 2. Pure Redux: TodoList

* state
  * 읽기 전용이어야 한다. 
  * 변경하지말고 새로운 오브젝트를 리턴한다.

* actionCreator
  * 오브젝트만 리턴

## 3. React Redux

* [react에서 redux를 사용하려면?](https://redux.js.org/basics/usage-with-react#installing-react-redux) - react-redux를 설치.
  * react-redux install
  ```
  yarn add react-redux
  ```

* connect - 컴포넌트들을 store에 연결
* mapStateToProps - redux의 state를 컴포넌트의 props로 전달
* mapDispatchToProps - redux의 dispatch를 컴포넌트의 props로 전달

## 4. React Toolkit

* [redux toolkit](https://redux.js.org/redux-toolkit/overview)이란 ? - 더 적은 양의 redux 코드를 짤 수 있도록 도와주는 도구

* install
```
yarn add @reduxjs/toolkit
```

* createAction - action함수를 대체
```javascript
createAction(typeName)
{
  type: typeName,
  payload: dispatch로 보내는 데이터
}

```

* createReducer - reducer함수를 대체. state를 변형해서 리턴해도 된다.(switch문을 사용하지 않는다.)

* configureStore - default로 redux devtools를 지원

* createSlice - initial state, reducer, action 등 모두 지원