'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert({ tableName: 'assgnmnt_type_category', schema: 'general' }, [
      {
        category: 'Type of Paperwork',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        category: 'Coursework',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        category: 'Questions & Problems',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete({ tableName: 'assgnmnt_type_category', schema: 'general' }, null, {})
  }
}
