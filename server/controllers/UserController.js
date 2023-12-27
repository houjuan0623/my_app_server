const userService = require('../services/UserService')

class UserController {
  async createUser(req, res) {
    try {
      console.log(req.body)
      const user = await userService.createUser(req.body)
      res.status(200).json(user)
    } catch (error) {
      console.log(error, 123122313)
      res.status(500).json({ error: error.message })
    }
  }

  // 其他方法...
}

module.exports = new UserController()
