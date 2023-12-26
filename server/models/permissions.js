const mongooseManager = require('../config/mongoose')
const mongoose = require('mongoose')

const permissionSchema = new mongoose.Schema({
  resource: { type: String, required: true },
  action: { type: String, required: true },
})

const Permissions = mongooseManager.checkAndCreateCollection(
  'Permissions',
  permissionSchema,
)

module.exports = Permissions
