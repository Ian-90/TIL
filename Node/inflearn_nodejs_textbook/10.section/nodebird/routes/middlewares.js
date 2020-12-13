exports.isLoggedIn = (req, res, next) => {
  // passport가 추가해주는것 req.login, req.logout, req.isAuthenticated()
  // 로그인 여부 알려줌
  if (req.isAuthenticated()) { 
    next()
  } else {
    res.status(403).send('로그인 필요')
  }
}

exports.isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    next()
  } else {
    res.redirect('/')
  }
}
