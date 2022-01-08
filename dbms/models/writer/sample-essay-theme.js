'use strict'
module.exports = (sequelize, DataTypes) => {
  const SampleEssayThemeModel = sequelize.define('SampleEssayTheme', {
    topic: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    description: {
      type: DataTypes.STRING(500),
      allowNull: false
    },
    subjectId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: {
          tableName: 'discipline',
          schema: 'general'
        },
        key: 'id'
      }
    },
    educationLevelId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: {
          tableName: 'education_level',
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
    tableName: 'sample_essay_theme',
    schema: 'writer'
  })
  SampleEssayThemeModel.associate = function (models) {
    SampleEssayThemeModel.belongsTo(models.Discipline, { as: 'Discipline', foreignKey: 'subjectId' })
    SampleEssayThemeModel.belongsTo(models.EducationLevel, { as: 'EducationLevel', foreignKey: 'educationLevelId' })
  }
  return SampleEssayThemeModel
}
