'use strict'
module.exports = (sequelize, DataTypes) => {
  const WriterRegistrationRecordModel = sequelize.define('WriterRegistrationRecord', {
    writerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: {
          tableName: 'writer_email_submission',
          schema: 'writer'
        }
      }
    },
    lastStepReached: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    detailReached: {
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
    tableName: 'writer_registration_record',
    schema: 'writer'
  })

  WriterRegistrationRecordModel.associate = function (models) {
    WriterRegistrationRecordModel.belongsTo(models.WriterEmailSubmission, {
      as: 'WriterEmailSubmission',
      foreignKey: 'writerId'
    })
  }
  return WriterRegistrationRecordModel
}
