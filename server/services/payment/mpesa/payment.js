/* Importing modules */
/* Axios, Promise based HTTP client for the browser and node.js */
const AXIOS = require('axios')

// const getDBRequest = require('../../database/connect').getDBRequest

const { postDBRequest, setHeaders } = require('../../database/connect')

/* Moment JS - helps is parsing, validating, manipulating and displaying date/time in JavaScript in a very easy way.  */
const MOMENT_JS = require('moment')

/* The requests mixin to hold shareable requests mixins */
const REQUESTS_MIXIN = require('../../../mixins/requests')

const MPESA_AUTH_SERVICE = require('./auth')

/* Initializing the mpesa access token */
const setAuthorization = async () => {
  /* Appending the Authorization header to the b2C api request */
  return await MPESA_AUTH_SERVICE.accessToken()
    .then(token => {
      AXIOS.defaults.headers.common.Authorization = 'Bearer ' + token
      return true
    })
    .catch(error => {
      return Promise.reject(error)
    })
}

const MPESA_CONFIG = require('./config')

/* Payment service to hold MPESA payments */
class MPESAPaymentService {
  /* TODO: To integrate a central function to be making requests for requests that don't need processing */
  static async b2CApi (req) {
    await setAuthorization()
    /* Initializing the b2c mpesa url */
    const REQUEST_URL = 'https://sandbox.safaricom.co.ke/mpesa/b2c/v1/paymentrequest'
    /* Getting the current timestamp using MOMENT_JS js, which will be an input to the security credential below */
    const CURRENT_TIMESTAMP = MOMENT_JS(MOMENT_JS.now()).format('YYYYMMDDHHmmss')
    const B2C_OBJECT = {
      InitiatorName: 'Rotiken Gisa',
      SecurityCredential: Buffer.from(process.env.MPESA_SHORTCODE + process.env.MPESA_PASSKEY + CURRENT_TIMESTAMP).toString('base64'),
      CommandID: 'BusinessPayment',
      Amount: req.amount,
      PartyA: req.partyA,
      PartyB: req.partyB,
      Remarks: 'b2c',
      QueueTimeOutURL: req.c2bTimeout,
      ResultURL: req.c2bSuccess,
      Occasion: 'Withdrawal'
    }
    return await AXIOS.post(REQUEST_URL, B2C_OBJECT)
      .then(response => {
        return response.data
      })
      .catch(error => {
        return REQUESTS_MIXIN.customErrorMessage(error)
      })
  }

  static async c2BRegister (req) {
    await setAuthorization()
    const C2B_REGISTRATION_URL = 'https://sandbox.safaricom.co.ke/mpesa/c2b/v1/registerurl'
    const C2B_REGISTRATION_OBJECT = {
      ShortCode: req.shortCode,
      ResponseType: req.responseType,
      ConfirmationURL: req.confirmationUrl,
      ValidationURL: req.validationUrl
    }
    return await AXIOS.post(C2B_REGISTRATION_URL, C2B_REGISTRATION_OBJECT)
      .then(response => {
        return response.data
      })
      .catch(error => {
        return REQUESTS_MIXIN.customErrorMessage(error)
      })
  }

  static async c2B (req) {
    await setAuthorization()
    const URL = 'https://sandbox.safaricom.co.ke/mpesa/c2b/v1/simulate'
    const C2B_OBJ = {
      // Fill in the request parameters with valid values
      ShortCode: req.shortCode,
      CommandID: req.commandId,
      Amount: req.amount,
      Msisdn: req.msisdn,
      BillRefNumber: req.billRefNumber
    }
    return await AXIOS.post(URL, C2B_OBJ)
      .then(response => {
        return response.data
      })
      .catch(error => REQUESTS_MIXIN.customErrorMessage(error))
  }

  /* Does the actual STK push request */
  static async sendSTKPush (req, url, stkPushObj) {
    return await AXIOS.post(url, stkPushObj)
      .then(async response => {
        if (response.data.ResponseCode === '0') {
          const PAYMENT_OBJECT = {
            reqObject: req,
            checkoutRequestId: response.data.CheckoutRequestID
          }
          return await MPESAPaymentService.saveClientPayment(PAYMENT_OBJECT)
            .then(async savingRes => {
              if (savingRes.paymentAdded) {
                /* The topic that we are sending back to the client is used to subscribe to an MQTT
                * topic to listen to updates from M-PESA. Once the STK push has been sent and the response
                * from M-PESA is received (be it success or failure etc.), MQTT will public the topic below.
                * At this point in time, the client will have subscribed to the topic since it is returned
                * as part of the STK push request.
                * The client will therefore be able to instantly update the payment status the moment we get a
                * response from M-PESA  */
                const WS_TOPIC = process.env.DEV_MQTT_WC_ORDER_PAYMENT_TOPIC.concat(savingRes.trId)
                return {
                  status: true,
                  message: 'success',
                  topic: WS_TOPIC
                }
              } else {
                /* There have been instances when the DBMS fails to save the payment details after sending the
                * STK. As a workaround, we are currently retrying at least six times to re-save the payment
                * details.
                * This is because payment details are really critical to the overall operation of the platform.
                * A person should only be prompted to pay once, and even then, tbe platform should not miss saving
                * such aa critical request.
                * TODO: To do a detail analysis as to why the DBMS sometimes fails to save */
                let count = 6
                let savingSuccess = false
                let topic = null
                while (count > 0) {
                  await MPESAPaymentService.saveClientPayment(PAYMENT_OBJECT)
                    .then(paymentSavedSuccess => {
                      if (paymentSavedSuccess.paymentAdded) {
                        count = 0
                        savingSuccess = true
                        topic = process.env.DEV_MQTT_WC_ORDER_PAYMENT_TOPIC.concat(paymentSavedSuccess.trId)
                      }
                    })
                    .catch(() => {
                      console.log('Failed to resave client payment: ', PAYMENT_OBJECT.checkoutRequestId)
                    })
                  count -= 1
                  await new Promise(resolve => setTimeout(resolve, 1000))
                }
                console.log('Client payment saving: ', savingSuccess, PAYMENT_OBJECT.checkoutRequestId)
                return { status: true, message: 'Your payment will be processed shortly', topic: topic }
              }
            })
            .catch(saveClientPaymentError => {
              console.log('saveClientPaymentError: ', saveClientPaymentError)
              return Promise.reject(new Error('Error saving record'))
            })
        } else {
          return { status: false, message: 'Failed to send STK Push' }
        }
      })
      .catch(sendStkError => {
        console.log('sendStkError: ', sendStkError)
        return Promise.reject(new Error('Failed to send STK Push'))
      })
  }

  static async stkPush (req) {
    try {
      return await MPESAPaymentService.checkIfOrderAlreadyPaid({ orderId: req.orderId })
        .then(async orderIsPaid => {
          console.log('\n\n\n order is already paid for: ', orderIsPaid, '\n\n\n')
          if (orderIsPaid.orderAlreadyPaidFor) {
            return { status: true, message: 'OrderAlreadyPaid' }
          } else {
            return await this.checkOngoingTransaction(req)
              .then(async transOngoing => {
                console.log('\n\n\n transaction ongoing: ', transOngoing, '\n\n\n')
                if (transOngoing.ongoing) {
                  return { status: false, message: 'Similar transaction is already underway' }
                } else {
                  return await setAuthorization()
                    .then(async () => {
                      const URL = 'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest'
                      /* Getting the current timestamp using MOMENT_JS js, which will be an input to the security credential below */
                      const CURRENT_TIMESTAMP = MOMENT_JS(MOMENT_JS.now()).format('YYYYMMDDHHmmss')
                      const STK_PUS_OBJ = {
                        BusinessShortCode: process.env.MPESA_SHORTCODE,
                        Password: Buffer.from(process.env.MPESA_SHORTCODE + process.env.MPESA_PASSKEY + CURRENT_TIMESTAMP).toString('base64'),
                        Timestamp: CURRENT_TIMESTAMP,
                        TransactionType: 'CustomerPayBillOnline',
                        Amount: req.totalAmount,
                        PartyA: req.mobile,
                        PartyB: process.env.MPESA_SHORTCODE,
                        PhoneNumber: req.mobile,
                        CallBackURL: MPESA_CONFIG.C2B_CALLBACK_URL,
                        AccountReference: 'EssaySpring Testing',
                        TransactionDesc: 'Testing STK PUSH'
                      }
                      return await MPESAPaymentService.sendSTKPush(req, URL, STK_PUS_OBJ)
                        .then(stkResponse => stkResponse)
                        .catch(stkError => {
                          console.log('stkError: ', stkError)
                          return Promise.reject(stkError.message)
                        })
                    })
                    .catch(setAuthorizationError => {
                      console.log('setAuthorizationError: ', setAuthorizationError)
                      return Promise.reject(new Error('Failed! Kindly try again').message)
                    })
                }
              })
              .catch(transOngoingError => {
                console.log('transOngoingError: ', transOngoingError)
                return Promise.reject(new Error('Failed to check transaction status').message)
              })
          }
        })
        .catch(orderAlreadyPaidError => {
          console.log('orderAlreadyPaidError: ', orderAlreadyPaidError)
          return Promise.reject(new Error('Failed to check order payment status').message)
        })
    } catch (error) {
      return REQUESTS_MIXIN.customErrorMessage(error)
    }
  }

  static async stkQuery (req) {
    await setAuthorization()
    /* Getting the current timestamp using moment js, which will be an input to the security credential below */
    const CURRENT_TIMESTAMP = MOMENT_JS(MOMENT_JS.now()).format('YYYYMMDDHHmmss')
    const URL = 'https://sandbox.safaricom.co.ke/mpesa/stkpushquery/v1/query'
    const STK_QUERY_OBJ = {
      BusinessShortCode: process.env.MPESA_SHORTCODE,
      Password: Buffer.from(process.env.MPESA_SHORTCODE + process.env.MPESA_PASSKEY + CURRENT_TIMESTAMP).toString('base64'),
      Timestamp: CURRENT_TIMESTAMP,
      CheckoutRequestID: req.checkoutRequestId
    }
    return await AXIOS.post(URL, STK_QUERY_OBJ)
      .then(response => {
        return response.data
      })
      .catch(error => {
        return REQUESTS_MIXIN.customErrorMessage(error)
      })
  }

  static async saveClientPayment (req) {
    /* We are calling the setHeaders function here to set authentication headers that are required to
    * access the DBMS. This is because the preceding STK push removes these headers prior to making a
    * a call to the daraja API */
    setHeaders()
    return await postDBRequest('payments/v1/mpesa/save_client_payment', req)
      .then(res => res)
      .catch(err => Promise.reject(err))
  }

  static async checkOrderPaymentStatus (req) {
    return await postDBRequest('payments/v1/mpesa/check_order_payment_status', req)
      .then(res => res)
      .catch(err => Promise.reject(err))
  }

  static async checkIfOrderAlreadyPaid (req) {
    return await postDBRequest('payments/v1/mpesa/check_if_order_is_already_paid', req)
      .then(response => response)
      .catch(error => Promise.reject(error))
  }

  static async checkOngoingTransaction (req) {
    return await postDBRequest('payments/v1/mpesa/check_if_transaction_is_ongoing', req)
      .then(response => response)
      .catch(error => Promise.reject(error))
  }

  static async updateClientOrderPayment (req) {
    return await postDBRequest('payments/v1/mpesa/update_client_order_payment', req)
      .then(response => response)
      .catch(error => Promise.reject(error))
  }
}

module.exports = MPESAPaymentService
