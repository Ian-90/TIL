## 1. Arrary Database part One
* 데이터베이스를 배열로 흉내내어 구현해보기 - video

## 2. Arrary Database part Tow
* href앞에 /를 붙이면 root/주소로 이동. /가 없으면 주소에서 상대경로로 이동
  * 현재 url이 `localhost:4000/profile/edit` 일 때
    * `a(href="/potato")` - localhost:4000/potato
    * `a(href="potato")` - localhost:4000/profile/potato

## 3. Edit Video part One
* edit 페이지 form 작성

## 4. Edit Video part Two
* `app.route`를 이용하여 url이 같고, 메소드가 다른것을 처리
* edit form post request 처리 - `express.urlencoded` 이용

## 5. Recap
* app.route - 같은 url의 라우터를 2개이상 처리할 때 사용