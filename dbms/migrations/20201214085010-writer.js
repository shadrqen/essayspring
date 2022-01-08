'use strict'
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('writer', {
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
      type: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: 'entity_type',
            schema: 'public'
          },
          key: 'id'
        }
      },
      surname: {
        type: Sequelize.STRING(20),
        allowNull: false
      },
      otherNames: {
        type: Sequelize.STRING(60),
        allowNull: false
      },
      nIdFront: {
        type: Sequelize.STRING(50),
        allowNull: true
      },
      nIdBack: {
        type: Sequelize.STRING(50),
        allowNull: true
      },
      nationalID: {
        type: Sequelize.STRING(10),
        allowNull: false
      },
      mobileNo: {
        type: Sequelize.STRING(15),
        allowNull: false
      },
      availableNightCalls: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: false
      },
      genderId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: 'gender',
            schema: 'general'
          },
          key: 'id'
        }
      },
      citizenshipId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: 'country',
            schema: 'general'
          },
          key: 'id'
        }
      },
      countyState: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      englishAsId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: 'english_as',
            schema: 'writer'
          },
          key: 'id'
        }
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
    return queryInterface.dropTable('writer')
  }
}
