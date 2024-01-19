const express = require('express')
const router = express.Router()
const asyncHandler = require('express-async-handler')

const helpers = require('../handlers/helpers')
const validators = require('../handlers/validators')
const resourceController = require('../controllers/ResourceController')

/**
 * 管理员在后台创建资源
 */
router.post(
  '/createResource',
  validators.createResource,
  asyncHandler(helpers.verify),
  asyncHandler(resourceController.createResource.bind(resourceController)),
)

/**
 * 管理员更新资源
 */
router.post(
  '/updateResource',
  validators.updateResource,
  asyncHandler(helpers.verify),
  asyncHandler(resourceController.updateResource.bind(resourceController)),
)

router.get(
  '/getResource',
  asyncHandler(resourceController.findAllResource.bind(resourceController)),
)
module.exports = router
