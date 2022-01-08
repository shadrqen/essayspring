'use strict'
module.exports = (sequelize, DataTypes) => {
  const OrderPaymentDetails = sequelize.define('OrderPaymentDetail', {
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
    extras: {
      type: DataTypes.STRING(6),
      allowNull: true
    },
    extrasTotalPrice: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0.00
    },
    totalPrice: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0.00
    },
    cpp: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0.00
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    freezeTableName: true,
    tableName: 'order_payment_detail',
    schema: 'payments'
  })
  OrderPaymentDetails.associate = function (models) {
    OrderPaymentDetails.belongsTo(models.Order, { as: 'Order', foreignKey: 'orderId' })
    OrderPaymentDetails.belongsTo(models.Currency, { as: 'Currency', foreignKey: 'currencyId' })
  }
  return OrderPaymentDetails
}
