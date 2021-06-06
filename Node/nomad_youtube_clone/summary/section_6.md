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

## 6. More Practice pare One
* form의 get과 post를 연습
* upload 라우터 구현

## 7. More Practice pare Two
* upload 컨트롤러 구현

## 8. Introduction to MongoDB
* mongoDB에 저장하는 것들은 JSON-like documnets
* 설치 - comunity editon 설치(무료)

## 9. Connecting to Mongo
* mongoose - node.js와 mongoDB를 이어주며, mongoDB작업을 js로 하도록 가능하게 해주는 라이브러리
  * 설치
  ```
  yarn add mongoose
  ```

  * db.js - 몽고DB 연결
  ```js
  import mongoose from 'mongoose'

  mongoose.connect('[db 주소]/[db 이름]')

  const db = mongoose.connection

  const handleError = (err) => console.log('DB Error', err)
  const handleOpen = () => console.log('connected to DB')
  // db 에러날 때 이벤트 호출
  db.on('error', handleError)
  // db 연결 성공했을 때 이벤트 호출
  db.once('open', handleOpen)

  // once는 한번만 호출, on은 여러번 호출 가능
  ```
  