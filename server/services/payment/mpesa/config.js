let BASE_URL
if (process.env.NODE_ENV && process.env.NODE_ENV === 'production') {
  BASE_URL = 'https://api.essayspring.com/payments/v1/mpesa/'
} else {
  BASE_URL = 'https://bc72-41-80-4-177.ngrok.io/payments/v1/mpesa/'
}

const C2B_VALIDATION_URL = BASE_URL.concat('c2b/validation')
const C2B_CALLBACK_URL = BASE_URL.concat('c2b/confirmation')
const B2B_CALLBACK_URL = BASE_URL.concat('b2b/result')
const B2C_CALLBACK_URL = BASE_URL.concat('b2c/result')
const B2C_TIMEOUT_URL = BASE_URL.concat('b2c/timeout')

module.exports = {
  C2B_VALIDATION_URL,
  C2B_CALLBACK_URL,
  B2C_CALLBACK_URL,
  B2B_CALLBACK_URL,
  B2C_TIMEOUT_URL
}
