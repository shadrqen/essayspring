'use strict'
module.exports = {
  up (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn({
        tableName: 'problem_report',
        schema: 'admin'
      },
      'source',
      {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'data_source',
            schema: 'general'
          },
          key: 'id'
        },
        allowNull: true
      }
      )
    ])
  },

  down (queryInterface, Sequelize) {
    // logic for reverting the changes
    return Promise.all([
      queryInterface.removeColumn({
        tableName: 'problem_report',
        schema: 'admin'
      },
      'source')
    ])
  }
}
