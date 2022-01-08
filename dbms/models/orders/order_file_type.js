'use strict'
module.exports = (sequelize, DataTypes) => {
  const OrderFileTypeModel = sequelize.define('OrderFileType', {
    type: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    freezeTableName: true,
    tableName: 'order_file_type',
    schema: 'orders'
  })
  OrderFileTypeModel.associate = function (models) {
    OrderFileTypeModel.hasMany(models.OrderFile, { as: 'OrderFile', foreignKey: 'id' })
  }
  return OrderFileTypeModel
}
