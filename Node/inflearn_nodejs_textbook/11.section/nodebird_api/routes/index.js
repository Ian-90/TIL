const express = require('express')
const router = express.Router()
const { User, Domain } = require('../models')
const { v4: uuidv4 } = require('uuid')

router.get('/', (req, res, next) => {
  User.findOne({
    where: {
      id: req.user && req.user.id || null
    },
    include: { model: Domain }
  })
    .then((user) => {
      res.render('login', {
        user,
        loginError: req.flash('loginError'),
        domains: user && user.domains
      })
    }).catch((err) => {
      console.error(err)
      next(err)    
    })
})

router.post('/domain', (req, res, next) => {
  Domain.create({
    userId: req.user.id,
    host: req.body.host,
    type: req.body.type,
    clientSecret: uuidv4()
  })
    .then(() => {
      res.redirect('/')
    })
    .catch((err) => {
      console.error(err)
      next(err)
    })
})

module.exports = router
