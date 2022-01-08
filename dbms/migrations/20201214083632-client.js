'use strict'
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('client', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: 'user',
            schema: 'public'
          },
          key: 'id'
        }
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      mobile: {
        type: Sequelize.STRING(15),
        allowNull: true
      },
      picture: {
        type: Sequelize.STRING(200),
        allowNull: true
      },
      facebookId: {
        type: Sequelize.STRING(30),
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
      schema: 'client'
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('client')
  }
}
