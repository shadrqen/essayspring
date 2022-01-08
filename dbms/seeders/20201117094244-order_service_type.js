'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert({ tableName: 'order_service_type', schema: 'orders' }, [
      {
        type: 'Writing',
        extra: false,
        description: '',
        price: 0,
        currencyId: 1,
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        type: 'Editing',
        extra: false,
        description: '',
        price: 0,
        currencyId: 1,
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        type: 'Rewriting',
        extra: false,
        description: '',
        price: 0,
        currencyId: 1,
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        type: 'Progressive delivery',
        extra: true,
        description: 'Receive your half-done paper long before the deadline',
        price: 300,
        currencyId: 1,
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        type: 'Dedicated Support',
        extra: true,
        description: 'Get a dedicated personal manager and contact him/her 24/7',
        price: 400,
        currencyId: 1,
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        type: '1-page abstract',
        extra: true,
        description: 'Get a 1-page extract that highlights the key points in your paper',
        price: 400,
        currencyId: 1,
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete({ tableName: 'order_service_type', schema: 'orders' }, null, {})
  }
}
