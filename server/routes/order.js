const EXPRESS = require('express')
const ROUTER = EXPRESS.Router()
const PATH = require('path')

const { auth, cors, writerayAuth, writerayMicroServiceAuth } = require('../services/users/auth')

const { logger } = require('../services/logs/logger')

const { getOrders } = require('../services/orders/order')

const ORDERS_SERVICE = require('../services/orders/order')

/* GET home page. */
ROUTER.get('/', logger, auth, function (req, res, next) {
  res.json({ title: 'Orders' })
})

ROUTER.get('/get_disciplines', logger, cors, async (req, res) => {
  await ORDERS_SERVICE.getRequest('orders/v1/disciplines')
    .then(response => {
      res.status(200).json(response)
    })
    .catch(error => {
      res.status(500).send(error)
    })
})

ROUTER.get('/get_assignment_types', logger, cors, async (req, res) => {
  await ORDERS_SERVICE.getRequest('orders/v1/assignment_types')
    .then(response => {
      res.status(200).json(response)
    })
    .catch(error => {
      res.status(500).send(error)
    })
})

ROUTER.post('/get_order_service_types', logger, auth, async (req, res) => {
  await ORDERS_SERVICE.postRequest('orders/v1/order_service_types', { extra: req.body.extra })
    .then(response => {
      res.status(200).json(response)
    })
    .catch(error => {
      res.status(500).send(error)
    })
})

ROUTER.get('/get_citation_styles', logger, auth, async (req, res) => {
  await ORDERS_SERVICE.getRequest('orders/v1/citation_styles')
    .then(response => {
      res.status(200).json(response)
    })
    .catch(error => {
      res.status(500).send(error)
    })
})

ROUTER.get('/get_order_formats', logger, auth, async (req, res) => {
  await ORDERS_SERVICE.getRequest('orders/v1/order_formats')
    .then(response => {
      res.status(200).json(response)
    })
    .catch(error => {
      res.status(500).send(error)
    })
})

ROUTER.get('/get_academic_certifications', logger, cors, async (req, res) => {
  await ORDERS_SERVICE.getRequest('orders/v1/academic_certifications')
    .then(response => {
      res.status(200).json(response)
    })
    .catch(error => {
      res.status(500).send(error)
    })
})

ROUTER.get('/get_time', logger, cors, async (req, res) => {
  await ORDERS_SERVICE.getTime()
    .then(response => {
      res.status(200).json(response)
    })
    .catch(error => {
      res.status(500).send(error)
    })
})

ROUTER.post('/get_education_levels', logger, auth, async (req, res) => {
  await ORDERS_SERVICE.postRequest('orders/v1/education_levels',
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

ROUTER.post('/get_order_bids', logger, auth, async (req, res) => {
  await ORDERS_SERVICE.getOrderBids(req.body)
    .then(response => {
      res.status(200).json(response)
    })
    .catch(error => {
      res.status(500).send(error)
    })
})

ROUTER.post('/save_order_details', logger, auth, async (req, res) => {
  await ORDERS_SERVICE.postRequest('orders/v1/save_order_details', req.body)
    .then(response => {
      res.status(200).json(response)
      if (req.body.type === 'public') {
        ORDERS_SERVICE.sendWriterNotifications(response.response, response.orderId, 'public')
      }
    })
    .catch(error => {
      error.name = ''
      res.status(500).send(error)
    })
})

ROUTER.post('/save_order_payment_details', logger, auth, async (req, res) => {
  await ORDERS_SERVICE.postRequest('orders/v1/save_order_payment_details', req.body)
    .then(response => {
      res.status(200).json(response)
    })
    .catch(error => {
      error.name = ''
      res.status(500).send(error)
    })
})

ROUTER.post('/remove_file', logger, auth, async (req, res) => {
  await ORDERS_SERVICE.postRequest('orders/v1/remove_file', req.body)
    .then(response => {
      res.status(200).json(response)
    })
    .catch(error => {
      error.name = ''
      res.status(500).send(error)
    })
})

ROUTER.post('/update_order_status', logger, auth, async (req, res) => {
  await ORDERS_SERVICE.postRequest('orders/v1/update_order_status', req.body)
    .then(response => {
      res.status(200).json(response)
      if (req.body.type === 'private' && !response.writerAlreadyChosen) {
        ORDERS_SERVICE.sendWriterNotifications(response.statusUpdated, response.orderId, 'private')
      }
    })
    .catch(error => {
      error.name = ''
      res.status(500).send(error)
    })
})

ROUTER.post(
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

ROUTER.get('/get_order_status_types', logger, auth, async function (req, res, next) {
  await ORDERS_SERVICE.getRequest('orders/v1/get_order_status_types')
    .then(response => {
      res.status(200).json(response)
    })
    .catch(error => {
      res.status(500).send(error)
    })
})

ROUTER.post('/get_file', logger, auth, async function (req, res, next) {
  await ORDERS_SERVICE.getFile(req.body)
    .then(response => {
      res.status(200).json(response)
    })
    .catch(error => {
      res.status(500).send(error)
    })
})

ROUTER.post('/get_order_details', logger, auth, async function (req, res, next) {
  await ORDERS_SERVICE.getOrderDetails(req)
    .then(response => {
      res.status(200).json(response)
    })
    .catch(error => {
      res.status(500).send(error)
    })
})

ROUTER.post('/order_bids/ws/topic', logger, auth, async function (req, res, next) {
  await ORDERS_SERVICE.confirmOrderBelongs2Client(req)
    .then(response => {
      res.json({
        topic: response ? process.env.DEV_MQTT_WC_ORDER_BIDS_TOPIC.concat(req.body.orderId) : req.body.orderId
      })
    })
    .catch(error => {
      res.status(500).send(error)
    })
})

ROUTER.post('/request_revision', logger, auth, async function (req, res, next) {
  await ORDERS_SERVICE.requestOrderRevision(req)
    .then(response => {
      res.status(200).json(response)
    })
    .catch(error => {
      res.status(500).send(error)
    })
})

ROUTER.post('/confirm_order_completion', logger, auth, async function (req, res) {
  await ORDERS_SERVICE.confirmOrderCompletion(req)
    .then(response => {
      res.status(200).json(response)
    })
    .catch(error => {
      res.status(500).send(error)
    })
})

ROUTER.post('/email_notification', logger, writerayAuth, async function (req, res) {
  res.send()
  await ORDERS_SERVICE.emailNotification(req.body)
    .then(() => {})
    .catch(() => {})
})

ROUTER.post('/email_notification/personal_writer_registers', logger, writerayMicroServiceAuth, async function (req, res) {
  res.send()
  await ORDERS_SERVICE.personWriterRegistersEmailNotification(req.body)
    .then(() => {})
    .catch(() => {})
})

ROUTER.post('/rate_writer', logger, auth, async function (req, res) {
  await ORDERS_SERVICE.rateWriter(req.body)
    .then(response => {
      res.status(200).json(response)
    })
    .catch(error => {
      res.status(500).send(error)
    })
})

ROUTER.get('/get_personal_writers', logger, auth, async function (req, res) {
  await ORDERS_SERVICE.getPersonalWriters(req)
    .then(response => {
      res.status(200).json(response)
    })
    .catch(error => {
      res.status(500).send(error)
    })
})

ROUTER.post('/send_writer_invite', logger, auth, async function (req, res) {
  await ORDERS_SERVICE.sendWriterInvite(req)
    .then(async response => {
      res.status(200).json(response)
      await ORDERS_SERVICE.sendWriterClientInvitation(response, req)
    })
    .catch(error => {
      res.status(500).send(error)
    })
})

ROUTER.get('/notification/email/subsribe', logger, async function (req, res) {
  res.sendFile(PATH.join(__dirname.concat('../../views/email_subscription.html')))
})

ROUTER.get('/notification/email/unsubsribe', logger, async function (req, res) {
  res.sendFile(PATH.join(__dirname.concat('../../views/email_unsubscription.html')))
})

module.exports = ROUTER
