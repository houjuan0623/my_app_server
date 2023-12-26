const mongoose = require('mongoose')
const config = require('./config')

class MongooseManager {
  constructor() {
    this.mongoUri = config.MONGO_URL
    mongoose.set('strictQuery', true)
    this.connected = new Promise((resolve) => {
      mongoose.connection.once('open', resolve)
    })
    this.connect() // 连接数据库
  }

  async connect() {
    try {
      await mongoose.connect(this.mongoUri, { keepAlive: true })
      console.log('连接成功')
    } catch (error) {
      console.error(`数据库连接异常: ${this.mongoUri}`, error)
      throw error
    }
  }

  async checkAndCreateCollection(collectionName, schema) {
    await this.connected // 等待数据库连接建立
    try {
      const collections = await mongoose.connection.db
        .listCollections()
        .toArray()
      const collectionNames = collections.map((c) => c.name)

      if (!collectionNames.includes(collectionName)) {
        console.log(`Collection ${collectionName} does not exist. Creating...`)
        await mongoose.connection.db.createCollection(collectionName)
      } else {
        console.log(`Collection ${collectionName} already exists.`)
      }

      return mongoose.model(collectionName, schema)
    } catch (error) {
      console.error('Error in checking or creating collection: ', error)
      throw error
    }
  }
}

const mongooseManager = new MongooseManager()
module.exports = mongooseManager
