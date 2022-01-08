'use strict'
module.exports = (sequelize, DataTypes) => {
  const WriterEducation = sequelize.define('WriterEducation', {
    writerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: {
          tableName: 'writer',
          schema: 'writer'
        },
        key: 'id'
      }
    },
    highestLevelId: {
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
    certificate: {
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
    tableName: 'writer_education',
    schema: 'writer'
  })
  WriterEducation.associate = function (models) {
    WriterEducation.belongsTo(models.Writer, { as: 'Writer', foreignKey: 'writerId' })
    WriterEducation.belongsTo(models.EducationLevel, { as: 'EducationLevel', foreignKey: 'highestLevelId' })
  }
  return WriterEducation
}
