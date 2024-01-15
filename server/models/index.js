const UserModel = require('./users')
const RoleModel = require('./roles')
const ResourceModel = require('./resources')
const SchoolModel = require('./school')
const casbin_rule = require('./casbin_rule')

const models = {
  UserModel,
  RoleModel,
  ResourceModel,
  SchoolModel,
  casbin_rule,
}

module.exports = models
