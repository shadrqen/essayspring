'use strict'
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('order_format', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      wordsPerPage: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      spacing: {
        type: Sequelize.STRING(30),
        allowNull: false
      },
      currentlyInUse: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
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
    return queryInterface.dropTable('order_format')
  }
}
