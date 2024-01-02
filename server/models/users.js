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
  static name = 'users'
  static schema = userSchema

  constructor() {
    super(UserModel.name, UserModel.schema)
  }

  async findUserByName(username) {
    return await this.model.findOne({ username })
  }
  async insertUser(userData) {
    const user = new this.model(userData)
    await user.save()
    return user._id.toString()
  }
}

module.exports = UserModel
