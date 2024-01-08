const userService = require('../services/UserService')
const { Success } = require('../utils/index')

class UserController {
  async createUser(req, res) {
    const user = await userService.createUser(req.body)
    new Success(res, '用户创建成功', user).send()
  }

  async findAllUsers(req, res) {
    const users = await userService.findAllUsers()
    new Success(res, '查询所有用户成功', users).send()
  }

  // async getUsers(req, res) {}
}

module.exports = new UserController()
