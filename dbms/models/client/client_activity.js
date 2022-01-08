'use strict'
module.exports = (sequelize, DataTypes) => {
  const ClientActivityModel = sequelize.define('ClientActivity', {
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
    numOfSuccessfulOrders: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    numOfFailedOrders: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    freezeTableName: true,
    tableName: 'client_activity',
    schema: 'client'
  })
  ClientActivityModel.associate = function (models) {
    ClientActivityModel.belongsTo(models.Client, { as: 'Client', foreignKey: 'clientId' })
  }
  return ClientActivityModel
}
