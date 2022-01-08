'use strict'
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('problem_report', {
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
      source: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: 'data_source',
            schema: 'general'
          },
          key: 'id'
        }
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      solved: {
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
      schema: 'admin'
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('problem_report')
  }
}
