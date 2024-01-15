const { casbin_rule } = require('../models/index')

class PermissionService {
  async createRole(permissionData) {
    await casbin_rule.addPolicy(
      permissionData.sub,
      permissionData.obj,
      permissionData.act,
    )
  }

  // async findAllRoles() {
  //   const roleModel = await RoleModel.getInstance()
  //   return await roleModel.findAllRoles()
  // }
  // 这里可以添加更多用户相关的服务方法，如 getUser, updateUser 等
}

module.exports = new PermissionService()
