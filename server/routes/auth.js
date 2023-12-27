const express = require('express')
const asyncHandler = require('express-async-handler')
const validators = require('../handlers/validators')
const helpers = require('../handlers/helpers')
const router = express.Router()

router.post('/login', validators.login, asyncHandler(helpers.verify))
