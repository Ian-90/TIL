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
