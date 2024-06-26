import multer from 'multer'
import multerS3 from 'multer-s3'
import aws from 'aws-sdk'

const isHeroku = process.env.NODE_ENV === 'production'

const s3 = new aws.S3({
  credentials: {
    accessKeyId: {
      accessKeyId: process.env.AWS_ID,
      secretAccessKey: process.env.AWS_SECRET,
    }
  }
})

const s3ImageUploader = multerS3({
  s3,
  bucket: '[my s3 bucket name]/images',
  acl: 'public-read'
})

const s3VideoUploader = multerS3({
  s3,
  bucket: '[my s3 bucket name]/videos',
  acl: 'public-read'
})

export const localsMiddleware = (req, res, next) => {
  res.locals.loggedIn = Boolean(req.session.loggedIn)
  res.locals.siteName = 'Wetube'
  res.locals.loggedInUser = req.session.user || {}
  res.locals.isHeroku = isHeroku
  next()
}

export const protectorMiddleware = (req, res, next) => {
  if (req.session.loggedIn) {
    next()
  } else {
    req.flash('error', 'Not authorized')
    return res.redirect('/login')
  }
}

export const publicOnlyMiddleware = (req, res, next) => {
  if (!req.session.loggedIn) {
    return next()
  } else {
    req.flash('error', 'Not authorized')
    return res.redirect('/')
  }
}

export const avatarUploadMiddleware = multer({
  dest: 'uploads/avatars/*',
  limits: {
    fileSize: 30000000,
  },
  storage: isHeroku ? s3ImageUploader : undefined,
})

export const videoUploadMiddleware = multer({
  dest: 'uploads/video/*',
  limits: {
    fileSize: 10000000,
    storage: isHeroku ? s3VideoUploader : undefined,
  },
})