### 1. 테스트 라이브러리와 Jest 소개
* React Testing Library(RTL)
  * 사용자 사용 방식으로 소프트웨어를 테스트하는 것
  * 내부 구현(소프트웨어의 작성법) 테스트를 대신하는 것
  * 접근성 마커(스크린 리더와 다른 보조 기술)로 DOM 요소를 찾음

* RTL vs Jest
  * RTL
    * 테스트를 위한 가상 DOM 제공
  * Jest
    * 테스트 러너(테스트를 찾고 실행하는 것과 테스트 통과 여부를 결정하는 역할)

### 2. 테스팅 라이브러리를 사용한 첫 번째 테스트
```js
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />)
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
```
* render - 가상 DOM 생성
* screen 객체를 이용하여 가상 DOM에 접근
* 단언(Assertion) - 테스트 성공과 실패의 원인

### 3. Jest와 Jest-DOM 단언(Assertion)
```js
expect(linkElement).toBeInTheDocument()
```
* Assertion
  * 테스트의 통과 여부를 결정
* Matcher
  * 단언의 유형
* jest-dom
  * setupTest.js 파일을 사용해 각 테스트 전에 jest-dom을 import(모든 테스트에서 jest-dom 매처를 사용할 수 있는 것)

### 4. Jest: Watch 모드와 테스트가 작동하는 방식
* RTL
  * 가상 DOM에 컴포넌트를 렌더링
  * 가상 DOM을 검색하는데 도움이 됨
  * 가상 DOM에서 인터랙션을 통하여 DOM 요소를 클릭하거나 텍스트 입력이 가능

* Jest
  * 테스트를 찾고 실행하며, aseertion
  * 다른 테스트 러너 - Mocha, Jasmine
  * Watch 모드
    * Jest를 실행하는 방법
    * 마지막 커밋 이후 파일의 모든 변경사항을 확인해서 마지막 커밋 이후 변경된 파일과 연관된 테스트만 실행
  * 테스트 통과나 실패를 어떻게 아는걸까?
    ```js
    test('첫번째 인수', () => { 두번째 인수... })
    ```
    * 2개의 인수를 가진 전역 테스트 메소드
    * 첫번 째 인수는 테스트의 문자열 설명(이 인수를 통하여 어떤 테스트가 실패했는지 알려 줄 수 있음)이며, 두번째 인수는 테스트 함수(테스트의 성공과 실패를 결정하기 위해 실행하는 것)

### 5. TDD: 테스트 주도 개발
* TDD
  * 코드 작성 전에 테스트를 작성하고 테스트에 통과하도록 코드를 작성하는 것
  * 사용하는 이유
    * 프로세스의 일부(코드 완료 후에도 번거로운 일처럼 느껴지지 않음)
    * 변경 사항이 생길 때마다 자동 회귀 테스트를 할 수 있기 때문에, 효율적

### 6. RTL 철학
* Opinionated(완고)
* 사용자의 소프트웨어 사용을 테스트
* 테스트 유형
  * unit test - 함수나 별개의 리액트 컴포넌트 단위 테스트
  * integration test - 여러 단위가 함께 작동하는 테스트
  * functional test - 소프트웨어의 특정 기능을 테스트
  * acceptacne / end to end test - 실제 브라우저와 서버가 필요한 테스트

### 7. 기능(Functional) 테스트 vs 유닛(Unit) 테스트
* unit test
  * 테스트를 최대한 격리 시키며, 의존성을 표시
  * 테스트 실패를 정확하고 쉽게 파악 가능
  * 소프트웨어와 상호작용과는 거리가 멀다
  * 리팩토링에 실패할 가능성도 있다

* functional test
  * 테스트하는 특정 동작이나 유저 플로우와 연관된 모든 단위를 포함하여 테스트
  * 소프트웨어 상호작용하는 방식과 밀접
  * 테스트에 실패하면 사용자에게 문제가 발생할 가능성이 높다
  * 테스트가 견고하지만, 실패한 테스트를 디버깅하기가 어렵다

### 8. 테스팅 라이브러리와 접근성
* [RTL은 접근성으로 요소를 찾거나 요소를 찾을 수 있는 스크린 리더와 같은 보조 기술로 요소를 찾는걸 권장](https://testing-library.com/docs/queries/about/#priority)
  * 우선순위
    1. 누구나 접근 가능한 쿼리
    2. Semantic 쿼리
    3. 테스트 ID
* [Role](https://www.w3.org/TR/wai-aria/#role_definitions)
