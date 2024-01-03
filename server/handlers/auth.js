const passport = require('passport')
const bcrypt = require('bcryptjs')

const { CustomError, Success, Failure, signToken } = require('../utils/index')
const { UserModel } = require('../models/index')
const { enforcer } = require('../config/casbin')

const authenticate = (type, error) =>
  async function auth(req, res, next) {
    if (req.user) return next()

    passport.authenticate(type, (err, user) => {
      if (err) return next(err)

      if (!user) {
        return next(new CustomError(error, 401))
      }

      if (user) {
        // 将user的全部信息挂在到req上，留作稍后使用
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

const hasPermission = async (req, res, next) => {
  const userModel = await UserModel.getInstance()
  const roles = await userModel.getUsersRolesByUsername(req.body.username)
  if (roles?.length === 0) {
    new Failure(res, '用户没有分配角色', 403).send()
  }
  for (const role of roles) {
    const allow = await enforcer.enforce(
      role,
      req.permissionParams.res,
      req.permissionParams.act,
    )
    // 如果有权限，进入下面的操作
    if (allow) {
      return next()
    }
  }
  return new Failure(res, '用户没有分配该权限', 403).send()
}

module.exports = {
  local,
  jwt,
  signup,
  token,
  hasPermission,
}
