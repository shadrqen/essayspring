'use strict'
module.exports = (sequelize, DataTypes) => {
  const AdministrativeRolesModel = sequelize.define('AdministrativeRole', {
    role: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    roleCode: {
      type: DataTypes.STRING(5),
      allowNull: false
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    freezeTableName: true,
    tableName: 'administrative_role',
    schema: 'admin'
  })
  AdministrativeRolesModel.associate = function (models) {
    AdministrativeRolesModel.hasMany(models.AdminRole, { as: 'AdminRole', foreignKey: 'id' })
  }
  return AdministrativeRolesModel
}
