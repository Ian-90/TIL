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

## 10. CRUD Introduction
  * C - create
  * R - read
  * U - update
  * D - delete
  * mongoose에게 우리가 사용할 데이터가 어떻게 생겼는지 알려주기 위해 models 생성(즉, 스키마 생성)

## 11. Video Model
* `src/models/Video.js`에 모델 구현
* 스키마 구현시 `{ type: String }`이나 `String`이나 똑같다.

## 12. Our First Query
* `src/init.js`로 파일 분리 - `server.js`는 서버관련된 로직만 처리하고, `init.js`는 모든걸 import하는 영역
* mongoose의 model 사용법 2가지
  1. callback 방식 - 무언가 발생한 다음 어떤 것을 한다. 일종의 js의 기다림의 표현
  ```js
  import Video from '../models/Video'

  Video.find({}, (err, videos) => {
    return res.render('home', { pageTitle: 'Home', videos })
  })
  ```

  2. promise 방식 - async await 이용

## 13. Async Await
```js
try {
  const videos = await Video.find({})
  return res.render('home', { pageTitle: 'Home', videos })
} catch (err) {
  return res.render('server-error'. { err })
}
```

## 14. Returns and Renders
* 어떤 함수를 호출했느냐가 express에서 중요하다. 실행되는 function에 집중해야한다.
  * home함수에 return은 없지만 잘 동작한다.
  ```js
  export const home = async (req, res) => {
    Video.find({}, (err, videos) => {
      res.render('home', { pageTitle: 'Home', videos })
    })  
  }
  ```

## 15. Creating a Video part One
* `src/views/upload.pug` - 스키마 데이터에 맞도록 input 추가
* video create
```js
export const postUpload = async (req, res) => {
  const { title, description, hashtags } = req.body
  // db data create
  const video = new Video({
    title,
    description,
    createAt: Date.now(),
    hashtags: hastags.split(','),
    meta: {
      views: 0,
      ratings: 0,
    }
  })

  return res.redirect('/')
}
```
* db에 데이터를 추가하는방법은 new -> save나 create 두가지가 있다.

## 16. Creating a Video part Two
* video create
```js
export const postUpload = async (req, res) => {
  const { title, description, hashtags } = req.body
  // db data create
  const video = new Video({
    title,
    description,
    createAt: Date.now(),
    hashtags: hastags.split(','),
    meta: {
      views: 0,
      ratings: 0,
    }
  })
  // db save
  await video.save()

  //  db data create + save
  await Video,create({
    title,
    description,
    createAt: Date.now(),
    hashtags: hastags.split(','),
    meta: {
      views: 0,
      ratings: 0,
    }
  })
  return res.redirect('/')
}
```
* db에 데이터를 추가하는방법은 new -> save나 create 두가지가 있다.

## 17. Exceptions and Validation
* 모델에 required 옵션을 이용하여, 빈데이터를 추가하려고하면, 에러를 만들게 한다.
```js
const videoSchema = new mongoose.Schema({
  ...
  createdAt: {
    type: Date,
    required: true,  // requried option 추가
    default: Date.now // default option을 이용하여 기본값 정해주기. Date.now를 실행하지 않는 이유는 createAt 데이터가 없을 떄 기본값을 실행하여 추가해주고 싶기 때문이다.
  },
})
```

## 18. More Schema
* 다양한 스키마 옵션들
  * trim - 문자열 양옆의 모든 공백 제거
  * minLength - 문자열의 최소 길이
  * maxLength - 문자열의 최대 길이

## 19. Video Detail
* mongoDB의 id는 `hexadecimal string`이다.
* 정규표현식을 통해 videoRouter 변경
* findById로 db 데이터 이용

## 20. Edit Video part One
* query 실행 - `exec`를 이용
* 존재하지않는 데이터 관련해서 404 페이지 렌더링
* getEdit 컨트롤러와 edit.pug 수정

## 21. Edit Video part Two
* postEdit 컨트롤러 수정

## 22. Edit Video part Three
* findByIdAndUpdate를 이용하여 update를 간단히 하자
```js
export const postEdit = async (req, res) => {
  ...
  // 기존 코드
  video.title = title
  video.description = description
  video.hashtags = hashtags.split(',').map((word) => word.startsWith('#')? word: `#${word}`)
  await video.save()

  // findByIdAndUpdate 이용코드
  await Video.findByIdAndUpdate(id, {
    title,
    description,
    hashtags: hashtags.split(',').map((word) => word.startsWith('#')? word: `#${word}`)
  })
  return res.redirect(`/videos/${id}`)
}

```
* exist를 이용
* mongoose 미들웨어를 이용하여 데이터가 저장되기전에 무언가 처라하기 - hastags에서 사용

## 23. Middlewares
* 미들웨어는 무조건 모델이 생성되기 전에 만들어야 한다
```js
videoSchema.pre('save', async function() {
  this.hashtags = this.hashtags[0].split(',').map(word => word.startsWith('#') ? word: `#${word}`)
})
```

## 24. Statics
* findOneAndUpdate의 경우에는 변경하려는 문서에 접근 불가능.
* videoSchema.static으로 자주 사용하는 메소드를 만들어서 사용

## 25. Delete Video
* delete 컨트롤러, 라우터, 뷰 추가
* delete vs remove - 항상 delete를 쓰는 것이 좋다.

## 26. Search part One
* sort를 이용하여 몽고DB 데이터를 정렬할 수 있다
```js
const videos = await Video.find({}).sort({ createdAt: 'desc' })
```
* search 라우터 및 컨트롤러 생성

## 27. Search part Two
* 정규표현식을 이용하여 검색 방식 개선 및 search 뷰 개선
  * mongoDB 필터엔진 이용
  ```js
  Model.find({
    [filterKey]: {
      $regex: new RegExp([정규 표현식], 'i')
    },
  })
  
  ```
    * `$regex: new RegExp(keyword, 'i')` - keyword 포함
    * `$regex: new RegExp(`^${keyword}`, 'i')` - keyword로 시작
    * `$regex: new RegExp(`${keyword}$`, 'i')` - keyword로 끝남

## 28. Conclusions
* mongoDB를 이용하여 비디오관련 CRUD 및 Search 기능을 만듬
* 앞으로 구현할게 많다. 이번 섹션은 mongoos와 친해지는 섹션이었다.
