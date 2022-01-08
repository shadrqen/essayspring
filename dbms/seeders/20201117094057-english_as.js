'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert({ tableName: 'english_as', schema: 'writer' }, [
      {
        as: 'English as a Native Language',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        as: 'English as a Second Language',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete({ tableName: 'english_as', schema: 'writer' }, null, {})
  }
}
