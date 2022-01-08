'use strict'
module.exports = (sequelize, DataTypes) => {
  const ClientBalanceModel = sequelize.define('ClientBalance', {
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
    tableName: 'client_balance',
    schema: 'payments'
  })
  ClientBalanceModel.associate = function (models) {
    ClientBalanceModel.belongsTo(models.Client, { as: 'Client', foreignKey: 'clientId' })
    ClientBalanceModel.belongsTo(models.Currency, { as: 'Currency', foreignKey: 'currencyId' })
  }
  return ClientBalanceModel
}
