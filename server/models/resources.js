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
  static name = 'resources'
  static schema = resourceSchema

  constructor() {
    super(ResourceModel.name, ResourceModel.schema)
  }

  // 添加资源
  async addResource(data) {
    const resource = new this.model(data)
    await resource.save()
    return resource._id.toString()
  }

  // 根据name查询资源
  async findByName(name) {
    return this.model.findOne({ name })
  }

  // 根据id查询资源
  async findById(id) {
    return this.model.findById(id)
  }

  // 更新资源（基于name）
  async updateByName(name, data) {
    return this.model.findOneAndUpdate({ name }, data, { new: true })
  }

  // 更新资源（基于id）
  async updateById(id, data) {
    return this.model.findByIdAndUpdate(id, data, { new: true })
  }

  // 删除资源（基于name）
  async deleteByName(name) {
    return this.model.findOneAndDelete({ name })
  }

  // 删除资源（基于id）
  async deleteById(id) {
    return this.model.findByIdAndDelete(id)
  }
}

module.exports = ResourceModel
