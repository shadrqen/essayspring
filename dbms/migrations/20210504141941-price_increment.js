'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return queryInterface.createTable('price_increment', {
      id: {
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        type: Sequelize.INTEGER
      },
      serviceType: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: 'order_service_type',
            schema: 'orders'
          },
          key: 'id'
        }
      },
      tier: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: 'price_tier',
            schema: 'payments'
          },
          key: 'id'
        }
      },
      hr12: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0.00
      },
      day1: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0.00
      },
      day2: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0.00
      },
      day3: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0.00
      },
      day5: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0.00
      },
      college: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0.00
      },
      bachelors: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0.00
      },
      masters: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0.00
      },
      doctorate: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0.00
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
      schema: 'payments'
    })
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return queryInterface.dropTable('price_increment')
  }
}
