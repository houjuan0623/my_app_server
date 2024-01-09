const { RoleModel } = require('../models/index')

class RoleService {
  async createRole(roleData) {
    // 这里可以添加数据验证、业务逻辑等
    const roleModel = await RoleModel.getInstance()
    await roleModel.createRole(roleData)
  }

  async findAllRoles() {
    const roleModel = await RoleModel.getInstance()
    return await roleModel.findAllRoles()
  }
  // 这里可以添加更多用户相关的服务方法，如 getUser, updateUser 等
}

module.exports = new RoleService()
