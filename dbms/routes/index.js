/* Endpoint that handles requests to the root application ROUTER */

/* Importing an instance of express */
const EXPRESS = require('express')

/* Creating an express ROUTER instance */
const ROUTER = EXPRESS.Router()

/* The service that handles authentication */
// const { auth } = require('../services/auth')

/* Endpoint that that provides a check of whether the database microservice is up or not */
ROUTER.get('/check', function (req, res) {
  res.status(200).send('database microservice connected successfully')
})

module.exports = ROUTER
