'use strict'
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('grammar_answer', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      questionId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'grammar_question',
            schema: 'writer'
          },
          key: 'id'
        }
      },
      answer: {
        type: Sequelize.STRING(200),
        allowNull: false
      },
      answerLetter: {
        type: Sequelize.STRING(2),
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
    return queryInterface.dropTable('grammar_answer')
  }
}
