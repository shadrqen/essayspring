'use strict'
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('education_level', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      level: {
        type: Sequelize.STRING(15),
        allowNull: false
      },
      academicInclined: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      orderInclined: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
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
    return queryInterface.dropTable('education_level')
  }
}
