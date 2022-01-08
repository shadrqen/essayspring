'use strict'
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('WriterApplication', {
    email: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    freezeTableName: true,
    tableName: 'writer_application',
    schema: 'writer'
  })
}
