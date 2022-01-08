'use strict'
module.exports = (sequelize, DataTypes) => {
  const TimeAmPm = sequelize.define('TimeAmPm', {
    time: {
      type: DataTypes.STRING(5),
      allowNull: false
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    freezeTableName: true,
    tableName: 'time_am_pm',
    schema: 'general'
  })
  TimeAmPm.associate = function (models) {
    TimeAmPm.hasMany(models.Order, { as: 'Order', foreignKey: 'id' })
  }
  return TimeAmPm
}
