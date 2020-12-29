const express = require('express')
const router = express.Router()
const axios = require('axios')

// nodebird-call -------->>> nodebird-api
router.get('/test', async (req, res, next) => {
  try {
    if (!req.session.jwt) {
      const tokenResult = await axios.post('http://localhost:8002/v1/token', {
        clientSecret: process.env.CLIENT_SECRET,
      })

      if (tokenResult.data && tokenResult.data.code === 200) {
        req.session.jwt = tokenResult.data.token
      } else {
        return res.json(tokenResult.data)
      }
    }

    const result = await axios.get('http://localhost:8002/v1/test', {
      headers: {
        authorization: req.session.jwt
      }
    })

    return res.json(result.data)
  } catch (err) {
    console.error(err)
    if (err.response.status === 419) { // 토큰만료 에러 
      return res.json(err.response.data)
    }
    return next(err)
  }
})

const request = async (req, api) => {
  try {
    if (!req.session.jwt) {
      const tokenResult = await axios.post('http://localhost:8002/v1/token', {
        clientSecret: process.env.CLIENT_SECRET,
      })
      req.session.jwt = tokenResult.data.token
    }
    return await axios.get(`http://localhost:8002/v1/${api}`, {
      headers: {
        authorization: req.session.jwt
      }
    })
  } catch (err) {
    console.error(err)
    if (err.response.status < 500) {
      return err.response
    }
    throw err
  }
}

// /mypost -> /posts/my
// /search -> /posts/hashtag
router.get('/mypost', async (req, res, next) => {
  try {
    const result = await request(req, '/posts/my')
    res.json(result.data)
  } catch (err) {
    console.error(err)
    next(err)
  }
})

router.get('/search/:hashtag', async (req, res, next) => {
  try {
    const result = await request(
      req, `/posts/hashtag/${encodeURIComponent(req.params.hashtag)}`
    )
    res.json(result.data)
  } catch (err) {
    console.error(err)
    next(err)
  }
})

router.get('/', (req, res) => {
  res.render('main', {
    key: process.env.CLIENT_SECRET,
  })
})

module.exports = router