// const userService = require('../services/UserService')
// const { Success } = require('../utils/index')

class UserController {
  async createUser(req, res) {
    // const user = await userService.createUser(req.body)
    // new Success(res, '用户创建成功', {
    //   test: '随便返回一段字符串用以测试',
    //   user: 'user',
    // }).send()
    return res.status(200).send({
      test: '随便返回一段字符串用以测试',
      user: 'user',
    })
  }

  // 其他方法...
}

module.exports = new UserController()
