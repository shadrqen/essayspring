'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert({ tableName: 'skill_level', schema: 'writer' }, [
      {
        level: 'Probation',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        level: 'Beginner',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        level: 'Intermediate',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        level: 'Advanced',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        level: 'Expert',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete({ tableName: 'skill_level', schema: 'writer' }, null, {})
  }
}
