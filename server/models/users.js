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
  async findUserByName(username) {
    return await this.model.findOne({ username })
  }
  async insertUser(userData) {
    const user = new this.model(userData)
    return user.save()
  }
}

// 立即执行的异步函数来初始化 userModel
const userModel = new UserModel('users', userSchema)
module.exports = async () => {
  await userModel.init()
  return userModel
}
