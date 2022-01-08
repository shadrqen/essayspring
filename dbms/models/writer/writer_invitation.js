'use strict'
module.exports = (sequelize, DataTypes) => {
  const WriterInvitationsModel = sequelize.define('WriterInvitation', {
    email: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true
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
    utilized: {
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
    tableName: 'writer_invitation',
    schema: 'writer'
  })
  WriterInvitationsModel.associate = function (models) {
    WriterInvitationsModel.belongsTo(models.Client, { as: 'Client', foreignKey: 'clientId', sourceKey: 'id' })
  }
  return WriterInvitationsModel
}
