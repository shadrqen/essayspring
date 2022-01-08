require('dotenv').config()

module.exports = {
  development: {
    username: process.env.DEV_DB_USER,
    password: process.env.DEV_DB_PASS,
    database: process.env.DEV_DB_NAME,
    host: process.env.DEV_DB_HOST,
    port: process.env.DEV_DB_PORT,
    dialect: process.env.DEV_DB_DIALECT,
    dialectOptions: {
      useUTC: false, // for reading from database
      timezone: '+03:00'
    },
    timezone: '+03:00'
  },
  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.TEST_DB__NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgresql'
  },
  production: {
    username: 'postgres',
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgresql'
  }
}
