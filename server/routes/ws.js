const EXPRESS = require('express')
const ROUTER = EXPRESS.Router()

const { auth, writerayAuth } = require('../services/users/auth')

const { logger } = require('../services/logs/logger')

const SOCKETS_SERVICE = require('../services/sockets/order')

/* GET home page. */
ROUTER.get('/', logger, auth, function (req, res, next) {
  res.json({ title: 'ws' })
})

ROUTER.get('/ws_wc_creds', logger, auth, function (req, res, next) {
  let creds
  if (process.env.NODE_ENV === 'production') {
    const rand = Math.random() * (9999 - 1000) + 1000
    const randNum = Math.floor(rand)
    const combinedRand = String(randNum).concat(String(Date.now()))
    const clientId = process.env.MQTT_WC_CLIENT_ID.concat(combinedRand)
    creds = {
      cid: clientId,
      user: process.env.MQTT_WC_USERNAME,
      pass: process.env.MQTT_WC_PASS,
      host: process.env.MQTT_HOST,
      port: process.env.MQTT_WS_PORT
    }
  } else {
    creds = {
      cid: process.env.DEV_MQTT_WC_CLIENT_ID.concat('-', String(Date.now())),
      user: process.env.DEV_MQTT_WC_USERNAME,
      pass: process.env.DEV_MQTT_WC_PASS
    }
  }
  res.json(creds)
})

ROUTER.post('/bid/new', logger, writerayAuth, function (req, res, next) {
  res.send()
  SOCKETS_SERVICE.getBids(req.body.orderId, false)
    .then(() => {})
    .catch(() => {})
})

module.exports = ROUTER
