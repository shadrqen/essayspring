const axios = require('axios')
/* The variables below are totally linked to the M-PESA Daraja api */
const consumerKey = process.env.MPESA_CONSUMER_KEY
const consumerSecret = process.env.MPESA_CONSUMER_SECRET
const auth = 'Basic ' + Buffer.from(consumerKey + ':' + consumerSecret).toString('base64')
const redisClient = require('../../other/redis')

const crypto = require('crypto')
const constants = require('node-constants')(exports)

class paymentAuthService {
  /* Getting the MPESA Access token, which lasts for an hour */
  static async accessToken () {
    return new Promise((resolve, reject) => {
      redisClient.get('MPESA-Auth-Token', async (err, token) => {
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
    axios.defaults.headers.common.Authorization = auth
    /* Currently removed the deletion of the api key and x-allowed-origin headers.
    * This means that the data may be relayed to Safaricom, for now. */
    /* delete axios.defaults.headers.common.api_key
    delete axios.defaults.headers.common['x-allowed-origin'] */
    const url = 'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials'
    return await axios.get(url)
      .then(response => {
        /* Store the token so as to refresh only after almost an hour */
        redisClient.set('MPESA-Auth-Token', response.data.access_token, 'EX', 60 * 58)
        return response.data.access_token
      })
      .catch(error => Promise.reject(error))
  }

  /* Getting the MPESA Security credential, and encrypted using the MPESA public key */
  static securityCredential () {
    // CAUTION: This is a 512 bit RSA demo key - NEVER USE THIS SOMEWHERE FOR REAL!
    const privateKey = require('./pubkey-cert.cer')
    const bufferToEncrypt = Buffer.from('df')

    const encrypted = crypto.publicEncrypt(
      { key: privateKey, padding: constants.RSA_PKCS1_PADDING },
      bufferToEncrypt)

    console.log('Encrypted  security credential', encrypted.toString('base64'))

    return encrypted
  }
}

module.exports = paymentAuthService
