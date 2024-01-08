const mongoose = require('mongoose')

const BaseModel = require('./Base')

const schoolSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    classIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'classes',
      },
    ],
  },
  { collection: 'schools' },
)

class SchoolModel extends BaseModel {
  static name = 'schools'
  static schema = schoolSchema

  constructor() {
    super(SchoolModel.name, SchoolModel.schema)
  }

  async createSchool(schoolData) {
    const school = new this.model(schoolData)
    return school.save()
  }

  async insertSchool(schoolData) {
    const school = new this.model(schoolData)
    await school.save()
    return school._id.toString()
  }

  async findSchoolByName(schoolName) {
    return this.model.findOne({ name: schoolName })
  }

  // 查找所有学校
  async findAllSchools() {
    return await this.model.find({})
  }

  // 根据 _id 更新学校名称
  async updateSchoolNameById(schoolId, newName) {
    return this.model.findByIdAndUpdate(
      schoolId,
      { name: newName },
      { new: true }, // 返回更新后的文档
    )
  }
}

module.exports = SchoolModel
