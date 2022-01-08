'use strict'
module.exports = (sequelize, DataTypes) => {
  const AcademicCertificationsModel = sequelize.define('AcademicCertification', {
    achievement: {
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
    tableName: 'academic_certification',
    schema: 'writer'
  })
  AcademicCertificationsModel.associate = function (models) {
    AcademicCertificationsModel.hasMany(models.WriterEducation,
      { as: 'WriterEducation', foreignKey: 'id' })
  }
  return AcademicCertificationsModel
}
