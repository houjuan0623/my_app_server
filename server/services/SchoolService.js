const { SchoolModel } = require('../models/index')

class SchoolService {
  async createSchool(schoolData) {
    const schoolModel = await SchoolModel.getInstance()
    await schoolModel.insertSchool(schoolData)
  }
  async findAllSchools() {
    const schoolModel = await SchoolModel.getInstance()
    return await schoolModel.findAllSchools()
  }
}

module.exports = new SchoolService()
