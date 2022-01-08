'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert({ tableName: 'time_am_pm', schema: 'general' }, [
      {
        time: '12AM',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        time: '1AM',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        time: '2AM',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        time: '3AM',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        time: '4AM',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        time: '5AM',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        time: '6AM',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        time: '7AM',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        time: '8AM',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        time: '9AM',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        time: '10AM',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        time: '11AM',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        time: '12PM',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        time: '1PM',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        time: '2PM',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        time: '3PM',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        time: '4PM',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        time: '5PM',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        time: '6PM',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        time: '7PM',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        time: '8PM',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        time: '9PM',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        time: '10PM',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        time: '11PM',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete({ tableName: 'time_am_pm', schema: 'general' }, null, {})
  }
}
