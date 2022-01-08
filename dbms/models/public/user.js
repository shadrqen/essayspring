'use strict'
module.exports = (sequelize, DataTypes) => {
  const UserModel = sequelize.define('User', {
    email: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING(256),
      allowNull: true
    },
    accountStatus: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: {
          tableName: 'account_status',
          schema: 'public'
        },
        key: 'id'
      }
    },
    userType: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: {
          tableName: 'account_type',
          schema: 'public'
        },
        key: 'id'
      }
    },
    loginVia: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: {
          tableName: 'login_via',
          schema: 'public'
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
    tableName: 'user',
    schema: 'public'
  })
  UserModel.associate = function (models) {
    UserModel.belongsTo(models.AccountStatus, { as: 'AccountStatus', foreignKey: 'accountStatus' })
    UserModel.belongsTo(models.AccountType, { as: 'AccountType', foreignKey: 'userType' })
    UserModel.belongsTo(models.LoginVia, { as: 'LoginVia', foreignKey: 'loginVia' })
    UserModel.hasMany(models.Client, { as: 'Client', foreignKey: 'userId', sourceKey: 'id' })
    UserModel.hasMany(models.Writer, { as: 'Writer', foreignKey: 'userId', sourceKey: 'id' })
    UserModel.hasMany(models.Admin, { as: 'Admin', foreignKey: 'userId', sourceKey: 'id' })
  }
  return UserModel
}
