const swaggerJSDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')
const logger = require('morgan')
const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const compress = require('compression')
const methodOverride = require('method-override')
const helmet = require('helmet')
const passport = require('passport')

const config = require('./config')
const swaggerDefinition = require('./swagger')
const router = require('../routes/index')
require('./passport')
const helper = require('../handlers/helpers')

var app = express()

if (config.NODE_ENV === 'development') {
  app.use(logger('dev'))
}

if (config.NODE_ENV !== 'production') {
  const options = {
    swaggerDefinition,
    apis: ['../routes/*.js'],
  }
  const swaggerSpec = swaggerJSDoc(options)
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
}

// 解析来自客户端的 JSON 请求体（request bodies），并把解析后的数据放到 req.body 中。这对于处理 JSON 类型的输入（常见于 REST API）非常有用。
app.use(bodyParser.json())
// 解析来自客户端的 URL 编码请求体（通常是表单数据），extended: true 表示使用库 qs 来解析数据，这个库允许更丰富的对象编码。
app.use(bodyParser.urlencoded({ extended: true }))
// 解析来自客户端的 Cookie 头，并把解析后的 Cookie 放到 req.cookies 中。这对于处理 Cookie 非常重要，尤其是在需要读取和设置 Cookie 时。
app.use(cookieParser())
// 启用 gzip 压缩，可以减少发送到客户端的响应数据大小，从而提高性能。
app.use(compress())
// 允许使用 HTTP 方法（如 PUT 或 DELETE）的地方，可以支持客户端不支持的请求类型。这对于支持旧版浏览器或特定 REST API 风格非常有用。
app.use(methodOverride())

// 设置多种 HTTP 头来帮助保护你的应用免受一些广为人知的 Web 漏洞的侵害。例如，它可以添加如 X-Frame-Options 和 X-XSS-Protection 之类的头来增强安全性。
app.use(helmet({ contentSecurityPolicy: false }))

app.use(passport.initialize())

app.use('/api', router)
// 在路由解析中出现的错误都汇集到这里处理
app.use(helper.error)

module.exports = app
