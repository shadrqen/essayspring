/* Endpoint that handles requests related exclusively to an order (and not logs, payments or users) */

/* Importing an instance of express */
const EXPRESS = require('express')

/* Creating an instance of express ROUTER */
const ROUTER = EXPRESS.Router()

/* The service that handles authentication */
const { auth } = require('../services/auth')

/* The service that handles logs */
const { logger } = require('../services/logger')

/*
* This helper serves general requests to tables such as countries, disciplines e.t.c
* General here means tables can be applicable to one or all of the admin, client or writer tables
*/
const ORDERS_HELPER = require('../helpers/orders/order')

/* GET home page. */
ROUTER.get('/', function (req, res) {
  res.json({ title: 'Orders' })
})

/* The routes below are more self-explanatory - They basically query specific tables */
ROUTER.get('/countries', auth, async function (req, res) {
  await ORDERS_HELPER.getAllCountries()
    .then(response => {
      res.status(200).json(response)
    })
    .catch(error => {
      res.status(500).send(error)
    })
})

/* Endpoint to returns disciplines */
ROUTER.get('/disciplines', auth, async function (req, res) {
  await ORDERS_HELPER.getAllDisciplines()
    .then(response => {
      res.status(200).json(response)
    })
    .catch(error => {
      res.status(500).send(error)
    })
})

/* Endpoint to returns assignment types */
ROUTER.get('/assignment_types', auth, async function (req, res) {
  await ORDERS_HELPER.getAssignmentTypes()
    .then(response => {
      res.status(200).json(response)
    })
    .catch(error => {
      res.status(500).send(error)
    })
})

/* Endpoint to get education levels */
ROUTER.post('/education_levels', auth, async function (req, res) {
  await ORDERS_HELPER.getEducationLevels(req.body)
    .then(response => {
      res.status(200).json(response)
    })
    .catch(error => {
      res.status(500).send(error)
    })
})

/* Endpoint to get time in 24 hours */
ROUTER.get('/time', auth, async function (req, res) {
  await ORDERS_HELPER.getAllTime()
    .then(response => {
      res.status(200).json(response)
    })
    .catch(error => {
      res.status(500).send(error)
    })
})

/* Endpoint to get order service types */
ROUTER.post('/order_service_types', auth, async function (req, res) {
  await ORDERS_HELPER.getSpecificOrderServiceTypes(req.body)
    .then(response => {
      res.status(200).json(response)
    })
    .catch(error => {
      res.status(500).send(error)
    })
})

/* Endpoint to get grammar questions */
ROUTER.get('/grammar_questions', auth, async function (req, res) {
  await ORDERS_HELPER.getSelectedGrammarQuestions()
    .then(response => {
      res.status(200).json(response)
    })
    .catch(error => {
      console.log('eror: ', error)
      res.status(500).send(error)
    })
})

/* Endpoint to get genders */
ROUTER.get('/genders', auth, async function (req, res) {
  await ORDERS_HELPER.getAllGenders()
    .then(response => {
      res.status(200).json(response)
    })
    .catch(error => {
      res.status(500).send(error)
    })
})

/* Endpoint to get citation styles */
ROUTER.get('/citation_styles', auth, async function (req, res) {
  await ORDERS_HELPER.getAllCitationStyles()
    .then(response => {
      res.status(200).json(response)
    })
    .catch(error => {
      res.status(500).send(error)
    })
})

/* Endpoint to get order formats */
ROUTER.get('/order_formats', auth, async function (req, res) {
  await ORDERS_HELPER.getAllOrderFormats()
    .then(response => {
      res.status(200).json(response)
    })
    .catch(error => {
      res.status(500).send(error)
    })
})

/* Endpoint to get academic certifications */
ROUTER.get('/academic_certifications', auth, async function (req, res) {
  await ORDERS_HELPER.getAllAcademicCertifications()
    .then(response => {
      res.status(200).json(response)
    })
    .catch(error => {
      res.status(500).send(error)
    })
})

/* Endpoint to save order details */
ROUTER.post('/save_order_details', auth, async function (req, res) {
  await ORDERS_HELPER.saveOrderDetails(req.body)
    .then(response => {
      res.status(200).json(response)
    })
    .catch(error => {
      res.status(500).send(error)
    })
})

/* Endpoint to get email addresses of writers */
ROUTER.get('/get_active_writers_emails', auth, async function (req, res) {
  await ORDERS_HELPER.getActiveWritersEmails()
    .then(response => {
      res.status(200).json(response)
    })
    .catch(error => {
      res.status(500).send(error)
    })
})

/* Endpoint to save order payment details */
ROUTER.post('/save_order_payment_details', auth, async function (req, res) {
  await ORDERS_HELPER.saveOrderPaymentDetails(req.body)
    .then(response => {
      res.status(200).json(response)
    })
    .catch(error => {
      res.status(500).send(error)
    })
})

/* Endpoint to remove attached files in an order */
ROUTER.post('/remove_file', auth, async function (req, res) {
  await ORDERS_HELPER.removeFile(req.body)
    .then(response => {
      res.status(200).json(response)
    })
    .catch(error => {
      res.status(500).send(error)
    })
})

/* Endpoint to get order bids */
ROUTER.post('/order_bids', auth, async function (req, res) {
  await ORDERS_HELPER.getOrderBids(req.body)
    .then(response => {
      res.status(200).json(response)
    })
    .catch(error => {
      console.log(error)
      res.status(500).send(error)
    })
})

/* Endpoint to get personal writers */
ROUTER.post('/get_personal_writers', auth, async function (req, res) {
  await ORDERS_HELPER.getPersonalWriters(req.body)
    .then(response => {
      res.status(200).json(response)
    })
    .catch(error => {
      console.log(error)
      res.status(500).send(error)
    })
})

/* Endpoint to get send writers invites */
ROUTER.post('/send_writer_invite', auth, async function (req, res) {
  await ORDERS_HELPER.sendWriterInvite(req.body)
    .then(response => {
      res.status(200).json(response)
    })
    .catch(error => {
      console.log(error)
      res.status(500).send(error)
    })
})

/* Endpoint to update the status of an order */
ROUTER.post('/update_order_status', auth, async function (req, res) {
  await ORDERS_HELPER.updateOrderStatus(req.body)
    .then(response => {
      res.status(200).json(response)
    })
    .catch(error => {
      res.status(500).send(error)
    })
})

/* Endpoint to get a client's orders */
ROUTER.post('/get_orders', logger, auth, async function (req, res) {
  await ORDERS_HELPER.getOrders(req.body)
    .then(response => {
      res.status(200).json(response)
    })
    .catch(error => {
      console.log(error)
      res.status(500).send(error)
    })
})

/* Endpoint to get a client's orders */
ROUTER.post('/rate_writer', logger, auth, async function (req, res) {
  await ORDERS_HELPER.rateWriter(req.body)
    .then(response => {
      res.status(200).json(response)
    })
    .catch(error => {
      console.log(error)
      res.status(500).send(error)
    })
})

/* Endpoint to get the order status types */
ROUTER.get('/get_order_status_types', auth, async function (req, res) {
  await ORDERS_HELPER.getOrderStatusTypes()
    .then(response => {
      res.status(200).json(response)
    })
    .catch(error => {
      res.status(500).send(error)
    })
})

/* Endpoint to get order details */
ROUTER.post('/get_order_details', auth, async function (req, res) {
  await ORDERS_HELPER.getOrderDetails(req.body)
    .then(response => {
      res.status(200).json(response)
    })
    .catch(error => {
      res.status(500).send(error)
    })
})

/* Endpoint to confirm the ownership of an order */
ROUTER.post('/confirm_order_ownership', auth, async function (req, res) {
  await ORDERS_HELPER.confirmOrderOwnership(req.body)
    .then(response => {
      res.status(200).json(response)
    })
    .catch(error => {
      res.status(500).send(error)
    })
})

/* Endpoint to create a revision request */
ROUTER.post('/revision_request', auth, async function (req, res) {
  await ORDERS_HELPER.revisionRequest(req.body)
    .then(response => {
      res.status(200).json(response)
    })
    .catch(error => {
      res.status(500).send(error)
    })
})

/* Endpoint to confirm the completion of an order */
ROUTER.post('/confirm_order_completion', auth, async function (req, res) {
  await ORDERS_HELPER.confirmOrderCompletion(req.body)
    .then(response => {
      res.status(200).json(response)
    })
    .catch(error => {
      res.status(500).send(error)
    })
})

module.exports = ROUTER
