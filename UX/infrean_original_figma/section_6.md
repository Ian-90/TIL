## 1. 와이어프레임에 빠르게 아이콘 넣기 - iconify 플러그인
* exercise/6-1.fig
* 커뮤니티에서 iconify 플러그인 설치
* 오른쪽 클릭 -> 플러그인 -> iconify -> 원하는 아이콘 검색 -> 컬러 및 사이즈 지정 -> import나 드래그

## 2. 와이어프레임 플로우를 연결하는 autoflow 플러그인 사용하기
* exercise/6-2.fig
* 커뮤니티에서 Autoflow 플러그인 설치
* 플러그인 켜기 -> 누르는 요소와 넘어가는 요소를 선택

## 3. Auto Layout 이해하기
* exercise/6-3.fig
* Auto Layout - 반응형 설정할 때 유용한 기능
* 기능추가할 요소들 선택 후, 디자인 패널에서 Auto layout 추가
  * 정렬 선택
  * 요소사이의 간격 설정
  * 패딩 설정
    * 상하정렬 기준 설정
    * packed - 겉에가 고정되어있을 때, 안쪽에 있는 요소들이 설정한 간격들이 순차적으로 적용해서 들어간다
    * space between - 균일한 간격으로 정렬

## 4. Constraints & Resizing 이해하기
* exercise/6-4.fig
* 아이콘은 고정, 텍스트들은 사이즈 조절같은 상황에서 사용
* resizing - auto layout을 설정한 상태에서 사용가능

## 5. 예제실습(1) 로그인 화면 반응형 레이아웃 만들기
* exercise/6-5.fig
* Auto Layout 추가 단축키 - shift + a
* Auto Layout 해제 단축키 - cmd + shift + g
* 실습 나머지 페이지는 공부용으로 만들어보기

## 6. 예제실습(2) 뮤직 플레이어 모바일, 태블릿버전 세트 만들기
* exercise/6-6.fig
* 아이콘이 사이즈업 했을 때, 쉐이프가 사이즈업이 안되는 이유는 constraints를 scale로 조정해주어야 한다

## 7. 예제실습(3) auto layout을 이용한 채팅화면 만들기
* exercise/6-7.fig
* outlines - cmd + y. 조금더 명확하게 레이아웃 확인 가능
* 고정될 영역은 Fix position when scrolling 체크
