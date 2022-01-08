'use strict'
module.exports = (sequelize, DataTypes) => {
  const ChatContentsModel = sequelize.define('ChatContent', {
    chatId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: {
          tableName: 'chat',
          schema: 'chats'
        },
        key: 'id'
      }
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    freezeTableName: true,
    tableName: 'chat_content',
    schema: 'chats'
  })
  ChatContentsModel.associate = function (models) {
    ChatContentsModel.belongsTo(models.Chat, { as: 'Chat', foreignKey: 'chatId' })
  }
  return ChatContentsModel
}
