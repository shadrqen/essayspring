'use strict'
module.exports = (sequelize, DataTypes) => {
  const WriterCitationStylesModel = sequelize.define('WriterCitationStyle', {
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
    citationStyleIds: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      allowNull: false
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    freezeTableName: true,
    tableName: 'writer_citation_style',
    schema: 'writer'
  })
  WriterCitationStylesModel.associate = function (models) {
    WriterCitationStylesModel.belongsTo(models.Writer, { as: 'Writer', foreignKey: 'writerId' })
  }
  return WriterCitationStylesModel
}
