const EXPRESS = require('express')
const ROUTER = EXPRESS.Router()
const { auth } = require('../services/users/auth')
const PAYMENT_SERVICE = require('../services/payment/mpesa/payment')
const PRICE_SERVICE = require('../services/payment/price')
const { logger } = require('../services/logs/logger')
const PRETTY_JSON = require('prettyjson')

const { publishOrderPaymentStatus } = require('../services/sockets/order')

const OPTIONS = {
  noColor: true
}

/* GET home page. */
ROUTER.get('/', logger, auth, function (req, res, next) {
  res.json({ title: 'Payments' })
})

ROUTER.post('/mpesa/stk_push', logger, auth, async function (req, res, next) {
  await PAYMENT_SERVICE.stkPush(req.body)
    .then(response => {
      res.status(200).json(response)
    })
    .catch(error => {
      res.status(500).send(error)
    })
})

// B2C ResultURL - /api/v1/b2c/result
ROUTER.post('/mpesa/b2c/result', logger, function (req, res) {
  console.log('-----------B2C CALLBACK------------')
  console.log(PRETTY_JSON.render(req.body, OPTIONS))
  console.log('-----------------------')

  const message = {
    ResponseCode: '00000000',
    ResponseDesc: 'success'
  }

  res.json(message)
})

// B2C QueueTimeoutURL - /api/v1/b2c/timeout
ROUTER.post('/mpesa/b2c/timeout', function (req, res) {
  console.log('-----------B2C TIMEOUT------------')
  console.log(PRETTY_JSON.render(req.body, OPTIONS))
  console.log('-----------------------')

  const message = {
    ResponseCode: '00000000',
    ResponseDesc: 'success'
  }

  res.json(message)
})

// C2B ValidationURL - /api/v1/c2b/validation
ROUTER.post('/mpesa/c2b/validation', logger, function (req, res) {
  console.log('-----------C2B VALIDATION REQUEST-----------')
  console.log(PRETTY_JSON.render(req.body, OPTIONS))
  console.log('-----------------------')

  const message = {
    ResultCode: 0,
    ResultDesc: 'Success',
    ThirdPartyTransID: '1234567890'
  }

  res.json(message)
})

// C2B ConfirmationURL - /api/v1/c2b/confirmation
ROUTER.post('/mpesa/c2b/confirmation', logger, async function (req, res) {
  console.log('-----------C2B CONFIRMATION REQUEST------------')

  /*  ResultCode: 17
  * ResultDesc: 'Rule limited.'
  * Desc: Similar transaction is currently underway
  *
  * ResultCode: 1032
  *  ResultDesc: 'Request cancelled by user
  * */

  console.log(PRETTY_JSON.render(req.body, OPTIONS))

  await PAYMENT_SERVICE.updateClientOrderPayment(req.body.Body.stkCallback)
    .then(async response => {
      await publishOrderPaymentStatus(response.trId)
      console.log('Update payment response: ', response)
    })
    .catch(e => {
      console.log('Update payment error: ', e)
    })

  const message = {
    ResultCode: 0,
    ResultDesc: 'Success'
  }

  res.json(message)
})

// B2B ResultURL - /api/v1/b2b/result
ROUTER.post('/mpesa/c2b/check_payment_status', logger, auth, async function (req, res) {
  await PAYMENT_SERVICE.checkOrderPaymentStatus(req.body)
    .then(response => {
      res.status(200).json(response)
    })
    .catch(error => {
      res.status(500).send(error)
    })
})

// B2B ResultURL - /api/v1/b2b/result
ROUTER.post('/mpesa/b2b/result', logger, function (req, res) {
  console.log('-----------B2B CALLBACK------------')
  console.log(PRETTY_JSON.render(req.body, OPTIONS))
  console.log('-----------------------')

  const message = {
    ResponseCode: '00000000',
    ResponseDesc: 'success'
  }

  res.json(message)
})

// B2B QueueTimeoutURL - /api/v1/b2b/timeout
ROUTER.post('/mpesa/b2c/timeout', logger, function (req, res) {
  console.log('-----------B2C TIMEOUT------------')
  console.log(PRETTY_JSON.render(req.body, OPTIONS))
  console.log('-----------------------')

  const message = {
    ResponseCode: '00000000',
    ResponseDesc: 'success'
  }

  res.json(message)
})

ROUTER.post('/price/calculation', logger, auth, async function (req, res) {
  await PRICE_SERVICE.getPrice(req.body)
    .then(response => {
      res.status(200).json(response)
    })
    .catch(error => {
      res.status(500).send(error)
    })
})

module.exports = ROUTER
