const mongoose = require('mongoose')

const BaseModel = require('./Base')

const resourceSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    type: { type: String, required: true }, // 例如 'ui', 'button', 'data', 等
    description: String,
  },
  { collection: 'resources' },
)

class ResourceModel extends BaseModel {
  constructor(name, schema) {
    super(name, schema)
  }
}

const resourceModel = new ResourceModel('resources', resourceSchema)

module.exports = async () => {
  await resourceModel.init()
  return resourceModel
}
