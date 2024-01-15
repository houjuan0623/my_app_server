const permissionService = require('../services/PermissionService')
const { Success } = require('../utils/index')

class PermissionController {
  async createPermission(req, res) {
    const permission = await permissionService.createRole(req.body)
    new Success(res, '权限创建成功', permission).send()
  }

  // async findAllRoles(req, res) {
  //   const roles = await roleService.findAllRoles()
  //   new Success(res, '查询所有角色成功', roles).send()
  // }

  // async getUsers(req, res) {}
}

module.exports = new PermissionController()
