/* Route that handles requests related to payments */

/* Importing an instance of express */
const express = require('express')
/* Creating an express router instance */
const router = express.Router()

/* The service that handles authentication */
const { auth } = require('../services/auth')

/* The helpers that handles authentication */
const paymentsHelper = require('../helpers/payments/payment')

/* GET home page. */
router.get('/', auth, function (req, res) {
  res.json({ title: 'Payments' })
})

/* Endpoint to save client payment information */
router.post('/mpesa/save_client_payment', auth, async function (req, res) {
  /* Call the function that does the saving of client order payment details on the payments helper */
  await paymentsHelper.saveClientOrderPayment(req.body)
    .then(response => {
      res.status(200).json(response)
    })
    .catch(error => {
      res.status(500).send(error)
    })
})

/* Endpoint to update client order payment details */
router.post('/mpesa/update_client_order_payment', auth, async function (req, res) {
  await paymentsHelper.updateClientOrderPayment(req.body)
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
router.post('/mpesa/check_order_payment_status', auth, async function (req, res) {
  await paymentsHelper.checkOrderPaymentStatus(req.body)
    .then(response => {
      res.status(200).json(response)
    })
    .catch(error => {
      res.status(500).send(error)
    })
})

/* Endpoint to check if an order has already been paid for or not */
router.post('/mpesa/check_if_order_is_already_paid', auth, async function (req, res) {
  await paymentsHelper.checkIfOrderIsAlreadyPaid(req.body)
    .then(response => {
      res.status(200).json(response)
    })
    .catch(error => {
      res.status(500).send(error)
    })
})

/* Endpoint to check whether a transaction is currently ongoing or not */
router.post('/mpesa/check_if_transaction_is_ongoing', auth, async function (req, res) {
  await paymentsHelper.checkOngoingTransaction(req.body)
    .then(response => {
      res.status(200).json(response)
    })
    .catch(error => {
      res.status(500).send(error)
    })
})

/* Endpoint to get the price ratio that helps in calculating the price of a paper */
router.post('/price_ratio', auth, async function (req, res) {
  await paymentsHelper.getPriceRatios(req.body)
    .then(response => {
      res.status(200).json(response)
    })
    .catch(error => {
      res.status(500).send(error)
    })
})

/* Exporting the router */
module.exports = router
