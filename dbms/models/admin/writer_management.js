'use strict'
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('WriterManagement', {
    currentSeason: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    registrationOpen: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    expectedWriterCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    currentWriterCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    writerCountVariance: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    freezeTableName: true,
    tableName: 'writer_management',
    schema: 'admin'
  })
}
