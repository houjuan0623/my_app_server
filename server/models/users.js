const mongoose = require('mongoose')

const BaseModel = require('./Base')

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

class UserModel extends BaseModel {
  constructor(name, schema) {
    super(name, schema)
  }

  // 确保无论 UserModel 被引用多少次，都只会初始化一次，并且每次引用都返回同一个实例。
  static async getInstance() {
    if (!this.instance) {
      const userModel = new UserModel('users', userSchema)
      await userModel.init()
      this.instance = userModel
    }
    return this.instance
  }

  async findUserByName(username) {
    return await this.model.findOne({ username })
  }
  async insertUser(userData) {
    const user = new this.model(userData)
    return user.save()
  }
}

module.exports = UserModel
