const { validationResult } = require('express-validator')
const { logger } = require('../config/winston')
const signale = require('signale')

const { CustomError } = require('../utils/index')
const config = require('../config/config')

const verify = (req, res, next) => {
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
    return res.status(error.statusCode || 500).json({ error: error.message })
  }

  return res.status(500).json({ error: 'An error occurred.' })
}

module.exports.error = error
module.exports.verify = verify
