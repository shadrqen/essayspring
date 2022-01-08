'use strict'
module.exports = (sequelize, DataTypes) => {
  const ChatsModel = sequelize.define('Chat', {
    user1Id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    user2Id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    freezeTableName: true,
    tableName: 'chat',
    schema: 'chats'
  })
  ChatsModel.associate = function (models) {
    ChatsModel.hasMany(models.ChatContent, { as: 'ChatContent', foreignKey: 'id' })
  }
  return ChatsModel
}
