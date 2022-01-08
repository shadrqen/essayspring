'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert({ tableName: 'discipline', schema: 'general' }, [
      {
        discipline: 'Art',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        discipline: 'Business and Management',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        discipline: 'Computer Science',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        discipline: 'Economics',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        discipline: 'Education',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        discipline: 'Engineering',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        discipline: 'English and Literature',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        discipline: 'Health Care and Live Sciences',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        discipline: 'Humanities',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        discipline: 'Law',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        discipline: 'Marketing',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        discipline: 'Mathematics and Statistics',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        discipline: 'Natural Sciences',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        discipline: 'Philosophy',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        discipline: 'Political Science',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        discipline: 'Psychology',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        discipline: 'Religion',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        discipline: 'Social Science',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        discipline: 'Other',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete({ tableName: 'discipline', schema: 'general' }, null, {})
  }
}
