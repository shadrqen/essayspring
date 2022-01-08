'use strict'
module.exports = (sequelize, DataTypes) => {
  const AccountStatus = sequelize.define('AccountStatus', {
    status: {
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
    tableName: 'account_status',
    schema: 'public'
  })
  AccountStatus.associate = function (models) {
    AccountStatus.hasMany(models.User, { as: 'User', foreignKey: 'id' })
  }
  return AccountStatus
}
