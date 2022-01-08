'use strict'
module.exports = (sequelize, DataTypes) => {
  const WriterGrammarTestModel = sequelize.define('WriterGrammarTest', {
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
    totalScore: {
      type: DataTypes.INTEGER(DataTypes.INTEGER),
      allowNull: false
    },
    correctQuestions: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      allowNull: false
    },
    wrongQuestions: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      allowNull: false
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    freezeTableName: true,
    tableName: 'writer_grammar_test',
    schema: 'writer'
  })
  WriterGrammarTestModel.associate = function (models) {
    WriterGrammarTestModel.belongsTo(models.Writer, { as: 'Writer', foreignKey: 'writerId' })
  }
  return WriterGrammarTestModel
}
