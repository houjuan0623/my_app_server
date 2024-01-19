const mongoose = require('mongoose')

const BaseModel = require('./Base')

const resourceSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    parent_id: { type: String, required: true },
    type: { type: String, required: true }, // 例如 'ui', 'button', 'data', 等
    action: { type: String, required: true },
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
  async createResource(data) {
    const resource = new this.model(data)
    await resource.save()
    return resource._id.toString()
  }

  // 查找所有资源
  async findAllResource() {
    return this.model.find({})
  }

  // 根据name查询资源
  async findByName(name) {
    return this.model.findOne({ name })
  }

  // 根据id查询资源
  async findById(id) {
    return this.model.findById(id)
  }

  // 检查相同资源是否已存在
  async findResourceByNameTypeAction(name, type, action, parent_id) {
    return this.model.findOne({ name, type, action, parent_id })
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
