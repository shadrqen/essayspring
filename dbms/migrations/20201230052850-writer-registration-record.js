'use strict'
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('writer_registration_record', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      writerId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: 'writer_email_submission',
            schema: 'writer'
          }
        }
      },
      lastStepReached: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      detailReached: {
        type: Sequelize.STRING(50),
        allowNull: true
      },
      isDeleted: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }, {
      schema: 'writer'
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('writer_registration_record')
  }
}
