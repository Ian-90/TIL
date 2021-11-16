# 유데미 타입스크립트 부록강의

### `Typescript` = `Javascript` + `A type system`
### 1. Type annotations - 우리가 타입스크립트에게 알려주는 타입
* 타입 선언을 사용하는 경우
  * 변수
    1. 함수가 any 타입을 return 하거나 value를 명확하게 해야하는 경우
    2. 한줄로 변수 선언 후, 나중에 초기화 하는 경우
    3. 추론할 수 없는 타입을 가진 변수에 타입을 주기를 원할 때

### 2. Type inference - 타입스크립트가 추론하는 타입
```ts
// variable declaration = variable Initialization
const color = 'red'
```
* 타입 추론을 사용하는 경우 - 대부분
