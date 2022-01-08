'use strict'
module.exports = (sequelize, DataTypes) => {
  const DisciplineModel = sequelize.define('Discipline', {
    discipline: {
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
    tableName: 'discipline',
    schema: 'general'
  })
  DisciplineModel.associate = function (models) {
    DisciplineModel.hasMany(models.Order, { as: 'Order', foreignKey: 'id' })
    DisciplineModel.hasMany(models.WriterDiscipline, {
      as: 'WriterDiscipline',
      foreignKey: 'primaryDiscipline',
      sourceKey: 'id'
    })
  }
  return DisciplineModel
}
