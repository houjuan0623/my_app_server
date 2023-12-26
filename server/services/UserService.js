const setupUsers = require('../models/users')

class UserService {
  async createUser(userData) {
    // 这里可以添加数据验证、业务逻辑等
    console.log(userData, 2222222)
    const Users = await setupUsers
    const newUser = new Users(userData)
    return await newUser.save()
  }

  // 这里可以添加更多用户相关的服务方法，如 getUser, updateUser 等
}

module.exports = new UserService()
