const mongoose = require('mongoose')

const BaseModel = require('./Base')

const roleSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
  },
  { collection: 'roles' },
)

class RoleModel extends BaseModel {
  static name = 'roles'
  static schema = roleSchema

  constructor() {
    super(RoleModel.name, RoleModel.schema)
  }

  async createRole(data) {
    const role = new this.model(data)
    return await role.save()
  }

  async findRoleByName(name) {
    return this.model.findOne({ name })
  }

  async findRoleById(id) {
    return this.model.findById(id)
  }

  async updateRoleByName(name, updateData) {
    return this.model.findOneAndUpdate({ name }, updateData, { new: true })
  }

  async updateRoleById(id, updateData) {
    return this.model.findByIdAndUpdate(id, updateData, { new: true })
  }

  async deleteRoleByName(name) {
    return this.model.findOneAndDelete({ name })
  }

  async deleteRoleById(id) {
    return this.model.findByIdAndDelete(id)
  }

  // 查看所有的role
  async findAllRoles() {
    return await this.model.find({})
  }
}

module.exports = RoleModel
