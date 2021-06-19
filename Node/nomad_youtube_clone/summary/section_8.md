## 1. Edit Profile GET
* getEdit 컨트롤러와 edit-profile.pug 구현

## 2. Protector and Public Middlewares
* 로그인하지 않은 사람들이 로그인해서 볼 수 있는 페이지를 막기 위해 protectorMiddleware 구현
```js
router.route('url').all('공통 미들웨어 함수')
```

## 3. Edit Profile POST part One
* postEdit 컨트롤러 구현

## 4. Edit Profile POST part Two
* DB에서의 프로필 업데이트를 프론트엔드에 반영하도록 구현
  * 직접 업데이트
  ```js
  const postEdit = (req, res) => {
    ...
    const { name, email, username, location } = req.body
    req.session.user = {
      ...req.session.user,
      name,
      email,
      username,
      location,
    }
  }
  ```

  * 몽고 이용
  ```js
  const postEdit = (req, res) => {
    ...
    const updateUser = await User.findByIdAndUpdate(_id, {
      name,
      email,
      username,
      location,
    }, { new: true })

    req.session.user = updateUser
  }
  ```

* username이나 email이 이미 있는거라면 어떻게 처리 할까? - mongoose의 `exists` 이용

## 5. Change Password part One
* getChangePassword 컨트롤러 구현
* change-password.pug 구현
  * 깃헙으로 가입한 경우 비밀번호 변경 불가능 처리

## 6. Change Password part Two
* mongo에서 계정 삭제
```
use wetuebe
db.sessions.remove({})
db.users.remove({})
```

* postChangePassword 컨트롤러 구현
  * 새로운 비밀번호를 해쉬하기 위해 `user.save()`를 이용

## 7. File Uploads part One
* edit-profile에 `type='file'`인 input 추가
* 파일 업로드를 위해 [multer](https://github.com/expressjs/multer/blob/master/doc/README-ko.md) 미들웨어를 이용
* upload 미들웨어를 edit post 라우터에 적용

## 8. File Uploads part Two
* postEdit 컨트롤러 적용
* uploads 폴더 gitignore에 추가
* db에 파일을 저장하면 안된다. 폴더에 파일을 저장하고 db에는 파일의 위치만 저장

## 9. Static Files and Recap
* 브라우저가 uploads 폴더를 볼 수있도록 처리
  * static file serving - 브라우저에 폴더 노출
  ```js
  app.use('/uploads', express.static('uploads'))
  ```
* 실제 서버에 파일을 저장하면 서버가 죽었을 때의 파일 보존 문제가 있기 때문에 다른 방식을 써야 한다.

## 10. Video Upload
* upload.pug에 video upload input 추가
* /upload 라우터에 upload 미들웨어 추가
* postUpload 컨트롤러 구현
* video 모델에 fileUrl 추가

## 11. User Profile
* relationship - video는 한명의 owner가 필요하고, user는 여러개의 video를 가질 수 있다
* profile.pug 구현
* see 컨트롤러 구현

## 12. Video Owner
* user에는 해당 user가 업로드한 모든 영상의 id를 저장
* video에는 해당 영상을 올린 user의 id를 저장
* Video 모델 - owner 추가
```js
const videoSchema = new mongoose.Schema({
  ...,
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User', // User 모델에서 ObjectId가 온다는 reference
  }
})
```
* postUpload, watch 컨트롤러 기능 추가 및 watch.pug 구현

## 13. Video Owner part Two
* mongoose의 populate를 이용하여 리팩토링
```js
export const watch = async (req, res) => {
  const video = await Video.findById(id).populate('owner') // 객체값을 가지게됨
  ...
}
```

## 14. User's Videos
* populate를 이용한 리팩토링
* User 모델 - videos 추가
```js
const userSchema = new mongoose.Schema({
  ...,
  videos: [{
    type: mongoose.Types.ObjectId,
    ref: 'Video',
  }]
})
```

## 15. Bugfix
* 모델에 미들웨어에서 save가 실행 될때마다 비밀번호가 hash처리 되는 버그 해결 - 비밀번호가 수정됬을 때만 hash 함수 동작하도록 변경
* User 모델
```js
userSchema.pre('save', async function() {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 5)
  }
})
```
