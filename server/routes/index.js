const router = require('express').Router()

const userRouter = require('./userRoutes')

router.use('/v1', userRouter)

module.exports = router
