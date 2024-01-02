const mongooseManager = require('../config/mongoose')

class BaseModel {
  constructor(name, schema) {
    this.name = name
    this.schema = schema
    this.initialized = false
  }

  async init() {
    if (!this.initialized) {
      this.model = await mongooseManager.checkAndCreateCollection(
        this.name,
        this.schema,
      )
      this.initialized = true
      return this.model
    }
    return this.model
  }

  static async getInstance() {
    if (!this.instance) {
      this.instance = new this()
      await this.instance.init()
    }
    return this.instance
  }
}

module.exports = BaseModel
