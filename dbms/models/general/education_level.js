'use strict'
module.exports = (sequelize, DataTypes) => {
  const EducationLevelModel = sequelize.define('EducationLevel', {
    level: {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    academicInclined: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    orderInclined: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    freezeTableName: true,
    tableName: 'education_level',
    schema: 'general'
  })
  EducationLevelModel.associate = function (models) {
    EducationLevelModel.hasMany(models.WriterEducation, { as: 'WriterEducation', foreignKey: 'id' })
    EducationLevelModel.hasMany(models.Order, { as: 'Order', foreignKey: 'id' })
  }
  return EducationLevelModel
}
