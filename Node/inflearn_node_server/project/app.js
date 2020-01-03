const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const router = require("./router/index");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const session = require("express-session");
const flash = require("connect-flash");

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.set("view engine", "ejs");

app.use(router);

app.listen(3000, () => {
  console.log("start, express server on port 3000");
});
