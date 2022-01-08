require('dotenv').config()

const { Sequelize } = require('sequelize')

// Option 2: Passing parameters separately (other dialects)
const sequelize = new Sequelize(process.env.DEV_DB_NAME, process.env.DEV_DB_USER, process.env.DEV_DB_PASS, {
  host: process.env.DEV_DB_HOST, // process.env.DEV_DB_HOST
  port: process.env.DEV_DB_PORT,
  dialect: process.env.DEV_DB_DIALECT,
  databaseVersion: '9.6.6',
  dialectOptions: {
    useUTC: false, // for reading from database
    timezone: '+03:00'
  },
  timezone: '+03:00'
})

/* Testing the connection */
try {
  sequelize.authenticate()
    .then(response => {
      console.log('Connection has been established successfully. ', response)
      /* Importing models */
      const models = require('../models')

      const schemas = ['admin', 'chats', 'client', 'general', 'logs', 'orders', 'payments', 'public', 'writer']

      /* Creating the schemas */
      schemas.forEach(schema => {
        models.sequelize.createSchema(schema, { ifNotExists: true })
          .then(response => {
            console.log(schema, ' schema created successfully!')
          })
          .catch(error => {
            console.log('Error in creating the ', schema, 'schema. (', error, ')')
          })
      })
    })
    .catch(error => {
      console.error('Unable to connect to the database:', error)
    })
} catch (error) {
  console.error('Unable to connect to the database:', error)
}

/* Closing the connection */
sequelize.close()
  .then(response => {
    console.log('Connection closed successfully. ', response)
  })
  .catch(error => {
    console.log('Error closing the connection. ', error)
  })
