const express = require('express')
const router = express.Router()
const path = require('path')

const { auth, cors, writerayAuth, writerayMicroServiceAuth } = require('../services/users/auth')

const { logger } = require('../services/logs/logger')

const { getOrders } = require('../services/orders/order')

const ordersService = require('../services/orders/order')

/* GET home page. */
router.get('/', logger, auth, function (req, res, next) {
  res.json({ title: 'Orders' })
})

router.get('/get_disciplines', logger, cors, async (req, res) => {
  await ordersService.getRequest('orders/v1/disciplines')
    .then(response => {
      res.status(200).json(response)
    })
    .catch(error => {
      res.status(500).send(error)
    })
})

router.get('/get_assignment_types', logger, cors, async (req, res) => {
  await ordersService.getRequest('orders/v1/assignment_types')
    .then(response => {
      res.status(200).json(response)
    })
    .catch(error => {
      res.status(500).send(error)
    })
})

router.post('/get_order_service_types', logger, auth, async (req, res) => {
  await ordersService.postRequest('orders/v1/order_service_types', { extra: req.body.extra })
    .then(response => {
      res.status(200).json(response)
    })
    .catch(error => {
      res.status(500).send(error)
    })
})

router.get('/get_citation_styles', logger, auth, async (req, res) => {
  await ordersService.getRequest('orders/v1/citation_styles')
    .then(response => {
      res.status(200).json(response)
    })
    .catch(error => {
      res.status(500).send(error)
    })
})

router.get('/get_order_formats', logger, auth, async (req, res) => {
  await ordersService.getRequest('orders/v1/order_formats')
    .then(response => {
      res.status(200).json(response)
    })
    .catch(error => {
      res.status(500).send(error)
    })
})

router.get('/get_academic_certifications', logger, cors, async (req, res) => {
  await ordersService.getRequest('orders/v1/academic_certifications')
    .then(response => {
      res.status(200).json(response)
    })
    .catch(error => {
      res.status(500).send(error)
    })
})

router.get('/get_time', logger, cors, async (req, res) => {
  await ordersService.getTime()
    .then(response => {
      res.status(200).json(response)
    })
    .catch(error => {
      res.status(500).send(error)
    })
})

router.post('/get_education_levels', logger, auth, async (req, res) => {
  await ordersService.postRequest('orders/v1/education_levels',
    {
      academicInclined: req.body.academicInclined,
      orderInclined: req.body.orderInclined
    })
    .then(response => {
      res.status(200).json(response)
    })
    .catch(error => {
      res.status(500).send(error)
    })
})

router.post('/get_order_bids', logger, auth, async (req, res) => {
  await ordersService.getOrderBids(req.body)
    .then(response => {
      res.status(200).json(response)
    })
    .catch(error => {
      res.status(500).send(error)
    })
})

router.post('/save_order_details', logger, auth, async (req, res) => {
  await ordersService.postRequest('orders/v1/save_order_details', req.body)
    .then(response => {
      res.status(200).json(response)
      if (req.body.type === 'public') {
        ordersService.sendWriterNotifications(response.response, response.orderId, 'public')
      }
    })
    .catch(error => {
      error.name = ''
      res.status(500).send(error)
    })
})

router.post('/save_order_payment_details', logger, auth, async (req, res) => {
  await ordersService.postRequest('orders/v1/save_order_payment_details', req.body)
    .then(response => {
      res.status(200).json(response)
    })
    .catch(error => {
      error.name = ''
      res.status(500).send(error)
    })
})

router.post('/remove_file', logger, auth, async (req, res) => {
  await ordersService.postRequest('orders/v1/remove_file', req.body)
    .then(response => {
      res.status(200).json(response)
    })
    .catch(error => {
      error.name = ''
      res.status(500).send(error)
    })
})

router.post('/update_order_status', logger, auth, async (req, res) => {
  await ordersService.postRequest('orders/v1/update_order_status', req.body)
    .then(response => {
      res.status(200).json(response)
      if (req.body.type === 'private' && !response.writerAlreadyChosen) {
        ordersService.sendWriterNotifications(response.statusUpdated, response.orderId, 'private')
      }
    })
    .catch(error => {
      error.name = ''
      res.status(500).send(error)
    })
})

router.post(
  '/get_orders',
  logger,
  auth,
  async function (req, res, next) {
    await getOrders(req)
      .then(response => {
        res.status(200).json(response)
      })
      .catch(error => {
        res.status(500).send(error)
      })
  })

router.get('/get_order_status_types', logger, auth, async function (req, res, next) {
  await ordersService.getRequest('orders/v1/get_order_status_types')
    .then(response => {
      res.status(200).json(response)
    })
    .catch(error => {
      res.status(500).send(error)
    })
})

router.post('/get_file', logger, auth, async function (req, res, next) {
  await ordersService.getFile(req.body)
    .then(response => {
      res.status(200).json(response)
    })
    .catch(error => {
      res.status(500).send(error)
    })
})

router.post('/get_order_details', logger, auth, async function (req, res, next) {
  await ordersService.getOrderDetails(req)
    .then(response => {
      res.status(200).json(response)
    })
    .catch(error => {
      res.status(500).send(error)
    })
})

router.post('/order_bids/ws/topic', logger, auth, async function (req, res, next) {
  await ordersService.confirmOrderBelongs2Client(req)
    .then(response => {
      res.json({
        topic: response ? process.env.DEV_MQTT_WC_ORDER_BIDS_TOPIC.concat(req.body.orderId) : req.body.orderId
      })
    })
    .catch(error => {
      res.status(500).send(error)
    })
})

router.post('/request_revision', logger, auth, async function (req, res, next) {
  await ordersService.requestOrderRevision(req)
    .then(response => {
      res.status(200).json(response)
    })
    .catch(error => {
      res.status(500).send(error)
    })
})

router.post('/confirm_order_completion', logger, auth, async function (req, res) {
  await ordersService.confirmOrderCompletion(req)
    .then(response => {
      res.status(200).json(response)
    })
    .catch(error => {
      res.status(500).send(error)
    })
})

router.post('/email_notification', logger, writerayAuth, async function (req, res) {
  res.send()
  await ordersService.emailNotification(req.body)
    .then(() => {})
    .catch(() => {})
})

router.post('/email_notification/personal_writer_registers', logger, writerayMicroServiceAuth, async function (req, res) {
  res.send()
  await ordersService.personWriterRegistersEmailNotification(req.body)
    .then(() => {})
    .catch(() => {})
})

router.post('/rate_writer', logger, auth, async function (req, res) {
  await ordersService.rateWriter(req.body)
    .then(response => {
      res.status(200).json(response)
    })
    .catch(error => {
      res.status(500).send(error)
    })
})

router.get('/get_personal_writers', logger, auth, async function (req, res) {
  await ordersService.getPersonalWriters(req)
    .then(response => {
      res.status(200).json(response)
    })
    .catch(error => {
      res.status(500).send(error)
    })
})

router.post('/send_writer_invite', logger, auth, async function (req, res) {
  await ordersService.sendWriterInvite(req)
    .then(async response => {
      res.status(200).json(response)
      await ordersService.sendWriterClientInvitation(response, req)
    })
    .catch(error => {
      res.status(500).send(error)
    })
})

router.get('/notification/email/subsribe', logger, async function (req, res) {
  res.sendFile(path.join(__dirname.concat('../../views/email_subscription.html')))
})

router.get('/notification/email/unsubsribe', logger, async function (req, res) {
  res.sendFile(path.join(__dirname.concat('../../views/email_unsubscription.html')))
})

module.exports = router
