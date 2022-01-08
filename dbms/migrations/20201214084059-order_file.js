'use strict'
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('order_file', {
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
      type: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: 'order_file_type',
            schema: 'orders'
          },
          key: 'id'
        }
      },
      fileUrl: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      originalName: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      submittedPaper: {
        type: Sequelize.BOOLEAN,
        allowNull: false
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
      schema: 'orders'
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('order_file')
  }
}
