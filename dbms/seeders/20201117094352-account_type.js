'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert({ tableName: 'account_type', schema: 'public' }, [
      {
        type: 'Admin',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        type: 'Client',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        type: 'Writer',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        type: 'Other',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete({ tableName: 'account_type', schema: 'public' }, null, {})
  }
}
