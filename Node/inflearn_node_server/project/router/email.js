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

router.post("/form", (req, res) => {
  res.render("email.ejs", {
    email: req.body.email
  });
});

// Router
router.post("/ajax", (req, res) => {
  console.log(req.body);
  const { email } = req.body;
  const responseData = {};
  const query = connection.query(
    `select name from user where email="${email}"`,
    (err, rows) => {
      if (err) throw err;
      if (rows[0]) {
        responseData.result = "ok";
        responseData.name = rows[0].name;
      } else {
        responseData.result = "none";
        responseData.name = "";
      }
      res.json(responseData);
    }
  );
});

module.exports = router;
