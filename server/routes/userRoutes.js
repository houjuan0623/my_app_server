const express = require('express')
const router = express.Router()

const userController = require('../controllers/UserController')

router.post('/create', userController.createUser.bind(userController))
// router.get('/create', (req, res) => res.status(200).send({ hello: 123 }))
module.exports = router
