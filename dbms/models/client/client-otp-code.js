'use strict'
module.exports = (sequelize, DataTypes) => {
  const ClientOTPCodesModel = sequelize.define('ClientOTPCode', {
    email: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    clientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: {
          tableName: 'client',
          schema: 'client'
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
    tableName: 'client_otp_codes',
    schema: 'client'
  })
  ClientOTPCodesModel.associate = function (models) {
    ClientOTPCodesModel.belongsTo(models.Client, { as: 'Client', foreignKey: 'clientId', sourceKey: 'id' })
  }
  return ClientOTPCodesModel
}
