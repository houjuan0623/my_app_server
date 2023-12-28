const router = require('express').Router()

const userRouter = require('./user')
const authRouter = require('./auth')

router.use('/v1', userRouter)
router.use('/v1', authRouter)
module.exports = router
