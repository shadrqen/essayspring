'use strict'

const AXIOS = require('axios')

const { getDBRequest, postDBRequest } = require('../database/connect')

const REQUESTS_MIXIN = require('../../mixins/requests')

const { decodeToken, sendEmail } = require('../users/auth')

const SOCKETS_SERVICE = require('../sockets/order')

const ORDER_EMAIL_ACTION = require('../../views/order_email_action')

const NEW_WRITER_REGISTRATION = require('../../views/new_writer_registration')

// const writerOrderEmailAction = require('../../views/writer_email_action')

const FILE_SYSTEM = require('fs')

class OrdersService {
  static async getRequest (url) {
    return await getDBRequest(url)
      .then(response => response)
      .catch(error => REQUESTS_MIXIN.customErrorMessage(error))
  }

  static async postRequest (url, body) {
    return await postDBRequest(url, body)
      .then(response => response)
      .catch(error => REQUESTS_MIXIN.customErrorMessage(error))
  }

    static getTime = async () => {
      return await getDBRequest('orders/v1/time')
        .then(time => time)
        .catch(error => REQUESTS_MIXIN.customErrorMessage(error))
    }

    static async getOrderBids (req) {
      /* TODO: To confirm why an array was sent as 'first' */
      await SOCKETS_SERVICE.getBids(req.orderId, true)
      return { connectionStarted: true }
    }

    /* Sends public/private writers notifications on email that there is a new order */
    static async sendWriterNotifications (response, orderId, type) {
      if (response === 'success') {
        const ORIGIN = process.env.NODE_ENV === 'production' ? process.env.WR_APP_URL : `http://${process.env.WR_URL}:82`
        const URL = type === 'public' ? 'new_order' : 'private/new_order'
        await AXIOS.post(ORIGIN.concat('/orders/notifications/email/ws/'.concat(URL)), {
          orderId: orderId,
          wr_x_api_key: process.env.NODE_ENV && process.env.NODE_ENV === 'production' ? process.env.WR_NEW_BID_SECRET : process.env.DEV_WR_NEW_BID_SECRET
        })
        /* TODO: To handle the responses below */
      }
    }

    /* Once a writer invitation has been saved on the database after being initiated by the client,
    * there is now need to send an email notification to the writer */
    static async sendWriterClientInvitation (response, req) {
      if (response.message === 'Invitation sent successfully' || response.message === 'Invitation already exists!') {
        const DECODED_TOKEN = await decodeToken(req.headers.access)
        const URL = process.env.NODE_ENV === 'production' ? process.env.WR_APP_URL : `http://${process.env.WR_URL}:82`
        await AXIOS.post(URL.concat('/orders/notifications/email/ws/client_invitation'), {
          clientEmail: DECODED_TOKEN.message.sub,
          writerEmail: req.body.email,
          wr_x_api_key: process.env.NODE_ENV && process.env.NODE_ENV === 'production' ? process.env.WR_NEW_BID_SECRET : process.env.DEV_WR_NEW_BID_SECRET
        })
          .then(res => {
            console.log('\n\n\n response: ', res.data, '\n\n\n')
          })
          .catch(err => {
            console.log('\n\n\n error: ', err.data, '\n\n\n')
          })
      }
    }

    static async getOrders (req) {
      const DECODED_TOKEN = await decodeToken(req.headers.access)
      const FORM = {}
      const MULTIPLE = req.body.multiple
      FORM.multiple = MULTIPLE
      FORM.email = DECODED_TOKEN.message.sub
      if (MULTIPLE) {
        FORM.orderStatusID = req.body.orderStatusID
      } else {
        FORM.orderId = req.body.orderId
      }
      return await postDBRequest('orders/v1/get_orders', FORM)
        .then(response => response)
        .catch(error => REQUESTS_MIXIN.customErrorMessage(error))
    }

    static async getFile (req) {
      let uploadsPath
      if (process.env.NODE_ENV && process.env.NODE_ENV === 'production') {
        /* This is a directory inside our docker instance that is mapped to a volume on the host device */
        uploadsPath = '/static/uploads/'
      } else {
        /* We need to have a directory called static/ws/uploads just outside the root of the project
            * This is on development */
        uploadsPath = __dirname.concat('/../../../static/ws/uploads/')
      }
      try {
        // const fileExtension = req.fileUrl.split('.').pop()
        const FILE_DATA = FILE_SYSTEM.readFileSync(uploadsPath.concat(req.fileUrl), 'base64')
        return { message: 'success', file: FILE_DATA }
      } catch (err) {
        return REQUESTS_MIXIN.customErrorMessage(err)
      }
    }

    static async getOrderDetails (req) {
      try {
        const DECODED_TOKEN = await decodeToken(req.headers.access)
        return await postDBRequest('orders/v1/get_order_details', {
          email: DECODED_TOKEN.message.sub,
          orderId: req.body.orderId
        })
          .then(detail => detail)
          .catch(error => {
            throw new Error(error)
          })
      } catch (err) {
        return REQUESTS_MIXIN.customErrorMessage(err)
      }
    }

    /* TODO: To make the use of try consistent */
    static async confirmOrderBelongs2Client (req) {
      try {
        const DECODED_TOKEN = await decodeToken(req.headers.access)
        return await postDBRequest('orders/v1/confirm_order_ownership', {
          orderId: req.body.orderId,
          email: DECODED_TOKEN.message.sub
        })
          .then(response => response)
          .catch(error => {
            throw new Error(error)
          })
      } catch (err) {
        return REQUESTS_MIXIN.customErrorMessage(err)
      }
    }

    static async requestOrderRevision (req) {
      try {
        const DECODED_TOKEN = await decodeToken(req.headers.access)
        const ORDER_ID = req.body.orderId
        return await postDBRequest('orders/v1/revision_request', {
          orderId: ORDER_ID,
          email: DECODED_TOKEN.message.sub,
          supportingFiles: req.body.supportingFiles,
          checklist: req.body.checklist,
          deadline: req.body.deadline
        })
          .then(response => {
            const REVISION_MESSAGE = 'there is a revision request for order No. ' + ORDER_ID + '!'
            OrdersService.requestWsWriterSendEmail(ORDER_ID, REVISION_MESSAGE, 'revision')
            return response
          })
          .catch(error => {
            throw new Error(error)
          })
      } catch (err) {
        return REQUESTS_MIXIN.customErrorMessage(err)
      }
    }

    static async confirmOrderCompletion (req) {
      try {
        const DECODED_TOKEN = await decodeToken(req.headers.access)
        const ORDER_ID = req.body.orderId
        const EMAIL = DECODED_TOKEN.message.sub
        return await postDBRequest('orders/v1/confirm_order_completion', {
          orderId: ORDER_ID,
          email: EMAIL
        })
          .then(response => {
            const ORDER_COMPLETION_MESSAGE = 'order No. ' + ORDER_ID + ' has been confirmed!'
            OrdersService.requestWsWriterSendEmail(ORDER_ID, ORDER_COMPLETION_MESSAGE, 'order-update')
            return response
          })
          .catch(error => {
            throw new Error(error)
          })
      } catch (err) {
        return REQUESTS_MIXIN.customErrorMessage(err)
      }
    }

    /* In case of an issue with an order such as a revision or completion from the client's side,
    * we need to notify the writer */
    static requestWsWriterSendEmail (orderId, msg, purpose) {
      let host, key
      if (process.env.NODE_ENV && process.env.NODE_ENV === 'production') {
        key = process.env.WR_NEW_BID_SECRET
        host = process.env.WR_APP_URL
      } else {
        key = process.env.DEV_WR_NEW_BID_SECRET
        host = `http://${process.env.WR_URL}:82`
      }
      /* The host above refers to the Writeray app micro-service. It is responsible for handling things such as
        * sending email notifications since it sits on the same origin as the email server */
      let url
      if (purpose === 'revision') {
        url = host + '/orders/notifications/email/ws/order_revision'
      } else {
        url = host + '/orders/notifications/email/ws/writer_specific'
      }
      const NOTIFICATION_PAYLOAD = {
        orderId: orderId,
        msg: msg,
        wr_x_api_key: key /* This is the key that is used for inter-service communication */
      }
      /* To handle the responses below */
      AXIOS.post(url, NOTIFICATION_PAYLOAD)
        .then(() => {
        })
        .catch(() => {
        })
    }

    /* Sends order email notifications to clients */
    static async emailNotification (req) {
      try {
        const EMAIL = req.email
        const MESSAGE = req.msg
        const USER = req.user
        const ORDER_ID = req.order_id
        let url
        if (process.env.NODE_ENV && process.env.NODE_ENV === 'production') {
          url = 'https://essayspring.com/orders'
        } else {
          url = `http://${process.env.URL}:4100/orders`
        }
        const htmlToSend = ORDER_EMAIL_ACTION.orderAction(ORDER_ID, MESSAGE, USER, url)
        const EMAIL_DETAILS = {
          to: EMAIL,
          subject: 'Order Status Update',
          html: htmlToSend
        }
        await sendEmail(EMAIL_DETAILS)
      } catch (err) {
        console.log(REQUESTS_MIXIN.customErrorMessage(err))
      }
    }

    /* A client has the ability to invite his private writers.
    * Once the invited writer registers successfully under this client, we notify the client
    * of the same */
    static async personWriterRegistersEmailNotification (req) {
      try {
        const EMAIL = req.email
        const NAMES = req.names
        let url
        if (process.env.NODE_ENV && process.env.NODE_ENV === 'production') {
          url = 'https://essayspring.com/client/writers'
        } else {
          url = `http://${process.env.URL}:4100/client/writers`
        }
        const HTML_TO_SEND = NEW_WRITER_REGISTRATION.newWriterRegistration(NAMES, url)
        const EMAIL_DETAILS = {
          to: EMAIL,
          subject: 'New Writer Registration',
          html: HTML_TO_SEND
        }
        await sendEmail(EMAIL_DETAILS)
        return { success: true }
      } catch (err) {
        return Promise.reject(REQUESTS_MIXIN.customErrorMessage(err))
      }
    }

    static async rateWriter (req) {
      return await postDBRequest('orders/v1/rate_writer', {
        orderId: req.orderId,
        rating: req.rating
      })
        .then(response => {
          return { rated: response }
        })
        .catch(error => {
          return REQUESTS_MIXIN.customErrorMessage(error)
        })
    }

    static async getPersonalWriters (req) {
      try {
        const DECODED_TOKEN = await decodeToken(req.headers.access)
        const EMAIL = DECODED_TOKEN.message.sub
        return await postDBRequest('orders/v1/get_personal_writers', {
          email: EMAIL
        })
          .then(response => response)
          .catch(error => REQUESTS_MIXIN.customErrorMessage(error))
      } catch (err) {
        return REQUESTS_MIXIN.customErrorMessage(err)
      }
    }

    static async sendWriterInvite (req) {
      try {
        const DECODED_TOKEN = await decodeToken(req.headers.access)
        const EMAIL = DECODED_TOKEN.message.sub
        return await postDBRequest('orders/v1/send_writer_invite', {
          email: EMAIL,
          writerEmail: req.body.email
        })
          .then(response => response)
          .catch(error => REQUESTS_MIXIN.customErrorMessage(error))
      } catch (err) {
        return REQUESTS_MIXIN.customErrorMessage(err)
      }
    }
}

module.exports = OrdersService
