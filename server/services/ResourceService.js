const { ResourceModel } = require('../models/index')

class ResourceService {
  async createResource(resourceData) {
    const resourceModel = await ResourceModel.getInstance()
    const id = await resourceModel.createResource(resourceData)
    return { id }
  }
  // 查找所有资源
  async findAllResource() {
    const resourceModel = await ResourceModel.getInstance()
    const resource = await resourceModel.findAllResource()
    return { resource }
  }

  // 更新资源
  async updateResource(id, data) {
    const resourceModel = await ResourceModel.getInstance()
    const resource = await resourceModel.updateById(id, data)
    return { resource }
  }
}

module.exports = new ResourceService()
