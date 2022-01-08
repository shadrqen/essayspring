/* Endpoint that handles requests related specifically to a user */

/* Importing an instance of express */
const express = require('express')

/* Creating an express router instance */
const router = express.Router()

/* Importing the service that does logging of requests */
const { logger } = require('../../services/logger')

/* Contains queries for tables that are associated with the user (such as admin, client and writer tables) */
const userHelper = require('../../helpers/users/user')

/* Importing the service that handles authentication */
const { auth } = require('../../services/auth')

/* GET home page. */
router.get('/', auth, function (req, res) {
  res.json({ title: 'Users' })
})

/* Endpoint that gets a user by email */
router.post('/user_by_email', auth, async function (req, res) {
  await userHelper.getUserByMail(req.body)
    .then(response => {
      res.status(200).json(response)
    })
    .catch(error => {
      res.status(500).send(error)
    })
})

/* Endpoint that gets a detailed user by email - Includes objects or relationships such as Gender, Country etc */
router.post('/web_user_by_email', logger, auth, async function (req, res) {
  await userHelper.getWebUserByMail(req.body)
    .then(response => {
      res.status(200).json(response)
    })
    .catch(error => {
      res.status(500).send(error)
    })
})

/* Endpoint that gets a client's email by personal writer email */
router.post('/client_email_by_writer_email', logger, auth, async function (req, res) {
  await userHelper.getClientEmailByWriterEmail(req.body)
    .then(response => {
      res.status(200).json(response)
    })
    .catch(error => {
      res.status(500).send(error)
    })
})

/* Endpoint that adds or saves a client */
router.post('/add_client', auth, async function (req, res) {
  await userHelper.addClientDetails(req.body)
    .then(response => {
      res.status(200).json(response)
    })
    .catch(error => {
      res.status(500).send(error)
    })
})

/* Endpoint that checks whether the writer application process is open or not */
router.post('/check_writer_registration_status', auth, async function (req, res) {
  await userHelper.checkWriterRegistrationStatus(req)
    .then(response => {
      res.status(200).json(response)
    })
    .catch(error => {
      res.status(500).send(error)
    })
})

/* Endpoint that submits a writer's email address */
router.post('/submit_writer_email', auth, async function (req, res) {
  await userHelper.submitWriterEmail(req)
    .then(response => {
      res.status(200).json(response)
    })
    .catch(error => {
      res.status(500).send(error)
    })
})

/* Endpoint to confirm a writer's email address */
router.post('/confirm_writer_email', auth, async function (req, res) {
  await userHelper.confirmWriterEmail(req.body)
    .then(response => {
      res.status(200).json(response)
    })
    .catch(error => {
      res.status(500).send(error)
    })
})

/* Endpoint that creates a writers password */
router.post('/create_writer_password', auth, async function (req, res) {
  await userHelper.createWriterPassword(req.body)
    .then(response => {
      res.status(200).json(response)
    })
    .catch(error => {
      res.status(500).send(error)
    })
})

router.post('/save_writer_profile', auth, async function (req, res) {
  await userHelper.saveWriterProfile(req.body)
    .then(response => {
      res.status(200).json(response)
    })
    .catch(error => {
      res.status(500).send(error)
    })
})

router.post('/create_client_writer_connection', auth, async function (req, res) {
  await userHelper.createClientWriterConnection(req.body)
    .then(response => {
      res.status(200).json(response)
    })
    .catch(error => {
      res.status(500).send(error)
    })
})

router.post('/get_client_writers', auth, async function (req, res) {
  await userHelper.getPersonalWriters(req.body)
    .then(response => {
      res.status(200).json(response)
    })
    .catch(error => {
      res.status(500).send(error)
    })
})

router.post('/get_selected_personal_writer', auth, async function (req, res) {
  await userHelper.getSelectedPersonalWriter(req.body)
    .then(response => {
      res.status(200).json(response)
    })
    .catch(error => {
      console.log(error)
      res.status(500).send(error)
    })
})

router.post('/approve_personal_writer', auth, async function (req, res) {
  await userHelper.approvePersonalWriter(req.body)
    .then(response => {
      res.status(200).json(response)
    })
    .catch(error => {
      console.log(error)
      res.status(500).send(error)
    })
})

router.post('/submit_grammar_test', auth, async function (req, res) {
  await userHelper.submitGrammarTest(req.body)
    .then(response => {
      res.status(200).json(response)
    })
    .catch(error => {
      res.status(500).send(error)
    })
})

router.post('/submit_login_email', auth, async function (req, res) {
  await userHelper.submitLoginEmail(req.body)
    .then(response => {
      res.status(200).json(response)
    })
    .catch(error => {
      res.status(500).send(error)
    })
})

router.post('/set_client_password', auth, async function (req, res) {
  await userHelper.setClientPassword(req.body)
    .then(response => {
      res.status(200).json(response)
    })
    .catch(error => {
      res.status(500).send(error)
    })
})

router.post('/sample_essay_themes', auth, async function (req, res) {
  await userHelper.getSampleEssayThemes(req.body)
    .then(response => {
      res.status(200).json(response)
    })
    .catch(error => {
      res.status(500).send(error)
    })
})

router.post('/writer_start_writing', auth, async function (req, res) {
  await userHelper.writerStartWriting(req.body)
    .then(response => {
      res.status(200).json(response)
    })
    .catch(error => {
      res.status(500).send(error)
    })
})

router.post('/save_writer_sample_essay', auth, async function (req, res) {
  await userHelper.saveWriterSampleEssay(req.body)
    .then(response => {
      res.status(200).json(response)
    })
    .catch(error => {
      res.status(500).send(error)
    })
})

router.post('/writer_application_status', auth, async function (req, res) {
  await userHelper.writerApplicationStatus(req.body)
    .then(response => {
      res.status(200).json(response)
    })
    .catch(error => {
      res.status(500).send(error)
    })
})

router.post('/report_problem', auth, async function (req, res) {
  await userHelper.reportProblem(req.body)
    .then(response => {
      res.status(200).json(response)
    })
    .catch(error => {
      res.status(500).send(error)
    })
})

router.post('/save_login', auth, async function (req, res) {
  await userHelper.saveLogin(req.body)
    .then(response => {
      res.status(200).json(response)
    })
    .catch(error => {
      res.status(500).send(error)
    })
})

router.post('/get_mobile', auth, async function (req, res) {
  await userHelper.getClientMobile(req.body)
    .then(response => {
      res.status(200).json(response)
    })
    .catch(error => {
      res.status(500).send(error)
    })
})

router.post('/get_client_email_by_order_id', auth, async function (req, res) {
  await userHelper.getClientEmailByOrderId(req.body)
    .then(response => {
      res.status(200).json(response)
    })
    .catch(error => {
      res.status(500).send(error)
    })
})

module.exports = router
