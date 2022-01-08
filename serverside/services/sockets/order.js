const client = require('./connection')

const postDBRequest = require('../database/connect').postDBRequest

const { checkOrderPaymentStatus } = require('../payment/mpesa/payment')

const { sendEmail } = require('../users/auth')

const orderEmailAction = require('../../views/order_email_action')

class OrderSockets {
  static async getBids (orderId, first) {
    const topic = process.env.DEV_MQTT_WC_ORDER_BIDS_TOPIC.concat(orderId)
    /* TODO: To remove the first parameter implementation and the subscribeToBidPosted function */
    if (first) {
      OrderSockets.subscribeToBidPosted(orderId)
      setTimeout(async () => {
        await this.publishBids(topic, orderId)
      }, 3000)
    } else {
      await this.publishBids(topic, orderId)
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
          const htmlToSend = orderEmailAction.orderAction(orderId, `your order No. ${orderId} has a new bid.`, '', url.concat('client/orders'))
          const emailDetails = {
            to: email,
            subject: 'New Order Bid',
            html: htmlToSend
          }
          await sendEmail(emailDetails)
        }
      })
      .catch(error => {
        console.log(error)
      })
  }

  static async publishBids (topic, orderId) {
    await postDBRequest('orders/v1/order_bids', { orderId: orderId })
      .then(res => {
        const msg = JSON.stringify(res)
        const options = {
          retain: true,
          qos: 1 /* The QOS discussed above */
        }
        client.publish(topic, msg, options)
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
    client.subscribe(topic, function () {
      console.log(`Subscribed to topic ${topic}`)
    })
    client.on('message', async function (topic, msg, pkt) {
      await OrderSockets.getBids(orderId, false)
      console.log('message received')
    })
  }

  /* Publishes the payment status received from M-PESA on a topic that was already subscribed to on the
  * client */
  static async publishOrderPaymentStatus (transactionId) {
    const topic = process.env.DEV_MQTT_WC_ORDER_PAYMENT_TOPIC.concat(transactionId)
    await checkOrderPaymentStatus({ trId: transactionId })
      .then(response => {
        const msg = JSON.stringify(response)
        const options = {
          retain: true,
          qos: 1
        }
        client.publish(topic, msg, options)
      })
      .catch(error => {
        console.log(error)
      })
  }
}

module.exports = OrderSockets
