'use strict'
module.exports = (sequelize, DataTypes) => {
  const AccountTypeModel = sequelize.define('AccountType', {
    type: {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    freezeTableName: true,
    tableName: 'account_type',
    schema: 'public'
  })
  AccountTypeModel.associate = function (models) {
    AccountTypeModel.hasMany(models.AccessLog, { as: 'AccessLog', foreignKey: 'id' })
  }
  return AccountTypeModel
}
