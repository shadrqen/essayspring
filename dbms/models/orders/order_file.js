'use strict'

module.exports = (sequelize, DataTypes) => {
  const OrderFilesModel = sequelize.define('OrderFile', {
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
    type: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: {
          tableName: 'order_file_type',
          schema: 'orders'
        },
        key: 'id'
      }
    },
    fileUrl: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    originalName: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    submittedPaper: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    freezeTableName: true,
    tableName: 'order_file',
    schema: 'orders'
  })
  OrderFilesModel.associate = function (models) {
    OrderFilesModel.belongsTo(models.Order, { as: 'Order', foreignKey: 'orderId' })
    OrderFilesModel.belongsTo(models.OrderFileType, { as: 'OrderFileType', foreignKey: 'type' })
  }
  return OrderFilesModel
}
