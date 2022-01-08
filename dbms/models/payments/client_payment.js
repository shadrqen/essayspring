'use strict'
module.exports = (sequelize, DataTypes) => {
  const ClientPaymentsModel = sequelize.define('ClientPayment', {
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
    currencyId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: {
          tableName: 'currency',
          schema: 'payments'
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
    statusId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: {
          tableName: 'payment_status',
          schema: 'payments'
        },
        key: 'id'
      }
    },
    transactionId: {
      type: DataTypes.STRING(60),
      allowNull: false
    },
    checkoutRequestId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    mobile: {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    amount: {
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
    tableName: 'client_payment',
    schema: 'payments'
  })
  ClientPaymentsModel.associate = function (models) {
    ClientPaymentsModel.belongsTo(models.Client, { as: 'Client', foreignKey: 'clientId' })
    ClientPaymentsModel.belongsTo(models.Currency, { as: 'Currency', foreignKey: 'currencyId' })
    ClientPaymentsModel.belongsTo(models.PaymentStatus, { as: 'PaymentStatus', foreignKey: 'statusId' })
    ClientPaymentsModel.belongsTo(models.Order, { as: 'Order', foreignKey: 'orderId' })
  }
  return ClientPaymentsModel
}
