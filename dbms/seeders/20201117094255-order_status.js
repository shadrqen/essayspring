'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert({ tableName: 'order_status', schema: 'orders' }, [
      {
        status: 'Pending payment',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        status: 'Pending writer acknowledgement',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        status: 'Ongoing',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        status: 'Submitted',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        status: 'Completed',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        status: 'Pending revision',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        status: 'Undergoing revision',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        status: 'Available',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        status: 'Bidding ongoing',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        status: 'Disputed',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete({ tableName: 'order_status', schema: 'orders' }, null, {})
  }
}
