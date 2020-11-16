var express = require('express');
const User = require('../schemas/user');
var router = express.Router();

/* GET users listing. */
// GET /users
router.get('/', (req, res, next) => {
  User.find()
    .then((users) => {
      res.json(users)
    })
    .catch((err) => {
      console.error(err)
      next(err)
    })
});

router.post('/', (req, res, next) => {
  const user =  new User({
    name: req.body.name,
    age: req.body.age,
    married: req.body.married
  })
  user.save()
    .then((result) => {
      res.status(201).json(result)
    })
    .catch((err) => {
      console.error(err)
      next(err)
    })
})

module.exports = router;
