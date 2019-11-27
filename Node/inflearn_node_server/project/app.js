const express = require("express");
const app = express();
const bodyParser = require("body-parser");

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
  const responseData = {
    result: "ok",
    email: req.body.email
  };
  res.json(responseData);
});
