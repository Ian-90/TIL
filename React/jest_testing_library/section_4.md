## 1. App 소개
* 아이스크림의 맛과 토핑을 선택하여 주문하는 앱
* 주문, 주문 요약, 주문 확인 페이지로 구성됨

## 2. SummaryForm Component Test
* testing-library에서 fireEvent도 괜찮지만, [user-event](https://github.com/testing-library/user-event)가 더 좋다
* fireEvent
  * DOM event를 dispatch
  * 컴퓨터 이벤트를 시뮬레이션
* userEvent
  * 모든 interaction을 simulat
  * 사용자 이벤트를 시뮬레이션
  * 항상 Promise를 반환
* 테스트 요소
  * checkbox enableds button
    * checkbox is unchecked by default
    * checking checkbox enableds button
    * unchecking checkbox again disables button

  * Terms & Conditions popover
    * popover responds to hover
  * summary text
  * button functionality

## 3. screen query methods
* commande
  * get
    * element가 DOM에 있을 것을 expect
  * query
    * element가 DOM에 있지 않을 것을 expect
  * find
    * element가 비동기적으로 나타날 경우를 expect

* All
  * 하나 이상의 매치를 expect 하는 경우에 포함

* QueryType
  * Role - 가장 선호하는 방법
  * AltText - images
  * Text - display elements
  * Form elements
    * PlaceholderText
    * LabelText
    * DisplayValue
