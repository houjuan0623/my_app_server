const express = require('express')
const asyncHandler = require('express-async-handler')
const validators = require('../handlers/validators')
const helpers = require('../handlers/helpers')
const auth = require('../handlers/auth')
const router = express.Router()

router.post(
  '/login',
  validators.login,
  asyncHandler(helpers.verify),
  asyncHandler(auth.local),
  asyncHandler(auth.token),
)

router.post(
  '/signup',
  validators.signup,
  asyncHandler(helpers.verify),
  asyncHandler(auth.signup),
)

module.exports = router
