'use strict'
module.exports = (sequelize, DataTypes) => {
  const AdminRolesModel = sequelize.define('AdminRole', {
    adminId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: {
          tableName: 'admin',
          schema: 'admin'
        },
        key: 'id'
      }
    },
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: {
          tableName: 'administrative_role',
          schema: 'admin'
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
    tableName: 'admin_role',
    schema: 'admin'
  })
  AdminRolesModel.associate = function (models) {
    AdminRolesModel.belongsTo(models.Admin, { as: 'Admin', foreignKey: 'adminId' })
    AdminRolesModel.belongsTo(models.AdministrativeRole, { as: 'AdministrativeRole', foreignKey: 'roleId' })
  }
  return AdminRolesModel
}
