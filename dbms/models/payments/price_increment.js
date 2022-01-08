'use strict'
module.exports = (sequelize, DataTypes) => {
  const PriceIncrementModel = sequelize.define('PriceIncrement', {
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
    hr12: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0.00
    },
    day1: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0.00
    },
    day2: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0.00
    },
    day3: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0.00
    },
    day5: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0.00
    },
    college: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0.00
    },
    bachelors: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0.00
    },
    masters: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0.00
    },
    doctorate: {
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
    tableName: 'price_increment',
    schema: 'payments'
  })
  PriceIncrementModel.associate = function (models) {
    PriceIncrementModel.belongsTo(models.PriceTier, { as: 'PriceTier', foreignKey: 'tier' })
    PriceIncrementModel.belongsTo(models.OrderServiceType, { as: 'OrderServiceType', foreignKey: 'serviceType' })
  }
  return PriceIncrementModel
}
