const { Sequelize } = require('sequelize');
const env = process.env.NODE_ENV || 'development'
const config = require('../../../config/config')[env]

const URI = `postgres://${config.username}:${config.password}@${config.host}:${config.port}/${config.database}`

const db = new Sequelize(URI, { 
  logging: env == 'development' ? true : false,
  pool: {
    "acquire": 240000,
    "max":30,
    "idle":20000
  }})

async function testConnection() {
  try {
    await db.authenticate();
    console.log(`[DB] PostgreSQL - Conexión exitosa. ${config.host}`)
  } catch (error) {
    console.error('[DB] Unable to connect to the database:', error)
  }
}
testConnection()

module.exports = db