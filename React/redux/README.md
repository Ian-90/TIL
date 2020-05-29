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