const mongoose = require('mongoose')

const BaseModel = require('./Base')

const roleSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    inherits: [{ type: String }], // 存储继承的角色名
  },
  { collection: 'roles' },
)

class RoleModel extends BaseModel {
  constructor(name, schema) {
    super(name, schema)
  }
}

const roleModel = new RoleModel('roles', roleSchema)

module.exports = async () => {
  await roleModel.init()
  return roleModel
}
