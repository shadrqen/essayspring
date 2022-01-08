'use strict'
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('client_activity', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      clientId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: 'client',
            schema: 'client'
          },
          key: 'id'
        }
      },
      numOfSuccessfulOrders: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      numOfFailedOrders: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
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
      schema: 'client'
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('client_activity')
  }
}
