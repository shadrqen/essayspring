const AXIOS = require('axios')
/* The variables below are totally linked to the M-PESA Daraja api */
const CONSUMER_KEY = process.env.MPESA_CONSUMER_KEY
const CONSUMER_SECRET = process.env.MPESA_CONSUMER_SECRET
const MPESA_AUTH = 'Basic ' + Buffer.from(CONSUMER_KEY + ':' + CONSUMER_SECRET).toString('base64')
const REDIS_CLIENT = require('../../other/redis')

const CRYPTO = require('crypto')
const CONSTANTS = require('node-constants')(exports)

class paymentAuthService {
  /* Getting the MPESA Access token, which lasts for an hour */
  static async accessToken () {
    return new Promise((resolve, reject) => {
      REDIS_CLIENT.get('MPESA-Auth-Token', async (err, token) => {
        /* In case of an error getting the token, get it from M-PESA */
        if (err) {
          await paymentAuthService.getAccessToken()
            .then(authBToken => resolve(authBToken))
            .catch(authTokenErr => reject(authTokenErr))
        } else {
          /* Otherwise get the stored token and return */
          if (token) {
            resolve(token)
          } else {
            /* If there is no stored redis access token, get it from M-PESA */
            await paymentAuthService.getAccessToken()
              .then(authToken => resolve(authToken))
              .catch(authTokenError => reject(authTokenError))
          }
        }
      })
    })
  }

  static async getAccessToken () {
    /* The authorization header for the access token request */
    AXIOS.defaults.headers.common.Authorization = MPESA_AUTH
    /* Currently removed the deletion of the api key and x-allowed-origin headers.
    * This means that the data may be relayed to Safaricom, for now. */
    /* delete axios.defaults.headers.common.api_key
    delete axios.defaults.headers.common['x-allowed-origin'] */
    const GET_ACCESS_URL = 'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials'
    return await AXIOS.get(GET_ACCESS_URL)
      .then(response => {
        /* Store the token so as to refresh only after almost an hour */
        REDIS_CLIENT.set('MPESA-Auth-Token', response.data.access_token, 'EX', 60 * 58)
        return response.data.access_token
      })
      .catch(error => Promise.reject(error))
  }

  /* Getting the MPESA Security credential, and encrypted using the MPESA public key */
  static securityCredential () {
    // CAUTION: This is a 512 bit RSA demo key - NEVER USE THIS SOMEWHERE FOR REAL!
    const PRIVATE_KEY = require('./pubkey-cert.cer')
    const BUFFER_TO_ENCRYPT = Buffer.from('df')

    // console.log('Encrypted  security credential', ENCRYPTED_CREDENTIAL.toString('base64'))

    return CRYPTO.publicEncrypt(
      {
        key: PRIVATE_KEY,
        padding: CONSTANTS.RSA_PKCS1_PADDING
      },
      BUFFER_TO_ENCRYPT)
  }
}

module.exports = paymentAuthService
