'use strict'
module.exports = (sequelize, DataTypes) => {
  const WriterWorkExperienceModel = sequelize.define('WriterWorkExperience', {
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
    yearsExperience: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    freezeTableName: true,
    tableName: 'writer_work_experience',
    schema: 'writer'
  })
  WriterWorkExperienceModel.associate = function (models) {
    WriterWorkExperienceModel.belongsTo(models.Writer, { as: 'Writer', foreignKey: 'writerId' })
  }
  return WriterWorkExperienceModel
}
