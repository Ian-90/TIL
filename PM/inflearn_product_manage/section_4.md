## 1. 화면설계서(스토리보드) - 웹/앱 설계의 기본
* 표지
* 목차 - 영어로
  * 히스토리 - 문서 버전별로 어떤 업데이트했는지 기록한 것
  * 메뉴구조 - 프로젝트의 메뉴 구조
  * 화면목록 - IA와 비슷한 맥락의 페이지
* 설계
  * 프로세스 - Flowchart
  * 정책 - Flowchart에 따른 정책 정리
  * UI, 기능정의
* 마무리 표지

## 2. 인포메이션 아키텍쳐(IA) - 카카오 골프예약 챗봇 역기획
* IA 설계가 어려운 이유
  * 제대로 가르쳐 주는 곳이 없다
  * 공부를 해도 개념적인 내용이 많다보니 정확한 이해가 어렵다

* IA - 시각화된 정보의 구조
  * 목표설정
    * 카카오 챗봇을 이용한 간편한 골프장 예약
  * 정보나열
    * 골프 예약, 추천 받기, 투어 중계, 도움말, 1:1 문의하기, 고개센터FAQ, ....
  * 그룹화
    * 나열된 정보가지고 그룹화
  * 분류
    * 그룹화된 도식들 가지고 분류

* IA를 다양한 산출물로 확장하기
  * 스프레드 시트 - No, depth, type, 담당자, 작업공수, description, 예상일정

* 설계하는 목적
  * Product 전체 규모 파악
  * 짜임새 있는 Product 구축

## 3. 서비스 정책 깔금하게 정리하기!
* 배달 서비스 회원가입 정책 예시 - 표로 정리하는 것이 좋다
  * 회원가입 인증 방식
    * 이메일 인증
    * SMS 인증
  * 표

    || 이메일 인증 | 휴대폰 인증 | 이메일 인증 + 휴대폰 인증 |
    |-|---------|-----------|---------------------|
    |방식|ID를 이메일로 사용하고 이메일 인증하는 방식.<br> 대다수 서비스에서 사용하는 방식|휴대폰 인증 후 가입하는 방식.<br> 네이버, 카카오, 배달의 민족 등 | 이메일 인증과 휴대폰 인증을 모두 사용하는 방식|
    |장점|이메일 커뮤니케이션 유리.<br>하나의 플랫폼에 여러 개의 계정 생성 가능.<br> 카카오톡, 네이버, 구글 등 SNS 정보를 연동해서 프로필 정보를 자동으로 채울 수 있음.<br> 무료, 해외고객도 쉽게 가입가능| 휴대폰 번호를 고유 번호로 인증해서 중복되지 않는 유니크한 고객 확보 가능.<br> 연락처를 활용해서 지인 정보 활용 가능.<br> 신규가입자 프로모션 적극 활용 가능| 앞의 장점들 모두 |
    |단점| 연령이 높은층은 인증이 어려울 수 있음.<br>유니크한 고객을 확보하기 어려움|SNS 비용 발생.<br>휴대폰이 없는 고객은 가입불가<br>해외고객 가입시 국제 SMS 발신 고려.| 가입 단계에서 이탈율이 높아질 수 있음|
  
  * 결정을 위한 판단 기준 - 휴대폰 인증으로 결정
    * 주문확인 및 배달을 위해 정확한 고객 연락처가 필요
    * 40, 50대도 쉽게 가입할 수 있어야 함
    * 신규 가입자 프로모션을 적극 활용하기 위해서 중복 가입자를 필터 해야 함

## 4. 사용자 인터뷰, 사용자 여정 지도, 사용자 스토리 맵, 디자인 스프린트 - 스포카 디자인 툴킷
* [스포카 디자인 툴킷](https://spoqa.github.io/design-toolkit/)

## 5. 7분만에 끝내는 검색엔진 최적화(SEO) 구동 원리
* 검색엔진에 잘 노출되도록 만들기
  * 크롤링
  * 색인
* SNS에 예쁘게 공유되게 만들기
  * 메타태그

## 6. 웹사이트 기준 해상도 정하기
* 신규 웹사이트
  * 기준이 없다면 네이버 해상도를 따라가는것이 좋다
  * gs.statcounter.com - 전세계 웹사이트 트래픽을 분석하여 각종 통계정보를 보여주는 사이트
* 리뉴얼 사이트
  * GA를 활용
* 기준 해상도
  * 네이버 - 1080
  * 쿠팡 - 980
  * 11번가 - 1200
  * SSG - 1280
  * 29CM - 반응형웹 100%

## 7. UI는 같아도 UX는 다르다
* UI
  * 기간을 가지고 데이터를 조회

* UX
  * 판매내역 조회 - 당일 이후의 날짜 선택불가
  * 상품구매 조회 - 당일 이전 날짜 선택불가
  * 매출통계 조회 - 제약사항 없음

* 같은 UI여도 사용성을 고민해야 한다.

## 8. OPINNO팀이 소개하는 UX 분석 스터디
* [UX 분석 스터디 글](https://brunch.co.kr/@chrisjeon82n3/82)
* 예시 - 알파카 아이폰앱
  * 소개하고 싶은 UX를 캡쳐&녹화
    * 비슷한 사진을 자동으로 그룹핑
    * 마음에 드는 사진을 별표 체크하면 나머지 사진을 한 번에 삭제 가능
  * 왜 캡쳐하게 되었나요?
    * 사진첩을 정리할 때 비슷한 사진이 많으면 저장할 사진과 삭제할 사진을 고르기가 쉽지 않다.
    * 알파카는 비슷한 사진을 자동으로 모아서 보여주고, 마음에 드는 사진을 체크해두면 나머지 사진을 한 번에 일괄 삭제 가능
  * 어떤 지표로 성과를 측정할 수 있을까요?
    * 앱 다운로드 수, 재방문 수, 앱 유지율을 측정하여 서비스 성장추이와 고객 충성도 확인 가능
  * 비슷한 사례가 있나요?
    * 사진 청소기 앱
  * 개선 아이디어 & 브랜드 적용 안
    * 개선 - 사진청소기 앱처럼 유사도를 선택할 수 있는 기능
    * 브랜드 - 담당하는 브랜드에 착용할 점은 없다.
  
## 9. 디자인 패턴 참고사이트 4종!
* wwit.design
* mobbin.design
* www.gdweb.co.kr/main/index.asp
* www.dbcut.com/bbs/index.php

## 10. Admin 사이트 구축 프로세스 & 템플릿
* 프로세스
  * 범위산출
    * 마인드 맵
    * 사이트 맵, IA 정리
  * 설계
    * 기능정의
    * Flowchart
    * UI 설계
  * 디자인/퍼블리싱
  * 개발
* 템플릿
  * [metronic](https://keenthemes.com/metronic/)
  * [envato market](https://themeforest.net/)

## 11. Admin 없이 개발자 없이 마케팅 배너/팝업을 공지하자!
* 마케터, 서비스 운영자에게 유용한 툴!
  * tooltip.io
    * 회원가입
    * 크롬 확장프로그램 설치
    * 서비스를 이용할 사이트 HTML head 태그에 스크립트 추가
