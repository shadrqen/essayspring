'use strict'
module.exports = (sequelize, DataTypes) => {
  const ClientOrdersModel = sequelize.define('ClientOrder', {
    clientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: {
          tableName: 'client',
          schema: 'client'
        },
        key: 'id'
      }
    },
    orderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: {
          tableName: 'order',
          schema: 'orders'
        },
        key: 'id'
      }
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    freezeTableName: true,
    tableName: 'client_order',
    schema: 'orders'
  })
  ClientOrdersModel.associate = function (models) {
    ClientOrdersModel.belongsTo(models.Client, { as: 'Client', foreignKey: 'clientId' })
    ClientOrdersModel.belongsTo(models.Order, { as: 'Order', foreignKey: 'orderId' })
  }
  return ClientOrdersModel
}
