const passport = require('passport')
const bcrypt = require('bcryptjs')

const { CustomError, Success, signToken } = require('../utils/index')
const UserModel = require('../models/users')

const authenticate = (type, error) =>
  async function auth(req, res, next) {
    if (req.user) return next()

    passport.authenticate(type, (err, user) => {
      if (err) return next(err)

      if (!user) {
        return next(new CustomError(error, 401))
      }

      if (user) {
        req.user = {
          ...user.toObject(), // Mongoose document should be converted to a plain object
        }
        return next()
      }
      return next()
    })(req, res, next)
  }

const local = authenticate('local', '登录名或密码出错')
const jwt = authenticate('jwt', 'token未授权')

const signup = async (req, res) => {
  // TODO: 最好在这里添加一个字段实现注册审核制
  const salt = await bcrypt.genSalt(12)
  const password = await bcrypt.hash(req.body.password, salt)
  const userModel = await UserModel.getInstance()
  const userId = await userModel.insertUser({
    username: req.body.username,
    password,
  })
  new Success(res, '用户创建成功', {
    id: userId,
  }).send()
}

const token = async (req, res) => {
  const token = signToken(req.user)
  const success = new Success(res, '登录成功', { token })
  success.send()
}

module.exports = {
  local,
  jwt,
  signup,
  token,
}
