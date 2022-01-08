'use strict'
module.exports = (sequelize, DataTypes) => {
  const AssignmentTypeCategoriesModel = sequelize.define('AssignmentTypeCategory', {
    category: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    freezeTableName: true,
    tableName: 'assgnmnt_type_category',
    schema: 'general'
  })
  AssignmentTypeCategoriesModel.associate = function (models) {
    AssignmentTypeCategoriesModel.hasMany(models.AssignmentType, { as: 'AssignmentType', foreignKey: 'id' })
  }
  return AssignmentTypeCategoriesModel
}
