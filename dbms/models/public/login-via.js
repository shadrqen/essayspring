'use strict'
module.exports = (sequelize, DataTypes) => {
  const LoginViaModel = sequelize.define('LoginVia', {
    via: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    freezeTableName: true,
    tableName: 'login_via',
    schema: 'public'
  })
  LoginViaModel.associate = function (models) {
    LoginViaModel.hasMany(models.User, { as: 'User', foreignKey: 'loginVia', sourceKey: 'id' })
  }
  return LoginViaModel
}
