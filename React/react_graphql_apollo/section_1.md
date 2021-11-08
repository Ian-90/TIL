## 1. REST API란?
* 소프트웨어간 정보를 주고받는 방식
* 데이터를 주고받을 약속된 형식
  * GET - 정보 받아오기
  * POST - 정보 입력하기
  * PUT/PATCH - 정보 수정하기
  * DELETE - 정보 삭제하기

* REST API의 한계
  * 원하지 않는 정보까지 전부 받아와야 한다.(overfetching)
  * 특정 정보를 받아오기 위해 여러번 요청해야 한다.(underfetching)
