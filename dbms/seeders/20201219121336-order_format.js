'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert({ tableName: 'order_format', schema: 'orders' }, [
      {
        wordsPerPage: 550,
        spacing: 'single spaced',
        currentlyInUse: false,
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        wordsPerPage: 275,
        spacing: 'double spaced',
        currentlyInUse: true,
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete({ tableName: 'order_format', schema: 'orders' }, null, {})
  }
}
