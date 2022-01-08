'use strict'
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('citation_style_documentation', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      citationStyleId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: 'citation_style',
            schema: 'general'
          },
          key: 'id'
        }
      },
      documentationUrl: {
        type: Sequelize.STRING(20),
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
    return queryInterface.dropTable('citation_style_documentation')
  }
}
