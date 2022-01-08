'use strict'
module.exports = {
  up (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn({
        tableName: 'writer_work_experience',
        schema: 'writer'
      },
      'yearsExperience',
      {
        type: Sequelize.INTEGER,
        allowNull: true
      }
      )
    ])
  },

  down (queryInterface, Sequelize) {
    // logic for reverting the changes
    return Promise.all([
      queryInterface.removeColumn({
        tableName: 'writer_work_experience',
        schema: 'writer'
      },
      'yearsExperience')
    ])
  }
}
