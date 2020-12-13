const express = require('express')
const { User } = require('../models')
const { isLoggedIn } = require('./middlewares')
const router = express.Router()

router.post('/:id/follow', isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.user.id
      }
    })
    await user.addFollowing(parseInt(req.params.id, 10))
    res.send('success')
  } catch (err) {
    console.error(err)
    next(err)
  }
})

module.exports = router