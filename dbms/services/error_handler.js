const sequelize = require('sequelize')

/* Module to return the exact sequelize error.
* It takes an error, and returns its type */
module.exports.errorChecker = error => {
  const errorsList = []
  if (error instanceof sequelize.UniqueConstraintError) {
    errorsList.push('UniqueConstraintError')
  } else if (error instanceof sequelize.BaseError) {
    errorsList.push('BaseError')
  } else if (error instanceof sequelize.ValidationError) {
    errorsList.push('ValidationError')
  } else if (error instanceof sequelize.DatabaseError) {
    errorsList.push('DatabaseError')
  } else if (error instanceof sequelize.TimeoutError) {
    errorsList.push('TimeoutError')
  } else if (error instanceof sequelize.ForeignKeyConstraintError) {
    errorsList.push('ForeignKeyConstraintError')
  } else if (error instanceof sequelize.ExclusionConstraintError) {
    errorsList.push('ExclusionConstraintError')
  } else if (error instanceof sequelize.ValidationErrorItem) {
    errorsList.push('ValidationErrorItem')
  } else if (error instanceof sequelize.ConnectionError) {
    errorsList.push('ConnectionError')
  } else if (error instanceof sequelize.ConnectionRefusedError) {
    errorsList.push('ConnectionRefusedError')
  } else if (error instanceof sequelize.AccessDeniedError) {
    errorsList.push('AccessDeniedError')
  } else if (error instanceof sequelize.HostNotFoundError) {
    errorsList.push('HostNotFoundError')
  } else if (error instanceof sequelize.HostNotReachableError) {
    errorsList.push('HostNotReachableError')
  } else if (error instanceof sequelize.InvalidConnectionError) {
    errorsList.push('InvalidConnectionError')
  } else if (error instanceof sequelize.ConnectionTimedOutError) {
    errorsList.push('ConnectionTimedOutError')
  }
  return String(errorsList)
}
