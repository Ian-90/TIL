# 1. 시퀄라이즈(sequelize)와 MySQL 설치
* sequelize 설치
```
npm i sequelize mysql2
npm i -g sequelize-cli
```

* init
```
sequelize init
```

```js
const path = require('path')
const Sequelize = require('sequelize')

const env = process.env.NODE_ENV || 'development'
const config = require(__dirname + '/../config/config.json')[env]

const sequelize = new Sequelize(config.database, config.username, config.password, config)
const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

module.exports = db
```

* mysql은 홈페이지가서 다운로드(mac이라 brew를 이용한 설치)
* 워크벤치도 홈페이지가서 다운로드

# 2. 워크벤치 소개와 시퀄라이즈로 데이터베이스 만들기
* 테이블은 sequelize로 만들어 볼 것
  * config/config.json - development에 우리가 만든 db 설정 입력
  * 스키마 생성
  ```
  sequelize db:create
  ```
  * models
  ```js
  module.exports = (sequelize, DataTypes) => {
    return sequelize.define('model name', {

    })
  }
  ```

# 3. 시퀄라이즈 테이블 정의하기
  * models
  ```js
  /*
  type: 자료형
  allowNull: NULL 이어도 되는가?
  defaultValue: 기본값
  unique: 고유값 여부
  comment: 컬럼 설명
  primaryKey: 기본키 여부(id 대체)
  자료형: STRING(글자수), INTEGER, FLOAT, TEXT, DATE, BOOLEAN 등등
  */
  module.exports = (sequelize, DataTypes) => {
    return sequelize.define('model name', {
      colum_name: {
        type: DataTypes.STRING,
      }
    })
  }
  ```

# 4. 시퀄라이즈 관계 설정하기
* 일대다 관계(hasMany, belongsTo)
```js
// models/index에서 설정
db.User.hasMany(db.Comment, { foreignKey: 'commenter', sourceKey: 'id' })
db.Comment.belongsTo(db.User, { foreignKey: 'commenter', targetKey: 'id' })
```

* express와 연결
```js
// app.js
var { sequelize } = require('./models')
var app = express()
// 서버시작시, 테이블 생성
sequelize.sync()
...
```

* 일대일 (hasOne, belongsTo)
* 다대다 (belongsToMany)

# 5. 라우터 만들기(req.params)
* routes 폴더에서 routes 생성
* app.js에서 app.use를 이용하여 연동

# 6. 시퀄라이즈 쿼리 사용하기
* create - 생성하기
* findAll - 모두 찾기
* find - 하나만 찾기
* include - 모델 간의 관계 연결
* model - 어떤 모델인지 지정
* where - 쿼리 조건 설정
* update - 수정하기
* destroy - 삭제하기
