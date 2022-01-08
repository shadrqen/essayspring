'use strict'
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('grammar_question', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      instruction: {
        type: Sequelize.STRING(200),
        allowNull: true
      },
      question: {
        type: Sequelize.STRING(500),
        allowNull: false
      },
      correctAnswerId: {
        type: Sequelize.INTEGER,
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
    return queryInterface.dropTable('grammar_question')
  }
}
