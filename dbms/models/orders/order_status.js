'use strict'
module.exports = (sequelize, DataTypes) => {
  const OrderStatusModel = sequelize.define('OrderStatus', {
    status: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    freezeTableName: true,
    tableName: 'order_status',
    schema: 'orders'
  })
  OrderStatusModel.associate = function (models) {
    OrderStatusModel.hasMany(models.Order, { as: 'Order', foreignKey: 'statusId', sourceKey: 'id' })
  }
  return OrderStatusModel
}
