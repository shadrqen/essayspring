'use strict'
module.exports = (sequelize, DataTypes) => {
  const ClientWriter = sequelize.define('ClientWriter', {
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
    connectionConfirmed: {
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
    tableName: 'client_writer',
    schema: 'client'
  })
  ClientWriter.associate = function (models) {
    ClientWriter.belongsTo(models.Writer, { as: 'Writer', foreignKey: 'writerId' })
    ClientWriter.belongsTo(models.Client, { as: 'Client', foreignKey: 'clientId' })
  }
  return ClientWriter
}
