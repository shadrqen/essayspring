'use strict'
module.exports = (sequelize, DataTypes) => {
  const CountriesModel = sequelize.define('Country', {
    country: {
      type: DataTypes.STRING(60),
      allowNull: true
    },
    countryCode: {
      type: DataTypes.STRING(3),
      allowNull: false,
      unique: true
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    freezeTableName: true,
    tableName: 'country',
    schema: 'general'
  })
  CountriesModel.associate = function (models) {
    CountriesModel.hasMany(models.Writer, { as: 'Writer', foreignKey: 'id' })
  }
  return CountriesModel
}
