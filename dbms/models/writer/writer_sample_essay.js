'use strict'
module.exports = (sequelize, DataTypes) => {
  const WriterSampleEssayModel = sequelize.define('WriterSampleEssay', {
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
    themeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: {
          tableName: 'sample_essay_theme',
          schema: 'writer'
        },
        key: 'id'
      }
    },
    essay: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    timeAssigned: {
      type: DataTypes.DATE,
      allowNull: false
    },
    timeSubmitted: {
      type: DataTypes.DATE,
      allowNull: true
    },
    timeTaken: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    marksAttained: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    freezeTableName: true,
    tableName: 'writer_sample_essay',
    schema: 'writer'
  })
  WriterSampleEssayModel.associate = function (models) {
    WriterSampleEssayModel.belongsTo(models.Writer, { as: 'Writer', foreignKey: 'writerId' })
    WriterSampleEssayModel.belongsTo(models.SampleEssayTheme, { as: 'SampleEssayTheme', foreignKey: 'themeId' })
  }
  return WriterSampleEssayModel
}
