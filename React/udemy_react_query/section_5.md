## 5. Query Features 1: Pre-Fetching and Pagination

### 1. Options for pre-populating data
|    | where to use? | data from? | added to cache? |
|:---:|:-------------:|:----------:|:--------------:|
| prefetchQuery | queryClient | server | yes |
| setQueryData | queryClient | client | yes |
| placeholderData | useQuery | client | no |
| initialData | useQuery | client | yes |

### 2. Pre-fetching flow
* prefetchQuery
  * queyrClient의 메소드
  * 클라이언트 캐시에 추가

* preftch treatments flow - prefetch treatments on home page load
  1. user laods home page
  2. queryClient.prefetchsQuery call => add treatments data to cache
  3. user loads treatments page
  4. within cacheTime
    1. yes - treatments data loads from cache useQuery fetches fresh data
    2. no - no initial data useQeury fetches fresh data

* 새로운 데이터를 로드하지 않는 경우
  * 모든 쿼리에서 같은 쿼리키를 사용할 때
  * 데이터는 만료(stale) 상태지만 리페치를 트리거할 대상이 없을 떄
  * 리페치 트리거
    * 컴포넌트를 다시 마운트
    * 창을 다시 포커스
    * 리페치 함수를 수동으로 실행
    * 자동 리페치
