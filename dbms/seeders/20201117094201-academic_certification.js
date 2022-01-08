'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert({ tableName: 'academic_certification', schema: 'writer' }, [
      {
        achievement: 'Certificate',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        achievement: 'Diploma',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        achievement: 'Undergraduate',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        achievement: 'Postgraduate (Masters)',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        achievement: 'PhD',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete({ tableName: 'academic_certification', schema: 'writer' }, null, {})
  }
}
