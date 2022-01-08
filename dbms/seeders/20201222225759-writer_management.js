'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert({ tableName: 'writer_management', schema: 'admin' }, [
      {
        currentSeason: 'High',
        registrationOpen: true,
        expectedWriterCount: 10,
        currentWriterCount: 0,
        writerCountVariance: 0,
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete({ tableName: 'writer_management', schema: 'admin' }, null, {})
  }
}
