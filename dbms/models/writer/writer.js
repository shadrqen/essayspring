'use strict'
module.exports = (sequelize, DataTypes) => {
  const WriterModel = sequelize.define('Writer', {
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
    type: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: {
          tableName: 'entity_type',
          schema: 'public'
        },
        key: 'id'
      }
    },
    surname: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    otherNames: {
      type: DataTypes.STRING(60),
      allowNull: false
    },
    nIdFront: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    nIdBack: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    nationalID: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    mobileNo: {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    availableNightCalls: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    genderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: {
          tableName: 'gender',
          schema: 'general'
        },
        key: 'id'
      }
    },
    citizenshipId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: {
          tableName: 'country',
          schema: 'general'
        },
        key: 'id'
      }
    },
    countyState: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    englishAsId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: {
          tableName: 'english_as',
          schema: 'writer'
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
    tableName: 'writer',
    schema: 'writer'
  })
  WriterModel.associate = function (models) {
    WriterModel.belongsTo(models.User, { as: 'User', foreignKey: 'userId' })
    WriterModel.belongsTo(models.Gender, { as: 'Gender', foreignKey: 'genderId' })
    WriterModel.belongsTo(models.Country, { as: 'Citizenship', foreignKey: 'citizenshipId' })
    WriterModel.belongsTo(models.EnglishAs, { as: 'EnglishAs', foreignKey: 'englishAsId' })
    WriterModel.belongsTo(models.EntityType, { as: 'EntityType', foreignKey: 'type' })
    WriterModel.hasMany(models.WriterEducation, { as: 'WriterEducation', foreignKey: 'writerId', sourceKey: 'id' })
    WriterModel.hasMany(models.WriterPayment, { as: 'WriterPayment', foreignKey: 'writerId', sourceKey: 'id' })
    WriterModel.hasMany(models.WriterBalance, { as: 'WriterBalance', foreignKey: 'writerId', sourceKey: 'id' })
    WriterModel.hasMany(models.WriterOrder, { as: 'WriterOrder', foreignKey: 'writerId', sourceKey: 'id' })
    WriterModel.hasMany(models.WriterCitationStyle, { as: 'WriterCitationStyle', foreignKey: 'writerId', sourceKey: 'id' })
    WriterModel.hasMany(models.WriterSkillLevel, { as: 'WriterSkillLevel', foreignKey: 'writerId', sourceKey: 'id' })
    WriterModel.hasMany(models.WriterRating, { as: 'WriterRating', foreignKey: 'writerId', sourceKey: 'id' })
    WriterModel.hasMany(models.WriterAverageRating, { as: 'WriterAverageRating', foreignKey: 'writerId', sourceKey: 'id' })
    WriterModel.hasMany(models.WriterBid, { as: 'WriterBid', foreignKey: 'writerId', sourceKey: 'id' })
    WriterModel.hasMany(models.OrderBid, { as: 'OrderBid', foreignKey: 'writerId', sourceKey: 'id' })
    WriterModel.hasMany(models.WriterDiscipline, { as: 'WriterDiscipline', foreignKey: 'writerId', sourceKey: 'id' })
    WriterModel.hasMany(models.WriterGrammarTest, { as: 'WriterGrammarTest', foreignKey: 'writerId', sourceKey: 'id' })
    WriterModel.hasMany(models.WriterSampleEssay, { as: 'WriterSampleEssay', foreignKey: 'writerId', sourceKey: 'id' })
    WriterModel.hasMany(models.WriterWorkExperience, { as: 'WriterWorkExperience', foreignKey: 'writerId', sourceKey: 'id' })
    WriterModel.hasMany(models.ClientWriter, { as: 'ClientWriter', foreignKey: 'writerId', sourceKey: 'id' })
  }
  return WriterModel
}
