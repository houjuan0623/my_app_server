const express = require('express')
const router = express.Router()
const asyncHandler = require('express-async-handler')

const helpers = require('../handlers/helpers')
const validators = require('../handlers/validators')
const permissionController = require('../controllers/PermissionController')

/**
 * 管理员在后台创建学校
 */
router.post(
  '/createPermission',
  validators.createPermission,
  asyncHandler(helpers.verify),
  asyncHandler(
    permissionController.createPermission.bind(permissionController),
  ),
)

// router.get(
//   '/getPPermissions',
//   asyncHandler(roleController.findAllRoles.bind(roleController)),
// )

module.exports = router
