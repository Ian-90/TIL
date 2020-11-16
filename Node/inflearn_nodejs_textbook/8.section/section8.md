# 1. MongoDB 설치와 프로젝트 세팅
* mongodb 설치는 홈페이지 다운로드
* 프로젝트 세팅은 github에서 필요한 것들 다운로드
  * views/mongoose.pug
  * public/mongoose.js

# 2. MongoDB 특징과 컴퍼스
* mysql 스키마 - 테이블 - 로우
* mongodb 디비 - 컬렉션 - 도큐먼트

# 3. Mongoose 스키마 만들기
* schemas
```js
/*
type: 자료형
required: 필수여부
unique: 고유 여부
default: 기본값
*/

const mongoose = require('mongoose')

const { Schema } = mongoose
const schemaToName = new Schema({
  colum_name: {
    type: String,
  }
})

module.exports = mongoose.model('Schema name', schemaToName)
```


# 4. Mongoose 쿼리 수행하기
* find - 모두 찾기
* findOne - 하나만 찾기
* new 스키마(data).save - 생성
* update - 수정하기
* remove - 제거하기

# 5. Mongoose populate
* populate - 시퀄라이즈의 include와 비슷한 역할
