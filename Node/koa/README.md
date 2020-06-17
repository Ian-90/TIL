[리액트를 다루는 기술](https://book.naver.com/bookdb/book_detail.nhn?bid=13799583) - 18 ~ 19장 공부

# Koa.js

* [Koa.js](https://github.com/koajs/koa) - nodejs의 프레임워크 

  * [설치](https://github.com/koajs/koa#installation)
  ```
  yarn add koa
  ```

  * [koa 셀프 가이드](https://github.com/koajs/kick-off-koa)

  * [koa-router](https://github.com/ZijianHe/koa-router)
    * [설치](https://github.com/ZijianHe/koa-router#installation)
    ```
    yarn add koa-router
    ```

* 공부해보니 express와 비슷한 느낌을 많이 받았다.

# MongoDB

* 기존 RDBMS의 한계를 극복하기 위한 새로운 데이터 베이스
  * Document - RDBMS의 record와 비슷한 개념이며, JSON objects 형태의 key-value의 쌍으로 이루어져 있다. 생성마다 _id를 고유값으로 생성.
  * Collection - Document의 집합

* [설치(Mac)](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/#prerequisites) - 책에 있는 설치 명령어가 안되어서, 공식문서 참조
```
brew update
brew tap mongodb/brew
brew install mongodb-community // 최신버전 설치
```

* mongo server
  * start
  ```
  brew services start mongodb-community
  ```

  * stop
  ```
  brew services stop mongodb-community
  ```

* connect
```
mongo
```

# Mongoose

* Node.js에서 사용하면 ODM(Object Data Modeling) 라이브러리 이다. 데이터베이스 문서들을 자바스크립트의 객체처럼 사용 할 수 있게 해준다.

* [설치](https://github.com/Automattic/mongoose#installation)
```
yarn add mongoose
```

* Schema - Document 내부의 필드가 어떤 형식으로 되어 있는지 정의하는 객체
  * [Schema 생성](https://mongoosejs.com/docs/guide.html#definition)
  ```javascript
  const mongoose = require('mongoose')
  const { Schema } = mongoose

  const blogSchema = new Schema({
    [field name]: [field type]
  });
  ```


* Model - Schema를 사용하여 만드는 인스턴스. 데이터베이스에서 실제 작업을 처리 할 수 있는 함수들을 지니고 있는 객체
  * [Model 생성](https://mongoosejs.com/docs/models.html#compiling)
  ```javascript
  const mongoose = require('mongoose')
  
  mongoose.model('Schema Name', [Schema Object])
  ```

# Dotenv

* 환경변수들을 파일에 넣고 사용할 수 있게 하는 개발도구. 민감한 정보들을 환경변수로 설정하는 것이 좋음.

* [설치](https://github.com/motdotla/dotenv#install)
```
yarn add dotenv
```