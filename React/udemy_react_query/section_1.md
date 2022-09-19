## 쿼리 생성 및 로딩/에러 상태
### 1. 설치
  ```
  yarn add react-query
  ```

### 2. 쿼리 생성
* root 파일 - Provider 이하 자식 컴포넌트들 모두 쿼리 사용 가능
  ```js
  import { QueryClient, QueryClientProvider } from 'react-query'

  const queryClient = new QueryClient()

  const RootComponent = () => {
    ...
    return (
      <QueryClientProvider client={queryClient}>
        ...
      </QueryClientProvider>
    )
  }
  ```

* children
  ```js
  import { useQuery } from 'react-query'

  const ChildrenComponent = () => {
    const { isLoading, isError, error, data } = useQeury('query key', async funcion, query options)
  }
  ```

* isLoading과 isFetching의 차이
  * isFetching - fetching이 아직 완료되지 않음.
  * isLoading - isFetching의 하위 집합이며, 쿼리 함수가 아직 해결되지 않은 것. 캐시된 데이터가 없으며, 캐시 된 데이터도 없음. 데이터를 가져오는 상태.

* error - 쿼리 함수에 전달하는 에러 객체

### 3. React Qeury Dev Tools
* 쿼리 키로 쿼리를 표시해주며, 모든 쿼리의 상태를 알려 줌.
* 마지막 업데이트된 타임스탬프도 보여줌
* 데이터 및 쿼리 탐색기도 제공

* root
  ```js
  import { ReactQueryDevtools } from 'react-query/devtools'

  const RootComponent = () => {
    ...
    return (
      <QueryClientProvider client={queryClient}>
        ...
        <ReactQueryDevtools />
      </QueryClientProvider>
    )
  }
  ```

### 4. StaleTime, CacheTime
* StaleData
  * 만료된 데이터

* Stale Time
  * 데이터를 허용하는 최대 시간. 데이터가 만료됬다고 판단하기 전까지 허용하는 시간
  * 데이터가 만료되지 않았다면, refetching을 하지 않는다

* stale time vs cache time
  * stale time
    * stale time은 refetching할 때 고려사항
  * cache time
    * cache는 나중에 다시 필요할 수도 있는 데이터
    * 특정 쿼리에 대한 활성된 useQuery가 없다면, 해당 데이터는 cold storage로 이동
    * 구성된 cache time이 지나면 캐시의 데이터가 만료(기본값 5분)
    * cache time의 시간은 특정 쿼리에 대한 useQuery가 활성화 된 후 경과한 시간
    * cache가 만료되면 가비지 컬렉션이 실행되고, 클라이언트는 데이터를 사용할 수 없음
    * cache가 있는 동안에는 fetching할 떄 사용될 수 있으며, 서버의 최신 데이터로 새로 고침이 가능하다.
   