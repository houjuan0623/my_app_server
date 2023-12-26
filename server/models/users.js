const mongooseManager = require('../config/mongoose')
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, unique: true },
    profile: String,
    avatar: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    roles: [{ type: String, required: true }],
  },
  { collection: 'users' },
)

async function setupUsers() {
  const Users = await mongooseManager.checkAndCreateCollection(
    'users',
    userSchema,
  )
  return Users
}

module.exports = setupUsers()
