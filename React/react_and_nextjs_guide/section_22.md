## Next.js 소개
### 1. Next.js란?
* 규모있는 프로덕트를 구현하기위한 React 프레임워크
* 리액프 프로젝트 구축에 필요한 기능들이 내장되어 있음

### 2. 왜 사용하는가?
* 서버 사이드 렌더링(페이자 콘텐츠를 클라이언트가 아니라 서버에서 준비하는 것) 기능을 내장
  * 검색 엔진 최적화를 할 수 있다

* 파일 기반 라우팅(File-based Routing)
  * 파일과 폴더를 이용해서 라우팅을 구성
  * 더 적은 코드로 개발 가능

* 풀스택 프레임워크
  * 백엔드 코드를 쉽게 추가할 수 있다

### 3. 앱 생성
* 프로젝트 생성
  ```
  npx create-next-app
  ```
  * 프로젝트 이름 및 타입스크립트 설정, Lint설정 등등 답변 입력

### 4. 라우팅
* pages 하위에 폴더 또는 파일로 페이지 라우팅 생성
  * 파일 - 파일명이 라우터 주소가 됨. `pages/news.tsx`는 `/news` 주소의 페이지가 됨
  * 폴더 - 폴더명이 라우터 주소가 됨(단, 폴더 root에는 파일명이 index로 되어 있어야 함). `pages/new/index.ts`는 `/news` 주소의 페이지가 됨.
  * 페이지가 중첩된 경로가 있을 떄 폴더로 생성하며, 그게 아니라면 파일로 생성해도 무방.
* 동적 페이지 만들기
  * 파일 또는 폴더 - `[]` 대괄호로 감싼 파일을 생성
* 페이지간 연결
  * a 태그를 사용하면 싱글 페이지 애플리케이션이 아니기 때문에, `nextjs/link` 모듈을 이용

### 5. _app.js
* 모든 파일에 적용할 레이아웃이나 설정이 있다면 여기에 추가

### 6. 페이지 사전 렌더링 작동 방식
* Page Pre-Rendering
  * req -> /some-route -> return pre rendered page -> hydrate withe react code once loaded -> page / App is interactive

* Next.js의 Pre-rendering
  * Static Generation
    * 사전 렌더링되는 시점은 build할 때 생성
    * 기본적으로 배포 후 사전 렌더링되는 페이지는 변경되지 않는다. **데이터 변경시 재배포 해야된다**
    * 데이터를 가져와서 추가해야 한다면, 페이지 컴포넌트에서 `getStaticProps` 함수를 이용
      ```js
      // page.js
      export async function getStaticProps() {
        ...
        return {
          props: {
            ...
          },
          revalidate: 1,
        }
      }
      ```
      * 컴포넌트를 호출하기 전에 이 함수를 호출
      * 페이지에서 필요한 props를 준비
      * 클라이언트 측에서 절대 실행되지 않으며, 서버에서만 돌아가는 코드(파일 시스템 접근, 데이터베이스 연결, api fetch 등등...) 실행 가능
      * revalidate 옵션을 사용하면 페이지를 몇초 간격으로 생성하여 페이지를 교체. 이 옵션을 이용하면 재배포할 필요가 없음
    * `getStaticPaths`
      * 빌드시 동적 페이지에 대한 모든 페이지를 생성해야 하기 때문에 사용
      * 동적인 세그먼트가 있을 때 사용

  * Server-side Rendering
    * 요청이 들어올 때 마다 페이지를 재생성

### 7. Vercel 배포
1. repository connect and import
2. 환경변수 셋팅
3. deploy
