const express = require('express')
const { Post, User } = require('../models')
const router = express.Router()
const { isLoggedIn, isNotLoggedIn } = require('./middlewares')

// main
router.get('/', (req, res, next) => {
  Post.findAll({
    include: {
      model: User,
      attributes: ['id', 'nick']
    }
  })
    .then((posts) => {
      res.render('main', {
        title: 'NodeBird',
        twits: posts,
        user: req.user,
        loginError: req.flash('loginError')
      })
    })
    .catch((err) => {
      console.error(err)
      next(err)
    })
})

// profile
router.get('/profile', isLoggedIn, (req, res) => {
  res.render('profile', { title: '내 정보 - NodeBird', user: null })
})

// join
router.get('/join', isNotLoggedIn, (req, res) => {
  res.render('join', {
    title: '회원가입 - NodeBird',
    user: req.user,
    joinError: req.flash('joinError')
  })
})

module.exports = router