const JWT = require('jsonwebtoken')
const { addDays } = require('date-fns')

const config = require('../config/config')

class CustomError extends Error {
  constructor(message, statusCode = 500, data) {
    super(message)
    this.name = this.constructor.name
    this.statusCode = statusCode
    this.data = data
  }
}

class SuccessResponse {
  constructor(res, message, data) {
    this.res = res
    this.message = message
    this.statusCode = 200
    this.data = data
  }

  send() {
    this.res.status(this.statusCode).json({
      message: this.message,
      data: this.data,
    })
  }
}

// 签发token
const signToken = (user) =>
  JWT.sign(
    {
      iss: 'seconp',
      sub: user.username,
      iat: parseInt((new Date().getTime() / 1000).toFixed(0)),
      exp: parseInt((addDays(new Date(), 7).getTime() / 1000).toFixed(0)),
    },
    config.JWT_SECRET,
  )

module.exports.SuccessResponse = SuccessResponse
module.exports.CustomError = CustomError
module.exports.signToken = signToken
