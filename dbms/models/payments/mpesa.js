'use strict'
module.exports = (sequelize, DataTypes) => {
  const MPESAModel = sequelize.define('MPESA', {
    checkoutRequestId: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    merchantRequestId: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    receiptNumber: {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    transactionDate: {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    mobile: {
      type: DataTypes.STRING(13),
      allowNull: false
    },
    resultCodeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: {
          tableName: 'mpesa_result_codes',
          schema: 'payments'
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
    tableName: 'mpesa',
    schema: 'payments'
  })
  MPESAModel.associate = function (models) {
    MPESAModel.belongsTo(models.MPESAResultCode, { as: 'MPESAResultCode', foreignKey: 'resultCodeId' })
  }
  return MPESAModel
}
