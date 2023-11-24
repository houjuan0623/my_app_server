const config = require('./config/config')
const app = require('./config/express')
require('./config/mongoose')

if (!module.parent) {
  app.listen(config.PORT, () => {
    console.info(`server started on port ${config.PORT}`)
  })
}

module.exports = app
