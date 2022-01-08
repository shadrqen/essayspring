'use strict'
module.exports = (sequelize, DataTypes) => {
  const OrderModel = sequelize.define('Order', {
    clientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: {
          tableName: 'client',
          schema: 'client'
        },
        key: 'id'
      }
    },
    serviceTypeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: {
          tableName: 'order_service_type',
          schema: 'orders'
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
    statusId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: {
          tableName: 'order_status',
          schema: 'orders'
        },
        key: 'id'
      }
    },
    subjectId: {
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
    assignmentType: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: {
          tableName: 'assignment_type',
          schema: 'general'
        },
        key: 'id'
      }
    },
    citationStyleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: {
          tableName: 'citation_style',
          schema: 'general'
        },
        key: 'id'
      }
    },
    orderFormatId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: {
          tableName: 'order_format',
          schema: 'orders'
        },
        key: 'id'
      }
    },
    studyLevelId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: {
          tableName: 'education_level',
          schema: 'general'
        },
        key: 'id'
      }
    },
    deadlineDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    deadlineTime: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: {
          tableName: 'time_am_pm',
          schema: 'general'
        }
      }
    },
    pageCount: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    sources: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    topic: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    instructions: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    freezeTableName: true,
    tableName: 'order',
    schema: 'orders'
  })
  OrderModel.associate = function (models) {
    OrderModel.belongsTo(models.Client, { as: 'Client', foreignKey: 'clientId' })
    OrderModel.belongsTo(models.OrderStatus, { as: 'OrderStatus', foreignKey: 'statusId' })
    OrderModel.belongsTo(models.Discipline, { as: 'Discipline', foreignKey: 'subjectId' })
    OrderModel.belongsTo(models.AssignmentType, { as: 'AssignmentType', foreignKey: 'assignmentType' })
    OrderModel.belongsTo(models.OrderServiceType, { as: 'OrderServiceType', foreignKey: 'serviceTypeId' })
    OrderModel.belongsTo(models.CitationStyle, { as: 'CitationStyle', foreignKey: 'citationStyleId' })
    OrderModel.belongsTo(models.OrderFormat, { as: 'OrderFormat', foreignKey: 'orderFormatId' })
    OrderModel.belongsTo(models.TimeAmPm, { as: 'TimeAmPm', foreignKey: 'deadlineTime' })
    OrderModel.belongsTo(models.EducationLevel, { as: 'EducationLevel', foreignKey: 'studyLevelId' })
    OrderModel.belongsTo(models.EntityType, { as: 'EntityType', foreignKey: 'type' })
    OrderModel.hasMany(models.ExtraOrderService, { as: 'ExtraOrderService', foreignKey: 'orderId', sourceKey: 'id' })
    OrderModel.hasMany(models.ClientOrderPostingStep, { as: 'ClientOrderPostingStep', foreignKey: 'orderId', sourceKey: 'id' })
    OrderModel.hasMany(models.OrderFile, { as: 'OrderFile', foreignKey: 'orderId', sourceKey: 'id' })
    OrderModel.hasMany(models.ClientOrder, { as: 'ClientOrder', foreignKey: 'orderId', sourceKey: 'id' })
    OrderModel.hasMany(models.ClientPayment, { as: 'ClientPayment', foreignKey: 'orderId', sourceKey: 'id' })
    OrderModel.hasMany(models.WriterOrder, { as: 'WriterOrder', foreignKey: 'orderId', sourceKey: 'id' })
    OrderModel.hasMany(models.WriterPayment, { as: 'WriterPayment', foreignKey: 'orderId', sourceKey: 'id' })
    OrderModel.hasMany(models.WriterRating, { as: 'WriterRating', foreignKey: 'orderId', sourceKey: 'id' })
    OrderModel.hasMany(models.WriterBid, { as: 'WriterBid', foreignKey: 'orderId', sourceKey: 'id' })
    OrderModel.hasMany(models.OrderBid, { as: 'OrderBid', foreignKey: 'orderId', sourceKey: 'id' })
    OrderModel.hasMany(models.OrderPaymentDetail, { as: 'OrderPaymentDetail', foreignKey: 'orderId', sourceKey: 'id' })
    OrderModel.hasMany(models.OrderRevision, { as: 'OrderRevision', foreignKey: 'orderId', sourceKey: 'id' })
  }
  return OrderModel
}
