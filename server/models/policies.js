const mongooseManager = require('../config/mongoose')
const mongoose = require('mongoose')

const policySchema = new mongoose.Schema(
  {
    role: { type: String, required: true },
    resource: { type: String, required: true },
    action: { type: String, required: true },
    effect: { type: String, default: 'allow' }, // 通常是 'allow' 或 'deny'
  },
  { collection: 'policies' },
)

const Policies = mongooseManager.checkAndCreateCollection(
  'policies',
  policySchema,
)

module.exports = Policies
