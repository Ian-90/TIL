## 1. Kent C.Dodds pattern
* [react state management](https://kentcdodds.com/blog/application-state-management-with-react)
  * createContext로 콘텍스트를 생성
  * useContext 훅으로 커스텀 훅을 생성하여 해당 콘텍스트를 반환
  * provider는 useState를 사용하여 내부 상태를 생성
  * export custom hook and provider
  * [한글 번역](https://im-developer.tistory.com/222)

## 2. Provider에 래핑할 커스텀 렌더링 생성
* [custom render](https://testing-library.com/docs/react-testing-library/setup/#custom-render)

## 3. act로 감싸지 않은 오류(Not wrapped in act Error)
* 테스트가 끝난 뒤에 컴포넌트가 바뀌기 때문에 발생하는 오류(비동기 상태 업데이트가 완료되기 전에 테스트함수가 종료)
  * `Warning: An update to Options inside a test was not wrapped in act(...)`
  * `Warning: Can't perform a React state update on an unmounted component.`

* Race Condition
  * Test renders component
  * Component triggers network call
  * Test function exits
  * Unmount component
  * Network call returns

* 해결 방법(No Race Condition)
  * Test renders component
  * Component triggers network call
  * Add [clean up](https://testing-library.com/docs/react-testing-library/setup/#skipping-auto-cleanup)
  * Unmount component
  * Network call is canceled
  * Test function exits
