/* Endpoint that handles requests to the root application router */

/* Importing an instance of express */
const express = require('express')

/* Creating an express router instance */
const router = express.Router()

/* The service that handles authentication */
// const { auth } = require('../services/auth')

/* Endpoint that that provides a check of whether the database microservice is up or not */
router.get('/check', function (req, res) {
  res.status(200).send('database microservice connected successfully')
})

module.exports = router
