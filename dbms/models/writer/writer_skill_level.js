'use strict'
module.exports = (sequelize, DataTypes) => {
  const WriterSkillLevelModel = sequelize.define('WriterSkillLevel', {
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
    skillLevelId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: {
          tableName: 'skill_level',
          schema: 'writer'
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
    tableName: 'writer_skill_level',
    schema: 'writer'
  })
  WriterSkillLevelModel.associate = function (models) {
    WriterSkillLevelModel.belongsTo(models.Writer, { as: 'Writer', foreignKey: 'writerId' })
    WriterSkillLevelModel.belongsTo(models.SkillLevel, { as: 'SkillLevel', foreignKey: 'skillLevelId' })
  }
  return WriterSkillLevelModel
}
