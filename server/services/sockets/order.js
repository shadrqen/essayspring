const CLIENT = require('./connection')

const postDBRequest = require('../database/connect').postDBRequest

const { checkOrderPaymentStatus } = require('../payment/mpesa/payment')

const { sendEmail } = require('../users/auth')

const ORDER_EMAIL_ACTION = require('../../views/order_email_action')

class OrderSockets {
  static async getBids (orderId, first) {
    const TOPIC = process.env.DEV_MQTT_WC_ORDER_BIDS_TOPIC.concat(orderId)
    /* TODO: To remove the first parameter implementation and the subscribeToBidPosted function */
    if (first) {
      OrderSockets.subscribeToBidPosted(orderId)
      setTimeout(async () => {
        await this.publishBids(TOPIC, orderId)
      }, 3000)
    } else {
      await this.publishBids(TOPIC, orderId)
    }
    await OrderSockets.clientNewBidSendEmail(orderId)
  }

  static async clientNewBidSendEmail (orderId) {
    await postDBRequest('users/v1/get_client_email_by_order_id', {
      orderId: orderId
    })
      .then(async email => {
        if (email) {
          let url
          if (process.env.NODE_ENV && process.env.NODE_ENV === 'production') {
            url = 'https://essayspring.com/'
          } else {
            url = `http://${process.env.URL}:4100/`
          }
          const HTML_TO_SEND = ORDER_EMAIL_ACTION.orderAction(orderId, `your order No. ${orderId} has a new bid.`, '', url.concat('client/orders'))
          const EMAIL_DETAILS = {
            to: email,
            subject: 'New Order Bid',
            html: HTML_TO_SEND
          }
          await sendEmail(EMAIL_DETAILS)
        }
      })
      .catch(error => {
        console.log(error)
      })
  }

  static async publishBids (topic, orderId) {
    await postDBRequest('orders/v1/order_bids', { orderId: orderId })
      .then(res => {
        const MESSAGE = JSON.stringify(res)
        const OPTIONS = {
          retain: true,
          qos: 1 /* The QOS discussed above */
        }
        CLIENT.publish(topic, MESSAGE, OPTIONS)
      })
      .catch(error => {
        console.log(error)
      })
  }

  static subscribeToBidPosted (orderId) {
    let topic
    if (process.env.NODE_ENV && process.env.NODE_ENV === 'production') {
      topic = process.env.MQTT_WS_SUB_TOPIC.concat(orderId)
    } else {
      topic = process.env.DEV_MQTT_SUB_TOPIC.concat(orderId)
    }
    CLIENT.subscribe(topic, function () {
      console.log(`Subscribed to topic ${topic}`)
    })
    CLIENT.on('message', async function (topic, msg, pkt) {
      await OrderSockets.getBids(orderId, false)
      console.log('message received')
    })
  }

  /* Publishes the payment status received from M-PESA on a topic that was already subscribed to on the
  * client */
  static async publishOrderPaymentStatus (transactionId) {
    const TOPIC = process.env.DEV_MQTT_WC_ORDER_PAYMENT_TOPIC.concat(transactionId)
    await checkOrderPaymentStatus({ trId: transactionId })
      .then(response => {
        const MESSAGE = JSON.stringify(response)
        const OPTIONS = {
          retain: true,
          qos: 1
        }
        CLIENT.publish(TOPIC, MESSAGE, OPTIONS)
      })
      .catch(error => {
        console.log(error)
      })
  }
}

module.exports = OrderSockets
