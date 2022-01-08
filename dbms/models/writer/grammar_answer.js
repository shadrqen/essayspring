'use strict'

module.exports = (sequelize, DataTypes) => {
  const GrammarAnswerModel = sequelize.define('GrammarAnswer', {
    questionId: {
      type: DataTypes.INTEGER,
      references: {
        model: {
          tableName: 'grammar_question',
          schema: 'writer'
        },
        key: 'id'
      }
    },
    answer: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    answerLetter: {
      type: DataTypes.STRING(2),
      allowNull: false
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    tableName: 'grammar_answer',
    freezeTableName: true,
    schema: 'writer'
  })
  GrammarAnswerModel.associate = function (models) {
    GrammarAnswerModel.belongsTo(models.GrammarQuestion, { as: 'GrammarQuestion', foreignKey: 'questionId' })
  }
  return GrammarAnswerModel
}
