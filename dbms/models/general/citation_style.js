'use strict'
module.exports = (sequelize, DataTypes) => {
  const CitationStyles = sequelize.define('CitationStyle', {
    citation: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    freezeTableName: true,
    tableName: 'citation_style',
    schema: 'general'
  })
  CitationStyles.associate = function (models) {
    CitationStyles.hasMany(models.WriterCitationStyle,
      { as: 'WriterCitationStyle', foreignKey: 'id' })
    CitationStyles.hasMany(models.CitationStyleDocumentation,
      { as: 'CitationStyleDocumentation', foreignKey: 'id' })
    CitationStyles.hasMany(models.Order,
      { as: 'Order', foreignKey: 'id' })
  }
  return CitationStyles
}
