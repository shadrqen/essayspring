const EXPRESS = require('express')
const ROUTER = EXPRESS.Router()
const {
  auth,
  cors,
  getClientMobile,
  refreshToken,
  loginUser,
  getGoogleApiUrl,
  googleAuth,
  facebookAuth,
  registerUser,
  resendOTPCode,
  submitLoginEmail,
  setClientPassword,
  sendResetPasswordCode,
  resetClientPassword
} = require('../../services/users/auth')
const { logger } = require('../../services/logs/logger')

/* GET home page. */
ROUTER.get('/', logger, auth, function (req, res, next) {
  res.json({ title: 'Admin' })
})

ROUTER.post('/login_user', logger, logger, cors, async (req, res) => {
  await loginUser(req)
    .then(response => {
      res.status(200).json(response)
    })
    .catch(error => {
      res.status(500).send(error)
    })
})

ROUTER.get('/google-api-url', logger, cors, async (req, res) => {
  await getGoogleApiUrl()
    .then(response => {
      res.status(200).json(response)
    })
    .catch(error => {
      res.status(500).send(error)
    })
})

ROUTER.post('/auth/google', logger, cors, async (req, res) => {
  await googleAuth(req)
    .then(response => {
      res.status(200).json(response)
    })
    .catch(error => {
      res.status(500).send(error)
    })
})

ROUTER.post('/auth/facebook', logger, logger, cors, async (req, res) => {
  await facebookAuth(req.body)
    .then(response => {
      res.status(200).json(response)
    })
    .catch(error => {
      res.status(500).send(error)
    })
})

ROUTER.get('/refresh', logger, cors, async (req, res) => {
  await refreshToken(req, res)
    .then(response => {
      res.status(200).json(response)
    })
    .catch(error => {
      res.status(500).send(error)
    })
})

ROUTER.post('/register_user', logger, cors, async (req, res) => {
  await registerUser(req)
    .then(response => {
      res.status(200).json(response)
    })
    .catch(error => {
      res.status(500).send(error)
    })
})

ROUTER.post('/submit_login_email', logger, cors, async (req, res) => {
  await submitLoginEmail(req.body)
    .then(response => {
      res.status(200).json(response)
    })
    .catch(error => {
      res.status(500).send(error)
    })
})

ROUTER.post('/set_client_password', logger, async (req, res) => {
  await setClientPassword(req.body)
    .then(response => {
      res.status(200).json(response)
    })
    .catch(error => {
      res.status(500).send(error)
    })
})

ROUTER.post('/forgot_password', async function (req, res) {
  await sendResetPasswordCode(req.body)
    .then(response => {
      res.status(200).json(response)
    })
    .catch(error => {
      res.status(500).send(error)
    })
})

ROUTER.post('/reset_password', async function (req, res) {
  await resetClientPassword(req.body)
    .then(response => {
      res.status(200).json(response)
    })
    .catch(error => {
      res.status(500).send(error)
    })
})

ROUTER.post('/resend_code', async function (req, res) {
  await resendOTPCode(req.body)
    .then(response => {
      res.status(200).json(response)
    })
    .catch(error => {
      res.status(500).send(error)
    })
})

ROUTER.get('/get_mobile', async function (req, res) {
  await getClientMobile(req)
    .then(response => {
      res.status(200).json(response)
    })
    .catch(error => {
      res.status(500).send(error)
    })
})

module.exports = ROUTER
