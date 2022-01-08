'use strict'
module.exports = (sequelize, DataTypes) => {
  const ProblemReportModel = sequelize.define('ProblemReport', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: {
          tableName: 'user',
          schema: 'public'
        },
        key: 'id'
      }
    },
    source: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: {
          tableName: 'data_source',
          schema: 'general'
        },
        key: 'id'
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    solved: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    freezeTableName: true,
    tableName: 'problem_report',
    schema: 'admin'
  })
  ProblemReportModel.associate = function (models) {
    ProblemReportModel.belongsTo(models.User, { as: 'User', foreignKey: 'userId' })
    ProblemReportModel.belongsTo(models.DataSource, { as: 'DataSource', foreignKey: 'source' })
  }
  return ProblemReportModel
}
