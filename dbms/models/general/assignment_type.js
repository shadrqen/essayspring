'use strict'
module.exports = (sequelize, DataTypes) => {
  const AssignmentTypeModel = sequelize.define('AssignmentType', {
    category: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: {
          tableName: 'assgnmnt_type_category',
          schema: 'general'
        },
        key: 'id'
      }
    },
    tier: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: {
          tableName: 'price_tier',
          schema: 'payments'
        },
        key: 'id'
      }
    },
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
    tableName: 'assignment_type',
    schema: 'general'
  })
  AssignmentTypeModel.associate = function (models) {
    AssignmentTypeModel.belongsTo(models.AssignmentTypeCategory, { as: 'AssignmentTypeCategory', foreignKey: 'category' })
    AssignmentTypeModel.belongsTo(models.PriceTier, { as: 'PriceTier', foreignKey: 'tier' })
    AssignmentTypeModel.hasMany(models.Order, { as: 'Order', foreignKey: 'id' })
  }
  return AssignmentTypeModel
}
