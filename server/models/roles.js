const mongooseManager = require('../config/mongoose')
const mongoose = require('mongoose')

const roleSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  permissions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Permission' }],
})
const Roles = mongooseManager.checkAndCreateCollection('Roles', roleSchema)

module.exports = Roles
