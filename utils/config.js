require('dotenv').config()

let PORT = process.env.PORT
let MONGO_URL = process.env.MONGODB_URI

module.exports = {
  MONGO_URL,
  PORT
}