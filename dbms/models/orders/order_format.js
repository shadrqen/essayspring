'use strict'
module.exports = (sequelize, DataTypes) => {
  const OrderFormat = sequelize.define('OrderFormat', {
    wordsPerPage: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    spacing: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    currentlyInUse: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    freezeTableName: true,
    tableName: 'order_format',
    schema: 'orders'
  })
  OrderFormat.associate = function (models) {
    OrderFormat.hasMany(models.Order, { as: 'Order', foreignKey: 'id' })
  }
  return OrderFormat
}
