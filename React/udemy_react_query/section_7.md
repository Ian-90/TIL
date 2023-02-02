## 7. React Query and Authentication

### 1. Query Client
* setQueryData - 캐시에 데이터를 설정
* removeQueries - 캐시에서 쿼리를 삭제
* useAuth와 useQuery중 user data를 소유해야하는 곳은?
  * signin, singup, signout 실행 시 useAuth가 useQuery를 호출해야할 지? axios로 직접 호출해야 할지?
  * useAuth가 데이터를 저장하는 context provider를 가져야 할지? user data를 react query 캐시에 저장하면 될지?
    * 새로운 프로젝트는 react query 캐시에 저장해도 되지만, 레거시 프로젝트의 경우 Auth Provider를 가지고 있기 때문에 react query 캐시를 필요 위치에 추가하는 것이 합당
  * react query - 클라이언트의 서버 상태를 관리하는 것
  * useAuth - signin, signup, signout 함수를 제공하는 것
  * 그러므로 user data 저장(소유)은 react query에서 하는것이 맞다

### 2. useUser
* localStorage에서 초기에 데이터를 로드
* useQuery의 onSuccess 콜백에서 localStorage 및 setQueryData 업데이트 
  * onSuccess는 useQuery 함수에서 실행될 때 반환된 데이터를 가져오거나 setQueryData에서 실행 될 때 전달된 데이터를 가져옴

### 3. initialData option
* 초기 데이터를 캐시에 추가하고 싶을 때 사용
* placeholderData나 기본값 비구조화 할당은 캐시에 추가되지 않기 때문에 initailData 옵션과 다름

### 4. dependent queries
* useUserAppointments
  * 유저 데이터보다 자주 바뀐다