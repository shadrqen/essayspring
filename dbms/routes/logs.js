/* Endpoint that handles logs requests */

/* Importing an instance of express */
const EXPRESS = require('express')

/* Creating an express ROUTER instance */
const ROUTER = EXPRESS.Router()

/* Importing the service that handles matters authentication */
const { auth } = require('../services/auth')

/* Importing the helper that saves logs */
const { saveLog } = require('../helpers/logs/logs')

/* Endpoint that saves logs */
ROUTER.post('/save_log', auth, async function (req, res) {
  await saveLog(req.body)
    .then(response => {
      res.status(200).json(response)
    })
    .catch(error => {
      res.status(500).send(error)
    })
})

module.exports = ROUTER
