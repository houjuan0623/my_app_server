const passport = require('passport')
const bcrypt = require('bcryptjs')
const { CustomError, SuccessResponse } = require('../utils/index')

const authenticate = (type, error, isStrict = true) =>
  async function auth(req, res, next) {
    if (req.user) return next()

    passport.authenticate(type, (err, user) => {
      if (err) return next(err)

      if (!user && isStrict) {
        return next(new CustomError(error, 401))
      }

      if (user && isStrict && !user.verified) {
        return next(
          new CustomError(
            'Your email address is not verified. ' +
              'Click on signup to get the verification link again.',
            400,
          ),
        )
      }

      if (user && user.banned) {
        return next(
          new CustomError("You're banned from using this website.", 403),
        )
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

const local = authenticate('local', 'Login credentials are wrong.')
const jwt = authenticate('jwt', 'Unauthorized.')

const signup = async (req, res) => {
  const salt = await bcrypt.genSalt(12)
  const password = await bcrypt.hash(req.body.password, salt)
  // TODO: insertUser
  const success = new SuccessResponse(res, '请求成功', 200)
  success.send()
}

module.exports = {
  local,
  jwt,
}
