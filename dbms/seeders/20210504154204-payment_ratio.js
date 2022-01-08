'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert({ tableName: 'payment_ratio', schema: 'payments' }, [
      {
        company: 15,
        writer: 85,
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete({ tableName: 'payment_ratio', schema: 'payments' }, null, {})
  }
}
