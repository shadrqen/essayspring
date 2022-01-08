'use strict'
module.exports = (sequelize, DataTypes) => {
  const PriceTierModel = sequelize.define('PriceTier', {
    tier: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    freezeTableName: true,
    tableName: 'price_tier',
    schema: 'payments'
  })
  PriceTierModel.associate = function (models) {
    PriceTierModel.hasMany(models.AssignmentType, { as: 'AssignmentType', foreignKey: 'id' })
    PriceTierModel.hasMany(models.BasePrice, { as: 'BasePrice', foreignKey: 'id' })
    PriceTierModel.hasMany(models.PriceIncrement, { as: 'PriceIncrement', foreignKey: 'id' })
  }
  return PriceTierModel
}
