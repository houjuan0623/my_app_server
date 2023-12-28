const mongooseManager = require('../config/mongoose')
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profile: String,
    avatar: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    roles: [{ type: String, required: true }],
  },
  { collection: 'users' },
)

class UserModel {
  constructor() {
    this.model = mongoose.model('User', userSchema)
    this.initialized = false
  }
  async init() {
    if (!this.initialized) {
      await mongooseManager.checkAndCreateCollection('users', userSchema)
      this.initialized = true
    }
    return this.model
  }
  async findUserByName(username) {
    return this.model.findOne({ username })
  }
  async insertUser(userData) {
    const user = new this.model(userData)
    return user.save()
  }
}

const userModel = new UserModel()
module.exports = userModel
