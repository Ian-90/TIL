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

// /movie, GET 요청
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

module.exports = router;
