'use strict'

/* Helper to deal with payment logic */

/* Import sequelize classes or models to be used in selecting, updating and inserting payments details */
const {
  AssignmentType,
  BasePrice,
  Client,
  ClientPayment,
  Currency,
  MPESA,
  MPESAResultCode,
  Order,
  OrderPaymentDetail,
  OrderServiceType,
  OrderStatus,
  PaperDiscount,
  PaymentStatus,
  PriceIncrement,
  WriterOrder,
  User
} = require('../../models')

/* Importing the 'Op' operator in sequelize, which is used to conduct greater-than, less-than e.t.c operations */
const { Op } = require('sequelize')

/* Importing the index model that will be used to access the sequelize instance, which will in turn help create
* sequelize transactions */
const MODEL = require('../../models/index')

/* Importing the crypto module, which will be used to generate random numbers */
const CRYPTO = require('crypto')

/* The payments helper, which makes use of static functions to enable calling them on the class themselves
* directly, as opposed to creating a class instance then calling them on the instance */
class PaymentHelper {
  /* Method to save a client's order payment details after sending the stk push */
  static async saveClientOrderPayment (req) {
    try {
      /* Generate random number, which is used to generate the transaction ID.
      * The transaction ID is saved alongside an MPESA's checkoutRequestID.
      * The transaction ID is used to uniquely identify an MPESA transaction, and is
      * sent to the client to be used to track the success of a transaction. We would
      * have used the checkoutRequestID instead for this, but it means that we will be
      * sending a very sensitive chunk of data to the client, giving room for a person
      * to fake a transaction as successful, yet it is not. This is because MPESA
      * requires to have an open callback url to send data on successfull or failed status
      * of a transaction. Since we cannot authenticate the MPESA callback request, we need
      * to have a way of protecting the integrity of the data, and that is where hiding
      * the checkoutRequest ID comes in. By doing this, were someone to fake an MPESA
      * request, they would need to get the checkoutRequestID right, which is the one that
      * is sent by MPESA upon STK Push, and after the response of the transaction.
      * Otherwise, not being able to match a given checkoutRequestID almost assures us
      * that fodged requests will just be saved, without the corresponding checkoutRequestID
      * plus the clientPayment. Mind you, we also save the checkoutRequestID on the client
      * payment details. This means that were a person to fodge a request even with a
      * correct checkoutRequestID, there needs to be a corresponding checkoutRequestID
      * record in the client payments table, which is only generated after requesting
      * an order from the application. Should a person have requested an order through
      * the application, he or she has to match the fodged checkoutRequestID with that
      * which is in the client payments table. The timing of the same is also important
      * in the sense that the fodger has to do this in record time, because otherwise
      * the transaction will be suspicious if an STK Push is sent now, and the response
      * from MPESA is sent after, say 30 minutes, or 1 hour. In such a scenario, there
      * would be need to contact MPESA for their records to confirm the authenticity
      * of such claims. */
      const RAND_NUM = await CRYPTO.randomBytes(29).toString('hex')
      return await MODEL.sequelize.transaction(async (t) => {
        /* Get the user, client, currency and payment status first */
        const USER = await User.findOne({
          where: {
            email: req.reqObject.email.toLowerCase()
          },
          attributes: ['id']
        }, { transaction: t })
        const [CLIENT, CURRENCY, STATUS] = await Promise.all([
          Client.findOne({
            where: {
              userId: USER.id
            },
            attributes: ['id'],
            raw: true
          }),
          Currency.findOne({
            where: {
              currencyCode: req.reqObject.currencyCode
            },
            attributes: ['id'],
            raw: true
          }),
          PaymentStatus.findOne({
            where: {
              status: 'Processing payment'
            },
            attributes: ['id'],
            raw: true
          })
        ])
        /* Check whether there is a similar payment in the database with the same clientID, orderID, mobile
        * number plus amount to pay */
        return await ClientPayment.findOne({
          where: {
            clientId: CLIENT.id,
            orderId: req.reqObject.orderId,
            mobile: req.reqObject.mobile,
            amount: req.reqObject.totalAmount
          },
          attributes: ['id'],
          include: [
            {
              model: PaymentStatus,
              as: 'PaymentStatus',
              attributes: ['status']
            }
          ]
        })
          .then(async exists => {
            if (exists && exists.PaymentStatus.status === 'Processing payment') {
              /* If it exists, and its payment status is 'Processing payment', then it means that this is
              * a transaction that is currently ongoing, and that there is need to prevent duplicate requests. */
              return { paymentAdded: false, message: 'Similar transaction is already underway' }
            } else {
              /* Otherwise, we need to save the transaction details in the database */
              const TRANSACTION_ID = String(CLIENT.id).concat(RAND_NUM, String(CLIENT.id)) /* Generating the transaction
              ID */
              /* Creating the client payment record */
              return await ClientPayment.create({
                clientId: CLIENT.id,
                currencyId: CURRENCY.id,
                orderId: req.reqObject.orderId,
                statusId: STATUS.id,
                transactionId: TRANSACTION_ID,
                checkoutRequestId: req.checkoutRequestId,
                mobile: req.reqObject.mobile,
                amount: req.reqObject.totalAmount,
                isDeleted: false
              }, { transaction: t })
                .then(async payment => {
                  /* Return true, plus transaction ID upon success. The TransactionID will be sent to the
                  * client to help track the status of the transaction on the clientside of the application. */
                  if (payment) {
                    return { paymentAdded: true, trId: payment.dataValues.transactionId }
                  } else {
                    /* Otherwise return false, plus the message 'failed to add payment' */
                    return { paymentAdded: false, message: 'Failed to add payment' }
                  }
                })
                .catch(err => {
                  throw new Error(err)
                })
            }
          })
          .catch(clientExistsError => {
            throw new Error(clientExistsError)
          })
      })
    } catch (e) {
      return Promise.reject(e)
    }
  }

  /* Function to check whether a transaction is currently ongoing or not */
  static async checkOngoingTransaction (req) {
    try {
      return await MODEL.sequelize.transaction(async (t) => {
        /* Get the user and client details */
        const USER = await User.findOne({
          where: {
            email: req.email.toLowerCase()
          },
          attributes: ['id']
        }, { transaction: t })
        const CLIENT = await Client.findOne({
          where: {
            userId: USER.id
          },
          attributes: ['id'],
          raw: true
        })
        /* Then search for the client payment details before checking its status */
        return await ClientPayment.findAll({
          where: {
            clientId: CLIENT.id,
            orderId: req.orderId,
            mobile: req.mobile,
            amount: req.totalAmount
          },
          attributes: ['id', 'updatedAt'],
          include: [
            {
              model: PaymentStatus,
              as: 'PaymentStatus',
              attributes: ['status']
            }
          ]
        })
          .then(async exists => {
            /* If it exists, then check whether it is ongoing */
            if (exists.length > 0) {
              const PROCESSING_PAYMENT_TRANS_EXISTS = exists.filter(trans => trans.PaymentStatus.status === 'Processing payment')
              /* If the transaction is currently processing payments */
              if (PROCESSING_PAYMENT_TRANS_EXISTS.length > 0) {
                /* Check the time that has lapsed between the time the transaction was started, and now.
                * If the transaction has lasted more than two minutes, then we assume that there was no
                * activity here, and that we can start another transaction. However, there is still for
                * improvement here. */
                /* TODO: There seems to be a bug in this functionality. The first request always shows
                *  that there is no transaction that is pending, regardless of whether the last transaction
                * has lasted more than 2 minutes or not. The second request tends to work well, mysteriously
                * so */
                /* Get the time updated */
                const TIME_UPDATED = new Date(PROCESSING_PAYMENT_TRANS_EXISTS[0].updatedAt).getTime()
                /* And the current time */
                const CURRENT_TIME = new Date().getTime()
                /* Then calculate the time difference in milliseconds */
                const TIME_DIFFERENCE = CURRENT_TIME - TIME_UPDATED
                /* Get the time difference in minutes */
                const TIME_DIFFERENCE_IN_MINUTES = Math.floor(TIME_DIFFERENCE / 1000 / 60)
                /* If it is more than 2 minutes, then update the order payment status to having failed
                * before returning a response that the transaction is not ongoing */
                if (TIME_DIFFERENCE_IN_MINUTES >= 2) {
                  const PROCESS_PAYMENT_OR_DERPAYMENT_STATUS = await PaymentStatus.findOne({
                    where: {
                      status: 'Processing payment'
                    },
                    attributes: ['id'],
                    raw: true
                  })
                  const ORDER_PAYMENT_STATUS = await PaymentStatus.findOne({
                    where: {
                      status: 'Failed'
                    },
                    attributes: ['id'],
                    raw: true
                  })
                  /* Update the client payment status to failed */
                  return await ClientPayment.update({
                    statusId: ORDER_PAYMENT_STATUS.id
                  }, {
                    where: {
                      orderId: req.orderId,
                      clientId: CLIENT.id,
                      mobile: req.mobile,
                      amount: req.totalAmount,
                      statusId: PROCESS_PAYMENT_OR_DERPAYMENT_STATUS.id
                    }
                  }, { transaction: t })
                    .then(async updatedPaymentRes => {
                      /* Then return the ongoing status as false */
                      /* TODO: To confirm whether this update fixes the bug described above */
                      return { ongoing: !updatedPaymentRes }
                    })
                    .catch(updatedPaymentStatusError => {
                      throw new Error(updatedPaymentStatusError)
                    })
                } else {
                  return { ongoing: true }
                }
              } else {
                /* Else the transaction is not ongoing */
                return { ongoing: false }
              }
            } else {
              /* Else the transaction is not ongoing */
              return { ongoing: false }
            }
          })
          .catch(clientExistsError => {
            throw new Error(clientExistsError)
          })
      })
    } catch (e) {
      return Promise.reject(e)
    }
  }

  /* Function that updates the client order payment upon getting a response from MPESA */
  static async updateClientOrderPayment (req) {
    try {
      return await MODEL.sequelize.transaction(async (t) => {
        /* As usual, first the client payment details, and transaction ID of that payment detail record */
        const ORDER_DETAILS = await ClientPayment.findOne({
          where: {
            checkoutRequestId: req.CheckoutRequestID
          },
          attributes: ['orderId', 'amount'],
          raw: true
        })
        const TRANSACTION_ID = await ClientPayment.findOne({
          where: {
            checkoutRequestId: req.CheckoutRequestID
          },
          attributes: ['transactionId']
        })
        /* Two options here:
        * Either the req resultcode is 0 or not. 0 here means success. Others mean different kinds of errors */
        /* In case it is 0, then save the success of the transaction */
        if (req.ResultCode === 0) {
          /* Extract callback items from the MPESA message, before getting the result code from the list
          * saved in the MPESAResultCode tables */
          const CALLBACK_ITEMS = req.CallbackMetadata?.Item
          const MPESA_RESULT_CODE = await MPESAResultCode.findOne({
            where: {
              resultCode: req.ResultCode
            },
            attributes: ['id'],
            raw: true
          })
          /* Then create the MPESA record */
          return await MPESA.create({
            checkoutRequestId: req.CheckoutRequestID,
            merchantRequestId: req.MerchantRequestID,
            amount: CALLBACK_ITEMS.filter(item => item.Name === 'Amount')[0].Value,
            receiptNumber: CALLBACK_ITEMS.filter(item => item.Name === 'MpesaReceiptNumber')[0].Value,
            transactionDate: CALLBACK_ITEMS.filter(item => item.Name === 'TransactionDate')[0].Value,
            mobile: CALLBACK_ITEMS.filter(item => item.Name === 'PhoneNumber')[0].Value,
            resultCodeId: MPESA_RESULT_CODE.id
          })
            .then(async mpesaRecordAdded => {
              /* If the creation of the record succeeds, then update the payment status, plus the order status */
              if (mpesaRecordAdded) {
                /* If the order details exist, plus the orderID exists, then update the status */
                if (ORDER_DETAILS && ORDER_DETAILS.orderId) {
                  /* First get the ACTUAL_ORDER_TOTAL_COST */
                  const ACTUAL_ORDER_TOTAL_COST = await OrderPaymentDetail.findOne({
                    where: {
                      orderId: ORDER_DETAILS.orderId
                    },
                    attributes: ['totalPrice'],
                    raw: true
                  })
                  /* Check if the ACTUAL_ORDER_TOTAL_COST matches the cost in the order details */
                  if (ACTUAL_ORDER_TOTAL_COST.totalPrice === ORDER_DETAILS.amount) {
                    /* If it does, then continue with the process because it shows that the transaction is
                    * legitimate */
                    /* Get the success order payment status */
                    const ORDER_PAYMENT_STATUS = await PaymentStatus.findOne({
                      where: {
                        status: 'Success'
                      },
                      attributes: ['id'],
                      raw: true
                    })
                    /* Then use it to update the client payment status */
                    return await ClientPayment.update({
                      statusId: ORDER_PAYMENT_STATUS.id
                    }, {
                      where: {
                        orderId: ORDER_DETAILS.orderId,
                        checkoutRequestId: req.CheckoutRequestID,
                        amount: CALLBACK_ITEMS.filter(item => item.Name === 'Amount')[0].Value,
                        mobile: CALLBACK_ITEMS.filter(item => item.Name === 'PhoneNumber')[0].Value
                      }
                    }, { transaction: t })
                      .then(async updatedPayment => {
                        /* In case it updates successfully, then get the ongoing order status */
                        if (updatedPayment) {
                          /* check if a writer has already been assigned */
                          const WRITER_ALREADY_ASSIGNED = await WriterOrder.findOne({
                            where: {
                              orderId: ORDER_DETAILS.orderId
                            },
                            attributes: ['id'],
                            raw: true
                          })
                          let paymentStatus
                          if (WRITER_ALREADY_ASSIGNED) {
                            paymentStatus = 'Ongoing'
                          } else {
                            paymentStatus = 'Available'
                          }
                          const ONGOING_STATUS = await OrderStatus.findOne({
                            where: {
                              status: paymentStatus
                            },
                            attributes: ['id'],
                            raw: true
                          })
                          /* Then use it to update the order status to ongoing */
                          return await Order.update({
                            statusId: ONGOING_STATUS.id
                          }, {
                            where: {
                              id: ORDER_DETAILS.orderId
                            }
                          })
                            .then(orderUpdated => {
                              /* Once updated, return that the payment has been updated successfully, together with
                              * the transaction id */
                              if (orderUpdated) {
                                return { paymentUpdated: true, trId: TRANSACTION_ID.transactionId }
                              } else {
                                /* Else return a false payment updated status, message and transaction ID */
                                return { paymentUpdated: false, trId: TRANSACTION_ID.transactionId, message: 'Failed to update order status' }
                              }
                            })
                            .catch(orderUpdatedError => {
                              throw new Error(orderUpdatedError)
                            })
                        } else {
                          /* Else return a false paymentUpdated status, plus transaction ID and message */
                          return { paymentUpdated: false, trId: TRANSACTION_ID.transactionId, message: 'Failed to update payment' }
                        }
                      })
                      .catch(updatedPaymentError => {
                        throw new Error(updatedPaymentError)
                      })
                  } else {
                    return { paymentUpdated: false, trId: TRANSACTION_ID.transactionId, message: 'Amount paid is different from the actual amount' }
                  }
                } else {
                  return { paymentUpdated: false, trId: TRANSACTION_ID.transactionId, message: 'Record does not exist' }
                }
              } else {
                return { paymentUpdated: false, trId: TRANSACTION_ID.transactionId, message: 'Failed to add MPESA record' }
              }
            })
            .catch(failedToAddRecord => {
              throw new Error(failedToAddRecord)
            })
        } else {
          /* Else save the failure of the transaction */
          if (ORDER_DETAILS.orderId) {
            /* For now, we are only saving two statuses, cancelled by the user and failed */
            /* TODO: To include saving all the other failed statuses such as insufficient balance etc */
            let orderStatus
            /* For now, the order status can either be 'Request cancelled by user' or 'Failed' */
            if (req.ResultDesc === 'Request cancelled by user') {
              orderStatus = 'User cancelled'
            } else {
              orderStatus = 'Failed'
            }
            /* Get the specified order payment status */
            const ORDER_PAYMENT_STATUS = await PaymentStatus.findOne({
              where: {
                status: orderStatus
              },
              attributes: ['id'],
              raw: true
            })
            /* Then use it to update the client payment status */
            return await ClientPayment.update({
              statusId: ORDER_PAYMENT_STATUS.id
            }, {
              where: {
                orderId: ORDER_DETAILS.orderId,
                checkoutRequestId: req.CheckoutRequestID
              }
            }, { transaction: t })
              .then(async updatedPaymentStatus => {
                /* Then as above, return a true payment status and transaction ID */
                if (updatedPaymentStatus) {
                  return { paymentUpdated: true, trId: TRANSACTION_ID.transactionId }
                } else {
                  /* Or a false payment status ID */
                  return { paymentUpdated: false, trId: TRANSACTION_ID.transactionId, message: 'Failed to update payment' }
                }
              })
              .catch(updatedPaymentError => {
                throw new Error(updatedPaymentError)
              })
          } else {
            return { paymentUpdated: false, trId: TRANSACTION_ID.transactionId, message: 'Failed to update payment' }
          }
        }
      })
    } catch (e) {
      return Promise.reject(e)
    }
  }

  /* Function to check the payment status of an order */
  static async checkOrderPaymentStatus (req) {
    try {
      return await MODEL.sequelize.transaction(async (t) => {
        /* Simply query the client payment status by a given transaction ID */
        return await ClientPayment.findOne({
          where: {
            transactionId: req.trId
          },
          include: [
            {
              model: PaymentStatus,
              as: 'PaymentStatus',
              attributes: ['status']
            }
          ]
        }, { transaction: t })
          .then(response => {
            /* Then return the status */
            return {
              paymentStatus: response.PaymentStatus.status
            }
          })
          .catch(error => {
            throw new Error(error)
          })
      })
    } catch (e) {
      return Promise.reject(e)
    }
  }

  /* Function to check if an order has already been paid for */
  static async checkIfOrderIsAlreadyPaid (req) {
    try {
      return await MODEL.sequelize.transaction(async (t) => {
        /* Get the order */
        return await Order.findOne({
          where: {
            id: req.orderId
          },
          include: [
            {
              model: OrderStatus,
              as: 'OrderStatus',
              attributes: ['status']
            }
          ]
        }, { transaction: t })
          .then(async response => {
            const ORDER_PAYMENT_STATUS = await PaymentStatus.findOne({
              where: {
                status: 'Success'
              },
              attributes: ['id'],
              raw: true
            })
            const ORDER_IS_ALREADY_PAID_FOR = await ClientPayment.findOne({
              where: {
                statusId: ORDER_PAYMENT_STATUS.id,
                orderId: req.orderId
              },
              attributes: ['id']
            })
            if (ORDER_IS_ALREADY_PAID_FOR) {
              return { orderAlreadyPaidFor: true }
            }
            /* Then check if its status is among the list of 'Already paid for' statuses below */
            const UNPAID_ORDERS_STATUSES = ['Pending payment', 'Pending writer acknowledgement', 'Available', 'Bidding ongoing']
            if (!UNPAID_ORDERS_STATUSES.includes(response.OrderStatus.status)) {
              return { orderAlreadyPaidFor: true }
            } else {
              return { orderAlreadyPaidFor: false }
            }
          })
          .catch(error => {
            throw new Error(error)
          })
      })
    } catch (e) {
      return Promise.reject(e)
    }
  }

  /* Function to get price ratios that help calculate the total price of an order, and its discount  */
  static async getPriceRatios (req) {
    try {
      return await MODEL.sequelize.transaction(async () => {
        /* First get the tier, serviceType and discount by the assignment type */
        const [TIER, SERVICE_TYPE, DISCOUNT] = await Promise.all([
          AssignmentType.findOne({
            where: {
              id: req.assignmentType
            },
            attributes: ['tier']
          }),
          OrderServiceType.findOne({
            where: {
              type: req.serviceType
            },
            attributes: ['id']
          }),
          PaperDiscount.findOne({
            where: {
              lowerLimit: {
                [Op.lte]: req.pageCount
              },
              upperLimit: {
                [Op.gte]: req.pageCount
              }
            },
            attributes: ['discount']
          })
        ])
        /* Then use the service type and tier to get the price ratio */
        const PRICE_RATIO = await PriceIncrement.findOne({
          where: {
            serviceType: SERVICE_TYPE.id,
            tier: TIER.tier
          },
          attributes: {
            exclude: ['isDeleted', 'createdAt', 'updatedAt']
          }
        })
        /* Declare the discount. An order can only have a discount if it is more than one page */
        const FINAL_DISCOUNT = req.pageCount === 1 ? 0 : DISCOUNT
        /* Then get the base price again using the tier and serviceType
        * The BasePrice here is different from the price ratio. There is a base price for every
        * assignment type and tier. */
        return await BasePrice.findOne({
          where: {
            tier: TIER.tier,
            serviceType: SERVICE_TYPE.id
          },
          attributes: ['price'],
          include: [
            {
              model: Currency,
              as: 'Currency',
              attributes: ['currencyCode']
            }
          ]
        })
          .then(price => {
            return {
              price: price,
              discount: FINAL_DISCOUNT,
              priceRatio: PRICE_RATIO
            }
          })
          .catch(error => {
            return Promise.reject(error)
          })
      })
    } catch (e) {
      return Promise.reject(e)
    }
  }
}

module.exports = PaymentHelper
