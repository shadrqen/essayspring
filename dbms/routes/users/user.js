/* Endpoint that handles requests related specifically to a user */

/* Importing an instance of express */
const EXPRESS = require('express')

/* Creating an express ROUTER instance */
const ROUTER = EXPRESS.Router()

/* Importing the service that does logging of requests */
const { logger } = require('../../services/logger')

/* Contains queries for tables that are associated with the user (such as admin, client and writer tables) */
const USER_HELPER = require('../../helpers/users/user')

/* Importing the service that handles authentication */
const { auth } = require('../../services/auth')

/* GET home page. */
ROUTER.get('/', auth, function (req, res) {
  res.json({ title: 'Users' })
})

/* Endpoint that gets a user by email */
ROUTER.post('/user_by_email', auth, async function (req, res) {
  await USER_HELPER.getUserByMail(req.body)
    .then(response => {
      res.status(200).json(response)
    })
    .catch(error => {
      res.status(500).send(error)
    })
})

/* Endpoint that gets a detailed user by email - Includes objects or relationships such as Gender, Country etc */
ROUTER.post('/web_user_by_email', logger, auth, async function (req, res) {
  await USER_HELPER.getWebUserByMail(req.body)
    .then(response => {
      res.status(200).json(response)
    })
    .catch(error => {
      res.status(500).send(error)
    })
})

/* Endpoint that gets a client's email by personal writer email */
ROUTER.post('/client_email_by_writer_email', logger, auth, async function (req, res) {
  await USER_HELPER.getClientEmailByWriterEmail(req.body)
    .then(response => {
      res.status(200).json(response)
    })
    .catch(error => {
      res.status(500).send(error)
    })
})

/* Endpoint that adds or saves a client */
ROUTER.post('/add_client', auth, async function (req, res) {
  await USER_HELPER.addClientDetails(req.body)
    .then(response => {
      res.status(200).json(response)
    })
    .catch(error => {
      res.status(500).send(error)
    })
})

/* Endpoint that checks whether the writer application process is open or not */
ROUTER.post('/check_writer_registration_status', auth, async function (req, res) {
  await USER_HELPER.checkWriterRegistrationStatus(req)
    .then(response => {
      res.status(200).json(response)
    })
    .catch(error => {
      res.status(500).send(error)
    })
})

/* Endpoint that submits a writer's email address */
ROUTER.post('/submit_writer_email', auth, async function (req, res) {
  await USER_HELPER.submitWriterEmail(req)
    .then(response => {
      res.status(200).json(response)
    })
    .catch(error => {
      res.status(500).send(error)
    })
})

/* Endpoint to confirm a writer's email address */
ROUTER.post('/confirm_writer_email', auth, async function (req, res) {
  await USER_HELPER.confirmWriterEmail(req.body)
    .then(response => {
      res.status(200).json(response)
    })
    .catch(error => {
      res.status(500).send(error)
    })
})

/* Endpoint that creates a writers password */
ROUTER.post('/create_writer_password', auth, async function (req, res) {
  await USER_HELPER.createWriterPassword(req.body)
    .then(response => {
      res.status(200).json(response)
    })
    .catch(error => {
      res.status(500).send(error)
    })
})

ROUTER.post('/save_writer_profile', auth, async function (req, res) {
  await USER_HELPER.saveWriterProfile(req.body)
    .then(response => {
      res.status(200).json(response)
    })
    .catch(error => {
      res.status(500).send(error)
    })
})

ROUTER.post('/create_client_writer_connection', auth, async function (req, res) {
  await USER_HELPER.createClientWriterConnection(req.body)
    .then(response => {
      res.status(200).json(response)
    })
    .catch(error => {
      res.status(500).send(error)
    })
})

ROUTER.post('/get_client_writers', auth, async function (req, res) {
  await USER_HELPER.getPersonalWriters(req.body)
    .then(response => {
      res.status(200).json(response)
    })
    .catch(error => {
      res.status(500).send(error)
    })
})

ROUTER.post('/get_selected_personal_writer', auth, async function (req, res) {
  await USER_HELPER.getSelectedPersonalWriter(req.body)
    .then(response => {
      res.status(200).json(response)
    })
    .catch(error => {
      console.log(error)
      res.status(500).send(error)
    })
})

ROUTER.post('/approve_personal_writer', auth, async function (req, res) {
  await USER_HELPER.approvePersonalWriter(req.body)
    .then(response => {
      res.status(200).json(response)
    })
    .catch(error => {
      console.log(error)
      res.status(500).send(error)
    })
})

ROUTER.post('/submit_grammar_test', auth, async function (req, res) {
  await USER_HELPER.submitGrammarTest(req.body)
    .then(response => {
      res.status(200).json(response)
    })
    .catch(error => {
      res.status(500).send(error)
    })
})

ROUTER.post('/submit_login_email', auth, async function (req, res) {
  await USER_HELPER.submitLoginEmail(req.body)
    .then(response => {
      res.status(200).json(response)
    })
    .catch(error => {
      res.status(500).send(error)
    })
})

ROUTER.post('/set_client_password', auth, async function (req, res) {
  await USER_HELPER.setClientPassword(req.body)
    .then(response => {
      res.status(200).json(response)
    })
    .catch(error => {
      res.status(500).send(error)
    })
})

ROUTER.post('/sample_essay_themes', auth, async function (req, res) {
  await USER_HELPER.getSampleEssayThemes(req.body)
    .then(response => {
      res.status(200).json(response)
    })
    .catch(error => {
      res.status(500).send(error)
    })
})

ROUTER.post('/writer_start_writing', auth, async function (req, res) {
  await USER_HELPER.writerStartWriting(req.body)
    .then(response => {
      res.status(200).json(response)
    })
    .catch(error => {
      res.status(500).send(error)
    })
})

ROUTER.post('/save_writer_sample_essay', auth, async function (req, res) {
  await USER_HELPER.saveWriterSampleEssay(req.body)
    .then(response => {
      res.status(200).json(response)
    })
    .catch(error => {
      res.status(500).send(error)
    })
})

ROUTER.post('/writer_application_status', auth, async function (req, res) {
  await USER_HELPER.writerApplicationStatus(req.body)
    .then(response => {
      res.status(200).json(response)
    })
    .catch(error => {
      res.status(500).send(error)
    })
})

ROUTER.post('/report_problem', auth, async function (req, res) {
  await USER_HELPER.reportProblem(req.body)
    .then(response => {
      res.status(200).json(response)
    })
    .catch(error => {
      res.status(500).send(error)
    })
})

ROUTER.post('/save_login', auth, async function (req, res) {
  await USER_HELPER.saveLogin(req.body)
    .then(response => {
      res.status(200).json(response)
    })
    .catch(error => {
      res.status(500).send(error)
    })
})

ROUTER.post('/get_mobile', auth, async function (req, res) {
  await USER_HELPER.getClientMobile(req.body)
    .then(response => {
      res.status(200).json(response)
    })
    .catch(error => {
      res.status(500).send(error)
    })
})

ROUTER.post('/get_client_email_by_order_id', auth, async function (req, res) {
  await USER_HELPER.getClientEmailByOrderId(req.body)
    .then(response => {
      res.status(200).json(response)
    })
    .catch(error => {
      res.status(500).send(error)
    })
})

module.exports = ROUTER
