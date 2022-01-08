'use strict'
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('DataSource', {
    source: {
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
    tableName: 'data_source',
    schema: 'general'
  })
}
