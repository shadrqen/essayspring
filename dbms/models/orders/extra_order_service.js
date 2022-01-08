'use strict'
module.exports = (sequelize, DataTypes) => {
  const ExtraOrderServicesModel = sequelize.define('ExtraOrderService', {
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
    serviceTypeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: {
          tableName: 'order_service_type',
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
    tableName: 'extra_order_service',
    schema: 'orders'
  })
  ExtraOrderServicesModel.associate = function (models) {
    ExtraOrderServicesModel.belongsTo(models.Order, { as: 'Order', foreignKey: 'orderId' })
    ExtraOrderServicesModel.belongsTo(models.OrderServiceType, { as: 'OrderServiceType', foreignKey: 'serviceTypeId' })
  }
  return ExtraOrderServicesModel
}
