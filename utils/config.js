require('dotenv').config()

let PORT = process.env.PORT

const MONGO_URL = process.env.NODE_ENV === 'test'
  ? process.env.TEST_MONGODB_URI
  : process.env.MONGODB_URI

module.exports = {
  MONGO_URL,
  PORT
}