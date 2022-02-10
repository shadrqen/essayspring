const SEQUELIZE = require('sequelize')

/* Module to return the exact sequelize error.
* It takes an error, and returns its type */
module.exports.errorChecker = error => {
  const ERRORS_LIST = []
  if (error instanceof SEQUELIZE.UniqueConstraintError) {
    ERRORS_LIST.push('UniqueConstraintError')
  } else if (error instanceof SEQUELIZE.BaseError) {
    ERRORS_LIST.push('BaseError')
  } else if (error instanceof SEQUELIZE.ValidationError) {
    ERRORS_LIST.push('ValidationError')
  } else if (error instanceof SEQUELIZE.DatabaseError) {
    ERRORS_LIST.push('DatabaseError')
  } else if (error instanceof SEQUELIZE.TimeoutError) {
    ERRORS_LIST.push('TimeoutError')
  } else if (error instanceof SEQUELIZE.ForeignKeyConstraintError) {
    ERRORS_LIST.push('ForeignKeyConstraintError')
  } else if (error instanceof SEQUELIZE.ExclusionConstraintError) {
    ERRORS_LIST.push('ExclusionConstraintError')
  } else if (error instanceof SEQUELIZE.ValidationErrorItem) {
    ERRORS_LIST.push('ValidationErrorItem')
  } else if (error instanceof SEQUELIZE.ConnectionError) {
    ERRORS_LIST.push('ConnectionError')
  } else if (error instanceof SEQUELIZE.ConnectionRefusedError) {
    ERRORS_LIST.push('ConnectionRefusedError')
  } else if (error instanceof SEQUELIZE.AccessDeniedError) {
    ERRORS_LIST.push('AccessDeniedError')
  } else if (error instanceof SEQUELIZE.HostNotFoundError) {
    ERRORS_LIST.push('HostNotFoundError')
  } else if (error instanceof SEQUELIZE.HostNotReachableError) {
    ERRORS_LIST.push('HostNotReachableError')
  } else if (error instanceof SEQUELIZE.InvalidConnectionError) {
    ERRORS_LIST.push('InvalidConnectionError')
  } else if (error instanceof SEQUELIZE.ConnectionTimedOutError) {
    ERRORS_LIST.push('ConnectionTimedOutError')
  }
  return String(ERRORS_LIST)
}
