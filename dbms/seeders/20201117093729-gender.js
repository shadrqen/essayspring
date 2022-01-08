'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert({ tableName: 'gender', schema: 'general' }, [
      {
        gender: 'Male',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        gender: 'Female',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete({ tableName: 'gender', schema: 'general' }, null, {})
  }
}
