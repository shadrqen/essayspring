'use strict'
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('PaperDiscount', {
    discount: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0.0
    },
    lowerLimit: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    upperLimit: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {
    freezeTableName: true,
    tableName: 'paper_discount',
    schema: 'payments'
  })
}
