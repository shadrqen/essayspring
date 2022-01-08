module.exports = (sequelize, DataTypes) => {
  return sequelize.define('SubmissionChecklist', {
    aspect: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    aspectDescription: {
      type: DataTypes.STRING(500),
      allowNull: false
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {
    freezeTableName: true,
    schema: 'orders',
    tableName: 'submission_checklist'
  })
}
