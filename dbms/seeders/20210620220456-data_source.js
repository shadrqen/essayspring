'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert({ tableName: 'data_source', schema: 'general' }, [
      {
        source: 'EssaySpring',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        source: 'Writeray',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        source: 'WriterayApp',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete({ tableName: 'data_source', schema: 'general' }, null, {})
  }
}
