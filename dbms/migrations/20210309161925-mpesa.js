'use strict'
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('mpesa', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      checkoutRequestId: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      merchantRequestId: {
        type: Sequelize.STRING(30),
        allowNull: false
      },
      amount: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      receiptNumber: {
        type: Sequelize.STRING(15),
        allowNull: false
      },
      transactionDate: {
        type: Sequelize.STRING(15),
        allowNull: false
      },
      mobile: {
        type: Sequelize.STRING(13),
        allowNull: false
      },
      resultCodeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: 'mpesa_result_codes',
            schema: 'payments'
          },
          key: 'id'
        }
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
    return queryInterface.dropTable('mpesa')
  }
}
