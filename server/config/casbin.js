const path = require('path')
const { newEnforcer } = require('casbin')
// 默认使用casbin_rule记录policies
const { MongooseAdapter } = require('casbin-mongoose-adapter')

const config = require('./config')

let enforcer = null

async function initEnforcer() {
  const model = path.resolve(__dirname, '../../rbac_model.conf')
  const adapter = await MongooseAdapter.newAdapter(config.MONGO_URL)
  enforcer = await newEnforcer(model, adapter)
  return enforcer
}

async function reloadPolicy() {
  if (enforcer) {
    await enforcer.loadPolicy()
  } else {
    // 如果Enforcer还没有初始化，则初始化它
    await initEnforcer()
  }
}
module.exports.enforcer = enforcer
module.exports.reloadPolicy = reloadPolicy
