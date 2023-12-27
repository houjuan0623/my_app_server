const { userModel } = require('../models/index')

class UserService {
  async createUser(userData) {
    // 这里可以添加数据验证、业务逻辑等
    const Users = await userModel.init()
    const newUser = new Users(userData)
    console.log(newUser, 22222)
    return await newUser.save()
  }

  // 这里可以添加更多用户相关的服务方法，如 getUser, updateUser 等
}

module.exports = new UserService()
