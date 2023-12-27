const dotenv = require('dotenv')
const path = require('path')

if (process.env.NODE_ENV === 'production') {
  dotenv.config({ path: '../../.production.env' })
} else {
  dotenv.config({ path: path.resolve(__dirname, '../../.development.env') })
}

const config = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT || '3000',
  MONGO_URL: process.env.MONGO_URL || 'mongodb://127.0.0.1:27017',
  MONGOOSE_DEBUG: process.env.NODE_ENV === 'development' ? true : false,
  JWT_SECRET: process.env.JWT_SECRET || 'JWT_SECRET..',
}

module.exports = config
