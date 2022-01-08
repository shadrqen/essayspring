'use strict'
module.exports = (sequelize, DataTypes) => {
  const WriterBidsModel = sequelize.define('WriterBid', {
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
    successful: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    freezeTableName: true,
    tableName: 'writer_bid',
    schema: 'writer'
  })
  WriterBidsModel.associate = function (models) {
    WriterBidsModel.belongsTo(models.Writer, { as: 'Writer', foreignKey: 'writerId' })
    WriterBidsModel.belongsTo(models.Order, { as: 'Order', foreignKey: 'orderId' })
  }
  return WriterBidsModel
}
