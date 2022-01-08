'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert({ tableName: 'login_via', schema: 'public' }, [
      {
        via: 'Email',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        via: 'Google',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        via: 'Facebook',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete({ tableName: 'login_via', schema: 'public' }, null, {})
  }
}
