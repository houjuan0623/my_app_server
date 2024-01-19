const resourceService = require('../services/ResourceService')
const { Success } = require('../utils/index')

class ResourceController {
  async createResource(req, res) {
    console.log('req.body is: ', req.body)
    const resource = await resourceService.createResource(req.body)
    new Success(res, '权限资源创建成功', resource).send()
  }

  async findAllResource(req, res) {
    const resource = await resourceService.findAllResource()
    new Success(res, '查询所有权限资源成功', resource).send()
  }

  async updateResource(req, res) {
    const { _id, name, type, action } = req.body
    const resource = await resourceService.updateResource(_id, {
      name,
      type,
      action,
    })
    new Success(res, '查询所有权限资源成功', resource).send()
  }
}

module.exports = new ResourceController()
