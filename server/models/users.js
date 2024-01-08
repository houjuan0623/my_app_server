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

  async findUserById(id) {
    return await this.model.findById(id)
  }

  // 查找所有用户
  async findAllUsers() {
    return await this.model.find({})
  }

  async insertUser(userData) {
    const user = new this.model(userData)
    await user.save()
    return user._id.toString()
  }

  async updateUserById(id, updateData) {
    return await this.model.findByIdAndUpdate(id, updateData, { new: true })
  }

  async updateUserByUsername(username, updateData) {
    return await this.model.findOneAndUpdate({ username }, updateData, {
      new: true,
    })
  }

  async deleteUserById(id) {
    return await this.model.findByIdAndDelete(id)
  }

  async deleteUserByUsername(username) {
    return await this.model.findOneAndDelete({ username })
  }

  async getUsersRolesByUsername(username) {
    const user = await this.model.findOne({ username }).select('roles')
    return user.roles.length === 0 ? [] : user.roles
  }
}

module.exports = UserModel
