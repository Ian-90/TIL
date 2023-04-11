## 1. Testing Library Debugging
* [공식문서](https://testing-library.com/docs/dom-testing-library/api-accessibility/#logroles)
  * logRoles
    * 작업하는 컴포넌트의 role을 모를 때 사용
      ```js
      import { logRoles } from '@testing-library/dom'

      const { container } = render(<App />);
      logRoles(container)
      ```

## 2. Acceptance Test
* TDD는 실제로 앱이 가동 중인 걸 볼수 없기 떄문에, 인수 테스트(Acceptance test)로 확인

## 3. Unit Testing Functions
* 함수를 컴포넌트로 부터 분리하기
  * 여러개의 컴포넌트에서 사용 될 때
  * 복잡한 로직일 때

* unit test를 해야하는 함수
  * functional tests로 하기 어려운 복잡한 로직
  * 너무 많은 edge case를 가지는 함수
  * functional test의 실패의 원인을 결정하는 것
