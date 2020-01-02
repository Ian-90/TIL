# section 6. DB에 데이터 추가

## 1. DB에 데이터 추가(create user) 1~3.

### 간단한 개념

- Database CRUD
  - Create
  - Read
  - Update
  - Delete

### Project

- [escape](https://github.com/mysqljs/mysql#escaping-query-values)를 활용하면 query가 간결해짐.

```javascript
router.post("/", (req, res) => {
  const body = req.body;
  const email = body.email;
  const name = body.name;
  const password = body.password;

  const sql = { email, name, pw: password };

  const query = connection.query("insert into user set ?", sql, (err, rows) => {
    if (err) throw err;
    console.log("ok db insert", rows);
  });
});
```
