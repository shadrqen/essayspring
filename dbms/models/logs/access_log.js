'use strict'
module.exports = (sequelize, DataTypes) => {
  const AccessLogsModel = sequelize.define('AccessLog', {
    ipAddress: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    origin: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    originalUrl: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    referer: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    partyTypeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: {
          tableName: 'account_type',
          schema: 'public'
        },
        key: 'id'
      }
    },
    partyEmail: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    formData: {
      type: DataTypes.JSON,
      allowNull: true
    },
    suspect: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    freezeTableName: true,
    tableName: 'access_log',
    schema: 'logs'
  })
  AccessLogsModel.associate = function (models) {
    AccessLogsModel.belongsTo(models.AccountType, { as: 'AccountType', foreignKey: 'partyTypeId' })
  }
  return AccessLogsModel
}
