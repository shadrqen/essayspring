'use strict'
module.exports = (sequelize, DataTypes) => {
  const OrderBidModel = sequelize.define('OrderBid', {
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
    successful: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {
    freezeTableName: true,
    tableName: 'order_bid',
    schema: 'orders'
  })
  OrderBidModel.associate = (models) => {
    OrderBidModel.belongsTo(models.Order, { as: 'Order', foreignKey: 'orderId' })
    OrderBidModel.belongsTo(models.Writer, { as: 'Writer', foreignKey: 'writerId' })
  }
  return OrderBidModel
}
