const userService = require('../services/UserService')

class UserController {
  async createUser(req, res) {
    try {
      console.log(req.body)
      const user = await userService.createUser(req.body)
      res.status(201).json(user)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  // 其他方法...
}

module.exports = new UserController()
