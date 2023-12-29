const mongooseManager = require('../config/mongoose')
const mongoose = require('mongoose')

const roleSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    inherits: [{ type: String }], // 存储继承的角色名
  },
  { collection: 'roles' },
)
const Roles = mongooseManager.checkAndCreateCollection('Roles', roleSchema)

module.exports = Roles
