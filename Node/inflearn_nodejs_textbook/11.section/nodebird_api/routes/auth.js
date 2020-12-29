const express = require('express')
const router = express.Router()
const passport = require('passport')
const bcrypt = require('bcrypt')
const { User } = require('../models')
const { isLoggedIn, isNotLoggedIn } = require('./middlewares')

router.post('/join', isNotLoggedIn, async (req, res, next) => {
  const { email, nick, password } = req.body
  try {
    const exUser = await User.findOne({ where: { email }})
    if (exUser) {
      req.flash('joinError', '이미 가입된 이메일입니다.')
      return res.redirect('/join')
    }
    const hash = await bcrypt.hash(password, 12) // 숫자가 커질수록 암호화가 복잡해진다.
    await User.create({
      email,
      nick,
      password: hash,
    })
  } catch (err) {
    console.error(err)
    next(err)
  }
})

router.post('/login', isNotLoggedIn, (req, res, next) => {
  // done(에러, 성공, 실패)가 (authError, user, info)로 전달됨
  passport.authenticate('local', (authError, user, info) => {
    if (authError) {
      console.error(authError)
      return next(authError)
    }

    if (!user) {
      req.flash('loginError', info.message)
      return res.redirect('/')
    }

    return req.login(user, (loginError) => {
      if (loginError) {
        console.error(loginError)
        return next(loginError)
      }
      return res.redirect('/')
    })
  })(req, res, next)
})

router.get('/logout', isLoggedIn, (req, res) => {
  req.logout()
  req.session.destroy() // 세션 삭제
  res.redirect('/')
})

router.get('/kakao', passport.authenticate('kakao'))

router.get('/kakao/callback', passport.authenticate('kakao', {
  failureRedirect: '/',  
}), (req, res) => {
  res.redirect('/')
})

module.exports = router
