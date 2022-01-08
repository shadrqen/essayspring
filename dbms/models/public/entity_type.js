'use strict'
module.exports = (sequelize, DataTypes) => {
  const EntityType = sequelize.define('EntityType', {
    type: {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    freezeTableName: true,
    tableName: 'entity_type',
    schema: 'public'
  })
  EntityType.associate = function (models) {
    EntityType.hasMany(models.Writer, { as: 'Writer', foreignKey: 'id' })
    EntityType.hasMany(models.Order, { as: 'Order', foreignKey: 'id' })
  }
  return EntityType
}
