'use strict'
module.exports = (sequelize, DataTypes) => {
  const CitationStyleDocumentationModel = sequelize.define('CitationStyleDocumentation', {
    citationStyleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: {
          tableName: 'citation_style',
          schema: 'general'
        },
        key: 'id'
      }
    },
    documentationUrl: {
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
    tableName: 'citation_style_documentation',
    schema: 'general'
  })
  CitationStyleDocumentationModel.associate = function (models) {
    CitationStyleDocumentationModel.belongsTo(models.CitationStyle,
      { as: 'CitationStyle', foreignKey: 'citationStyleId' })
  }
  return CitationStyleDocumentationModel
}
