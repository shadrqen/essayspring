'use strict'
module.exports = (sequelize, DataTypes) => {
  const AdminModel = sequelize.define('Admin', {
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
    mobile: {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    surname: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    otherNames: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    freezeTableName: true,
    tableName: 'admin',
    schema: 'admin'
  })
  AdminModel.associate = function (models) {
    AdminModel.hasMany(models.AdminRole, { as: 'AdminRole', foreignKey: 'id' })
    AdminModel.belongsTo(models.User, { as: 'User', foreignKey: 'userId' })
  }
  return AdminModel
}
