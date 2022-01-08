'use strict'
module.exports = (sequelize, DataTypes) => {
  const WriterPaymentsModel = sequelize.define('WriterPayment', {
    writerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: {
          tableName: 'writer',
          schema: 'writer'
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
    tableName: 'writer_payment',
    schema: 'payments'
  })
  WriterPaymentsModel.associate = function (models) {
    WriterPaymentsModel.belongsTo(models.Writer, { as: 'Writer', foreignKey: 'writerId' })
    WriterPaymentsModel.belongsTo(models.Order, { as: 'Order', foreignKey: 'orderId' })
    WriterPaymentsModel.belongsTo(models.Currency, { as: 'Currency', foreignKey: 'currencyId' })
    WriterPaymentsModel.belongsTo(models.PaymentStatus, { as: 'PaymentStatus', foreignKey: 'statusId' })
  }
  return WriterPaymentsModel
}
