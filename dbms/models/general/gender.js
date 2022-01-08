'use strict'
module.exports = (sequelize, DataTypes) => {
  const GenderModel = sequelize.define('Gender', {
    gender: {
      type: DataTypes.STRING(6),
      allowNull: false
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    freezeTableName: true,
    tableName: 'gender',
    schema: 'general'
  })
  GenderModel.associate = function (models) {
    GenderModel.hasMany(models.Writer, { as: 'Writer', foreignKey: 'id' })
  }
  return GenderModel
}
