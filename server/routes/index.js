/* Endpoint that handles requests to the root application router */

/* Importing an instance of express */
const EXPRESS = require('express')

/* Creating an instance of the express router */
const ROUTER = EXPRESS.Router()

/* Importing the auth function that handles matters authentication */
const { auth } = require('../services/users/auth')

/* Importing the logging service that handles logging requests */
const { logger } = require('../services/logs/logger')

/* Importing the function that handles get requests to the database */
const { getDBRequest } = require('../services/database/connect')

/* Making a get request to the database microservice to check whether it is up or not */
getDBRequest('v1/check') //  .get('https://elitesay-web-db-service.azurewebsites.net/check')
  .then(() => {
    console.log('Database microservice connected successfully')
  })
  .catch((e) => {
    console.error('Failed to connect to the database microservice:', e)
  })

/* GET home page. */
ROUTER.get('/', logger, auth, function (req, res, next) {
  res.json({ title: 'Index' })
})

module.exports = ROUTER
