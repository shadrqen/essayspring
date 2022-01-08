/* Endpoint that handles requests related exclusively to an order (and not logs, payments or users) */

/* Importing an instance of express */
const express = require('express')

/* Creating an instance of express router */
const router = express.Router()

/* The service that handles authentication */
const { auth } = require('../services/auth')

/* The service that handles logs */
const { logger } = require('../services/logger')

/*
* This helper serves general requests to tables such as countries, disciplines e.t.c
* General here means tables can be applicable to one or all of the admin, client or writer tables
*/
const ordersHelper = require('../helpers/orders/order')

/* GET home page. */
router.get('/', function (req, res) {
  res.json({ title: 'Orders' })
})

/* The routes below are more self-explanatory - They basically query specific tables */
router.get('/countries', auth, async function (req, res) {
  await ordersHelper.getAllCountries()
    .then(response => {
      res.status(200).json(response)
    })
    .catch(error => {
      res.status(500).send(error)
    })
})

/* Endpoint to returns disciplines */
router.get('/disciplines', auth, async function (req, res) {
  await ordersHelper.getAllDisciplines()
    .then(response => {
      res.status(200).json(response)
    })
    .catch(error => {
      res.status(500).send(error)
    })
})

/* Endpoint to returns assignment types */
router.get('/assignment_types', auth, async function (req, res) {
  await ordersHelper.getAssignmentTypes()
    .then(response => {
      res.status(200).json(response)
    })
    .catch(error => {
      res.status(500).send(error)
    })
})

/* Endpoint to get education levels */
router.post('/education_levels', auth, async function (req, res) {
  await ordersHelper.getEducationLevels(req.body)
    .then(response => {
      res.status(200).json(response)
    })
    .catch(error => {
      res.status(500).send(error)
    })
})

/* Endpoint to get time in 24 hours */
router.get('/time', auth, async function (req, res) {
  await ordersHelper.getAllTime()
    .then(response => {
      res.status(200).json(response)
    })
    .catch(error => {
      res.status(500).send(error)
    })
})

/* Endpoint to get order service types */
router.post('/order_service_types', auth, async function (req, res) {
  await ordersHelper.getSpecificOrderServiceTypes(req.body)
    .then(response => {
      res.status(200).json(response)
    })
    .catch(error => {
      res.status(500).send(error)
    })
})

/* Endpoint to get grammar questions */
router.get('/grammar_questions', auth, async function (req, res) {
  await ordersHelper.getSelectedGrammarQuestions()
    .then(response => {
      res.status(200).json(response)
    })
    .catch(error => {
      console.log('eror: ', error)
      res.status(500).send(error)
    })
})

/* Endpoint to get genders */
router.get('/genders', auth, async function (req, res) {
  await ordersHelper.getAllGenders()
    .then(response => {
      res.status(200).json(response)
    })
    .catch(error => {
      res.status(500).send(error)
    })
})

/* Endpoint to get citation styles */
router.get('/citation_styles', auth, async function (req, res) {
  await ordersHelper.getAllCitationStyles()
    .then(response => {
      res.status(200).json(response)
    })
    .catch(error => {
      res.status(500).send(error)
    })
})

/* Endpoint to get order formats */
router.get('/order_formats', auth, async function (req, res) {
  await ordersHelper.getAllOrderFormats()
    .then(response => {
      res.status(200).json(response)
    })
    .catch(error => {
      res.status(500).send(error)
    })
})

/* Endpoint to get academic certifications */
router.get('/academic_certifications', auth, async function (req, res) {
  await ordersHelper.getAllAcademicCertifications()
    .then(response => {
      res.status(200).json(response)
    })
    .catch(error => {
      res.status(500).send(error)
    })
})

/* Endpoint to save order details */
router.post('/save_order_details', auth, async function (req, res) {
  await ordersHelper.saveOrderDetails(req.body)
    .then(response => {
      res.status(200).json(response)
    })
    .catch(error => {
      res.status(500).send(error)
    })
})

/* Endpoint to get email addresses of writers */
router.get('/get_active_writers_emails', auth, async function (req, res) {
  await ordersHelper.getActiveWritersEmails()
    .then(response => {
      res.status(200).json(response)
    })
    .catch(error => {
      res.status(500).send(error)
    })
})

/* Endpoint to save order payment details */
router.post('/save_order_payment_details', auth, async function (req, res) {
  await ordersHelper.saveOrderPaymentDetails(req.body)
    .then(response => {
      res.status(200).json(response)
    })
    .catch(error => {
      res.status(500).send(error)
    })
})

/* Endpoint to remove attached files in an order */
router.post('/remove_file', auth, async function (req, res) {
  await ordersHelper.removeFile(req.body)
    .then(response => {
      res.status(200).json(response)
    })
    .catch(error => {
      res.status(500).send(error)
    })
})

/* Endpoint to get order bids */
router.post('/order_bids', auth, async function (req, res) {
  await ordersHelper.getOrderBids(req.body)
    .then(response => {
      res.status(200).json(response)
    })
    .catch(error => {
      console.log(error)
      res.status(500).send(error)
    })
})

/* Endpoint to get personal writers */
router.post('/get_personal_writers', auth, async function (req, res) {
  await ordersHelper.getPersonalWriters(req.body)
    .then(response => {
      res.status(200).json(response)
    })
    .catch(error => {
      console.log(error)
      res.status(500).send(error)
    })
})

/* Endpoint to get send writers invites */
router.post('/send_writer_invite', auth, async function (req, res) {
  await ordersHelper.sendWriterInvite(req.body)
    .then(response => {
      res.status(200).json(response)
    })
    .catch(error => {
      console.log(error)
      res.status(500).send(error)
    })
})

/* Endpoint to update the status of an order */
router.post('/update_order_status', auth, async function (req, res) {
  await ordersHelper.updateOrderStatus(req.body)
    .then(response => {
      res.status(200).json(response)
    })
    .catch(error => {
      res.status(500).send(error)
    })
})

/* Endpoint to get a client's orders */
router.post('/get_orders', logger, auth, async function (req, res) {
  await ordersHelper.getOrders(req.body)
    .then(response => {
      res.status(200).json(response)
    })
    .catch(error => {
      console.log(error)
      res.status(500).send(error)
    })
})

/* Endpoint to get a client's orders */
router.post('/rate_writer', logger, auth, async function (req, res) {
  await ordersHelper.rateWriter(req.body)
    .then(response => {
      res.status(200).json(response)
    })
    .catch(error => {
      console.log(error)
      res.status(500).send(error)
    })
})

/* Endpoint to get the order status types */
router.get('/get_order_status_types', auth, async function (req, res) {
  await ordersHelper.getOrderStatusTypes()
    .then(response => {
      res.status(200).json(response)
    })
    .catch(error => {
      res.status(500).send(error)
    })
})

/* Endpoint to get order details */
router.post('/get_order_details', auth, async function (req, res) {
  await ordersHelper.getOrderDetails(req.body)
    .then(response => {
      res.status(200).json(response)
    })
    .catch(error => {
      res.status(500).send(error)
    })
})

/* Endpoint to confirm the ownership of an order */
router.post('/confirm_order_ownership', auth, async function (req, res) {
  await ordersHelper.confirmOrderOwnership(req.body)
    .then(response => {
      res.status(200).json(response)
    })
    .catch(error => {
      res.status(500).send(error)
    })
})

/* Endpoint to create a revision request */
router.post('/revision_request', auth, async function (req, res) {
  await ordersHelper.revisionRequest(req.body)
    .then(response => {
      res.status(200).json(response)
    })
    .catch(error => {
      res.status(500).send(error)
    })
})

/* Endpoint to confirm the completion of an order */
router.post('/confirm_order_completion', auth, async function (req, res) {
  await ordersHelper.confirmOrderCompletion(req.body)
    .then(response => {
      res.status(200).json(response)
    })
    .catch(error => {
      res.status(500).send(error)
    })
})

module.exports = router
