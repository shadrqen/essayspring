'use strict'
module.exports = (sequelize, DataTypes) => {
  const MPESAResultCodeModel = sequelize.define('MPESAResultCode', {
    resultCode: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    resultDesc: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {
    freezeTableName: true,
    tableName: 'mpesa_result_codes',
    schema: 'payments'
  })
  MPESAResultCodeModel.associate = function (models) {
    MPESAResultCodeModel.hasMany(models.MPESA, { as: 'MPESA', foreignKey: 'resultCodeId', sourceKey: 'id' })
  }
  return MPESAResultCodeModel
}
