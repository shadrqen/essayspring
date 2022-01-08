'use strict'
module.exports = {
  up (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.changeColumn({
        tableName: 'access_log',
        schema: 'logs'
      },
      'origin',
      {
        type: Sequelize.STRING(200)
      }
      )
    ])
  },

  down (queryInterface, Sequelize) {
    // logic for reverting the changes
    return Promise.all([
      queryInterface.changeColumn({
        tableName: 'access_log',
        schema: 'logs'
      },
      'origin')
    ])
  }
}
