'use strict'
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('writer_grammar_test', {
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
      totalScore: {
        type: Sequelize.INTEGER(Sequelize.INTEGER),
        allowNull: false
      },
      correctQuestions: {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
        allowNull: false
      },
      wrongQuestions: {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
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
      schema: 'writer'
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('writer_grammar_test')
  }
}
