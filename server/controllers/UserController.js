const userService = require('../services/UserService')
const { Success } = require('../utils/index')

class UserController {
  async createUser(req, res) {
    const user = await userService.createUser(req.body)
    new Success(res, '用户创建成功', user).send()
  }

  // async getUsers(req, res) {}
}

module.exports = new UserController()
