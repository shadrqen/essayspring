'use strict'
module.exports = (sequelize, DataTypes) => {
  const LoginModel = sequelize.define('Login', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: {
          tableName: 'user',
          schema: 'public'
        },
        key: 'id'
      }
    },
    source: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: {
          tableName: 'data_source',
          schema: 'general'
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
    tableName: 'login',
    schema: 'logs'
  })
  LoginModel.associate = function (models) {
    LoginModel.belongsTo(models.User, { as: 'User', foreignKey: 'userId' })
    LoginModel.belongsTo(models.DataSource, { as: 'DataSource', foreignKey: 'source' })
  }
  return LoginModel
}
