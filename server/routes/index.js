const router = require('express').Router()

const userRouter = require('./user')
const authRouter = require('./auth')
const schoolRouter = require('./school')
const roleRouter = require('./role')
const permissionRouter = require('./permission')
const test = require('./test')

router.use('/v1', userRouter)
router.use('/v1', authRouter)
router.use('/v1', schoolRouter)
router.use('/v1', roleRouter)
router.use('/v1', permissionRouter)
router.use('/v1', test)

module.exports = router
