'use strict'
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('writer_balance', {
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
            tableName: 'writer',
            schema: 'writer'
          },
          key: 'id'
        }
      },
      currencyId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: 'currency',
            schema: 'payments'
          },
          key: 'id'
        }
      },
      amount: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0.00
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
      schema: 'payments'
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('writer_balance')
  }
}
