'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert({ tableName: 'payment_status', schema: 'payments' }, [
      {
        status: 'Pending payment',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        status: 'Processing payment',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        status: 'Success',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        status: 'Failed',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        status: 'Success with balance',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        status: 'User cancelled',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete({ tableName: 'payment_status', schema: 'payments' }, null, {})
  }
}
