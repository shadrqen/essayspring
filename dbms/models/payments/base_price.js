'use strict'
module.exports = (sequelize, DataTypes) => {
  const BasePriceModel = sequelize.define('BasePrice', {
    serviceType: {
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
    tier: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: {
          tableName: 'price_tier',
          schema: 'payments'
        },
        key: 'id'
      }
    },
    currency: {
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
    price: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {
    freezeTableName: true,
    tableName: 'base_price',
    schema: 'payments'
  })
  BasePriceModel.associate = function (models) {
    BasePriceModel.belongsTo(models.Currency, { as: 'Currency', foreignKey: 'currency' })
    BasePriceModel.belongsTo(models.OrderServiceType, { as: 'OrderServiceType', foreignKey: 'serviceType' })
    BasePriceModel.belongsTo(models.PriceTier, { as: 'PriceTier', foreignKey: 'tier' })
  }
  return BasePriceModel
}
