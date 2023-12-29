const mongoose = require('mongoose')

const BaseModel = require('./Base')

const policySchema = new mongoose.Schema(
  {
    role: { type: String, required: true },
    resource: { type: String, required: true },
    action: { type: String, required: true },
    effect: { type: String, default: 'allow' }, // 通常是 'allow' 或 'deny'
  },
  { collection: 'policies' },
)

class PolicyModel extends BaseModel {
  constructor(name, schema) {
    super(name, schema)
  }
}

const policyModel = new PolicyModel('policies', policySchema)

module.exports = async () => {
  await policyModel.init()
  return policyModel
}
