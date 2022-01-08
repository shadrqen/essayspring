'use strict'
module.exports = (sequelize, DataTypes) => {
  const CurrenciesModel = sequelize.define('Currency', {
    currency: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    currencyCode: {
      type: DataTypes.STRING(3),
      allowNull: false
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    freezeTableName: true,
    tableName: 'currency',
    schema: 'payments'
  })
  CurrenciesModel.associate = function (models) {
    CurrenciesModel.hasMany(models.ClientPayment, { as: 'ClientPayment', foreignKey: 'id' })
    CurrenciesModel.hasMany(models.ClientBalance, { as: 'ClientBalance', foreignKey: 'id' })
    CurrenciesModel.hasMany(models.WriterPayment, { as: 'WriterPayment', foreignKey: 'id' })
    CurrenciesModel.hasMany(models.WriterBalance, { as: 'WriterBalance', foreignKey: 'id' })
    CurrenciesModel.hasMany(models.OrderPaymentDetail, { as: 'OrderPaymentDetail', foreignKey: 'id' })
    CurrenciesModel.hasMany(models.OrderServiceType, { as: 'OrderServiceType', foreignKey: 'id' })
    CurrenciesModel.hasMany(models.BasePrice, { as: 'BasePrice', foreignKey: 'id' })
  }
  return CurrenciesModel
}
