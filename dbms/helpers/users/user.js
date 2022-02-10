'use strict'

/* Helper that handles logic specifically related to users */

/* Importing the index model that will be used to access the sequelize instance, which will in turn help create
* sequelize transactions */
const MODEL = require('../../models/index')

/* Importing bcrypt, used to encrypt and decrypt user passwords */
const BCRYPT = require('bcrypt')

/* Importing models that will be used to handle user logic */
const {
  AccountStatus,
  AccountType,
  Client,
  ClientPayment,
  ClientWriter,
  Country,
  DataSource,
  GrammarQuestion,
  EducationLevel,
  EnglishAs,
  Gender,
  Login,
  LoginVia,
  Order,
  OrderStatus,
  ProblemReport,
  ProblemReportFile,
  SampleEssayTheme,
  Writer,
  WriterApplication,
  WriterCitationStyle,
  WriterDiscipline,
  WriterEducation,
  WriterGrammarTest,
  WriterEmailSubmission,
  WriterInvitation,
  WriterOrder,
  WriterRegistrationRecord,
  WriterManagement,
  WriterSampleEssay,
  EntityType,
  WriterWorkExperience,
  User, WriterAverageRating
} = require('../../models')

/* Importing helper utility functions from the order helper */
const { orderDetails, originalNameFormatter } = require('../orders/order')

/* The user helper, which makes use of static functions to enable calling them on the class themselves
* directly, as opposed to creating a class instance then calling them on the instance */
class UserHelper {
  /* Function to get a user's basic details from the user table by email */
  static async getUserByMail (req) {
    try {
      return await MODEL.sequelize.transaction(async (t) => {
        return await User.findOne({
          attributes: ['id'],
          raw: true,
          where: {
            email: req.email.toLowerCase()
          }
        }, { transaction: t })
          .then(user => user)
          .catch(error => {
            throw new Error(error)
          })
      })
    } catch (e) {
      return Promise.reject(e)
    }
  }

  /* Function to get a client's email by a writer's email */
  static async getClientEmailByWriterEmail (req) {
    try {
      return await MODEL.sequelize.transaction(async (t) => {
        const WRITER = await UserHelper.getWriterByEmail(req.email)
        return await ClientWriter.findOne({
          attributes: ['id'],
          where: {
            writerId: WRITER.id
          },
          include: [
            {
              model: Client,
              as: 'Client',
              attributes: ['id'],
              include: [
                {
                  model: User,
                  as: 'User',
                  attributes: ['email']
                }
              ]
            }
          ]
        }, { transaction: t })
          .then(user => user)
          .catch(error => {
            console.log(error)
            throw new Error(error)
          })
      })
    } catch (e) {
      console.log(e)
      return Promise.reject(e)
    }
  }

  /* Function to get a user by email too, but includes other linked tables such as account type and login via.
  * It also returns the client or writer details, depending on the account type */
  static async getWebUserByMail (req) {
    try {
      return await MODEL.sequelize.transaction(async (t) => {
        /* First get the User details by email */
        return await User.findOne({
          attributes: ['id', 'email', 'password'],
          where: {
            email: req.email.toLowerCase()
          },
          include: [
            {
              model: AccountType,
              as: 'AccountType',
              attributes: ['type']
            },
            {
              model: LoginVia,
              as: 'LoginVia',
              attributes: ['via']
            }
          ]
        }, { transaction: t })
          .then(async userDetails => {
            /* If a user by the email exists, then get the client or writer details */
            if (userDetails) {
              /* Return client details, together with order details */
              if (userDetails.AccountType.type === 'Client') {
                const CLIENT = await Client.findOne({
                  where: {
                    userId: userDetails.id
                  },
                  attributes: ['id']
                })
                const CLIENT_OBJ = {
                  id: CLIENT.id,
                  password: userDetails.password,
                  loginVia: userDetails.LoginVia.via
                }
                /* The orderDetails functions returns the details of an order, as seen in the orders helper */
                return orderDetails(CLIENT_OBJ, null, req.gotStarted)
              } else if (userDetails.AccountType.type === 'Writer') {
                /* Otherwise return a writers details */
                return await Writer.findOne({
                  where: {
                    userId: userDetails.id
                  },
                  include: [
                    {
                      model: Gender,
                      as: 'Gender',
                      attributes: ['id', 'gender']
                    },
                    {
                      model: Country,
                      as: 'Citizenship',
                      attributes: ['id', 'country']
                    },
                    {
                      model: EntityType,
                      as: 'EntityType',
                      attributes: ['type']
                    }
                  ],
                  attributes: ['id', 'surname', 'otherNames', 'nIdFront', 'nIdBack', 'nationalID', 'mobileNo',
                    'availableNightCalls', 'countyState']
                }, { transaction: t })
                  .then(async regDetails => {
                    /* First check if the user has been invited by a client */
                    const WRITER_HAS_BEEN_INVITED = await WriterInvitation.findOne({
                      where: {
                        email: req.email, /* TODO: To add the column isDeleted to all queries */
                        isDeleted: false
                      },
                      attributes: ['id']
                    })
                    /* Check whether account is confirmed first */
                    const ACCOUNT_CONFIRMED = await WriterEmailSubmission.findOne({
                      where: {
                        userId: userDetails.id
                      },
                      attributes: ['accountConfirmed']
                    })
                    /* Then if a writer has details, meaning that he had registered before, then get
                    * his or her details. This helps the writer to resume registration from a place that
                    * he or she had left before */
                    if (regDetails) {
                      /* First check whether the person is a private or public writer.
                      * If it is a private writer, then just return applicaton done */
                      if (regDetails.EntityType.type === 'Private') {
                        return {
                          type: 'Writer',
                          user: userDetails,
                          accountConfirmed: ACCOUNT_CONFIRMED.accountConfirmed,
                          regDetails: regDetails,
                          applicationDone: true
                        }
                      }
                      /* Check whether the person had started doing a sample essay before */
                      const SUBMISSION_DONE = await WriterSampleEssay.findOne({
                        where: {
                          writerId: regDetails.id
                        },
                        attributes: ['timeTaken']
                      })
                      /* If so, check if there is time taken - meaning that the person had started the essay, and then
                      * submitted it */
                      if (SUBMISSION_DONE && SUBMISSION_DONE.timeTaken) {
                        /* If so, then it means that the writer had finished registration - because the essay is
                        * the last step in the registration process. And therefore, return from here, and
                        * that the application is Done */
                        return {
                          type: 'Writer',
                          user: userDetails,
                          accountConfirmed: ACCOUNT_CONFIRMED.accountConfirmed,
                          regDetails: regDetails,
                          applicationDone: true
                        }
                      }
                      /* Otherwise if the writer has not yet started and submitted the essay, check his or her
                       * grammar test */
                      let grammarPassed = null
                      /* Check the total score */
                      await WriterGrammarTest.findOne({
                        where: {
                          writerId: regDetails.id
                        },
                        attributes: ['totalScore']
                      }, { transaction: t })
                        .then(grammarTest => {
                          /* If there is a grammar test by the writerID, then check whether the person had scored
                          * at least 88% - which is the pass-mark */
                          if (grammarTest) {
                            grammarPassed = grammarTest.totalScore >= 88
                          }
                        })
                        .catch(error => {
                          throw new Error(error)
                        })
                      /* Get some writer details */
                      const [WRITER_CITATION_STYLES, WRITER_DISCIPLINES, WRITER_WORK_EXPERIENCE, WRITER_EDUCATION] = await Promise.all([
                        WriterCitationStyle.findOne({
                          where: {
                            writerId: regDetails.id
                          },
                          attributes: ['id', 'citationStyleIds']
                        }, { transaction: t }),
                        WriterDiscipline.findOne({
                          where: {
                            writerId: regDetails.id
                          },
                          attributes: ['id', 'disciplineIds', 'primaryDiscipline']
                        }, { transaction: t }),
                        WriterWorkExperience.findOne({
                          where: {
                            writerId: regDetails.id
                          },
                          attributes: ['id', 'yearsExperience']
                        }, { transaction: t }),
                        WriterEducation.findOne({
                          where: {
                            writerId: regDetails.id
                          },
                          attributes: ['id', 'certificate'],
                          include: [
                            {
                              model: EducationLevel,
                              as: 'EducationLevel',
                              attributes: ['id', 'level']
                            }]
                        }, { transaction: t })
                      ])
                      /* Return those details */
                      return {
                        type: 'Writer',
                        user: userDetails,
                        accountConfirmed: ACCOUNT_CONFIRMED.accountConfirmed,
                        regDetails: regDetails,
                        applicationDone: false,
                        writerInvited: !!WRITER_HAS_BEEN_INVITED,
                        citationStyles: WRITER_CITATION_STYLES,
                        disciplines: WRITER_DISCIPLINES,
                        workExperience: WRITER_WORK_EXPERIENCE,
                        education: WRITER_EDUCATION,
                        grammarPassed: grammarPassed
                      }
                    } else {
                      return {
                        type: 'Writer',
                        user: userDetails,
                        accountConfirmed: ACCOUNT_CONFIRMED.accountConfirmed,
                        regDetails: regDetails,
                        regStep: 0,
                        writerInvited: !!WRITER_HAS_BEEN_INVITED
                      }
                    }
                  })
                  .catch(error => {
                    throw new Error(error)
                  })
              } else {
                return { type: 'User', user: 'User' }
              }
            } else {
              return { type: null, user: null }
            }
          })
          .catch(error => {
            return Promise.reject(error)
          })
      })
    } catch (e) {
      e.name = ''
      return Promise.reject(e)
    }
  }

  static async getWriterByEmail (email) {
    /* Get the user details by email */
    /* TODO: To create one reusable function to do the query below */
    const USER = await User.findOne({
      where: {
        email: email.toLowerCase()
      },
      attributes: ['id']
    })
    /* And get the writer id */
    return await Writer.findOne({
      where: {
        userId: USER.id
      },
      attributes: ['id']
    })
  }

  /* Function to add a client's details */
  static async addClientDetails (req) {
    try {
      return await MODEL.sequelize.transaction(async (t) => {
        /* First the user's details by email */
        return await User.findOne({
          where: {
            email: req.email.toLowerCase()
          },
          attributes: ['id']
        })
          .then(async clientExists => {
            /* If client does not exist, just return */
            if (clientExists) {
              return { response: 'Email already exists' }
            } else {
              /* Else add a user */
              /* First define the user's object */
              const ADD_USER_OBJ = {
                email: req.email,
                loginType: req.loginType,
                accountType: 'Client'
              }
              /* Call the AddUser function, which does the adding itself */
              return await UserHelper.addUser(ADD_USER_OBJ)
                .then(async userCreated => {
                  /* If user is created, then add the client details */
                  if (userCreated) {
                    return await Client.create({
                      userId: userCreated.id,
                      name: req.name ? req.name : null,
                      picture: req.picture ? req.picture : null,
                      facebookId: req.facebookId ? req.facebookId : null,
                      isDeleted: false
                    }, { transaction: t })
                      .then(client => {
                        /* Client is created successfullly */
                        if (client) {
                          return { response: 'success' }
                        } else {
                          /* Else failed to create client */
                          return { response: 'failed to create client' }
                        }
                      })
                      .catch(error => {
                        throw new Error(error)
                      })
                  } else {
                    /* Else return */
                    return { response: 'failed to create user' }
                  }
                })
            }
          })
          .catch(error => {
            throw new Error(error)
          })
      })
    } catch (e) {
      e.name = ''
      return Promise.reject(e.toString())
    }
  }

  /* Function to check whether the window to accept writer applications is open or not */
  static async checkWriterRegistrationStatus (req) {
    try {
      return await MODEL.sequelize.transaction(async (t) => {
        /* Look for a record in the writer management table where the isDeleted column is false */
        return await WriterManagement.findOne({
          attributes: ['id', 'registrationOpen'],
          where: {
            isDeleted: false
          },
          raw: true
        }, { transaction: t })
          .then(async regStatus => {
            /* If the registration is not open, then just save the writer's details
            * because ideally this person will not proceed from here (applications are not allowed) */
            if (!regStatus.registrationOpen) {
              return await this.saveWriterApplicationDetails(req)
                .then(res => {
                  if (res.response === 'success') {
                    /* Success here means that the saving of the writer details is successful in a
                    * scenario where the registration of writers is not open */
                    return { response: 'success' }
                  } else {
                    return { response: 'Failed to save writer application details' }
                  }
                })
            } else {
              return regStatus
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

  /* Function to save a writer's application details - basically just save the email address
  * for the records so as to know of persons who applied */
  static async saveWriterApplicationDetails (req) {
    try {
      return await MODEL.sequelize.transaction(async (t) => {
        /* Here we are just saving the email address of the writer applicant */
        return await WriterApplication.create({
          email: req.body.email
        }, { transaction: t })
          .then(() => {
            return { response: 'success' }
          })
          .catch(error => {
            throw new Error(error)
          })
      })
    } catch (e) {
      return Promise.reject(e)
    }
  }

  /* Function that adds a user details to the User table */
  static async addUser (req) {
    try {
      return await MODEL.sequelize.transaction(async (t) => {
        /* First get the accountStatus of the user depending on the user's accountType */
        let userAccountStatus
        if (req.accountType === 'Writer') {
          /* If the user is a writer, then he or she starts with an inactive account status */
          userAccountStatus = 'Inactive'
        } else if (req.accountType === 'Client') {
          /* Otherwise a client just starts being active all the way */
          userAccountStatus = 'Active'
        } else {
          /* If the user is neither a client or writer (unexpected) then the starting account
          * status is Deactivated */
          userAccountStatus = 'Deactivated'
        }
        /* Get login type, user type and account status */
        const [LOGIN_VALID, USER_TYPE, ACCOUNT_STATUS] = await Promise.all([LoginVia.findOne({
          where: {
            via: req.loginType
          },
          attributes: ['id'],
          raw: true
        }),
        AccountType.findOne({
          where: {
            type: req.accountType
          },
          attributes: ['id'],
          raw: true
        }),
        AccountStatus.findOne({
          attributes: ['id'],
          where: {
            status: userAccountStatus
          },
          raw: true
        })])
        /* Then create the user */
        return await User.create({
          email: req.email.toLowerCase(),
          accountStatus: ACCOUNT_STATUS.id,
          loginVia: LOGIN_VALID.id,
          userType: USER_TYPE.id,
          isDeleted: false
        }, { transaction: t })
          .then(userCreated => userCreated)
          .catch(error => {
            throw new Error(error)
          })
      })
    } catch (e) {
      e.name = ''
      return Promise.reject(e)
    }
  }

  /* Function to submit a writer's email after clicking the 'Get Started' button */
  static async submitWriterEmail (req) {
    try {
      return await MODEL.sequelize.transaction(async (t) => {
        /* Specify user's details first */
        const ADD_USER_OBJ = {
          email: req.body.content.email,
          loginType: 'Email',
          accountType: 'Writer'
        }
        /* Then call the addUser function to add the details to the User table */
        return await UserHelper.addUser(ADD_USER_OBJ)
          .then(async userAdded => {
            /* If a user is added successfully, then add an email submission record */
            if (userAdded) {
              return await WriterEmailSubmission.create({
                userId: userAdded.id,
                confirmationToken: req.body.confirmationToken,
                accountConfirmed: false,
                termsAndPoliciesAgreed: req.body.content.termsAndPoliciesAgreed,
                promotionalMessagesAgreed: req.body.content.promotionalMessagesAgreed
              }, { transaction: t })
                .then(() => {
                  return { response: 'success' }
                })
                .catch(error => {
                  /* In case of an error, check if the error is cause by an already existing email */
                  if (error.name === 'SequelizeUniqueConstraintError') {
                    return { response: 'Email already exists' }
                  } else {
                    throw new Error(error)
                  }
                })
            } else {
              return { response: 'Failed to add user' }
            }
          })
          .catch(addUserErr => {
            /* Also check the thrown error here to check if it is caused by an already existing email address */
            if (addUserErr.name === 'SequelizeUniqueConstraintError') {
              return { response: 'Email already exists' }
            } else {
              throw new Error(addUserErr)
            }
          })
      })
    } catch (e) {
      return Promise.reject(e)
    }
  }

  /* Function to confirm a writer's email address */
  static async confirmWriterEmail (req) {
    try {
      return await MODEL.sequelize.transaction(async (t) => {
        /* First get the user id */
        return await User.findOne({
          where: {
            email: req.email.toLowerCase()
          },
          attributes: ['id']
        }, { transaction: t })
          .then(async writerConfirmed => {
            /* Then get the email confirmation details */
            const EMAIL_CONFIRMED = await WriterEmailSubmission.findOne({
              where: {
                userId: writerConfirmed.id
              },
              attributes: ['accountConfirmed']
            })
            /* If email already confirm, just return */
            if (EMAIL_CONFIRMED.accountConfirmed) {
              return { response: true, message: 'Email already confirmed' }
            } else {
              /* Else confirm the account */
              return await WriterEmailSubmission.update({
                accountConfirmed: true
              }, {
                where: {
                  userId: writerConfirmed.id
                }
              }, {
                transaction: t
              })
                .then(rowsUpdated => {
                  return { response: rowsUpdated > 0, message: 'success' }
                })
                .catch(error => {
                  throw new Error(error)
                })
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

  /* Function to create a writer's password in encrypted form */
  static async createWriterPassword (req) {
    try {
      return await MODEL.sequelize.transaction(async t => {
        /* As usual, get user id */
        return await User.findOne({
          where: {
            email: req.email.toLowerCase()
          },
          attributes: ['id']
        }, { transaction: t })
          .then(async writerConfirmed => {
            /* Then get his or her account confirmation details */
            const EMAIL_CONFIRMED = await WriterEmailSubmission.findOne({
              where: {
                userId: writerConfirmed.id
              },
              attributes: ['accountConfirmed']
            })
            /* If account already confirmed, then update the password */
            if (EMAIL_CONFIRMED.accountConfirmed) {
              /* First get the email submission record */
              return await WriterEmailSubmission.findOne({
                where: {
                  userId: writerConfirmed.id,
                  accountConfirmed: true
                }
              }, { transaction: t })
                .then(async record => {
                  /* If a record exists, then hash the specified password before saving on the user password field */
                  if (record) {
                    /* Use a promise */
                    return new Promise((resolve, reject) => {
                      /* We are using BCRYPT here */
                      BCRYPT.hash(req.password, 10, async (err, hash) => {
                        /* Reject in case of an error */
                        if (err) {
                          reject(err)
                        } else {
                          /* Update the password field in case there is no error, where email is the one specified
                          * Hash here represents the hashed password */
                          await User.update({
                            password: hash
                          }, {
                            where: {
                              email: req.email.toLowerCase()
                            }
                          }, { transaction: t })
                            .then(record => {
                              if (record) {
                                resolve({ response: 'success' })
                              } else {
                                resolve({ response: 'Failed to update user password' })
                              }
                            })
                            .catch(error => {
                              reject(error)
                            })
                        }
                      })
                    })
                  } else {
                    return { response: 'Password already updated' }
                  }
                })
                .catch(error => {
                  throw new Error(error)
                })
            } else {
              return { response: 'Please confirm your email first!' }
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

  /* Function to create a connection between a client and a writer */
  static async createClientWriterConnection (req) {
    try {
      return await MODEL.sequelize.transaction(async t => {
        /* First check if the person has an invitation */
        const WRITER_INVITATION = await WriterInvitation.findOne({
          where: {
            email: req.email
          },
          attributes: ['clientId']
        })
        const WRITER = await UserHelper.getWriterByEmail(req.email)
        const CONNECTION_EXISTS = await ClientWriter.findOne({
          where: {
            writerId: WRITER.id,
            clientId: WRITER_INVITATION.clientId
          },
          attributes: ['id']
        })
        if (CONNECTION_EXISTS) {
          return { response: 'success' }
        }
        return await ClientWriter.create({
          writerId: WRITER.id,
          clientId: WRITER_INVITATION.clientId
        }, { transaction: t })
          .then(clientWriterCreated => {
            if (clientWriterCreated) {
              return { response: 'success' }
            } else {
              throw new Error('Failed to created a connection')
            }
          })
          .catch(connectionError => {
            throw new Error(connectionError)
          })
      })
    } catch (e) {
      console.log(e)
      return Promise.reject(e)
    }
  }

  /* Function to save a writer's profile. Quite a long function that saves quite a
  * lot of data to multiple tables */
  /* TODO: to break the function into smaller, manageable or scalable bits */
  static async saveWriterProfile (req) {
    try {
      return await MODEL.sequelize.transaction(async t => {
        /* First get and define the native language */
        const ENG_AS = 'English as a Second Language'
        let status
        if (req.type === 'public') {
          status = 'Pending review'
        } else {
          status = 'Active'
        }
        /* Then get the user, statusID and englishAsID */
        const [USER, STATUS_ID, ENGLISH_HAS_ID, WRITER_TYPE] = await Promise.all([
          User.findOne({
            where: {
              email: req.email.toLowerCase()
            },
            attributes: ['id', 'password']
          }, { transaction: t }),
          AccountStatus.findOne({
            where: {
              status: status
            },
            attributes: ['id']
          }, { transaction: t }),
          EnglishAs.findOne({
            where: {
              as: ENG_AS
            },
            attributes: ['id'],
            raw: true
          }, { transaction: t }),
          EntityType.findOne({
            where: {
              type: req.type === 'private' ? 'Private' : 'Public'
            },
            attributes: ['id'],
            raw: true
          }, { transaction: t })
        ])
        /* Next is to get the writer id */
        return await Writer.findOne({
          where: {
            userId: USER.id
          },
          attributes: ['id'],
          raw: true
        }, { transaction: t })
          .then(async writer => {
            /* If a writer with the userID exists, then just update his or her details */
            if (writer) {
              /* We are first updating the writer table itself */
              return await Writer.update({
                userId: USER.id,
                type: WRITER_TYPE.id,
                surname: req.personalInformation.surname,
                otherNames: req.personalInformation.otherNames,
                nIdFront: req.type === 'public' ? req.personalInformation.nidFront : null,
                nIdBack: req.type === 'public' ? req.personalInformation.nidBack : null,
                mobileNo: req.personalInformation.mobileNo,
                nationalID: req.personalInformation.nationalID,
                availableNightCalls: req.type === 'public' ? req.personalInformation.availableNightCalls : false,
                genderId: req.personalInformation.gender,
                citizenshipId: req.personalInformation.country,
                countyState: req.type === 'public' ? req.personalInformation.countyState : null,
                englishAsId: ENGLISH_HAS_ID.id
              }, {
                where: {
                  userId: USER.id
                }
              }, { transaction: t })
                .then(async writerDetails => {
                  /* Then we update the user account status to 'Pending review' */
                  await User.update({
                    accountStatus: STATUS_ID.id
                  }, {
                    where: {
                      id: USER.id
                    }
                  })
                  if (req.type === 'private') {
                    return { response: 'success' }
                  }
                  /* Then check if citation styles exist, then save */
                  if (req.writingBackground.citationStyles.length > 0) {
                    /* First chceck if the writer has citation styles in the database */
                    await WriterCitationStyle.findOne({
                      where: {
                        writerId: writer.id
                      },
                      attributes: ['id']
                    }, { transaction: t })
                      .then(async writerCitation => {
                        /* If there exist, then update */
                        if (writerCitation) {
                          await WriterCitationStyle.update({
                            citationStyleIds: req.writingBackground.citationStyles
                          }, {
                            where: {
                              writerId: writer.id
                            }
                          }, { transaction: t })
                            .then(() => {
                              console.log('success')
                            })
                            .catch(error => {
                              throw new Error(error)
                            })
                        } else {
                          /* Else create altogether */
                          await WriterCitationStyle.create({
                            writerId: writer.id,
                            citationStyleIds: req.writingBackground.citationStyles
                          }, { transaction: t })
                            .then(() => {
                              console.log('success')
                            })
                            .catch(error => {
                              throw new Error(error)
                            })
                        }
                      })
                  }
                  /* Then check if there are disciplines in the request object */
                  if (req.writingBackground.disciplines.length > 0) {
                    /* Then check if the writer has disciplines in the database */
                    await WriterDiscipline.findOne({
                      where: {
                        writerId: writer.id
                      },
                      attributes: ['id']
                    }, { transaction: t })
                      .then(async writerDiscipline => {
                        /* If so, then update */
                        if (writerDiscipline) {
                          await WriterDiscipline.update({
                            disciplineIds: req.writingBackground.disciplines,
                            primaryDiscipline: req.writingBackground.primaryDiscipline
                          }, {
                            where: {
                              writerId: writer.id
                            }
                          }, { transaction: t })
                            .then(() => {
                              console.log('success')
                            })
                            .catch(error => {
                              throw new Error(error)
                            })
                        } else {
                          /* Else create */
                          await WriterDiscipline.create({
                            writerId: writerDetails[0],
                            disciplineIds: req.writingBackground.disciplines,
                            primaryDiscipline: req.writingBackground.primaryDiscipline
                          }, { transaction: t })
                            .then(() => {
                              console.log('success')
                            })
                            .catch(error => {
                              throw new Error(error)
                            })
                        }
                      })
                  }
                  /* Next, we go to eduction details.
                  * We first check whether the writer has education details in the database */
                  await WriterEducation.findOne({
                    where: {
                      writerId: writer.id
                    },
                    attributes: ['id']
                  }, { transaction: t })
                    .then(async writerEducation => {
                      /* If so, then just udpate */
                      if (writerEducation) {
                        await WriterEducation.update({
                          highestLevelId: req.educationBackground.highestAcademicLevel,
                          certificate: req.educationBackground.certificate.name
                        }, {
                          where: {
                            writerId: writer.id
                          }
                        }, { transaction: t })
                          .then(() => {
                            console.log('<-------------------------- update writer education success ' +
                              '-------------------------->')
                          })
                          .catch(error => {
                            console.log('.............caught..........')
                            throw new Error(error)
                          })
                      } else {
                        /* Else create */
                        await WriterEducation.create({
                          writerId: writer.id,
                          highestLevelId: req.educationBackground.highestAcademicLevel,
                          certificate: req.educationBackground.certificate
                        }, { transaction: t })
                          .then(() => {
                            console.log('<-------------------------- create writer education success ' +
                              '-------------------------->')
                          })
                          .catch(error => {
                            throw new Error(error)
                          })
                      }
                    })
                  /* Next, we go to work histrory.
                  * And we start again by checking whether the work history object exists in the request object */
                  if (req.workExperience.workHistory) {
                    /* Before checking whether the writer has work experience already on record */
                    await WriterWorkExperience.findOne({
                      where: {
                        writerId: writer.id
                      },
                      attributes: ['id']
                    }, { transaction: t })
                      .then(async writerWorkExperience => {
                        /* If so, just update again - as usual */
                        if (writerWorkExperience) {
                          await WriterWorkExperience.update({
                            yearsExperience: req.workExperience.yearsExperience
                          }, {
                            where: {
                              writerId: writer.id
                            }
                          }, { transaction: t })
                            .then(() => {
                              console.log('<-------------------------- update writer work history success ' +
                                '-------------------------->')
                            })
                            .catch(error => {
                              throw new Error(error)
                            })
                        } else {
                          /* Or else just create */
                          await WriterWorkExperience.create({
                            writerId: writer.id,
                            yearsExperience: req.workExperience.yearsExperience
                          }, { transaction: t })
                            .then(() => {
                              console.log('<-------------------------- create writer work history success ' +
                                '-------------------------->')
                            })
                            .catch(error => {
                              throw new Error(error)
                            })
                        }
                      })
                  }
                  /* Lastly, we check whether the writer record was updates before returning success or else failure */
                  if (writerDetails) {
                    await WriterRegistrationRecord.update({
                      lastStepReached: 3
                    }, {
                      where: {
                        writerId: writer.id
                      }
                    }, { transaction: t })
                    return { response: 'success' }
                  } else {
                    return { response: 'failed to create a new writer record' }
                  }
                })
                .catch(error => {
                  throw new Error(error)
                })
            } else {
              /* First check if the person has an invitation */
              const WRITER_INVITATION = await WriterInvitation.findOne({
                where: {
                  email: req.email
                },
                attributes: ['clientId']
              })
              if (req.type === 'private') {
                if (!WRITER_INVITATION) {
                  return {
                    response: 'No Associated Invitation'
                  }
                }
              }
              /* Else create records of the writer */
              /* We start by creating a writer object */
              return await Writer.create({
                type: WRITER_TYPE.id,
                userId: USER.id,
                surname: req.personalInformation.surname,
                otherNames: req.personalInformation.otherNames,
                nIdFront: req.type === 'public' ? req.personalInformation.nidFront : null,
                nIdBack: req.type === 'public' ? req.personalInformation.nidBack : null,
                nationalID: req.personalInformation.nationalID,
                mobileNo: req.personalInformation.mobileNo,
                availableNightCalls: req.type === 'public' ? req.personalInformation.availableNightCalls : false,
                genderId: req.personalInformation.gender,
                citizenshipId: req.personalInformation.country,
                countyState: req.type === 'public' ? req.personalInformation.countyState : null,
                englishAsId: ENGLISH_HAS_ID.id
              }, { transaction: t })
                .then(async writerDetails => {
                  /* Then update the account status, as usual */
                  await User.update({
                    accountStatus: STATUS_ID.id
                  }, {
                    where: {
                      id: USER.id
                    }
                  })
                  /* Before checking whether the writer details were created successfully */
                  if (writerDetails) {
                    if (req.type === 'private') {
                      return { response: 'success' }
                    }
                    /* If so, start the process of saving citations, work history etc
                    * We start off with citation styles */
                    if (req.writingBackground.citationStyles.length > 0) {
                      await WriterCitationStyle.create({
                        writerId: writerDetails.dataValues.id,
                        citationStyleIds: req.writingBackground.citationStyles
                      }, { transaction: t })
                        .then(() => {
                          console.log('<-------------------------- create writer citation style success' +
                            '-------------------------->')
                        })
                        .catch(error => {
                          throw new Error(error)
                        })
                    }
                    /* Then disciplines */
                    if (req.writingBackground.disciplines.length > 0) {
                      await WriterDiscipline.create({
                        writerId: writerDetails.dataValues.id,
                        disciplineIds: req.writingBackground.disciplines,
                        primaryDiscipline: req.writingBackground.primaryDiscipline
                      }, { transaction: t })
                        .then(() => {
                          console.log('<-------------------------- create writer disciplines success ' +
                            '-------------------------->')
                        })
                        .catch(error => {
                          throw new Error(error)
                        })
                    }
                    /* Before we get into education */
                    await WriterEducation.create({
                      writerId: writerDetails.dataValues.id,
                      highestLevelId: req.educationBackground.highestAcademicLevel,
                      certificate: req.educationBackground.certificate
                    }, { transaction: t })
                      .then(() => {
                        console.log('<-------------------------- create writer education success ' +
                          '-------------------------->')
                      })
                      .catch(error => {
                        throw new Error(error)
                      })
                    /* And lastly work experience or history */
                    if (req.workExperience.workHistory) {
                      await WriterWorkExperience.create({
                        writerId: writerDetails.dataValues.id,
                        yearsExperience: req.workExperience.yearsExperience
                      }, { transaction: t })
                        .then(() => {
                          console.log('<-------------------------- create writer work history success ' +
                            '-------------------------->')
                        })
                        .catch(error => {
                          throw new Error(error)
                        })
                    }
                    return { response: 'success' }
                  } else {
                    throw new Error('failed to create a new writer record')
                  }
                })
                .catch(error => {
                  throw new Error(error)
                })
            }
          })
          .catch(error => {
            throw new Error(error)
          })
      })
    } catch (e) {
      console.log(e)
      e.name = ''
      return Promise.reject(e)
    }
  }

  /* Function to save a writer's grammar test */
  static async submitGrammarTest (req) {
    try {
      return await MODEL.sequelize.transaction(async t => {
        /* We start off, as usual, with getting a writer's user id */
        const USER = await User.findOne({
          where: {
            email: req.email.toLowerCase()
          },
          attributes: ['id']
        }, { transaction: t })
        /* Then we look for a writer record by the above user id */
        return await Writer.findOne({
          where: {
            userId: USER.id
          },
          attributes: ['id']
        }, { transaction: t })
          .then(async writer => {
            /* If a writer by the above details exist, then we go ahead to save the grammar details */
            if (writer) {
              /* We get the correct answers for the grammar test first */
              const CORRECT_ANSWER_IDS = await GrammarQuestion.findAll({
                attributes: ['id', 'correctAnswerId'],
                raw: true
              })
              /* We then initialize the correct answers array, and the wrong answers */
              const CORRECT_ANSWERS = []
              const WRONG_ANSWERS = []
              /* We then loop through the grammar test answers */
              for (const [KEY, VALUE] of Object.entries(req.grammarTest)) {
                /* And check the answer against the correct answer ids */
                if (VALUE === CORRECT_ANSWER_IDS[KEY - 1].correctAnswerId) {
                  /* If it matches, push to the correct answers */
                  CORRECT_ANSWERS.push(KEY)
                } else {
                  /* Else push it to the wrong answers */
                  WRONG_ANSWERS.push(KEY)
                }
              }
              /* Once we have a list of right and wrong answers, then we need to save
              * We start by getting the grammar details by the writer id */
              return await WriterGrammarTest.findOne({
                where: {
                  writerId: writer.id
                }
              }, { transaction: t })
                .then(async writerGrammarTest => {
                  /* We first check whether this writer already has his or her grammar test saved */
                  if (writerGrammarTest) {
                    /* If he or she does, then we return, no more action */
                    if (WRONG_ANSWERS.length >= 10) {
                      return { success: false, message: 'already saved' }
                    } else {
                      return { success: true, message: 'already saved' }
                    }
                  } else {
                    /* Else, we need to create a record */
                    return await WriterGrammarTest.create({
                      writerId: writer.id,
                      totalScore: Math.floor(CORRECT_ANSWERS.length / 25 * 100),
                      correctQuestions: CORRECT_ANSWERS,
                      wrongQuestions: WRONG_ANSWERS
                    }, { transaction: t })
                      .then(testCreated => {
                        /* If test is created or added successfully */
                        if (testCreated) {
                          /* Check if the writer pass the test by failing not more four questions */
                          if (WRONG_ANSWERS.length >= 10) {
                            /* If not, then return failed */
                            return { success: false, message: 'failed the test' }
                          } else {
                            /* Else return a passed status */
                            return { success: true, message: 'passed the test' }
                          }
                        } else {
                          /* Else return */
                          throw new Error('Failed to save the test')
                        }
                      })
                      .catch(error => {
                        throw new Error(error)
                      })
                  }
                })
                .catch(error => {
                  throw new Error(error)
                })
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

  /* Function to submit user email before logging in */
  static async submitLoginEmail (req) {
    try {
      return await MODEL.sequelize.transaction(async (t) => {
        /* Find user details by email */
        return await User.findOne({
          attributes: ['id', 'password'],
          where: {
            email: req.email.toLowerCase()
          },
          include: [
            {
              model: AccountType,
              as: 'AccountType',
              attributes: ['type']
            },
            {
              model: LoginVia,
              as: 'LoginVia',
              attributes: ['via']
            }
          ]
        }, { transaction: t })
          .then(async userDetails => {
            /* If user details exist, then process the request according to the account type */
            if (userDetails) {
              /* If the user is a writer, then return */
              if (userDetails.AccountType.type === 'Writer') {
                return { accountExists: true, type: 'Writer' }
              } else if (userDetails.AccountType.type === 'Client') {
                /* Else if the user is a client, then check whether he or she needs to set a password.
                * Also check if the user can log in */
                let shouldSetPass = false
                let canLogIn = true
                if (userDetails.LoginVia.via === 'Email') {
                  shouldSetPass = !userDetails.password
                  canLogIn = !!userDetails.password
                }
                return { accountExists: true, shouldSetPass: shouldSetPass, canLogIn: canLogIn, type: 'Client' }
              }
            } else {
              /* Else return a false account existence */
              return { accountExists: false, type: null }
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

  /* Function to set the client password */
  static async setClientPassword (req) {
    try {
      return await MODEL.sequelize.transaction(async (t) => {
        return new Promise((resolve, reject) => {
          /* Simply encrypt the password */
          BCRYPT.hash(req.password, 10, async (err, hash) => {
            if (err) {
              reject(err)
            } else {
              /* Then update */
              await User.update({
                password: hash
              },
              {
                where: {
                  email: req.email.toLowerCase()
                }
              }, { transaction: t })
                .then(passwordUpdated => {
                  if (passwordUpdated) {
                    resolve({ status: true, message: 'Password updated' })
                  } else {
                    resolve({ status: true, message: 'Password failed to update' })
                  }
                })
                .catch(passwordUpdateError => {
                  throw new Error(passwordUpdateError)
                })
            }
          })
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
    const USER = await User.findOne({
      where: {
        email: email.toLowerCase()
      },
      attributes: ['id']
    })
    return await Client.findOne({
      where: {
        userId: USER.id
      },
      attributes: ['id'],
      raw: true
    })
      .then(user => user.id)
      .catch(error => Promise.reject(error))
  }

  /* Function that gets personal writers */
  static async getPersonalWriters (req) {
    try {
      return await MODEL.sequelize.transaction(async t => {
        const CLIENT_ID = await UserHelper.getClientId(req.email)
        return await ClientWriter.findAll({
          attributes: ['id', 'connectionConfirmed'],
          where: {
            clientId: CLIENT_ID
          },
          include: [
            {
              model: Writer,
              as: 'Writer',
              attributes: ['id', 'surname', 'otherNames', 'mobileNo', 'createdAt'],
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
          .then(writers => {
            return { writers: writers }
          })
          .catch(error => Promise.reject(error))
      })
    } catch (e) {
      return Promise.reject(e)
    }
  }

  /* Function that get a selected personal writer */
  static async getSelectedPersonalWriter (req) {
    try {
      return await MODEL.sequelize.transaction(async t => {
        return await Writer.findOne({
          attributes: ['surname', 'otherNames', 'mobileNo', 'createdAt'],
          where: {
            id: req.writerId
          },
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
              model: ClientWriter,
              as: 'ClientWriter',
              attributes: ['connectionConfirmed']
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
        })
          .then(writer => {
            return { writer: writer }
          })
          .catch(error => Promise.reject(error))
      })
    } catch (e) {
      return Promise.reject(e)
    }
  }

  /* Function that approves personal writers */
  static async approvePersonalWriter (req) {
    try {
      return await MODEL.sequelize.transaction(async t => {
        const CLIENT_WRITER = await ClientWriter.findOne({
          attributes: ['id', 'connectionConfirmed'],
          where: {
            writerId: req.writerId
          }
        })
        if (CLIENT_WRITER) {
          if (CLIENT_WRITER.connectionConfirmed) {
            return { confirmed: false, message: 'Already Confirmed!' }
          } else {
            return await ClientWriter.update({
              connectionConfirmed: true
            }, {
              where: {
                writerId: req.writerId
              }
            })
              .then(writerConfirmed => {
                return { confirmed: !!writerConfirmed }
              })
              .catch(error => Promise.reject(error))
          }
        } else {
          return { confirmed: false, message: 'Writer Invitation Does Not Exist!' }
        }
      })
    } catch (e) {
      return Promise.reject(e)
    }
  }

  /* Function to simply get the sample essay themes */
  static async getSampleEssayThemes (req) {
    try {
      const WRITER = await UserHelper.getWriterByEmail({ email: req.email })
      const WRITER_ESSAY = await WriterSampleEssay.findOne({
        where: {
          writerId: WRITER.id
        },
        attributes: ['themeId'],
        include: [
          {
            model: SampleEssayTheme,
            as: 'SampleEssayTheme',
            attributes: ['id', 'topic', 'description']
          }
        ]
      })
      if (WRITER_ESSAY) {
        return WRITER_ESSAY.SampleEssayTheme
      }
      const WRITER_DISCIPLINES = await WriterDiscipline.findOne({
        where: {
          writerId: WRITER.id
        },
        attributes: ['disciplineIds', 'primaryDiscipline']
      })
      return await SampleEssayTheme.findOne({
        where: {
          subjectId: WRITER_DISCIPLINES.primaryDiscipline
        },
        attributes: ['id', 'topic', 'description']
      })
        .then(themes => themes)
        .catch(error => {
          throw new Error(error)
        })
    } catch (e) {
      return Promise.reject(e)
    }
  }

  /* Function to record the start of the writer essay */
  static async writerStartWriting (req) {
    try {
      return await MODEL.sequelize.transaction(async (t) => {
        /* Fetch user id */
        const USER = await User.findOne({
          where: {
            email: req.email.toLowerCase()
          },
          attributes: ['id']
        }, { transaction: t })
        /* And get the writer id */
        const WRITER = await Writer.findOne({
          where: {
            userId: USER.id
          },
          attributes: ['id']
        })
        /* If writer does exist in the writer table, then return false. */
        /* Else continue */
        if (!WRITER) return false
        /* Get writer sample essay detail */
        return await WriterSampleEssay.findOne({
          where: {
            writerId: WRITER.id
          },
          attributes: ['id']
        })
          .then(async writerSampleEssay => {
            /* If a sample essay record already exists, then just return true */
            if (writerSampleEssay) {
              return true
            } else {
              /* Else create a record */
              return await WriterSampleEssay.create({
                timeAssigned: new Date(),
                writerId: WRITER.id,
                themeId: req.themeId
              }, { transaction: t })
                .then(writerEssay => !!writerEssay)
                .catch(writerEssayErr => {
                  throw new Error(writerEssayErr)
                })
            }
          })
      })
    } catch (e) {
      return Promise.reject(e)
    }
  }

  /* Function to save the writer's sample essay */
  static async saveWriterSampleEssay (req) {
    try {
      return await MODEL.sequelize.transaction(async (t) => {
        /* Get ids, as usual */
        const USER = await User.findOne({
          where: {
            email: req.email.toLowerCase()
          },
          attributes: ['id']
        }, { transaction: t })
        const WRITER = await Writer.findOne({
          where: {
            userId: USER.id
          },
          attributes: ['id']
        })
        /* If writer does not exist, return false */
        if (!WRITER) return false
        /* Else continue */
        return await WriterSampleEssay.findOne({
          where: {
            writerId: WRITER.id
          },
          attributes: ['id', 'timeAssigned']
        })
          .then(async writerSampleEssay => {
            /* If sample essay details exist, then update */
            if (writerSampleEssay) {
              /* Try to calculate the time taken */
              const TIME_ASSIGNED = new Date(writerSampleEssay.timeAssigned).getTime()
              const TIME_SUBMITTED = new Date().getTime()
              const TIME_DIFFERENCE = TIME_SUBMITTED - TIME_ASSIGNED
              const DIFFERENCE_DAYS = TIME_DIFFERENCE / (1000 * 3600 * 24)
              const DIFFERENCE_HOURS = (DIFFERENCE_DAYS % 1) * 24
              /* Then update the time taken, essay and time submitted */
              return await WriterSampleEssay.update({
                timeSubmitted: new Date(),
                timeTaken: DIFFERENCE_HOURS.toFixed(4),
                essay: req.body.essay
              }, {
                where: {
                  writerId: WRITER.id
                }
              }, { transaction: t })
                .then(writerEssay => {
                  let response
                  if (writerEssay) {
                    response = { recordSaved: true }
                  } else {
                    response = { recordSaved: false, message: 'Failed to save record' }
                  }
                  return response
                })
                .catch(writerEssayErr => {
                  throw new Error(writerEssayErr)
                })
            } else {
              /* Else return false, and no matching essay found */
              return { recordSaved: false, message: 'No matching essay found' }
            }
          })
      })
    } catch (e) {
      return Promise.reject(e)
    }
  }

  /* Function to get the writer details by email */
  static async writerApplicationStatus (req) {
    try {
      return await MODEL.sequelize.transaction(async () => {
        return await User.findOne({
          where: {
            email: req.email.toLowerCase()
          },
          attributes: ['email'],
          include: [
            {
              model: Writer,
              as: 'Writer',
              attributes: ['surname']
            },
            {
              model: AccountStatus,
              as: 'AccountStatus',
              attributes: ['status']
            },
            {
              model: AccountType,
              as: 'AccountType',
              where: {
                type: 'Writer'
              }
            }
          ]
        })
          .then(response => response)
          .catch(error => {
            throw new Error(error)
          })
      })
    } catch (e) {
      return Promise.reject(e)
    }
  }

  /* Function to save a problem report from a writer or client */
  static async reportProblem (req) {
    try {
      return await MODEL.sequelize.transaction(async (t) => {
        /* Get user id */
        const USER = await User.findOne({
          where: {
            email: req.email.toLowerCase()
          },
          attributes: ['id']
        }, { transaction: t })
        /* First get the source ID of the problem */
        const SOURCE = await DataSource.findOne({
          where: {
            source: req.source
          },
          attributes: ['id']
        })
        /* Then create the problem report record */
        return await ProblemReport.create({
          userId: USER.id,
          description: req.obj.description,
          source: SOURCE.id
        })
          .then(async response => {
            /* Loop through the supporting files and save them if any */
            for (let i = 0; i < req.obj.supportingFiles.length; i++) {
              /* Final original name to be formatted first before saving */
              const FINAL_ORIGINAL_NAME = originalNameFormatter(req.obj.supportingFiles[i].originalName)
              await ProblemReportFile.create({
                reportId: response.dataValues.id,
                fileUrl: req.obj.supportingFiles[i].fileUrl,
                originalName: FINAL_ORIGINAL_NAME
              }, { transaction: t })
            }
            return !!response
          })
          .catch(error => {
            throw new Error(error)
          })
      })
    } catch (e) {
      return Promise.reject(e)
    }
  }

  /* Function to save the login details of a user */
  static async saveLogin (req) {
    try {
      return await MODEL.sequelize.transaction(async (t) => {
        /* Simply get the user id */
        const USER = await User.findOne({
          where: {
            email: req.email.toLowerCase()
          },
          attributes: ['id']
        }, { transaction: t })
        /* And the source */
        const SOURCE = await DataSource.findOne({
          where: {
            source: req.source
          },
          attributes: ['id']
        })
        /* Before adding a login record */
        return await Login.create({
          userId: USER.id,
          source: SOURCE.id
        })
          .then(response => !!response)
          .catch(error => {
            throw new Error(error)
          })
      })
    } catch (e) {
      return Promise.reject(e)
    }
  }

  /* Function to get a client's mobile phone */
  static async getClientMobile (req) {
    try {
      const USER = await User.findOne({
        where: {
          email: req.email.toLowerCase()
        },
        attributes: ['id']
      })
      return await Client.findOne({
        where: {
          userId: USER.id
        },
        attributes: ['id']
      })
        .then(async clientID => {
          const MOBILE = await ClientPayment.findOne({
            where: {
              clientId: clientID.id
            },
            attributes: ['mobile'],
            order: [
              ['createdAt', 'DESC']
            ]
          })
          return MOBILE ? MOBILE.mobile : ''
        })
        .catch(error => {
          throw new Error(error)
        })
    } catch (e) {
      return Promise.reject(e)
    }
  }

  /* Function to get a client's email address by order Id */
  static async getClientEmailByOrderId (req) {
    try {
      return await Order.findOne({
        where: {
          id: req.orderId
        },
        attributes: ['clientId'],
        include: [
          {
            model: Client,
            as: 'Client',
            attributes: ['id'],
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
        .then(clientEmail => clientEmail ? clientEmail.Client.User.email : null)
        .catch(err => {
          throw new Error(err)
        })
    } catch (e) {
      return Promise.reject(e)
    }
  }
}

module.exports = UserHelper
