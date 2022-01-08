'use strict'

require('dotenv').config()

const { Sequelize } = require('sequelize')

const sequelize = new Sequelize(process.env.DEV_DB_NAME, process.env.DEV_DB_USER, process.env.DEV_DB_PASS, {
  host: process.env.DEV_DB_HOST,
  port: process.env.DEV_DB_PORT,
  dialect: process.env.DEV_DB_DIALECT,
  databaseVersion: '9.6.6'
})

module.exports = async () => {
  try {
    await sequelize.authenticate()
    await sequelize.close()
    return 'database connected successfully'
  } catch (error) {
    await sequelize.close()
    return 'Unable to connect to the database'
  }
}
