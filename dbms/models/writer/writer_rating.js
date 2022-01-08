'use strict'
module.exports = (sequelize, DataTypes) => {
  const WriterRatingModel = sequelize.define('WriterRating', {
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
    orderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: {
          tableName: 'order',
          schema: 'orders'
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
    tableName: 'writer_rating',
    schema: 'writer'
  })
  WriterRatingModel.associate = function (models) {
    WriterRatingModel.belongsTo(models.Writer, { as: 'Writer', foreignKey: 'writerId' })
    WriterRatingModel.belongsTo(models.Order, { as: 'Order', foreignKey: 'orderId' })
  }
  return WriterRatingModel
}
