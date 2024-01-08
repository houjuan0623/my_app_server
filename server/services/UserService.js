const { UserModel } = require('../models/index')

class UserService {
  async createUser(userData) {
    // 这里可以添加数据验证、业务逻辑等
    const userModel = await UserModel.getInstance()
    await userModel.insert(userData)
  }

  async findAllUsers() {
    const userModel = await UserModel.getInstance()
    return await userModel.findAllUsers()
  }
  // 这里可以添加更多用户相关的服务方法，如 getUser, updateUser 等
}

module.exports = new UserService()
