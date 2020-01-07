const express = require("express");
const app = express();
const router = express.Router();
const path = require("path");

router.get("/", (req, res) => {
  console.log("main js loaded", req.user);
  const id = req.user;
  if (!id) res.render("login.ejs");
  res.render("main.ejs", { id });
});

module.exports = router;
