const roleService = require('../services/RoleService')
const { Success } = require('../utils/index')

class RoleController {
  async createRole(req, res) {
    const role = await roleService.createRole(req.body)
    new Success(res, '角色创建成功', role).send()
  }

  async findAllRoles(req, res) {
    const roles = await roleService.findAllRoles()
    new Success(res, '查询所有角色成功', roles).send()
  }

  // async getUsers(req, res) {}
}

module.exports = new RoleController()
