const { body, oneOf } = require('express-validator')
const { UserModel, SchoolModel, RoleModel } = require('../models/index')

const validators = {}
validators.login = [
  // 验证用户名
  body('username', '用户名是必须的。')
    .exists({ checkFalsy: true, checkNull: true })
    .trim()
    .matches(/^1\d{10}$/)
    .withMessage('用户名必须为有效的手机号'),

  // 验证密码（如果提供）
  body('password')
    .optional({ checkFalsy: true }) // 密码是可选的，但如果存在，则应符合以下规则
    .isLength({ min: 8, max: 64 })
    .withMessage('密码在8-64位之间，请检查密码长度'),

  // 验证验证码（如果提供）
  body('verificationCode')
    .optional({ checkFalsy: true }) // 验证码是可选的，但如果存在，则应符合以下规则
    .isLength({ min: 6, max: 6 })
    .withMessage('验证码必须是6位数字')
    .isNumeric()
    .withMessage('验证码必须是数字'),

  // 确保至少提供了密码或验证码
  oneOf(
    [
      body('password').exists({ checkFalsy: true }),
      body('verificationCode').exists({ checkFalsy: true }),
    ],
    '必须提供密码或验证码',
  ),
]

validators.signup = [
  body('password', 'Password is not valid.')
    .exists({ checkFalsy: true, checkNull: true })
    .isLength({ min: 8, max: 64 })
    .withMessage('密码在8-64位之间，请检查密码长度'),
  body('username', '用户名是无效的。')
    .exists({ checkFalsy: true, checkNull: true })
    .trim()
    .withMessage('用户名是必须的。')
    .matches(/^1\d{10}$/)
    .withMessage('用户名必须为有效的手机号')
    .custom(async (value) => {
      const userModel = await UserModel.getInstance()
      const user = await userModel.findUserByName(value)
      if (user) {
        return Promise.reject()
      }
    })
    .withMessage('当前手机号已被注册。'),
]
validators.createSchool = [
  // 验证 name 字段
  body('name', '学校名称是必须的。')
    .exists({ checkFalsy: true, checkNull: true }) // 检查 name 字段是否存在
    .trim() // 去除两侧的空格
    .custom(async (value) => {
      const schoolModel = await SchoolModel.getInstance()
      const school = await schoolModel.findSchoolByName(value)
      if (school) {
        return Promise.reject('已存在同名学校。')
      }
    }),
]

validators.createRole = [
  // 验证 name 字段
  body('name', '角色名称是必须的。')
    .exists({ checkFalsy: true, checkNull: true }) // 检查 name 字段是否存在
    .trim() // 去除两侧的空格
    .custom(async (value) => {
      const roleModel = await RoleModel.getInstance()
      const role = await roleModel.findRoleByName(value)
      if (role) {
        return Promise.reject('已存在同名角色。')
      }
    }),
]
module.exports = validators
