'use strict'
module.exports = (sequelize, DataTypes) => {
  const PaymentStatusModel = sequelize.define('PaymentStatus', {
    status: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    freezeTableName: true,
    tableName: 'payment_status',
    schema: 'payments'
  })
  PaymentStatusModel.associate = function (models) {
    PaymentStatusModel.hasMany(models.ClientPayment, { as: 'ClientPayment', foreignKey: 'id' })
    PaymentStatusModel.hasMany(models.WriterPayment, { as: 'WriterPayment', foreignKey: 'id' })
  }
  return PaymentStatusModel
}
