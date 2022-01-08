'use strict'
module.exports = (sequelize, DataTypes) => {
  const ClientOrderPostingModel = sequelize.define('ClientOrderPostingStep', {
    clientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: {
          tableName: 'client',
          schema: 'client'
        }
      }
    },
    orderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: {
          tableName: 'order',
          schema: 'orders'
        }
      }
    },
    lastStep: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    freezeTableName: true,
    tableName: 'client_order_posting_step',
    schema: 'client'
  })

  ClientOrderPostingModel.associate = function (models) {
    ClientOrderPostingModel.belongsTo(models.Client, { as: 'Client', foreignKey: 'clientId' })
    ClientOrderPostingModel.belongsTo(models.Order, { as: 'Order', foreignKey: 'orderId' })
  }
  return ClientOrderPostingModel
}
