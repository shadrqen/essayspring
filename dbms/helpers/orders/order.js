'use strict'

/* Module that handles the logic that is primarily linked or related to an order */

/* Importing the index model that will be used to access the sequelize instance, which will in turn help create
* sequelize transactions */
const model = require('../../models/index')

/* Importing all the sequelize models that will be used in the module */
const {
  AcademicCertification,
  AccountStatus,
  AssignmentType,
  AssignmentTypeCategory,
  Client,
  ClientOrderPostingStep,
  ClientPayment,
  ClientWriter,
  CitationStyle,
  Country,
  Currency,
  Discipline,
  EducationLevel,
  EntityType,
  Gender,
  GrammarAnswer,
  GrammarQuestion,
  Order,
  OrderBid,
  OrderFile,
  OrderFileType,
  OrderFormat,
  OrderPaymentDetail,
  OrderRevision,
  OrderServiceType,
  OrderStatus,
  PaperDiscount,
  SubmissionChecklist,
  TimeAmPm,
  Writer,
  WriterOrder,
  WriterAverageRating,
  WriterInvitation,
  WriterRating,
  PaymentStatus,
  User
} = require('../../models')

/* Importing the 'Op' operator in sequelize, which is used to conduct greater-than, less-than e.t.c operations
* It makes use of static functions to enable calling them on the class themselves
* directly, as opposed to creating a class instance then calling them on the instance */
const { Op } = require('sequelize')

/* The class that handles the order logic */
class OrdersHelper {
  /* Function that gets all countries */
  static async getAllCountries () {
    try {
      return await Country.findAll({
        attributes: ['id', 'country', 'countryCode'],
        raw: true
      })
        .then(countries => /* Return countries */ countries)
        .catch(error => {
          /* Throw error in case the findAll function fails */
          throw new Error(error)
        })
    } catch (e) {
      /* Return rejected promise */
      return Promise.reject(e)
    }
  }

  /* Function that gets all discplines */
  static async getAllDisciplines () {
    try {
      return await Discipline.findAll({
        attributes: ['id', 'discipline'],
        raw: true
      })
        .then(disciplines => disciplines)
        .catch(error => {
          throw new Error(error)
        })
    } catch (e) {
      return Promise.reject(e)
    }
  }

  /* Function that gets all assignment types */
  static async getAssignmentTypes () {
    try {
      return await AssignmentType.findAll({
        attributes: ['id', 'type'],
        include: [
          {
            model: AssignmentTypeCategory,
            as: 'AssignmentTypeCategory',
            attributes: ['category']
          }
        ],
        raw: true
      })
        .then(types => types)
        .catch(error => {
          throw new Error(error)
        })
    } catch (e) {
      return Promise.reject(e)
    }
  }

  /* Function that fetches levels of education */
  static async getEducationLevels (req) {
    try {
      /* Get the levels that are related to academics such as primary, secondary school etc */
      if (req.academicInclined) {
        return await EducationLevel.findAll({
          where: {
            academicInclined: req.academicInclined
          },
          attributes: ['id', 'level'],
          raw: true
        })
          .then(levels => levels)
          .catch(error => {
            throw new Error(error)
          })
      } else {
        /* Get the levels that are not related to academics but are specifically designed
         to group orders such as bachelors e.t.c */
        return await EducationLevel.findAll({
          where: {
            orderInclined: req.orderInclined
          },
          attributes: ['id', 'level'],
          raw: true
        })
          .then(levels => levels)
          .catch(error => {
            throw new Error(error)
          })
      }
    } catch (e) {
      return Promise.reject(e)
    }
  }

  /* Function that fetches the time in Am-Pm from the table */
  static async getAllTime () {
    try {
      return await TimeAmPm.findAll({
        attributes: ['id', 'time'],
        raw: true
      })
        .then(time => time)
        .catch(error => {
          throw new Error(error)
        })
    } catch (e) {
      return Promise.reject(e)
    }
  }

  /* Function that gets order service types */
  static async getSpecificOrderServiceTypes (req) {
    try {
      return await OrderServiceType.findAll({
        where: {
          extra: req.extra
        },
        attributes: ['id', 'type', 'description', 'price'],
        include: [
          {
            model: Currency,
            as: 'Currency',
            attributes: ['currencyCode']
          }
        ],
        /* Order by id in ascending order */
        order: [
          ['id', 'ASC']
        ]
      })
        .then(types => types)
        .catch(error => {
          throw new Error(error)
        })
    } catch (e) {
      return Promise.reject(e)
    }
  }

  /* Function that gets a select number of grammar questions from a pool of questions */
  static async getSelectedGrammarQuestions () {
    try {
      /* Get questions */
      const questions = await GrammarQuestion.findAll({
        attributes: ['id', 'instruction', 'question', 'correctAnswerId']
      })
      /* And their answers */
      const answers = await GrammarAnswer.findAll({
        attributes: ['id', 'answer', 'questionId', 'answerLetter']
      })
      return { answers: answers, questions: questions }
    } catch (e) {
      return Promise.reject(e)
    }
  }

  /* Function that fetches all genders - male and female */
  static async getAllGenders () {
    try {
      return await Gender.findAll({
        attributes: ['id', 'gender'],
        raw: true
      })
        .then(genders => genders)
        .catch(error => {
          throw new Error(error)
        })
    } catch (e) {
      return Promise.reject(e)
    }
  }

  /* Function that gets citation styles */
  static async getAllCitationStyles () {
    try {
      return await CitationStyle.findAll({
        attributes: ['id', 'citation'],
        raw: true
      })
        .then(styles => styles)
        .catch(error => {
          throw new Error(error)
        })
    } catch (e) {
      return Promise.reject(e)
    }
  }

  /* Function that gets all order formats */
  static async getAllOrderFormats () {
    try {
      return await OrderFormat.findAll({
        attributes: ['id', 'wordsPerPage', 'spacing', 'currentlyInUse'],
        raw: true
      })
        .then(formats => formats)
        .catch(error => {
          throw new Error(error)
        })
    } catch (e) {
      return Promise.reject(e)
    }
  }

  /* Function that returns all acedmic certifications */
  static async getAllAcademicCertifications () {
    try {
      return await AcademicCertification.findAll({
        attributes: ['id', 'achievement'],
        raw: true
      })
        .then(certifications => certifications)
        .catch(error => {
          throw new Error(error)
        })
    } catch (e) {
      return Promise.reject(e)
    }
  }

  /* Function to get email addresses of active writers */
  static async getActiveWritersEmails () {
    try {
      return await model.sequelize.transaction(async t => {
        /* Getting the email addresses of all active writers */
        /* First the active status id */
        const activeStatus = await AccountStatus.findOne({
          where: {
            status: 'Active'
          },
          attributes: ['id']
        })
        return await Writer.findAll({
          attributes: ['id'],
          include: [
            {
              model: User,
              as: 'User',
              attributes: ['email'],
              where: {
                accountStatus: activeStatus.id
              }
            }
          ]
        })
          .then(emails => emails)
          .catch(emailsError => emailsError)
      })
    } catch (e) {
      return Promise.reject(e)
    }
  }

  /* Function that saves order details - creates or updates records upon placement of an order by a client */
  static async saveOrderDetails (req) {
    try {
      /* Using a transaction:
      * A transaction helps to automatically rollback the transaction if any error is thrown,
      * or commit the transaction otherwise.  */
      return await model.sequelize.transaction(async t => {
        /* Get a user using his or her email */
        const user = await User.findOne({
          attributes: ['id'],
          where: {
            email: req.email.toLowerCase()
          }
        }, { transaction: t })
        /* Get clientId and other Ids to be used in the creation or updating of a record using the Promise.all
        * function */
        const [clientId, serviceTypeId, orderStatusId, orderFormatId] = await Promise.all([
          Client.findOne({
            attributes: ['id'],
            raw: true,
            where: {
              userId: user.id
            }
          }, { transaction: t }),
          OrderServiceType.findOne({
            attributes: ['id'],
            raw: true,
            where: {
              type: req.serviceType
            }
          }, { transaction: t }),
          OrderStatus.findOne({
            attributes: ['id'],
            raw: true,
            where: {
              status: 'Available'
            }
          }, { transaction: t }),
          OrderFormat.findOne({
            attributes: ['id'],
            raw: true,
            where: {
              currentlyInUse: true
            }
          }, { transaction: t })
        ])
        let orderTypeGen
        /* Get order type */
        if (req.type === 'public') {
          orderTypeGen = 'Public'
        } else {
          orderTypeGen = 'Private'
        }
        const orderType = await EntityType.findOne({
          where: {
            type: orderTypeGen
          },
          attributes: ['id']
        })
        /* If a record exists already, then update it */
        if (req.orderId > 0) {
          /* Update Order record where its id matches a given order Id */
          return await Order.update({
            clientId: clientId.id,
            serviceTypeId: serviceTypeId.id,
            type: orderType.id,
            statusId: orderStatusId.id,
            subjectId: req.paperSubject,
            assignmentType: req.assignmentType,
            citationStyleId: req.citationStyleId,
            orderFormatId: orderFormatId.id,
            studyLevelId: req.studyLevel,
            deadlineDate: req.deadlineDate,
            deadlineTime: req.deadlineTime,
            pageCount: req.pageCount,
            sources: req.sources,
            topic: req.topic,
            instructions: req.instructions
          }, {
            where: {
              id: req.orderId
            }
          }, { transaction: t })
            .then(async () => {
              /* Also update the client's order posting step */
              await ClientOrderPostingStep.update({
                lastStep: 1
              }, {
                where: {
                  orderId: req.orderId
                }
              }, { transaction: t })
              /* First get an order file type (Client Supporting) then use it in updating supporting files */
              const orderFileType = await OrderFileType.findOne({
                where: {
                  type: 'Client Supporting'
                },
                attributes: ['id']
              })
              /* Loop through the posted supporting files then add if it does not exist already in the database */
              for (let i = 0; i < req.supportingFiles.length; i++) {
                /* First check whether the file already exists in the database */
                await OrderFile.findOne({
                  attributes: ['id'],
                  where: {
                    orderId: req.orderId,
                    fileUrl: req.supportingFiles[i].fileUrl,
                    type: orderFileType.id
                  }
                }, { transaction: t })
                  .then(async fileExists => {
                    /* If it does not exist, then create a record */
                    if (!fileExists) {
                      /* Final original name in this case is formatted not to exceed 50 characters
                      * It shortens a name that exceeds 50 characters and does nothing to those which are less
                      * than that. The length includes the file extension */
                      const finalOriginalName = OrdersHelper.originalNameFormatter(req.supportingFiles[i].originalName)
                      /* Create an OrderFile record */
                      await OrderFile.create({
                        orderId: req.orderId,
                        fileUrl: req.supportingFiles[i].fileUrl,
                        originalName: finalOriginalName,
                        type: orderFileType.id
                      }, { transaction: t })
                        /* Do nothing after creation, just continue with the loop to the end */
                        .then(() => {})
                        .catch(error => {
                          throw new Error(error)
                        })
                    }
                  })
              }
              /* The updateOrderPayment function updates the payment details or status of an order.
              * The details are found in the function itself */
              return OrdersHelper.updateOrderPayment(req, 'place-order', null)
            })
            .catch(error => {
              throw new Error(error)
            })
        } else {
          /* Else create one */
          return await Order.create({
            clientId: clientId.id,
            serviceTypeId: serviceTypeId.id,
            type: orderType.id,
            statusId: orderStatusId.id,
            subjectId: req.paperSubject,
            assignmentType: req.assignmentType,
            citationStyleId: req.citationStyleId,
            orderFormatId: orderFormatId.id,
            studyLevelId: req.studyLevel,
            deadlineDate: req.deadlineDate,
            deadlineTime: req.deadlineTime,
            pageCount: req.pageCount,
            sources: req.sources,
            topic: req.topic,
            instructions: req.instructions
          }, { transaction: t })
            .then(async res => {
              /* Then do the same thing as in the update order above */
              await ClientOrderPostingStep.create({
                clientId: clientId.id,
                orderId: res.dataValues.id,
                lastStep: 1
              }, { transaction: t })
              /* Create orderFile records by looping through the list of files in the request if the supporting files
              * length exceeds 0 - i.e. it exists */
              if (req.supportingFiles.length > 0) {
                const orderFileType = await OrderFileType.findOne({
                  where: {
                    type: 'Client Supporting'
                  },
                  attributes: ['id']
                })
                /* Loop through the supporting files */
                for (let i = 0; i < req.supportingFiles.length; i++) {
                  /* Format the original name before saving */
                  const finalOriginalName = OrdersHelper.originalNameFormatter(req.supportingFiles[i].originalName)
                  /* Create an order file record */
                  await OrderFile.create({
                    orderId: res.dataValues.id,
                    fileUrl: req.supportingFiles[i].fileUrl,
                    originalName: finalOriginalName,
                    type: orderFileType.id
                  }, { transaction: t })
                    /* Do nothing on success */
                    .then(() => {})
                    /* But throw on error */
                    .catch(error => {
                      throw new Error(error)
                    })
                }
              }
              /* Record the order's payment details by first getting the currency code ID */
              const currencyId = await Currency.findOne({
                attributes: ['id'],
                where: {
                  currencyCode: req.paymentSummary.currencyCode
                },
                raw: true
              }, { transaction: t })
              /* Then get payment extras IDs */
              const extrasIds = req.paymentSummary.extrasList.map(list => list.id)
              /* Create the order payment detail record */
              return await OrderPaymentDetail.create({
                orderId: res.dataValues.id,
                currencyId: currencyId.id,
                extras: String(extrasIds),
                extrasTotalPrice: req.paymentSummary.extrasTotalPrice,
                totalPrice: req.paymentSummary.totalPrice,
                cpp: req.paymentSummary.cpp
              }, { transaction: t })
                .then(() => {
                  /* Return success, plus the orderID on success */
                  return {
                    response: 'success',
                    orderId: res.dataValues.id,
                    newOrder: true
                  }
                })
                /* Throw error */
                .catch(error => {
                  throw new Error(error)
                })
            })
            .catch(error => {
              throw new Error(error)
            })
        }
      })
    } catch (e) {
      console.log(e)
      return Promise.reject(e)
    }
  }

  /* Function that gets the order bids by orderID */
  static async getOrderBids (req) {
    try {
      return await model.sequelize.transaction(async t => {
        return await OrderBid.findAll({
          attributes: ['orderId'],
          where: {
            orderId: req.orderId
          },
          include: [
            {
              model: Writer,
              as: 'Writer',
              attributes: ['surname', 'otherNames'],
              include: [
                {
                  model: User,
                  as: 'User',
                  attributes: ['id']
                },
                {
                  model: WriterAverageRating,
                  as: 'WriterAverageRating',
                  attributes: ['rating']
                }
              ]
            }
          ]
        })
          .then(bids => {
            return { bids: bids }
          })
          .catch(error => Promise.reject(error))
      })
    } catch (e) {
      return Promise.reject(e)
    }
  }

  /* Function that gets personal writers */
  static async getPersonalWriters (req) {
    try {
      return await model.sequelize.transaction(async t => {
        const clientId = await OrdersHelper.getClientId(req.email)
        return await ClientWriter.findAll({
          attributes: ['id'],
          where: {
            clientId: clientId,
            connectionConfirmed: true
          },
          include: [
            {
              model: Writer,
              as: 'Writer',
              attributes: ['surname', 'otherNames'],
              include: [
                {
                  model: User,
                  as: 'User',
                  attributes: ['id']
                },
                {
                  model: WriterAverageRating,
                  as: 'WriterAverageRating',
                  attributes: ['rating']
                },
                {
                  model: WriterOrder,
                  as: 'WriterOrder',
                  attributes: ['id'],
                  include: [
                    {
                      model: Order,
                      as: 'Order',
                      attributes: ['id'],
                      include: [
                        {
                          model: OrderStatus,
                          as: 'OrderStatus',
                          attributes: ['id'],
                          where: {
                            status: 'Completed'
                          }
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        })
          .then(writers => writers)
          .catch(error => Promise.reject(error))
      })
    } catch (e) {
      return Promise.reject(e)
    }
  }

  /* Function that sends writers invites */
  static async sendWriterInvite (req) {
    try {
      return await model.sequelize.transaction(async t => {
        const clientId = await OrdersHelper.getClientId(req.email)
        const invitationAlreadyExists = await WriterInvitation.findOne({
          where: {
            email: req.writerEmail
          },
          attributes: ['id']
        })
        if (invitationAlreadyExists) {
          return { success: false, message: 'Invitation already exists!' }
        }
        return await WriterInvitation.create({
          email: req.writerEmail,
          clientId: clientId
        })
          .then(writers => {
            return {
              success: !!writers,
              message: 'Invitation sent successfully'
            }
          })
          .catch(error => Promise.reject(error))
      })
    } catch (e) {
      return Promise.reject(e)
    }
  }

  /* Function to remove a file from the database by changing its isDeleted column to True */
  static async removeFile (req) {
    try {
      return await model.sequelize.transaction(async t => {
        /* First the order file type - which is of type (Client Supporting) */
        const orderFileType = await OrderFileType.findOne({
          where: {
            type: 'Client Supporting'
          },
          attributes: ['id']
        })
        /* Then find if a record of such a file exists */
        return await OrderFile.findOne({
          attributes: ['id'],
          where: {
            orderId: req.orderId,
            fileUrl: req.filename,
            type: orderFileType.id
          }
        }, { transaction: t })
          .then(async file => {
            if (file) {
              /* If exists, then change its isDeleted value to True */
              return await OrderFile.update({
                isDeleted: true
              },
              {
                where: {
                  orderId: req.orderId,
                  fileUrl: req.filename,
                  type: orderFileType.id
                }
              }, { transaction: t })
                .then(updatedRecord => {
                  if (updatedRecord) {
                    return { itemDeleted: true }
                  } else {
                    return { itemDeleted: false, message: 'Failed to delete item' }
                  }
                })
                .catch(error => {
                  throw new Error(error)
                })
            } else {
              /* Otherwise, return the message that it was not found */
              return { itemDeleted: false, message: 'Item not found' }
            }
          })
      })
    } catch (e) {
      return Promise.reject(e)
    }
  }

  /* Function that updates payment */
  static async updateOrderPayment (req, phase, requestOrderId) {
    try {
      return await model.sequelize.transaction(async t => {
        let orderId
        /* First get a user */
        const user = await User.findOne({
          where: {
            email: req.email.toLowerCase()
          },
          attributes: ['id']
        }, { transaction: t })
        /* Then the client and currency IDs */
        const [clientId, currencyId] = await Promise.all([
          Client.findOne({
            where: {
              userId: user.id
            },
            attributes: ['id']
          }),
          Currency.findOne({
            attributes: ['id'],
            where: {
              currencyCode: req.paymentSummary.currencyCode
            },
            raw: true
          }, { transaction: t })
        ])
        /* If a record by that orderID exists, then find its corresponding payment detail */
        if (req.orderId > 0 || requestOrderId) {
          orderId = req.orderId || requestOrderId
          /* Find its corresponding payment detail */
          return await OrderPaymentDetail.findOne({
            where: {
              orderId: orderId
            },
            attributes: ['id']
          })
            .then(async orderPaymentId => {
              /* Get the extras IDs */
              const extrasIds = req.paymentSummary.extrasList.map(list => list.id)
              /* Then if the payment details exist, update */
              if (orderPaymentId) {
                /* Update the payment details where the orderID is the given orderId */
                return await OrderPaymentDetail.update({
                  currencyId: currencyId.id,
                  extras: String(extrasIds),
                  extrasTotalPrice: req.paymentSummary.extrasTotalPrice,
                  totalPrice: req.paymentSummary.totalPrice,
                  cpp: req.paymentSummary.cpp
                }, {
                  where: {
                    orderId: orderId
                  }
                }, { transaction: t })
                  .then(async () => {
                    /* Create a client order posting step if the phase is 'check order' */
                    if (phase === 'check-order') {
                      await ClientOrderPostingStep.create({
                        clientId: clientId.id,
                        orderId: orderId,
                        lastStep: 3
                      }, { transaction: t })
                    }
                    /* Then return success */
                    return {
                      response: 'success',
                      newOrder: false
                    }
                  })
                  .catch(error => {
                    throw new Error(error)
                  })
              } else {
                /* Else create an order payment detail */
                return await OrderPaymentDetail.create({
                  orderId: requestOrderId,
                  currencyId: currencyId.id,
                  extras: String(extrasIds),
                  extrasTotalPrice: req.paymentSummary.extrasTotalPrice,
                  totalPrice: req.paymentSummary.totalPrice,
                  cpp: req.paymentSummary.cpp
                }, { transaction: t })
                  .then(async () => {
                    /* Get an order details */
                    await Order.findOne({
                      where: {
                        id: orderId
                      },
                      attributes: ['clientId']
                    })
                      .then(async clientIdInner => {
                        /* Create a client order posting step if the phase is 'check order' */
                        if (phase === 'check-order') {
                          await ClientOrderPostingStep.create({
                            clientId: clientIdInner.clientId,
                            orderId: orderId,
                            lastStep: 3
                          }, { transaction: t })
                        }
                      })
                      .catch(error => {
                        throw new Error(error)
                      })
                    /* Return success */
                    return {
                      response: 'success',
                      orderId: orderId
                    }
                  })
                  .catch(error => {
                    throw new Error(error)
                  })
              }
            })
        } else {
          /* Else return that no order ID */
          return { response: 'no order ID' }
        }
      })
    } catch (e) {
      return Promise.reject(e)
    }
  }

  /* Function that saves an order payment details */
  static async saveOrderPaymentDetails (req) {
    /* Calls the updateOrderPayment function, which does the saving/updating */
    return OrdersHelper.updateOrderPayment(req, 'check-order', null)
  }

  /* Function that updates the order status */
  static async updateOrderStatus (req) {
    /* FIXME: add promises */
    try {
      return await model.sequelize.transaction(async t => {
        /* First check if order has already been paid for */
        const successPaymentStatus = await PaymentStatus.findOne({
          where: {
            status: 'Success'
          },
          attributes: ['id']
        })
        const orderAlreadyPaidFor = await ClientPayment.findOne({
          where: {
            orderId: req.orderId,
            statusId: successPaymentStatus.id
          }
        })
        let orderStatus
        if (orderAlreadyPaidFor) {
          orderStatus = 'Ongoing'
        } else {
          orderStatus = 'Pending payment'
        }
        if (req.type === 'private') {
          orderStatus = 'Ongoing'
        }
        /* First get the 'Pending payment' order status */
        const pendingPaymentStatus = await OrderStatus.findOne({
          where: {
            status: orderStatus
          },
          attributes: ['id'],
          raw: true
        })
        /* Then update the order status to the above status where the orderId is the one in the request */
        return await Order.update({
          statusId: pendingPaymentStatus.id
        }, {
          where: {
            id: req.orderId
          }
        }, { transaction: t })
          .then(async orderStatusUpdated => {
            /* If updated, then assign the order to a writer, or else bind the order to a writer,
            * but the order will be visible to the writer once the client has paid for the order fully */
            if (orderStatusUpdated) {
              /* Get the writer details */
              const writer = await Writer.findOne({
                where: {
                  userId: req.writerId
                },
                attributes: ['id']
              })
              /* Then check if he or she had already been assigned the order */
              const writerAlreadyChosen = await WriterOrder.findOne({
                where: {
                  orderId: req.orderId,
                  writerId: writer.id
                },
                attributes: ['id']
              })
              if (req.type === 'public') {
                /* Then update the order bid status to be successfull, where the orderId and writerId match */
                await OrderBid.update({
                  successful: true
                }, {
                  where: {
                    orderId: req.orderId,
                    writerId: writer.id
                  }
                }, { transaction: t })
              }
              /* If the writer had already been assigned the order, then well and good */
              if (writerAlreadyChosen) {
                return { statusUpdated: true, writerAlreadyChosen: true }
              } else {
                /* Otherwise, assign him or her the order - but this is pending the payment of the order by a client */
                return await WriterOrder.create({
                  orderId: req.orderId,
                  writerId: writer.id
                }, { transaction: t })
                  .then(writerAssigned => {
                    /* Return the assignment status */
                    if (writerAssigned) {
                      return { statusUpdated: true, writerAlreadyChosen: false }
                    } else {
                      return { statusUpdated: false, writerAlreadyChosen: false }
                    }
                  })
              }
            } else {
              /* Return false and failed to update order status in case it fails to update the status */
              return {
                statusUpdated: false,
                message: 'Failed to update order status',
                writerAlreadyChosen: false
              }
            }
          })
          .catch(orderUpdatedError => {
            throw new Error(orderUpdatedError)
          })
      })
    } catch (e) {
      return Promise.reject(e)
    }
  }

  /* Function that gets the client by email */
  static async getClientId (email) {
    /* Helps to return the client ID by email, reducing the need to duplicate such code - owing to the fact that
    * there are many places in the program that needs to have the client ID, by providing the email address */
    const user = await User.findOne({
      where: {
        email: email.toLowerCase()
      },
      attributes: ['id']
    })
    return await Client.findOne({
      where: {
        userId: user.id
      },
      attributes: ['id'],
      raw: true
    })
      .then(user => user.id)
      .catch(error => Promise.reject(error))
  }

  /* Function that gets the client by email */
  static async rateWriter (req) {
    /* Helps to return the client ID by email, reducing the need to duplicate such code - owing to the fact that
    * there are many places in the program that needs to have the client ID, by providing the email address */
    const orderAlreadyRated = await WriterRating.findOne({
      where: {
        orderId: req.orderId
      },
      attributes: ['id']
    })
    if (orderAlreadyRated) {
      return { rated: true }
    }
    const writer = await WriterOrder.findOne({
      where: {
        orderId: req.orderId
      },
      attributes: ['writerId']
    })
    const writerRatedOnOrderAlready = await WriterRating.findOne({
      where: {
        orderId: req.orderId,
        writerId: writer.writerId
      },
      attributes: ['writerId']
    })
    if (writerRatedOnOrderAlready) {
      return true
    } else {
      return await WriterRating.create({
        orderId: req.orderId,
        writerId: writer.writerId,
        rating: req.rating
      })
        .then(async rated => {
          if (rated) {
            const averageRating = await WriterAverageRating.findOne({
              where: {
                writerId: writer.writerId
              },
              attributes: ['rating']
            })
            if (averageRating) {
              const previousRatings = await WriterRating.findAll({
                where: {
                  writerId: writer.writerId
                },
                attributes: ['id']
              })
              const totalRating = ((averageRating.rating * (previousRatings.length - 1)) + req.rating)
              const newAverageRating = totalRating / previousRatings.length
              return await WriterAverageRating.update({
                rating: newAverageRating
              }, {
                where: {
                  writerId: writer.writerId
                }
              })
                .then(writerRatingAdded => !!writerRatingAdded)
                .catch(failedToAddRating => {
                  throw new Error(failedToAddRating)
                })
            } else {
              return await WriterAverageRating.create({
                writerId: writer.writerId,
                rating: req.rating
              })
                .then(writerRatingAdded => !!writerRatingAdded)
                .catch(failedToAddRating => {
                  throw new Error(failedToAddRating)
                })
            }
          } else {
            return false
          }
        })
        .catch(error => Promise.reject(error))
    }
  }

  /* Function that gets a clients' orders */
  static async getOrders (req) {
    try {
      /* Get the clientID first by calling the above method */
      const clientId = await OrdersHelper.getClientId(req.email)
      /* Multiple here is used to know whether a request wants get one or more orders, or
      * wants to get the details of a selected order */
      /* In case a request wants to get a client's order(s) - req.multiple will be true in this instance */
      if (req.multiple) {
        /* Find a client's orders by client ID */
        return await Order.findAll({
          where: {
            clientId: clientId,
            isDeleted: false
          },
          attributes: ['id', 'deadlineDate', 'deadlineTime', 'pageCount', 'topic'],
          /* Include a myriad of linked tables such as education level, order status etc */
          include: [
            {
              model: OrderStatus,
              as: 'OrderStatus',
              attributes: ['status'],
              where: {
                id: req.orderStatusID ? req.orderStatusID : { [Op.gt]: 0 }
              }
            },
            {
              model: Discipline,
              as: 'Discipline',
              attributes: ['discipline']
            },
            {
              model: EducationLevel,
              as: 'EducationLevel',
              attributes: ['level', 'academicInclined', 'orderInclined']
            },
            {
              model: TimeAmPm,
              as: 'TimeAmPm',
              attributes: ['time']
            },
            {
              model: OrderPaymentDetail,
              as: 'OrderPaymentDetail',
              attributes: ['totalPrice', 'cpp'],
              /* Layer 2 inclusion, include Currency as child of OrderPaymentDetail */
              include: [
                {
                  model: Currency,
                  as: 'Currency',
                  attributes: ['currencyCode']
                }
              ]
            }
          ]
        })
          .then(orders => {
            /* Return orders */
            return { orders: orders }
          })
          .catch(error => /* Else return a rejected promise */ Promise.reject(error))
      } else {
        /* Else if a requests does not want multiple orders, then get the details of one selected order */
        return await Order.findOne({
          where: {
            clientId: clientId,
            id: req.orderId
          },
          attributes: ['id', 'deadlineDate', 'deadlineTime', 'pageCount', 'topic', 'instructions'],
          /* Get linked tables */
          include: [
            {
              model: OrderServiceType,
              as: 'OrderServiceType',
              attributes: ['type']
            },
            {
              model: OrderStatus,
              as: 'OrderStatus',
              attributes: ['status']
            },
            {
              model: Discipline,
              as: 'Discipline',
              attributes: ['discipline']
            },
            {
              model: CitationStyle,
              as: 'CitationStyle',
              attributes: ['citation']
            },
            {
              model: OrderFormat,
              as: 'OrderFormat',
              attributes: ['wordsPerPage', 'spacing'],
              where: {
                currentlyInUse: true
              }
            },
            {
              model: EducationLevel,
              as: 'EducationLevel',
              attributes: ['level', 'academicInclined', 'orderInclined']
            },
            {
              model: TimeAmPm,
              as: 'TimeAmPm',
              attributes: ['time']
            },
            {
              model: OrderFile,
              as: 'OrderFile',
              where: {
                isDeleted: false
              },
              required: false,
              attributes: ['fileUrl', 'originalName', 'submittedPaper', 'createdAt'],
              order: [
                ['createdAt', 'DESC']
              ],
              include: [
                {
                  model: OrderFileType,
                  as: 'OrderFileType',
                  attributes: ['type']
                }
              ]
            },
            {
              model: OrderPaymentDetail,
              as: 'OrderPaymentDetail',
              attributes: ['totalPrice', 'cpp'],
              include: [
                {
                  model: Currency,
                  as: 'Currency',
                  attributes: ['currencyCode']
                }
              ]
            }
          ]
        })
          .then(async order => {
            let revisionInstructions, submissionChecklist
            /* Get order revision instructions if an order is revisable - revisable here means that an order
            * is currently under revision, or is at a position where a client can request revision */
            const revisableOrderStatuses = ['Completed', 'Submitted', 'Undergoing revision']
            /* Check if an order is revisable */
            if (revisableOrderStatuses.includes(order.dataValues.OrderStatus.dataValues.status)) {
              /* Get the revision instructions */
              revisionInstructions = await OrderRevision.findAll({
                where: {
                  orderId: req.orderId,
                  submitted: false
                },
                attributes: ['revisionInstructions', 'deadline']
              })
              /* Also the submission checklist, which is a guide that provides direction to a client on how to
              * go about requesting a revision */
              submissionChecklist = await SubmissionChecklist.findAll({
                attributes: ['aspect', 'aspectDescription']
              })
            }
            const rated = await WriterRating.findOne({
              where: {
                orderId: req.orderId
              },
              attributes: ['rating']
            })
            /* Return order, revision instructions and submission checklist */
            return {
              details: order,
              revisionInstructions: revisionInstructions,
              submissionChecklist: submissionChecklist,
              rated: !!rated
            }
          })
          .catch(error => Promise.reject(error))
      }
    } catch (e) {
      return Promise.reject(e)
    }
  }

  /* Function that fetches order status types */
  static async getOrderStatusTypes () {
    return await OrderStatus.findAll({
      attributes: ['id', 'status'],
      raw: true
    })
      .then(statuses => statuses)
      .catch(error => Promise.reject(error))
  }

  /* Function that fetches the details of an order by provision of a client, orderId and gotStarted parameters */
  static async orderDetails (client, orderId, gotStarted) {
    /* The 'gotStarted' parameter is used to know whether a client has an order that he or she needs to
    * proceed with it after logging in. An order that is pending completion. If a client logged in by
    * clicking the 'Get Started' button, then he or she doesn't need to be given an order to proceed
    * regardless of whether there was a pending order or not */
    return await model.sequelize.transaction(async (t) => {
      let myQuery
      /* MyQuery is a custom 'where'. In case an orderID is provided, then filter the latest order by the
      * given orderID. Otherwise, just filter the latest order using the client's ID */
      if (orderId) {
        myQuery = {
          clientId: client.id,
          id: orderId
        }
      } else {
        myQuery = {
          clientId: client.id
        }
      }
      /* Get the latest order depending on the query above, where */
      const latestOrder = await Order.findOne({
        limit: 1,
        where: myQuery,
        order: [
          ['createdAt', 'DESC']
        ],
        attributes: ['id', 'deadlineDate', 'pageCount', 'topic', 'instructions', 'sources'],
        /* Include linked classes or models */
        include: [
          {
            model: OrderServiceType,
            as: 'OrderServiceType',
            attributes: ['id', 'type']
          },
          {
            model: OrderStatus,
            as: 'OrderStatus',
            attributes: ['id', 'status']
          },
          {
            model: Discipline,
            as: 'Discipline',
            attributes: ['id']
          },
          {
            model: CitationStyle,
            as: 'CitationStyle',
            attributes: ['id']
          },
          {
            model: OrderFormat,
            as: 'OrderFormat',
            attributes: ['id', 'wordsPerPage', 'spacing']
          },
          {
            model: TimeAmPm,
            as: 'TimeAmPm',
            attributes: ['id']
          },
          {
            model: EducationLevel,
            as: 'EducationLevel',
            attributes: ['id']
          },
          {
            model: AssignmentType,
            as: 'AssignmentType',
            attributes: ['id']
          }
        ],
        raw: true
      })
      /* If a client has had an order before, then check if it is completed already or not */
      if (latestOrder) {
        const discount = await PaperDiscount.findOne({
          where: {
            lowerLimit: {
              [Op.gte]: latestOrder.pageCount
            }
          },
          attributes: ['discount']
        })
        const finalDiscount = latestOrder.pageCount === 1 ? 0 : discount
        let orderAlreadyPaid = false
        const orderPaid = await Order.findOne({
          where: {
            id: latestOrder.id
          },
          attributes: ['id'],
          include: [
            {
              model: OrderStatus,
              as: 'OrderStatus',
              attributes: ['status']
            }
          ]
        })
        const unPaidOrdersStatuses = ['Pending payment', 'Pending writer acknowledgement', 'Available', 'Bidding ongoing']
        /* Here, we are setting the variable orderAlreadyPaid to true because we don't want to make a client
        * proceed or pick up from a given order */
        if (gotStarted) {
          orderAlreadyPaid = true
        }
        if (!unPaidOrdersStatuses.includes(orderPaid.OrderStatus.status)) {
          orderAlreadyPaid = true
        }
        if (orderAlreadyPaid) {
          return {
            type: 'Client',
            orderDetails: null,
            loginVia: client.loginVia ? client.loginVia : null,
            orderPostingStep: 'Finished',
            user: client
          }
        } else {
          const orderPaymentDetails = await OrderPaymentDetail.findOne({
            where: {
              orderId: latestOrder.id
            },
            attributes: ['id', 'extras', 'extrasTotalPrice', 'totalPrice', 'cpp'],
            include: [
              {
                model: Currency,
                as: 'Currency',
                attributes: ['id', 'currency', 'currencyCode']
              }
            ]
          })
          const orderPaymentStatus = await PaymentStatus.findOne({
            where: {
              status: 'Success'
            },
            attributes: ['id'],
            raw: true
          })
          const orderAlreadyPaidFor = await ClientPayment.findOne({
            where: {
              statusId: orderPaymentStatus.id,
              orderId: latestOrder.id
            },
            attributes: ['id']
          })
          const orderAssignment = await WriterOrder.findOne({
            where: {
              orderId: latestOrder.id
            },
            attributes: ['id'],
            include: [
              {
                model: Writer,
                as: 'Writer',
                attributes: ['surname', 'otherNames'],
                include: [
                  {
                    model: User,
                    as: 'User',
                    attributes: ['email']
                  }
                ]
              }
            ]
          })
          const orderFileType = await OrderFileType.findOne({
            where: {
              type: 'Client Supporting'
            },
            attributes: ['id']
          })
          const orderFiles = await OrderFile.findAll({
            attributes: ['fileUrl', 'originalName'],
            where: {
              orderId: latestOrder.id,
              isDeleted: false,
              type: orderFileType.id
            }
          })
          return await ClientOrderPostingStep.findOne({
            where: {
              clientId: client.id
            },
            order: [
              ['createdAt', 'DESC']
            ],
            attributes: ['id', 'orderId', 'lastStep']
          }, { transaction: t })
            .then(orderStep => {
              return {
                type: 'Client',
                orderDetails: latestOrder,
                paperDiscount: finalDiscount,
                loginVia: client.loginVia ? client.loginVia : null,
                orderPostingStep: orderStep,
                orderPaymentDetails: orderPaymentDetails,
                orderAlreadyPaidFor: !!orderAlreadyPaidFor,
                orderAssignment: orderAssignment,
                orderFiles: orderFiles,
                user: client
              }
            })
            .catch(error => {
              throw new Error(error)
            })
        }
      } else {
        /* If a person does not have any order, then return null */
        return {
          type: 'Client',
          user: client,
          loginVia: client.loginVia ? client.loginVia : null,
          orderDetails: null,
          orderPostingStep: null
        }
      }
    })
  }

  /* Function to get the details of an order, but through another function, as seen below */
  static async getOrderDetails (req) {
    try {
      return await model.sequelize.transaction(async t => {
        /* First get a user by email */
        const user = await User.findOne({
          where: {
            email: req.email.toLowerCase()
          },
          attributes: ['id']
        })
        /* Then get a client by userID */
        return await Client.findOne({
          where: {
            userId: user.id
          },
          attributes: ['id']
        }, { transaction: t })
          .then(async client => {
            /* If a client exists, then return the details of an order by calling the orderDetails function,
            * passing the client, orderId and the gotStarted object as false */
            if (client) {
              return OrdersHelper.orderDetails(client, req.orderId, false)
            } else {
              /* Else return null */
              return null
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

  /* Function to confirm the ownership of an order by a client.
  * This helps to confirm whether a client has the right to view a file or not */
  static async confirmOrderOwnership (req) {
    /* First get the client's ID */
    const clientId = await OrdersHelper.getClientId(req.email)
    /* The return whether a given client has an order ID specified in the request */
    return await Order.findOne({
      where: {
        id: req.orderId,
        clientId: clientId
      }
    })
      .then(orderExists => orderExists)
      .catch(error => Promise.reject(error))
  }

  /* Function to create a revision request by changing the order status to 'Undergoing revision' and also
  * creates a revision request in the OrderRevision table */
  static async revisionRequest (req) {
    try {
      return await model.sequelize.transaction(async t => {
        /* First get the user and client IDs */
        const [user, clientId] = await Promise.all([
          User.findOne({
            where: {
              email: req.email.toLowerCase()
            },
            attributes: ['id']
          }),
          await OrdersHelper.getClientId(req.email)]
        )
        /* Check whether an order by the client and order IDs exist */
        return await Order.findOne({
          where: {
            id: req.orderId,
            clientId: clientId
          }
        }, {
          transaction: t
        })
          .then(async orderExists => {
            /* If order exists, then make the revision requests */
            if (orderExists) {
              /* Get the parameters */
              const reqChecklist = req.checklist
              const supportingFiles = req.supportingFiles
              const checklist = {}
              /* Format the checklist to get the ones that the client marked */
              for (const key in reqChecklist) {
                if (reqChecklist[key].key) {
                  checklist[key] = reqChecklist[key].val
                }
              }
              /* If there are supporting files (of type Revision Supporting), then save the files */
              if (supportingFiles.length > 0) {
                /* First get the orderFileType (of type Revision Supporting) */
                const orderFileType = await OrderFileType.findOne({
                  where: {
                    type: 'Revision Supporting'
                  },
                  attributes: ['id']
                })
                /* Then loop through the revision supporting files */
                for (let i = 0; i < supportingFiles.length; i++) {
                  /* Format the original file name to ensure it does not exceed the 50-character limit */
                  const finalOriginalName = OrdersHelper.originalNameFormatter(supportingFiles[i].originalName)
                  /* Then create an orderFile.
                  * POINT TO NOTE: No need to first check whether the record exists because at this point we
                  * don't edit revision requests. We just add */
                  await OrderFile.create({
                    orderId: req.orderId,
                    fileUrl: supportingFiles[i].fileUrl,
                    originalName: finalOriginalName,
                    type: orderFileType.id,
                    isDeleted: false,
                    submittedPaper: false
                  }, { transaction: t })
                }
              }
              /* Get the status of an order */
              const orderStatus = await Order.findOne({
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
              })
              /* Update the status to 'Undergoing revision' if it already is not */
              if (orderStatus.OrderStatus.status !== 'Undergoing revision') {
                const revisionOrderStatus = await OrderStatus.findOne({
                  where: {
                    status: 'Undergoing revision'
                  },
                  attributes: ['id']
                })
                await Order.update({
                  statusId: revisionOrderStatus.id
                }, {
                  where: {
                    id: req.orderId
                  }
                }, { transaction: t })
              }
              /* Format the deadline time */
              const deadline = new Date(req.deadline.date)
              const deadlineTimeArray = req.deadline.time.split(':')
              deadline.setHours(deadlineTimeArray[0])
              deadline.setMinutes(deadlineTimeArray[1])
              /* Create an OrderRevision record */
              return await OrderRevision.create({
                orderId: req.orderId,
                revisionInstructions: checklist,
                deadline: deadline,
                creator: user.id,
                submitted: false,
                isDeleted: false
              }, { transaction: t })
                .then(revisionRequested => {
                  /* Return success if revision has been requested successfully */
                  if (revisionRequested) {
                    return { success: true }
                  } else {
                    return { success: false, message: 'Failed to add entry' }
                  }
                })
                .catch()
            } else {
              /* Else return the order not exist response */
              return { success: false, message: 'Order does not exist' }
            }
          })
          .catch(error => {
            throw new Error(error)
          })
      })
    } catch (e) {
      e.name = ''
      return Promise.reject(e)
    }
  }

  /* Function to confirm the completion of an order */
  static async confirmOrderCompletion (req) {
    try {
      return await model.sequelize.transaction(async t => {
        /* First confirm the ownership of an order */
        return await OrdersHelper.confirmOrderOwnership({
          email: req.email,
          orderId: req.orderId
        })
          .then(async belongs => {
            /* If it belongs, then update its status to completed */
            if (belongs) {
              /* Get the user, client and completed order status first */
              const user = await User.findOne({
                attributes: ['id'],
                where: {
                  email: req.email.toLowerCase()
                }
              }, { transaction: t })
              const clientId = await Client.findOne({
                attributes: ['id'],
                raw: true,
                where: {
                  userId: user.id
                }
              })
              const completedOrderStatus = await OrderStatus.findOne({
                where: {
                  status: 'Completed'
                },
                attributes: ['id']
              })
              /* Then update the order status to be 'Completed' */
              return await Order.update({
                statusId: completedOrderStatus.id
              }, {
                where: {
                  id: req.orderId,
                  clientId: clientId.id
                }
              })
                .then(statusUpdated => {
                  return { updated: statusUpdated.length > 0 }
                })
            } else {
              return { updated: false }
            }
          })
      })
        .catch(error => {
          throw new Error(error)
        })
    } catch (e) {
      return Promise.reject(e)
    }
  }

  /* Function that formats the original of a file by ensuring its length does not exceed 50 characters */
  static originalNameFormatter (originalName) {
    /* Takes in the original name and returns the formatted one */
    /* Define the maximum allowed length of an original name */
    const maxOriginalNameLength = 50
    /* Get the length of the original name */
    const originalNameLength = originalName.length
    /* Set the remaining length of the original name before getting to 50 */
    let remainingNameLength = 0
    /* Declare the final original name, the variable to be returned */
    let finalOriginalName
    /* If the original name has exceeded 50, then format */
    if (originalNameLength > maxOriginalNameLength) {
      /* First split the filename by the dot operator */
      const splitFileName = originalName.split('.')
      let fileName, fileExtension
      /* If a filename has more than one dot operators, then remove the last element in the array first
      * before splitting and joining to get the filaname and file extension */
      if (splitFileName.length > 2) {
        fileExtension = originalName.split('.')[splitFileName.length - 1]
        splitFileName.pop()
        fileName = splitFileName.join('.')
      } else {
        /* Else just split to get the file name and extensions */
        fileName = originalName.split('.')[0]
        fileExtension = originalName.split('.')[1]
      }
      /* Get the remaining allowable length of the filename after removing the file extension */
      remainingNameLength = maxOriginalNameLength - fileExtension.length
      /* Lastly, concatenate to form the final original filename */
      finalOriginalName = fileName.slice(0, remainingNameLength - 1).concat('.', fileExtension)
    } else {
      /* Else return the original name as it is */
      finalOriginalName = originalName
    }
    return finalOriginalName
  }
}

/* FIXME: To integrate automatic transactions
* Automatically pass transactions to all queries
* In the examples above, the transaction is still manually passed, by passing { transaction: t } as the second
* argument. To automatically pass the transaction to all queries you must install the cls-hooked (CLS) module
* and instantiate a namespace in your own code:
* const cls = require('cls-hooked'); const namespace = cls.createNamespace('my-very-own-namespace');
**/

module.exports = OrdersHelper
