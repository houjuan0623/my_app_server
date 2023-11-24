const mongoose = require('mongoose')

const config = require('./config')

const mongoUri = config.MONGO_URL
mongoose.set('strictQuery', true)

mongoose.connect(mongoUri, { keepAlive: true })

mongoose.connection.on('disconnected', () => {
  throw new Error(`数据库连接异常: ${mongoUri}`)
})

mongoose.connection.on('connected', () => {
  console.log('连接成功')
})
