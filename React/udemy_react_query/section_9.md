## 9. Testing React Query

### 1. Mock Service Worker
* 목적
  * 네트워크 호출을 차단하고, 우리가 정의한 핸들러를 토대로 응답을 반환
  * 테스트가 진행되는 동안 네트워크 호출을 막음
  * 서버 응답으로부터 test 조건을 정함

* 설치
  ```
  yarn add msw
  ```

## 2. QueryClient and Provider in Test
* `/test-utils/index.tsx
```js
const generateQueryClient = () => {
  return new QueryClient();
};

export function renderWithQueryClient(
  ui: ReactElement,
  client?: QueryClient,
): RenderResult {
  const queryClient = client ?? generateQueryClient();

  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>,
  );
}
```

## 3. Testing Mutations
* msw는 mutation을 실행해도 실제 서버처럼 응답이 변경되지 않는다.
* 테스트 서버를 생성하여 테스트를 할 수 있다.
* 강의범주 밖이므로, mutation 이후 성공 toast 동작하는지 확인

## 4. Testing Custom Hooks
* @testing-library/react-hooks
  * 설치
    ```
    yarn add @testing-library/react-hooks
    ```
  * 이 라이브러리를 사용하지 말아야 할 때
    * 훅이 컴포넌트와 함께 정의되어 있으며, 거기에서만 사용되는 경우
    * 훅을 사용하는 컴포넌트를 테스트하여 훅을 쉽게 테스트할 수 있는 경우
