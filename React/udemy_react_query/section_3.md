## 3. Infinite Queries for Loading Data Just in Time

### 1. Infinite Scroll
* 사용자가 스크롤 할 때 마다 새로운 데이터 요청
* [useInfiniteQuery](https://tanstack.com/query/v4/docs/reference/useInfiniteQuery)를 이용
  * 다음 데이터 추적
  * 다음 쿼리가 데이터의 일부로 반환

### 2. useQuery와 useInfiniteQuery의 차이점
* useInfiniteQuery
  * useInfiniteQuery는 pages(배열)와 pageParams(각 페이지의 매개변수)를 반환한다.
  * 모든 쿼리는 페이지 배열에 고유한 요소를 가지고 있고, 고유 요소는 해당 쿼리에 대한 데이터이다.
  * pageParams는 검색된 쿼리의 키를 추적
    * getNextPageParam options
      * pageParam을 업데이트
      ```js
      useInfiniteQuery(
        'query key',
        ({ pageParam = defaultUrl }) => fetchUrl(pageParam)),
        { getNextPageParam: (lastPage, allPages) => ... }
      ```
  * return object properties
    * fetchNextPage - 사용자가 더 많은 데이터를 요청할 떄 사용하는 함수
    * hasNextPage - getNextPageParam 함수의 반환 값을 기반으로 마지막 쿼리의 데이터를 어떻게 사용할지 지시
    * isFetchingNextPage - 다음페이지를 가져오는지, 일반적인 페칭인지 구분 가능한 변수

### 3. infinite scroll flow
```js
const { data } = useInfiniteScroll(...)
```
* flow
  1. component mounts
    * data: undefined

  2. fetch first page
    * pageParam: default
    * data.pages[0]: { ... }

  3. getNextpageParam 실행
    * update page param: "http://swapi.dev/api/species/?page=2"

  4. hasNextPage - 다음 페이지에 데이터가 있는지 확인
    * 있다
      1. fetchNextPage
        * 데이터 호출 및 업데이트. page 배열에 다음 요소를 추가
  
    * 없다
      1. pageParam: undfeind
