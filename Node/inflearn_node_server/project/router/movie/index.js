const express = require("express");
const app = express();
const router = express.Router();
const path = require("path");
const mysql = require("mysql");

// DB SETTING
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "111111",
  port: 3306,
  database: "jsman"
});

connection.connect();

router.get("/list", (req, res) => {
  res.render("movie.ejs");
});

// 1. /movie, GET 요청
router.get("/", (req, res) => {
  const responseData = {};
  const query = connection.query("select title from movie", (err, rows) => {
    if (err) throw err;
    if (rows.length) {
      responseData.result = 1;
      responseData.data = rows;
    } else {
      responseData.result = 0;
    }
    res.json(responseData);
  });
});

// 2. /movie, POST 요청
router.post("/", (req, res) => {
  const title = req.body.title;
  const type = req.body.type;
  const grade = req.body.grade;
  const actor = req.body.actor;

  const sql = { title, type, grade, actor };
  const query = connection.query(
    "insert into movie set ?",
    sql,
    (err, rows) => {
      if (err) throw err;
      return res.json({ result: 1 });
    }
  );
});

// 3. /movie:title, GET 요청
router.get("/:title", (req, res) => {
  const title = req.params.title;
  const responseData = {};
  const query = connection.query(
    "select * from movie where title=?",
    [title],
    (err, rows) => {
      if (err) throw err;
      if (rows[0]) {
        responseData.result = 1;
        responseData.data = rows;
      } else {
        responseData.result = 0;
      }
      res.json(responseData);
    }
  );
});

module.exports = router;
