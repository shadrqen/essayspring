/* Route that handles requests related to payments */

/* Importing an instance of express */
const EXPRESS = require('express')
/* Creating an express ROUTER instance */
const ROUTER = EXPRESS.Router()

/* The service that handles authentication */
const { auth } = require('../services/auth')

/* The helpers that handles authentication */
const PAYMENTS_HELPER = require('../helpers/payments/payment')

/* GET home page. */
ROUTER.get('/', auth, function (req, res) {
  res.json({ title: 'Payments' })
})

/* Endpoint to save client payment information */
ROUTER.post('/mpesa/save_client_payment', auth, async function (req, res) {
  /* Call the function that does the saving of client order payment details on the payments helper */
  await PAYMENTS_HELPER.saveClientOrderPayment(req.body)
    .then(response => {
      res.status(200).json(response)
    })
    .catch(error => {
      res.status(500).send(error)
    })
})

/* Endpoint to update client order payment details */
ROUTER.post('/mpesa/update_client_order_payment', auth, async function (req, res) {
  await PAYMENTS_HELPER.updateClientOrderPayment(req.body)
    .then(response => {
      console.log('\n\n\n res: ', response, '\n\n\n')
      res.status(200).json(response)
    })
    .catch(error => {
      console.log('\n\n\n error: ', error, '\n\n\n')
      res.status(500).send(error)
    })
})

/* Endpoint to check the payment status of an order */
ROUTER.post('/mpesa/check_order_payment_status', auth, async function (req, res) {
  await PAYMENTS_HELPER.checkOrderPaymentStatus(req.body)
    .then(response => {
      res.status(200).json(response)
    })
    .catch(error => {
      res.status(500).send(error)
    })
})

/* Endpoint to check if an order has already been paid for or not */
ROUTER.post('/mpesa/check_if_order_is_already_paid', auth, async function (req, res) {
  await PAYMENTS_HELPER.checkIfOrderIsAlreadyPaid(req.body)
    .then(response => {
      res.status(200).json(response)
    })
    .catch(error => {
      res.status(500).send(error)
    })
})

/* Endpoint to check whether a transaction is currently ongoing or not */
ROUTER.post('/mpesa/check_if_transaction_is_ongoing', auth, async function (req, res) {
  await PAYMENTS_HELPER.checkOngoingTransaction(req.body)
    .then(response => {
      res.status(200).json(response)
    })
    .catch(error => {
      res.status(500).send(error)
    })
})

/* Endpoint to get the price ratio that helps in calculating the price of a paper */
ROUTER.post('/price_ratio', auth, async function (req, res) {
  await PAYMENTS_HELPER.getPriceRatios(req.body)
    .then(response => {
      res.status(200).json(response)
    })
    .catch(error => {
      res.status(500).send(error)
    })
})

/* Exporting the ROUTER */
module.exports = ROUTER
