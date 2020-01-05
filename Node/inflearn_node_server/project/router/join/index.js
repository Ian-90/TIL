const express = require("express");
const app = express();
const router = express.Router();
const path = require("path");
const mysql = require("mysql");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

// DB SETTING
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "111111",
  port: 3306,
  database: "jsman"
});

connection.connect();

router.get("/", (req, res) => {
  let msg;
  const errMsg = req.flash("error");
  if (errMsg) msg = errMsg;
  res.render("join.ejs", { message: msg });
});

passport.use(
  "local-join",
  new LocalStrategy(
    {
      usernameField: "email",
      passwrodFied: "password",
      passReqToCallback: true
    },
    (req, email, password, done) => {
      const query = connection.query(
        "select * from user where email=?",
        [email],
        (err, rows) => {
          if (err) return done(err);

          if (rows.length) {
            console.log("existed user");
            return done(null, false, { message: "your email is already used" });
          } else {
            const sql = { email, pw: password };
            const query = connection.query(
              "insert into user set ?",
              sql,
              (err, rows) => {
                if (err) throw err;
                return done(null, { email, id: rows.insertId });
              }
            );
          }
        }
      );
    }
  )
);

router.post(
  "/",
  passport.authenticate("local-join", {
    successRedirect: "/main",
    failureRedirect: "/join",
    failureFlash: true
  })
);

// router.post("/", (req, res) => {
//   const body = req.body;
//   const email = body.email;
//   const name = body.name;
//   const password = body.password;

//   const query = connection.query(
//     `insert into user (email, name, pw) values ('${email}', '${name}', '${password}')`,
//     (err, rows) => {
//       if (err) throw err;
//       else res.render("welcome.ejs", { name, id: rows.insertId });
//     }
//   );
// });

module.exports = router;
