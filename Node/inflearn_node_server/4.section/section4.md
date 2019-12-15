# section 4. Database 연동 기본

## 1. MySQL 연동 설정

### 간단한 개념

- 데이터베이스 - 데이터를 저장하고, 꺼내오는 것을 전문적으로 담당하는 소프트웨어.

### Project

- mysql

  - 컴퓨터에 설치(mac 기준)

  ```bash
  brew install mysql
  ```

  - 사용법

    - 시작

    ```bash
    mysql.server start
    ```

    - 비밀번호 설정

    ```bash
    mysql_secure_installation
    ```

    1. 복잡한 비밀번호 설정을 위한 과정을 거칠 것인가? 저는 no로 대답.

    2. root 비밀번호 입력 및 확인 - 개인비번 입력

    3. 익명 사용자를 삭제할 것인가? 저는 yes (mysql -uroot로 접속해야함. no를 하면 mysql만으로 접속가능)

    4. 원격접속을 허용할것인가? 저는 yes(원격접속불가)

    5. test 데이터베이스를 삭제할것인가? No

    6. 수정할 것이 있어서, 위의 과정을 다시 거치시겠습니까? NO
       위의 질문을 완료하면된다.

    - 기본 mysql로 접속하기

    ```bash
    mysql -uroot -p
    ```

    비번 입력 후 접속

    - mysql 종료

    ```bash
    exit // \q도 가능
    ```

    - Database 생성 및 조회, 접속

      - 생성 - 우리는 프로젝트에서 jsman이라고 생성함.(CREATE DATABASE jsman)

      ```bash
      create database [database name];
      ```

      - 조회

      ```bash
      show databases;
      ```

      - 접속

      ```bash
      use [database name];
      ```

    - Table 생성 및 조회, 추가

      - 생성

      ```bash
      create [table name] (
        [column name] [data type]
        ...
      );
      ```

      - 조회

      ```bash
      show tables;
      ```

      - 테이블 구조 확인

      ```bash
      desc [table name];
      ```

      - 데이터 추가

      ```bash
      insert into [table name] (table column1, table column2, ..) values (table column1 values, table column2 values, ...);
      ```

- project에 설치

```bash
yarn add mysql --dev
```

- [mysql과 express 연동방법](https://expressjs.com/ko/guide/database-integration.html#mysql)

```javascript
var mysql = require("mysql");
var connection = mysql.createConnection({
  host: "localhost",
  user: "dbuser",
  password: "s3kreee7"
});

connection.connect();

connection.query("SELECT 1 + 1 AS solution", function(err, rows, fields) {
  if (err) throw err;
  console.log("The solution is: ", rows[0].solution);
});

connection.end();
```
