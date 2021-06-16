import User from '../models/User'
import fetch from 'node-fetch'
import bcrypt from 'bcrypt'

export const getJoin = (req, res) => {
  return res.render('join', { pageTitle: 'Join' })
}

export const postJoin = async (req, res) => {
  const pageTitle = 'Join'
  const { name, username, email, password, password2, location } = req.body
  const exists = await User.exists({ $or: [{ username }, { email }] })
  if (password !== password2) {
    return res.status(400).render('join', { pageTitle, errorMessage: 'Password confirmation does not match'})
  }
  if (exists) {
    return res.status(400).render('join', { pageTitle, errorMessage: 'This username/email is already taken.'})
  }

  try {
    await User.create({
      name,
      username,
      email,
      password,
      location,
    })
    return res.redirect('/login')
  } catch (err) {
    return res.status(400).render('join', {
      pageTitle,
      errorMessage: err._message,
    })
  }
}

export const edit = (req, res) => res.send('Edit User')
export const remove = (req, res) => res.send('Remove User')
export const getLogin = (req, res) => res.render('login', { pageTitle: 'Login' })
export const postLogin = async (req, res) => {
  const pageTitle = 'Login'
  const { username, password } = req.body
  const user = await User.findOne({ username })
  if (!user) {
    return res.status(400).render('login', { pageTitle, errorMessage: 'An account with this username does not exists'})
  }

  const ok = await bcrypt.compare(password, user.password)
  if (!ok) {
    return res.status(400).render('login', { pageTitle, errorMessage: 'Wrong password'})
  }
  req.session.loggedIn = true
  req.session.user = user
  console.log('LOG USER IN! COMING SOON!')
  return res.redirect('/')
}

export const startGithubLogin = (req, res) => {
  const baseUrl = 'https://github.com/login/oauth/authorize'
  const config = {
    cliend_id: process.env.GITHUB_CLIENT_ID,
    allow_signup: false,
    scope: 'read:user user:email'
  }
  const params = new URLSearchParams(config).toString()
  const finalUrl = `${baseUrl}?${params}`
  return res.redirect(finalUrl)
}

export const finishGithubLogin = async (req, res) => {
  const baseUrl = 'https://github.com/login/oauth/authorize'
  const config = {
    client_id: process.env.GITHUB_CLIENT_ID,
    client_secret: process.env.GITHUB_CLIENT_SECRET,
    code: req.query.code
  }
  const params = new URLSearchParams(config).toString()
  const finalUrl = `${baseUrl}?${params}`
  const tokenRequest = await (
    await fetch(finalUrl, {
      method: 'POST',
      headers: {
        Accept: 'application/json'
      },
    })
  ).json()

  if ('access_token' in tokenRequest) {
    const { access_token } = tokenRequest
    const apiUrl = 'https://api.github.com'
    const userData = await (
      await fetch(`${apiUrl}/user`, {
        headers: {
          Authorization: `token ${access_token}`
        }
      })
    ).json()
    const emailData = await (
      await fetch(`${apiUrl}/user/emails`, {
        headers: {
          Authorization: `token ${access_token}`
        }
      })
    ).json()
    const emailObj = emailData.find((email) => email.primary === true && email.verified === true)
    if (!emailObj) {
      return res.redirect('/login')
    }

    const existingUser = await User.findOne({ email: emailObj.email })
    if (existingUser) {
      req.session.loggedIn = true
      req.session.user = existingUser
      return res.redirect('/')
    } else {
      // create account
      const user = User.create({
        name: userData.name,
        username: userData.login,
        email: emailObj.email,
        password: '',
        socialOnly: true,
        location: userData.location,
      })
      req.session.loggedIn = true
      req.session.user = user
    }
  } else {
    res.redirect('/login')
  }
}

export const logout = (req, res) => res.send('Log out')
export const see = (req, res) => res.send('See User')
