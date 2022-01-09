/* Importing modules */
/* Axios, Promise based HTTP client for the browser and node.js */
const axios = require('axios')

// const getDBRequest = require('../../database/connect').getDBRequest

const { postDBRequest, setHeaders } = require('../../database/connect')

/* Moment JS - helps is parsing, validating, manipulating and displaying date/time in JavaScript in a very easy way.  */
const moment = require('moment')

/* The requests mixin to hold shareable requests mixins */
const requestsMixin = require('../../../mixins/requests')

const mpesaAuthService = require('./auth')

/* Initializing the mpesa access token */
const setAuthorization = async () => {
  /* Appending the Authorization header to the b2C api request */
  return await mpesaAuthService.accessToken()
    .then(token => {
      axios.defaults.headers.common.Authorization = 'Bearer ' + token
      return true
    })
    .catch(error => {
      return Promise.reject(error)
    })
}

const mpesaConfig = require('./config')

/* Payment service to hold MPESA payments */
class MPESAPaymentService {
  /* TODO: To integrate a central function to be making requests for requests that don't need processing */
  static async b2CApi (req) {
    await setAuthorization()
    /* Initializing the b2c mpesa url */
    const url = 'https://sandbox.safaricom.co.ke/mpesa/b2c/v1/paymentrequest'
    /* Getting the current timestamp using moment js, which will be an input to the security credential below */
    const timestamp = moment(moment.now()).format('YYYYMMDDHHmmss')
    const b2CObj = {
      InitiatorName: 'Rotiken Gisa',
      SecurityCredential: Buffer.from(process.env.MPESA_SHORTCODE + process.env.MPESA_PASSKEY + timestamp).toString('base64'),
      CommandID: 'BusinessPayment',
      Amount: req.amount,
      PartyA: req.partyA,
      PartyB: req.partyB,
      Remarks: 'b2c',
      QueueTimeOutURL: req.c2bTimeout,
      ResultURL: req.c2bSuccess,
      Occasion: 'Withdrawal'
    }
    return await axios.post(url, b2CObj)
      .then(response => {
        return response.data
      })
      .catch(error => {
        return requestsMixin.customErrorMessage(error)
      })
  }

  static async c2BRegister (req) {
    await setAuthorization()
    const url = 'https://sandbox.safaricom.co.ke/mpesa/c2b/v1/registerurl'
    const c2BRegisterObj = {
      ShortCode: req.shortCode,
      ResponseType: req.responseType,
      ConfirmationURL: req.confirmationUrl,
      ValidationURL: req.validationUrl
    }
    return await axios.post(url, c2BRegisterObj)
      .then(response => {
        return response.data
      })
      .catch(error => {
        return requestsMixin.customErrorMessage(error)
      })
  }

  static async c2B (req) {
    await setAuthorization()
    const url = 'https://sandbox.safaricom.co.ke/mpesa/c2b/v1/simulate'
    const c2BObj = {
      // Fill in the request parameters with valid values
      ShortCode: req.shortCode,
      CommandID: req.commandId,
      Amount: req.amount,
      Msisdn: req.msisdn,
      BillRefNumber: req.billRefNumber
    }
    return await axios.post(url, c2BObj)
      .then(response => {
        return response.data
      })
      .catch(error => requestsMixin.customErrorMessage(error))
  }

  /* Does the actual STK push request */
  static async sendSTKPush (req, url, stkPushObj) {
    return await axios.post(url, stkPushObj)
      .then(async response => {
        if (response.data.ResponseCode === '0') {
          const paymentObject = {
            reqObject: req,
            checkoutRequestId: response.data.CheckoutRequestID
          }
          return await MPESAPaymentService.saveClientPayment(paymentObject)
            .then(async savingRes => {
              if (savingRes.paymentAdded) {
                /* The topic that we are sending back to the client is used to subscribe to an MQTT
                * topic to listen to updates from M-PESA. Once the STK push has been sent and the response
                * from M-PESA is received (be it success or failure etc.), MQTT will public the topic below.
                * At this point in time, the client will have subscribed to the topic since it is returned
                * as part of the STK push request.
                * The client will therefore be able to instantly update the payment status the moment we get a
                * response from M-PESA  */
                const wsTopic = process.env.DEV_MQTT_WC_ORDER_PAYMENT_TOPIC.concat(savingRes.trId)
                return {
                  status: true,
                  message: 'success',
                  topic: wsTopic
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
                  await MPESAPaymentService.saveClientPayment(paymentObject)
                    .then(paymentSavedSuccess => {
                      if (paymentSavedSuccess.paymentAdded) {
                        count = 0
                        savingSuccess = true
                        topic = process.env.DEV_MQTT_WC_ORDER_PAYMENT_TOPIC.concat(paymentSavedSuccess.trId)
                      }
                    })
                    .catch(() => {
                      console.log('Failed to resave client payment: ', paymentObject.checkoutRequestId)
                    })
                  count -= 1
                  await new Promise(resolve => setTimeout(resolve, 1000))
                }
                console.log('Client payment saving: ', savingSuccess, paymentObject.checkoutRequestId)
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
                      const url = 'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest'
                      /* Getting the current timestamp using moment js, which will be an input to the security credential below */
                      const timestamp = moment(moment.now()).format('YYYYMMDDHHmmss')
                      const stkPushObj = {
                        BusinessShortCode: process.env.MPESA_SHORTCODE,
                        Password: Buffer.from(process.env.MPESA_SHORTCODE + process.env.MPESA_PASSKEY + timestamp).toString('base64'),
                        Timestamp: timestamp,
                        TransactionType: 'CustomerPayBillOnline',
                        Amount: req.totalAmount,
                        PartyA: req.mobile,
                        PartyB: process.env.MPESA_SHORTCODE,
                        PhoneNumber: req.mobile,
                        CallBackURL: mpesaConfig.C2B_CALLBACK_URL,
                        AccountReference: 'EssaySpring Testing',
                        TransactionDesc: 'Testing STK PUSH'
                      }
                      return await MPESAPaymentService.sendSTKPush(req, url, stkPushObj)
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
      return requestsMixin.customErrorMessage(error)
    }
  }

  static async stkQuery (req) {
    await setAuthorization()
    /* Getting the current timestamp using moment js, which will be an input to the security credential below */
    const timestamp = moment(moment.now()).format('YYYYMMDDHHmmss')
    const url = 'https://sandbox.safaricom.co.ke/mpesa/stkpushquery/v1/query'
    const stkQueryObj = {
      BusinessShortCode: process.env.MPESA_SHORTCODE,
      Password: Buffer.from(process.env.MPESA_SHORTCODE + process.env.MPESA_PASSKEY + timestamp).toString('base64'),
      Timestamp: timestamp,
      CheckoutRequestID: req.checkoutRequestId
    }
    return await axios.post(url, stkQueryObj)
      .then(response => {
        return response.data
      })
      .catch(error => {
        return requestsMixin.customErrorMessage(error)
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
