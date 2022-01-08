'use strict'
module.exports = (sequelize, DataTypes) => {
  const SkillLevelModel = sequelize.define('SkillLevel', {
    level: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    freezeTableName: true,
    tableName: 'skill_level',
    schema: 'writer'
  })
  SkillLevelModel.associate = function (models) {
    SkillLevelModel.hasMany(models.WriterSkillLevel, { as: 'WriterSkillLevel', foreignKey: 'id' })
  }
  return SkillLevelModel
}
