## 리액트 앱 테스트(단위 테스트)

### 1. What is Testing? And Why?
* Manual Testing
  * 코드를 작성해서 기능을 구현하고, 브라우저에서 테스트한 것
* Automated Testing
  * Manual test를 대체하는 것은 아니지만 함께 한다면 오류를 훨씬 더 일찍 잡을 수 있고 더 나은 코드를 작성할 수 있음
  * 추가적인 코드를 작성해서 코드가 실행되면서 다른코드를 테스트
  * 장점은 전체 애플리케이션을 자동으로 테스트하는 코드를 작성하기 때문에 항상 모든 것을 테스트 할 수 있다

### 2. Kinds of Automated Tests
* 단위테스트(Unit Test)
  * 애플리케이션의 가장 작은 단위(functions, components)에 대한 테스트를 작성
* 통합테스트(Integration Test)
  * 여러개의 구성 요소(building blocks)의 조합(여러 구성요소가 함께 작동되는지)을 테스트
  * 단위 테스트 만큼 많지 않으며, 리액트 앱에서 단위 테스트와 통합 테스트를 구별하는 것은 쉽지 않다
* End to End(e2e) Test
  * 애플리케이션의 전체 워크플로우(전체 시나리오)를 테스트하는 것
  * 단위 테스트와 통합 테스트 만큼 많지는 않으며, 단위 테스트와 통합 테스트가 잘 작동한다면, 전체적으로 앱이 잘 작동한다고 확신 할 수 있다

### 3. Test Tools
* Jest
  * 테스트코드를 실행하고 결과를 확인하기 도구

* React Testing Library
  * 리액트 앱과 컴포넌트들을 렌더링하고 시뮬레이팅 하는 도구(브라우저를 시뮬레이팅 하는 도구)

### 4. Testing React Components & Building Blocks
* The Three "A"s
  * Arrange(준비)
    * 테스트 데이더 및 조건, 환경 등 설정
  * Act(실행)
    * 실제로 테스트하고자 하는걸 테스트로 실행 한다
  * Assert(단언)
    * 아웃풋이 우리의 예상과 같은지 검토

* 비동기 테스트
  * api를 mocking
    ```js
    // Async.test.js
    window.fetch = jest.fn();
    window.fetch.mockResolvedValueOnce({
      json: async () => [{ id: "p1", title: "First post" }],
    });
    ```
  * 테스트 서버에 api 호출
