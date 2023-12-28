const express = require('express')
const router = express.Router()
const asyncHandler = require('express-async-handler')

const userController = require('../controllers/UserController')
const auth = require('../handlers/auth')

router.post(
  '/createUser',
  asyncHandler(auth.jwt),
  asyncHandler(userController.createUser.bind(userController)),
)

// router.get('/create', (req, res) => res.status(200).send({ hello: 123 }))
module.exports = router
