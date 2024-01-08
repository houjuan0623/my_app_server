const router = require('express').Router()

const userRouter = require('./user')
const authRouter = require('./auth')
const schoolRouter = require('./school')

router.use('/v1', userRouter)
router.use('/v1', authRouter)
router.use('/v1', schoolRouter)

module.exports = router
