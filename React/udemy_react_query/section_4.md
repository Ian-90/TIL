## 4. React Query in Larger App: Setup, Centralization, Custom Hooks
### 1. 커스텀 훅을 사용하는 이유
* 다수의 컴포넌트에서 데이터를 접근 가능
* 쿼리 키를 헷갈릴 위험 감소
* 커스텀훅에 쿼리 함수의 캡슐화
* display layer에서 구현을 추상화
  * 구현이 변경되면 컴포넌트 변경 없이 훅만 업데이트

### 2. useIsFetching
* 각각의 커스텀 훅에 대해 isFetching을 사용할 필요가 없다

### 3. QueryClient default onError option
```js
import { createStandaloneToast } from '@chakra-ui/react';
import { QueryClient } from 'react-query';

import { theme } from '../theme';

const toast = createStandaloneToast({ theme });

function queryErrorHandler(error: unknown): void {
  // error is type unknown because in js, anything can be an error (e.g. throw(5))
  const id = 'react-query-error';
  const title =
    error instanceof Error ? error.message : 'error connecting to server';

  // prevent duplicate toasts
  toast.closeAll();
  toast({ id, title, status: 'error', variant: 'subtle', isClosable: true });
}

// to satisfy typescript until this file has uncommented contents
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      onError: queryErrorHandler,
    },
  },
});
```

### 4. onError의 대안: Error Boundary
* useErrorBoundary 옵션을 사용하면 react-query의 에러를 에러 바운더리로 전파
