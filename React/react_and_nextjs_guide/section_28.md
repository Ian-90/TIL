## 리액트 훅 소개

### 1. What are "React Hooks"?
* 예전의 리액트
  * Class-based Components
    * state를 두고 관리
    * 함수형 컴포넌트에 비해 작업량이 많은 컴포넌트

  * Functional Components
    * 컨텐츠 출력에만 사용
    * 내부의 state를 변경 할 수 없었음

  * 16.8 버전부터 react-hook 출시

* React Hooks
  * 특별한 자바스크립트 함수
  * 오직 함수형 컴포넌트에서만 사용 가능
  * 다른 함수와 구분하기 위해 훅의 함수 이름은 use로 시작
  * 직접 hook을 만들수 있음


### 2. Using React Hooks With Functional Components
* useState
  * 클래스형 컴포넌트에서 state는 항상 객체어야 하지만 함수형 컴포넌트는 객체일 필요가 없다
  * 클래스 컴포넌트와 다르게, 현재 state를 매개변수로 받은 state로 교체
  * 클래스 컴포넌트와 다르게 여러 state를 등록가능

* useEffect
  * 부수 효과(side effect - 어떤 로직이 실행되어 응용 프로그램에 예상치 못한 영향을 주는 것)를 관리
  * 모든 컴포넌트의 렌더링이 끝난 뒤에 실행됨
  * 두번째 인자인 의존성 배열을 통하여 실행 빈도를 설정
  * clean up
    * useEffect에서 반환하는 함수
    * useEffect 함수가 다시 실행되기 직전에 실행
    * 의존성 배열이 `[]`면, 컴포넌트가 unmount되었을 때 실행된다. 

* useCallback
  * 의존성 배열을 통하여 함수 캐싱 빈도를 설정

* useRef
  * reference 생성 가능
  * DOM 요소에 할당

* useReducer
  * state를 업데이트할 때, 어떤식으로 상태를 변경할 건지 정의 및 관리 할 수 있게 해주는 훅

* useContext
  * context에서 provider에 넘겨준 value를 리턴하는 훅

* useMemmo
  * 값을 저장하는 훅. 값이 저장되면 렌더링 될 때 마다 값을 재생성하지는 않는다.
  * 작은 컴포넌트의 경우 사용하지 않는 것이 좋다

### 3. Rules of Hooks & Custom Hooks
* 모든 훅에 적용되는 규칙
  * 훅은 반드시 함수형 컴포넌트나 커스텀 훅에서만 사용해야 한다
  * 컴포넌트의 루트에서 사용해야 한다

* setState & state update batching
  * 불필요한 렌더링을 하지 않기 위해 [state를 일괄 업데이트](https://github.com/facebook/react/issues/10231#issuecomment-316644950)


* 커스텀 훅
  * 이름은 use로 시작해야하며, 함수 형태
  * 컴포넌트 간에 state 관련(stateful) 로직을 공유
