'use strict'
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('assignment_type', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      category: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: 'assgnmnt_type_category',
            schema: 'general'
          },
          key: 'id'
        }
      },
      tier: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: 'price_tier',
            schema: 'payments'
          },
          key: 'id'
        }
      },
      type: {
        type: Sequelize.STRING(50),
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
      schema: 'general'
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('assignment_type')
  }
}
