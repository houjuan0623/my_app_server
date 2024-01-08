const schoolService = require('../services/SchoolService')
const { Success } = require('../utils/index')

class SchoolController {
  async createSchool(req, res) {
    const school = await schoolService.createSchool(req.body)
    new Success(res, '学校创建成功', school).send()
  }
  async findAllSchools(req, res) {
    const schools = await schoolService.findAllSchools()
    new Success(res, '查询所有学校成功', schools).send()
  }
}

module.exports = new SchoolController()
