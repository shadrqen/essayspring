'use strict'
module.exports = (sequelize, DataTypes) => {
  const OrderServiceTypeModel = sequelize.define('OrderServiceType', {
    type: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    extra: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    description: {
      type: DataTypes.STRING(100),
      allowNull: false,
      default: ''
    },
    price: {
      type: DataTypes.STRING(10),
      allowNull: false,
      default: ''
    },
    currencyId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: {
          tableName: 'currency',
          schema: 'payments'
        }
      }
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    freezeTableName: true,
    tableName: 'order_service_type',
    schema: 'orders'
  })
  OrderServiceTypeModel.associate = function (models) {
    OrderServiceTypeModel.hasMany(models.Order, { as: 'Order', foreignKey: 'id' })
    OrderServiceTypeModel.hasMany(models.BasePrice, { as: 'BasePrice', foreignKey: 'id' })
    OrderServiceTypeModel.hasMany(models.ExtraOrderService, { as: 'ExtraOrderService', foreignKey: 'id' })
    OrderServiceTypeModel.belongsTo(models.Currency, { as: 'Currency', foreignKey: 'currencyId' })
  }
  return OrderServiceTypeModel
}
