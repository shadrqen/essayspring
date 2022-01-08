'use strict'
module.exports = (sequelize, DataTypes) => {
  const ProblemReportFileModel = sequelize.define('ProblemReportFile', {
    reportId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: {
          tableName: 'problem_report',
          schema: 'admin'
        },
        key: 'id'
      }
    },
    fileUrl: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    originalName: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    freezeTableName: true,
    tableName: 'problem_report_file',
    schema: 'admin'
  })
  ProblemReportFileModel.associate = function (models) {
    ProblemReportFileModel.belongsTo(models.ProblemReport, { as: 'ProblemReport', foreignKey: 'reportId' })
  }
  return ProblemReportFileModel
}
