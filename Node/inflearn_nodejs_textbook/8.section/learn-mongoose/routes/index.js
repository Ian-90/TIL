var express = require('express');
var router = express.Router();
const User = require('../schemas/user')

/* GET home page. */
router.get('/', function(req, res, next) {
  User.find()
    .then((users) => {
      res.render('mongoose', { title: 'Express', users });
    })
    .catch((err) => {
      console.error(err)
      next(err)
    })
});

module.exports = router;
