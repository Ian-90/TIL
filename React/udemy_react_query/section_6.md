## 6. Query Features 2: Transforming and Re-Fetching Data

### 1. select option
* 불필요한 연산을 줄인다
* useCallback을 사용하는 것이 좋다

### 2. Re-fetch
* refech
  * 서버가 만료 데이터를 업데이트 하는 것
  * stale 쿼리가 자동적으로 데이터를 가져오는 조건
    * 새로운 쿼리 인스턴스가 마운트 되거나 쿼리키가 호출
    * 쿼리를 호출하는 react component가 마운트 되었을 때
    * window 창을 refocus했을 때
    * 네트워크가 다시 연결되었을 때
    * refetchInterval이 지났을 때
  * options
    * refetchOnMount
    * refetchOnWindowFocus
    * refetchOnReconnect
    * refecthInterval

* refetch를 제한하고 싶은 경우
  * stale time을 증가 시킨다,
  * refetch option 들을 turn off
  * 자주 변하지 않을 데이터에 적용해야 한다.

### 3. react-query option
* queryClient에서 전역 옵션설정이 가능하며, 각각 사용하는 쿼리에 옵션을 넣어주면 오버라이딩 된다.
