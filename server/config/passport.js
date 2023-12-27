const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const LocalStrategy = require('passport-local')
const config = require('./config') // 假设您的配置文件中包含了 JWT 密钥
const User = require('../models/users') // 用户模型

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // 定义如何从请求中提取 JWT。从请求头中的 Authorization 字段提取以 Bearer 开头的 token。
  secretOrKey: config.JWT_SECRET, // 验证 JWT 签名的密钥。
}

passport.use(
  new JwtStrategy(options, async (jwt_payload, done) => {
    try {
      // TODO: User.findById(jwt_payload.id) 未写
      const user = await User.findById(jwt_payload.id)
      if (user) {
        return done(null, user)
      } else {
        return done(null, false)
      }
    } catch (error) {
      return done(error, false)
    }
  }),
)

const localOptions = {
  usernameField: 'username',
}

passport.use(
  new LocalStrategy(localOptions, async (username, password, done) => {
    try {
      const user = await query.user.find({ username })
      if (!user) {
        return done(null, false)
      }
      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch) {
        return done(null, false)
      }
      return done(null, user)
    } catch (err) {
      return done(err)
    }
  }),
)

module.exports = passport
