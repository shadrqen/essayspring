'use strict'
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('problem_report_file', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      reportId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: 'problem_report',
            schema: 'admin'
          },
          key: 'id'
        }
      },
      fileUrl: {
        type: Sequelize.STRING(50),
        allowNull: true
      },
      originalName: {
        type: Sequelize.STRING(50),
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
      schema: 'admin'
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('problem_report_file')
  }
}
