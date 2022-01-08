'use strict'
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('currency', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      currency: {
        type: Sequelize.STRING(30),
        allowNull: false
      },
      currencyCode: {
        type: Sequelize.STRING(3),
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
      schema: 'payments'
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('currency')
  }
}
