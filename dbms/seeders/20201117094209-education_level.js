'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert({ tableName: 'education_level', schema: 'general' }, [
      {
        level: 'Primary',
        academicInclined: true,
        orderInclined: false,
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        level: 'High School',
        academicInclined: true,
        orderInclined: true,
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        level: 'College',
        academicInclined: true,
        orderInclined: true,
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        level: 'University',
        academicInclined: true,
        orderInclined: false,
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        level: 'Bachelor\'s',
        academicInclined: false,
        orderInclined: true,
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        level: 'Master\'s',
        academicInclined: false,
        orderInclined: true,
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        level: 'Doctorate',
        academicInclined: false,
        orderInclined: true,
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete({ tableName: 'education_level', schema: 'general' }, null, {})
  }
}
