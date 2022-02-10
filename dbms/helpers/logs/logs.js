'use strict'

/* Helper module to handle logging logic */

/* Importing the index model that will be used to access the sequelize instance, which will in turn help create
* sequelize transactions */
const {
  AccessLog,
  AccountType
} = require('../../models')

/* Importing the index model file that will be used in creating transactions.
* It makes use of static functions to enable calling them on the class themselves
* directly, as opposed to creating a class instance then calling them on the instance */
const MODEL = require('../../models/index')

/* The class that contains the logging logic i.e functions */
class LogHelper {
  /* Function that saves logs on the database */
  static async saveLog (req) {
    try {
      /* Getting the type of party */
      const PARTY_TYPE = await AccountType.findOne({
        where: {
          type: req.userType
        },
        attributes: ['id']
      })
      /* Creating a log record in the AccessLog table in the database */
      return await MODEL.sequelize.transaction(async (t) => {
        return await AccessLog.create({
          ipAddress: req.ip,
          origin: req.origin,
          originalUrl: req.originalUrl,
          referer: req.referer,
          partyTypeId: PARTY_TYPE.id,
          partyEmail: req.email,
          formData: req.formData,
          suspect: req.suspect
        }, { transaction: t })
          .then(logSaved => {
            /* Return true whenever the log is saved (truthy) */
            return !!logSaved
          })
          .catch(logSavedError => {
            /* Throw error whenever the create AccessLog record fails */
            throw new Error(logSavedError)
          })
      })
    } catch (e) {
      /* Return a rejected promise */
      return Promise.reject(e)
    }
  }
}

module.exports = LogHelper
