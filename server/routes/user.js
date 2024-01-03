const express = require('express')
const router = express.Router()
const asyncHandler = require('express-async-handler')

const userController = require('../controllers/UserController')
const auth = require('../handlers/auth')
const helper = require('../handlers/helpers')

/**
 * 管理员直接通过后台createUser
 */
router.post(
  '/createUser',
  asyncHandler(auth.jwt),
  helper.setPermissionParams('users', 'insert'),
  asyncHandler(auth.hasPermission),
  asyncHandler(userController.createUser.bind(userController)),
)

/**
 * 管理员获取users列表，在正式调用controller之前，应该直接先检测该token是否正确，然后检测该用户是否有权限调用该接口，最后再实现getUsers的逻辑
 */
router.get('/getUsers', asyncHandler(auth.jwt))

// router.get('/create', (req, res) => res.status(200).send({ hello: 123 }))
module.exports = router
