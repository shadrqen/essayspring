'use strict'
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('WriterEmailSubmission', {
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
    confirmationToken: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    accountConfirmed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    termsPoliciesAgreed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    promoMessagesAgreed: {
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
    tableName: 'writer_email_submission',
    schema: 'writer'
  })
}
