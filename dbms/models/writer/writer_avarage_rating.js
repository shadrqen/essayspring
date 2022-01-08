'use strict'
module.exports = (sequelize, DataTypes) => {
  const WriterAverageRatingModel = sequelize.define('WriterAverageRating', {
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
    rating: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    freezeTableName: true,
    tableName: 'writer_average_rating',
    schema: 'writer'
  })
  WriterAverageRatingModel.associate = function (models) {
    WriterAverageRatingModel.belongsTo(models.Writer, { as: 'Writer', foreignKey: 'writerId' })
  }
  return WriterAverageRatingModel
}
