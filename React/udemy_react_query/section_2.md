## 2. Pagination 및 Pre-fetching과 mutation
### 1. 쿼리 키
* 쿼리 키가 있을 때 데이터를 다시 가져오는 경우
  * 컴포넌트를 다시 마운트 했을 때
  * window를 다시 포커스 할 때
  * useQuery에 값인 refetch 함수를 수동으로 실행할 때
  * 일정한 시간 간격으로 refetch를 자동 실행할 때
  * mutation 이후 쿼리를 invalidation하여 클라이언트 데이터가 서버의 데이터와 불일치 할 때

### 2. Pagination과 Pre-fetch
* pagination으로 쿼리를 부르면 캐시가 없기 때문에, 페이지 이동마다 로딩이 뜸. 이것을 개선하기 위하여 pre-fetching을 사용. 꼭 pagination이 아니더라도 다음에 유저가 클릭할 확률이 높은것들은 prefetching을 사용하는 것이 더 좋다
* prefetching의 목적은 캐시된 데이터를 표시하면서, 백그라운드에서 데이터의 업데이트 여부를 서버에서 확인하는 것.

### 3. isLoading vs isFetching
* isFetching
  * 비동기 함수가 해결되지 않았을 때 참이다. 데이터를 가져오는 상태.
  * 캐시된 데이터의 존재 여부가 관계가 없다.

* isLoading
  * isFetching이 참이면서 쿼리에 대해 캐시된 데이터가 없는 상태.

### 4. mutation
* 서버에 데이터를 업데이트하도록 네트워크 호출을 실시
