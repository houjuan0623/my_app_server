const express = require('express')
const router = express.Router()
const asyncHandler = require('express-async-handler')
const helpers = require('../handlers/helpers')

const validators = require('../handlers/validators')
const schoolController = require('../controllers/SchoolController')

/**
 * 管理员在后台创建学校
 */
router.post(
  '/createSchool',
  validators.createSchool,
  asyncHandler(helpers.verify),
  asyncHandler(schoolController.createSchool.bind(schoolController)),
)

router.get(
  '/getSchools',
  asyncHandler(schoolController.findAllSchools.bind(schoolController)),
)

module.exports = router
