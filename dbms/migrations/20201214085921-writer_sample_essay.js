'use strict'
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('writer_sample_essay', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      writerId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: 'writer',
            schema: 'writer'
          },
          key: 'id'
        }
      },
      themeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: 'sample_essay_theme',
            schema: 'writer'
          },
          key: 'id'
        }
      },
      essay: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      timeAssigned: {
        type: Sequelize.DATE,
        allowNull: false
      },
      timeSubmitted: {
        type: Sequelize.DATE,
        allowNull: true
      },
      timeTaken: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      marksAttained: {
        type: Sequelize.FLOAT,
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
      schema: 'writer'
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('writer_sample_essay')
  }
}
