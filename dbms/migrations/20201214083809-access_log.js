'use strict'
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('access_log', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ipAddress: {
        type: Sequelize.STRING(20),
        allowNull: true
      },
      origin: {
        type: Sequelize.STRING(200),
        allowNull: true
      },
      originalUrl: {
        type: Sequelize.STRING(500),
        allowNull: true
      },
      referer: {
        type: Sequelize.STRING(500),
        allowNull: true
      },
      partyTypeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: 'account_type',
            schema: 'public'
          },
          key: 'id'
        }
      },
      partyEmail: {
        type: Sequelize.STRING(50),
        allowNull: true
      },
      formData: {
        type: Sequelize.JSON,
        allowNull: true
      },
      suspect: {
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
      schema: 'logs'
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('access_log')
  }
}
