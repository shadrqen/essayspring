'use strict'

module.exports = (sequelize, DataTypes) => {
  const GrammarQuestionModel = sequelize.define('GrammarQuestion', {
    instruction: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    question: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    correctAnswerId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    category: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    tableName: 'grammar_question',
    freezeTableName: true,
    schema: 'writer'
  })
  GrammarQuestionModel.associate = function (models) {
    GrammarQuestionModel.hasMany(models.GrammarAnswer, { as: 'GrammarAnswer', foreignKey: 'id' })
  }
  return GrammarQuestionModel
}
