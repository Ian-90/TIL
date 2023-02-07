## 8. Mutations: Using React Query to Update Data on Server

### 1. useMutation
* 일회성이기 때문에 캐시 데이터가 없다.
* 기본적으로 요청이 실패했을 때 재시도가 없다.
* refetch도 없다.
* 캐시데이터가 없으므로 isLoading과 isFetching이 구분되지 않는다. 즉, isLoading은 없고, isFetching만 있다.
* 반환 객체에서 mutate함수를 반환한다.
* onMutate콜백이 있다.(optimistic queries 사용에 유용)

### 2. TypesScript: Returning mutate Function
```ts
UseMutateFunction<TData = unknown, TError = unknown, TVariables = void, TContext = unknown>
```

* TData - mutate 함수 자체에서 반환된 데이터 유형
* TError - mutate 함수에서 발생할 것으로 예상되는 에러 유형
* TVariables - mutate 함수가 예상하는 변수 유형
* TContext - onMutate 함수에서 optimistic update rollback을 위한 설정을 하는 유형

### 3. invalidateQueries
* 캐시를 무효화. 사용자가 페이지를 새로고침 할 필요가 없도록 하기 위해 사용
* 쿼리를 만료 표시
* 쿼리가 현재 렌더링 중이면 refetch를 트리거
* mutate => onSuccess => invalidateQueries => refetch

### 4. Query Key Prefix
* query key prefix를 이용하여 mutation에서 관련된 모든 쿼리를 무효화
* 정확한 키 설정을 하려면 `{ exact: true }` 옵션을 사용

### 5. Optimistic Updates
* 서버로부터 응답을 받기 전에 사용자 캐시를 업데이트하는 방법
  * 서버에서 mutation이 잘 작동할거라고 추정
  * 장점은 캐시가 더 빨리 업데이트 되며, 서버를 기다릴 필요가 없음
  * 단점은 서버 업데이트가 실패한 경우 코드가 복잡해짐

* useMutation의 onMutate callback
  * context - optimistic update 이전의 캐시 데이터
  * context값을 반환하며, onError 핸들러가 context 값을 인자로 받음
  * 진행중인 refetch를 모두 취소

* cancel query flow
  * user triggers update with mutate
  * send update to server
  * onMutate
  * cancel queries in progress
  * update query cache
  * save previous cache value
  * success
    * invalidate query
  * fail
    * onError uses context to rollback cache

### 6. Manually Canceling Query
* [AbortController](https://developer.mozilla.org/en-US/docs/Web/API/AbortController)를 이용하여 쿼리를 취소
* 가동중인 쿼리가 기한이 만료되거나 비활성화된 경우 자동 취소
* axios cancel은 signal을 이용
