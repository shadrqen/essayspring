'use strict'
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('PaymentRatio', {
    company: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    writer: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  })
}
