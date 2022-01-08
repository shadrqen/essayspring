'use strict'
module.exports = (sequelize, DataTypes) => {
  const OrderRevisionModel = sequelize.define('OrderRevision', {
    orderId: {
      type: DataTypes.INTEGER,
      references: {
        model: {
          tableName: 'order',
          schema: 'orders'
        },
        key: 'id'
      }
    },
    revisionInstructions: {
      type: DataTypes.JSONB,
      allowNull: false
    },
    deadline: {
      type: DataTypes.DATE,
      allowNull: false
    },
    submitted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    creator: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    editor: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {
    freezeTableName: true,
    schema: 'orders',
    tableName: 'order_revision'
  })
  OrderRevisionModel.associate = (models) => {
    OrderRevisionModel.belongsTo(models.Order, { as: 'Order', foreignKey: 'orderId' })
  }
  return OrderRevisionModel
}
