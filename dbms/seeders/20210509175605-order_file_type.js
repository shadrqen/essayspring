'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert({ tableName: 'order_file_type', schema: 'orders' }, [
      {
        type: 'Client Supporting',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        type: 'Writer Supporting',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        type: 'Paper',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        type: 'Revision Supporting',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete({ tableName: 'order_file_type', schema: 'orders' }, null, {})
  }
}
