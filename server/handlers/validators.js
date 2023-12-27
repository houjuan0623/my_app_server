const { body } = require('express-validator')

const validators = {}
validators.login = [
  body('password', 'Password is not valid.')
    .exists({ checkFalsy: true, checkNull: true })
    .isLength({ min: 8, max: 64 })
    .withMessage('Password length must be between 8 and 64.'),
  body('username', '用户名是无效的。')
    .exists({ checkFalsy: true, checkNull: true })
    .trim()
    .withMessage('用户名是必须的。')
    .matches(/^1\d{10}$/)
    .withMessage('用户名必须为有效的手机号'),
]

validators.signup = [
  body('password', 'Password is not valid.')
    .exists({ checkFalsy: true, checkNull: true })
    .isLength({ min: 8, max: 64 })
    .withMessage('Password length must be between 8 and 64.'),
  body('username', '用户名是无效的。')
    .exists({ checkFalsy: true, checkNull: true })
    .trim()
    .withMessage('用户名是必须的。')
    .matches(/^1\d{10}$/)
    .withMessage('用户名必须为有效的手机号')
    // TODO: 判断自己用户名是否在数据库中已经出现过
    .custom(async (value, { req }) => {
      const user = await query.user.find({ email: value })

      if (user) {
        req.user = user
      }

      if (user?.verified) return Promise.reject()
    })
    .withMessage('当前手机号已被注册。'),
]
module.exports = validators
