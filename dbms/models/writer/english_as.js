'use strict'
module.exports = (sequelize, DataTypes) => {
  const EnglishAsModel = sequelize.define('EnglishAs', {
    as: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    freezeTableName: true,
    tableName: 'english_as',
    schema: 'writer'
  })
  EnglishAsModel.associate = function (models) {
    EnglishAsModel.hasMany(models.Writer, { as: 'Writer', foreignKey: 'id' })
  }
  return EnglishAsModel
}
