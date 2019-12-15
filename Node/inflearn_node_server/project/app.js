const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "111111",
  port: 3306,
  database: "jsman"
});

connection.connect();

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.set("view engine", "ejs");

app.listen(3000, () => {
  console.log("start, express server on port 3000");
});

app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/public/index.html`);
});

app.post("/email_post", (req, res) => {
  res.render("email.ejs", {
    email: req.body.email
  });
});

app.post("/ajax_send_email", (req, res) => {
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
