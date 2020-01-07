const express = require("express");
const app = express();
const router = express.Router();
const path = require("path");
const main = require("./main/main");
const email = require("./email/email");
const join = require("./join/index");
const login = require("./login/index");
const logout = require("./logout/index");

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../../public/index.html"));
});

router.use("/main", main);
router.use("/email", email);
router.use("/join", join);
router.use("/login", login);
router.use("/logout", logout);

module.exports = router;
