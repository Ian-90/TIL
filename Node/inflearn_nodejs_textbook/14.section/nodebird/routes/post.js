const express = require('express')
const router = express.Router()
const multer = require('multer')
const path = require('path')
const { Post, User, Hashtag } = require('../models')
const { isLoggedIn } = require('./middlewares')

const upload = multer({
  storage: multer.diskStorage({
    // 파일경로
    destination(req, file, cb) {
      cb(null, 'uploads/')
    },
    // 파일명
    filename(req, file, cb) {
      const ext = path.extname(file.originalname)
      cb(null, path.basename(file.originalname, ext) + new Date().valueOf() + ext)
    }
  }),
  limit: {
    fileSize: 5 * 1024 * 1024,
  }
})

router.post('/img', isLoggedIn, upload.single('img'), (req, res) => {
  // img multer로 업로드 한것은 req.file에 저장되어 있음
  console.log(req.file)
  res.json({ url: `img/${req.file.filename}` })
})

const upload2 = multer()
router.post('/', isLoggedIn, upload2.none(), async (req, res, next) => {
  // 게시글 업로드
  try {
    const post = await Post.create({
      content: req.body.content,
      img: req.body.url,
      userId: req.user.id,
    })
    const hashtags = req.body.content.match(/#[^\s]/g)
    if (hashtags) {
      const result = await Promise.all(hashtags.map(tag => Hashtag.findOrCreate({
        where: {
          title: tag.slice(1).toLowerCase()
        }
      })))
      await post.addHashtags(result.map(r => r[0]))
    }
    res.redirect('/')
  } catch (err) {
    console.error(err)
    next(err)
  }
})

router.get('/hashtag', async (req, res, next) => {
  const query = req.query.hashtag
  if (!query) {
    return res.redirect('/')
  }
  try {
    const hashtag = await Hashtag.findOne({ where: { title: query }})
    let posts = []
    if (hashtag) {
      posts = await hashtag.getPosts({ include: [{ model: User }]})
    }
    return res.render('main', {
      title: `${query} | NodeBird`,
      user: req.user,
      twits: posts
    })
  } catch (err) {
    console.error(err)
    next(err)
  }
})

module.exports = router