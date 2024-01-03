const { validationResult } = require('express-validator')
const { logger } = require('../config/winston')
const signale = require('signale')

const { CustomError, Failure } = require('../utils/index')
const config = require('../config/config')

const verify = (req, res, next) => {
  console.log('req.body is: ', req.body)
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
    return res
      .status(error.statusCode || 500)
      .json({ message: error.message, success: false })
  }

  return new Failure(res, error.message)
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
