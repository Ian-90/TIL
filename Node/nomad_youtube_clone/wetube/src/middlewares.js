import multer from 'multer'

export const localsMiddleware = (req, res, next) => {
  res.locals.loggedIn = Boolean(req.session.loggedIn)
  res.locals.siteName = 'Wetube'
  res.locals.loggedInUser = req.session.user || {}
  next()
}

export const protectorMiddleware = (req, res, next) => {
  if (req.session.loggedIn) {
    next()
  } else {
    return res.redirect('/login')
  }
}

export const publicOnlyMiddleware = (req, res, next) => {
  if (!req.session.loggedIn) {
    return next()
  } else {
    return res.redirect('/')
  }
}

export const avatarUploadMiddleware = multer({
  dest: 'uploads/avatars/*',
  limits: {
    fileSize: 30000000,
  },
})

export const videoUploadMiddleware = multer({
  dest: 'uploads/video/*',
  limits: {
    fileSize: 10000000,
  },
})