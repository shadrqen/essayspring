'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return await queryInterface.createTable({ tableName: 'order_revision', schema: 'orders' }, {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      orderId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'order',
            schema: 'orders'
          },
          key: 'id'
        }
      },
      revisionInstructions: {
        type: Sequelize.JSONB,
        allowNull: false
      },
      deadline: {
        type: Sequelize.DATE,
        allowNull: false
      },
      submitted: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      creator: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      editor: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      isDeleted: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return await queryInterface.dropTable('order_revision')
  }
}
