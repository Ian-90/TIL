const express = require("express");
const app = express();
const router = express.Router();

router.get("/", (req, res) => {
  req.logout();
  res.redirect("/login");
});

module.exports = router;
