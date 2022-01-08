'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert({ tableName: 'account_status', schema: 'public' }, [
      {
        status: 'Active',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        status: 'Inactive',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        status: 'Pending review',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        status: 'Suspended',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        status: 'Deactivated',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete({ tableName: 'account_status', schema: 'public' }, null, {})
  }
}
