const { validationResult } = require('express-validator')
const { logger } = require('../config/winston')
const signale = require('signale')

const { CustomError, Failure } = require('../utils/index')
const config = require('../config/config')

const verify = (req, res, next) => {
  // 检查传入请求（req）是否通过了之前定义的验证规则。如果请求没有通过验证，它会创建并抛出一个自定义错误（CustomError）。
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const message = errors.array()[0].msg
    throw new CustomError(message, 400)
  }
  return next()
}
// eslint-disable-next-line
const error = (error, _req, res, _next) => {
  logger.error(error.message)

  if (config.NODE_ENV) {
    signale.fatal(error)
  }

  if (error instanceof CustomError) {
    return res.status(error.statusCode || 500).json({
      statusCode: error.statusCode || 500,
      message: error?.message || '',
      success: false,
    })
  }

  return new Failure(res, error.message).send()
}

const setPermissionParams = (resource, action) => {
  return (req, res, next) => {
    req.permissionParams = {
      sub: req.body.username, // 从认证信息中获取用户名
      res: resource, // 直接使用传入的参数
      act: action, // 直接使用传入的参数
    }
    next()
  }
}

module.exports.error = error
module.exports.verify = verify
module.exports.setPermissionParams = setPermissionParams
