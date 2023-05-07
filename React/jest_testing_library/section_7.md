## 1. 무엇을 테스트 할 것인가?
* Happy path(Golden path)
  * 고객 플로우를 진행하면서 앱에 오류가 없는지 확인

* test flow
  1. create order
  2. accept terms and submit
  3. click new order on confirmation page

## 2. Debuggin Tips
* `screen.debug()`
  * 이 시점에 화면이 어떨지 또는 돔이 어떻게 보일지 테스트 출력에 나타남. 무언가를 찾을 수 있거나 찾을 수 없을 떄 이류를 파악하는 데 유용
* `import { logRoles } from "@testing-library/dom`
  * 돔에 어떤 역할이 있는지 확인하려는 경우 유용
* getBy가 실패할 경우 비동기 작업인지 확인해보고 `await findBy*` 쿼리를 사용
* userEvent 메소드는 `await`을 사용

## 3. Jest Mocks
* `jest.fn()`
  * 아무런 기능은 없으며, 오류 방지를 위한 placeholder
