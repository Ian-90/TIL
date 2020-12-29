const KakaoStrategy = require('passport-kakao').Strategy

const { User } = require('../models')

// /auth/kako => 카카오 로그인 => /auth/kakao/callback으로 프로필 반환

module.exports = (passport) => {
  passport.use(new KakaoStrategy({
    clientID: process.env.KAKAO_ID,
    callbackURL: '/auth/kakao/callback',
  }, async (accessToken, refreshToken, profile, done) => {
    try {
      const exUser = await User.findOne({
        where: {
          snsId: profile.id,
          provider: 'kakao',
        }
      })
  
      if (exUser) {
        done(null, exUser)
      } else {
        const newUser = await User.create({
          email: profile._json && profile._json.kaccount_email,
          nick: profile.displayName,
          snsId: profile.id,
          provider: 'kakao'
        })
        done(null, newUser)
      }
    } catch (err) {
      console.error(err)
      done(err)
    }
  }))
}
