const express = require('express')
const router = express.Router()
const asyncHandler = require('express-async-handler')

const helpers = require('../handlers/helpers')
const validators = require('../handlers/validators')
const roleController = require('../controllers/RoleController')

/**
 * 管理员在后台创建学校
 */
router.post(
  '/createRole',
  validators.createRole,
  asyncHandler(helpers.verify),
  asyncHandler(roleController.createRole.bind(roleController)),
)

router.get(
  '/getRoles',
  asyncHandler(roleController.findAllRoles.bind(roleController)),
)

module.exports = router
