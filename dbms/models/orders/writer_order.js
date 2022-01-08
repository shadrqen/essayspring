'use strict'
module.exports = (sequelize, DataTypes) => {
  const WriterOrdersModel = sequelize.define('WriterOrder', {
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
    isDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    freezeTableName: true,
    tableName: 'writer_order',
    schema: 'orders'
  })
  WriterOrdersModel.associate = function (models) {
    WriterOrdersModel.belongsTo(models.Writer, { as: 'Writer', foreignKey: 'writerId' })
    WriterOrdersModel.belongsTo(models.Order, { as: 'Order', foreignKey: 'orderId' })
  }
  return WriterOrdersModel
}
