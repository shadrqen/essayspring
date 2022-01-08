'use strict'
module.exports = (sequelize, DataTypes) => {
  const WriterProfile = sequelize.define('WriterProfile', {
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
    confirmationToken: {
      type: DataTypes.STRING(500),
      allowNull: false
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    freezeTableName: true,
    tableName: 'writer_profile',
    schema: 'writer'
  })
  WriterProfile.associate = function (models) {
    WriterProfile.belongsTo(models.Writer, { as: 'Writer', foreignKey: 'writerId' })
  }
  return WriterProfile
}
