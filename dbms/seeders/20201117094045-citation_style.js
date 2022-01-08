'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert({ tableName: 'citation_style', schema: 'general' }, [
      {
        citation: 'APA',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        citation: 'Chicago',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        citation: 'Harvard',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        citation: 'IEEE',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        citation: 'MLA',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        citation: 'Other',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete({ tableName: 'citation_style', schema: 'general' }, null, {})
  }
}
