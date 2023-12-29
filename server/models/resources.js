const mongooseManager = require('../config/mongoose')
const mongoose = require('mongoose')

const resourceSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    type: { type: String, required: true }, // 例如 'ui', 'button', 'data', 等
    description: String,
  },
  { collection: 'resources' },
)
const Resources = mongooseManager.checkAndCreateCollection(
  'resources',
  resourceSchema,
)

module.exports = Resources
