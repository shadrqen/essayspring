'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert({ tableName: 'entity_type', schema: 'public' }, [
      {
        type: 'Private',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        type: 'Public',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete({ tableName: 'entity_type', schema: 'public' }, null, {})
  }
}
