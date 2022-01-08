'use strict'
module.exports = (sequelize, DataTypes) => {
  const ClientModel = sequelize.define('Client', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: {
          tableName: 'user',
          schema: 'public'
        },
        key: 'id'
      }
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    mobile: {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    picture: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    facebookId: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    freezeTableName: true,
    tableName: 'client',
    schema: 'client'
  })
  ClientModel.associate = function (models) {
    ClientModel.belongsTo(models.User, { as: 'User', foreignKey: 'userId' })
    ClientModel.hasMany(models.Order, { as: 'Order', foreignKey: 'id' })
    ClientModel.hasMany(models.ClientActivity, { as: 'ClientActivity', foreignKey: 'id' })
    ClientModel.hasMany(models.ClientOrder, { as: 'ClientOrder', foreignKey: 'id' })
    ClientModel.hasMany(models.ClientBalance, { as: 'ClientBalance', foreignKey: 'id' })
    ClientModel.hasMany(models.ClientPayment, { as: 'ClientPayment', foreignKey: 'id' })
    ClientModel.hasMany(models.ClientOTPCode, { as: 'ClientOTPCode', foreignKey: 'id' })
    ClientModel.hasMany(models.ClientWriter, { as: 'ClientWriter', foreignKey: 'id' })
    ClientModel.hasMany(models.WriterInvitation, { as: 'WriterInvitation', foreignKey: 'id' })
  }
  return ClientModel
}
