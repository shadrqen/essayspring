'use strict'
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('writer_management', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      currentSeason: {
        type: Sequelize.STRING(10),
        allowNull: false
      },
      registrationOpen: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      expectedWriterCount: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      currentWriterCount: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      writerCountVariance: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
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
    return queryInterface.dropTable('writer_management')
  }
}
