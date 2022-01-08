'use strict'
module.exports = (sequelize, DataTypes) => {
  const WriterDiscipline = sequelize.define('WriterDiscipline', {
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
    disciplineIds: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      allowNull: false
    },
    primaryDiscipline: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: {
          tableName: 'discipline',
          schema: 'general'
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
    tableName: 'writer_discipline',
    schema: 'writer'
  })
  WriterDiscipline.associate = function (models) {
    WriterDiscipline.belongsTo(models.Writer, { as: 'Writer', foreignKey: 'writerId' })
    WriterDiscipline.belongsTo(models.Discipline, { as: 'Discipline', foreignKey: 'primaryDiscipline' })
  }
  return WriterDiscipline
}
