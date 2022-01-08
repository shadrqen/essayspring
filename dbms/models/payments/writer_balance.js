'use strict'
module.exports = (sequelize, DataTypes) => {
  const WriterBalanceModel = sequelize.define('WriterBalance', {
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
    tableName: 'writer_balance',
    schema: 'payments'
  })
  WriterBalanceModel.associate = function (models) {
    WriterBalanceModel.belongsTo(models.Writer, { as: 'Writer', foreignKey: 'writerId' })
    WriterBalanceModel.belongsTo(models.Currency, { as: 'Currency', foreignKey: 'currencyId' })
  }
  return WriterBalanceModel
}
