'use strict'
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('order', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      clientId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: 'client',
            schema: 'client'
          },
          key: 'id'
        }
      },
      type: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: 'entity_type',
            schema: 'public'
          },
          key: 'id'
        }
      },
      serviceTypeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: 'order_service_type',
            schema: 'orders'
          },
          key: 'id'
        }
      },
      statusId: {
        type: Sequelize.INTEGER,
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
        type: Sequelize.INTEGER,
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
        type: Sequelize.INTEGER,
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
        type: Sequelize.INTEGER,
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
        type: Sequelize.INTEGER,
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
        type: Sequelize.INTEGER,
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
        type: Sequelize.DATE,
        allowNull: false
      },
      deadlineTime: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: 'time_am_pm',
            schema: 'general'
          }
        }
      },
      pageCount: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      sources: {
        type: Sequelize.INTEGER,
        allowNull: false,
        default: 0
      },
      topic: {
        type: Sequelize.STRING(200),
        allowNull: false
      },
      instructions: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      isDeleted: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }, {
      schema: 'orders'
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('order')
  }
}
