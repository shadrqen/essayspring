'use strict'
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('order_payment_detail', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      orderId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: 'order',
            schema: 'orders'
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
          }
        }
      },
      extras: {
        type: Sequelize.STRING(6),
        allowNull: true
      },
      extrasTotalPrice: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0.00
      },
      totalPrice: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0.00
      },
      cpp: {
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
    return queryInterface.dropTable('order_payment_detail')
  }
}
