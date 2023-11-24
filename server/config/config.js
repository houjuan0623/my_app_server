require('dotenv').config()

const config = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || '3000',
  MONGO_URL: process.env.MONGO_URL || 'mongodb://127.0.0.1:27017',
  MONGOOSE_DEBUG: process.env.NODE_ENV === 'development' ? true : false,
}

module.exports = config
