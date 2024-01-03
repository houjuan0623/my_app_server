const config = require('./config/config')
const app = require('./config/express')

require('./config/mongoose')
const { reloadPolicy } = require('./config/casbin')

// 异步初始化函数
async function init() {
  // 异步初始化Enforcer
  await reloadPolicy()

  // 一旦异步初始化完成，启动服务器
  app.listen(config.PORT, () => {
    console.info(`服务器启动成功，监听的端口为：${config.PORT}`)
  })
}

// 如果当前模块是通过 Node.js 直接运行的入口点（例如，通过 node app.js 命令启动），则 module.parent 将为 null。
if (!module.parent) {
  init().catch((err) => {
    console.error('启动时遇到错误:', err)
    process.exit(1)
  })
}

module.exports = app
