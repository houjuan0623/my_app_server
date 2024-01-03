const { reloadPolicy, enforcer } = require('../config/casbin')

// 初始化权限的时候casbin-mongoose-adapter已经创建了casbin_rule collection，如果程序执行到这里不存在casbin_rule不存在的情况

class Casbin_Rule {
  // 静态属性来存储类的单一实例
  static instance = null

  constructor() {
    if (Casbin_Rule.instance) {
      return Casbin_Rule.instance
    }
    Casbin_Rule.instance = this
  }
  // 添加策略
  async addPolicy(sub, obj, act) {
    const added = await enforcer.addPolicy(sub, obj, act)
    if (added) {
      await reloadPolicy()
    }
    return added
  }

  // 移除策略
  async removePolicy(sub, obj, act) {
    const removed = await enforcer.removePolicy(sub, obj, act)
    if (removed) {
      await reloadPolicy()
    }
    return removed
  }

  // 检查策略是否存在
  async hasPolicy(sub, obj, act) {
    return enforcer.hasPolicy(sub, obj, act)
  }

  // 更新策略
  async updatePolicy(oldPolicy, newPolicy) {
    const updated = await enforcer.updatePolicy(oldPolicy, newPolicy)
    if (updated) {
      await reloadPolicy()
    }
    return updated
  }
}

const casbinRule = new Casbin_Rule()

module.exports = casbinRule
