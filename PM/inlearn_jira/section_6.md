## 1. Version과 Release 관리
* 버전과 릴리즈 관리를 통해 프로젝트 가시성 확보 및 여러 이해 당사자들 간에 프로젝트의 이해도가 높아짐
* 버전
  * 프로젝트의 특정 시점의 결과물. 여러 개선사항이나 버그 수정등을 논리적으로 묶은 단위
  * 버전은 보통 숫자로 지으며, 의미있는 문자열을 추가하여 만듬
* 릴리즈
  * 버전 생성 및 릴리즈 날짜 설정. 릴리즈 설명 추가
  * 릴리즈를 설정하면 이슈에서 버전 설정 가능
    * 영향받는 버전 - bug 이슈 유형에만 표시
    * 수정 버전 - story나 task 이슈 유형에만 표시
  * 릴리즈 진행
    * 완료되지 않은 이슈 상태를 확인하고, 완료되지 않은 이슈가 있으면 릴리즈를 하지 않는게 좋음. 만약 릴리즈를 해야한다면, 다음 이슈로 넘기거나 백로그로 변경

## 2. Release note 만들기
* 릴리즈 문서 - PO와 개발팀, 마케팅팀이 같이 작성하는 문서
* 릴리된 버전을 클릭 후, 릴리즈 노트 접속
  * 변경사항에 대한 릴리즈 노트가 html로 작성되어 있음
  * 컨플루언스를 사용한다면, 컨플르언스에서 제공하는 html 매크로를 이용하여, 지라의 릴리즈 노트 복사 및 붙여넣기
* 릴리즈 노트
  * 목차
    * 추가된 기능
    * 개선된 기능
    * 해결 이슈

## 3. 보드 생성과 관리
* 보드 - 유연하게 이슈를 보고, 관리하고, 진행상황을 파악할 수 있는 기능
* 지라 보드 - 지라 소프트웨어에서만 사용가능
  * 차세대 보드
  * 스크럼 보드 - 스프린트 관리에 최적화
  * 칸반 보드 - 칸반 기능을 제공하는 보드
  * 보드에는 최대 5000개의 이슈 표시 가능

* 보드 생성 방법
  1. 우측 상단 검색 필드를 눌러서 항목에서 보드로 이동
  2. 보드 만들기 생성

* 보드가 삭제된다고, 이슈가 삭제되거나 스프린트에 영향을 주지 않는다

## 4. 보드 상세 설정(스윔레인과 필터, 열 제약 사항 설정)
* 보드 상세 설정은 company-managed에서만 제공
* 보드 화면 오른쪽 상단 ... 설정을 누르고 보드 설정 메뉴로 들어가면 됨
* 설정 메뉴
  * 일반
    * 이름 - 보드이름 변경
    * 관리자 - 보드 관리자 설정 기능
    * 위치 - 프로젝트에 들어갈 위치
    * 필터 - jql로 필터 설정도 가능
  * 열관리 - 워크플로우에 맞게 열을 추가, 변경, 삭제 설정 가능. 각 열의 이슈의 최대, 최소 개수 설정 가능
  * 스윔레인 - 이슈를 그룹화해서 수평으로 표시하는 기능
  * 카드 색상 - 담당자 별로 설정 가능
  * 근무일 - 휴무일 등 설정
  * 이슈 상세 보기 - 이슈에 보여줄 필드 및 순서 조정
