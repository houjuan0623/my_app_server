class CustomError extends Error {
  constructor(message, statusCode = 500, data) {
    super(message)
    this.name = this.constructor.name
    this.statusCode = statusCode
    this.data = data
  }
}

class SuccessResponse {
  constructor(res, message, statusCode = 200, data) {
    this.res = res
    this.message = message
    this.statusCode = statusCode
    this.data = data
  }

  send() {
    this.res.status(this.statusCode).json({
      message: this.message,
      data: this.data,
    })
  }
}
module.exports.SuccessResponse = SuccessResponse
module.exports.CustomError = CustomError
