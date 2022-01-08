'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert({ tableName: 'base_price', schema: 'payments' }, [
      {
        serviceType: 1,
        tier: 1,
        currency: 1,
        price: 439.59,
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        serviceType: 1,
        tier: 2,
        currency: 1,
        price: 384.17,
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        serviceType: 1,
        tier: 3,
        currency: 1,
        price: 347.92,
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        serviceType: 1,
        tier: 4,
        currency: 1,
        price: 328,
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        serviceType: 2,
        tier: 1,
        currency: 1,
        price: 304.8,
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        serviceType: 2,
        tier: 2,
        currency: 1,
        price: 277.22,
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        serviceType: 2,
        tier: 3,
        currency: 1,
        price: 259.11,
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        serviceType: 2,
        tier: 4,
        currency: 1,
        price: 249,
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        serviceType: 3,
        tier: 1,
        currency: 1,
        price: 426.71,
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        serviceType: 3,
        tier: 2,
        currency: 1,
        price: 387.79,
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        serviceType: 3,
        tier: 3,
        currency: 1,
        price: 362.69,
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        serviceType: 3,
        tier: 4,
        currency: 1,
        price: 348.6,
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete({ tableName: 'base_price', schema: 'payments' }, null, {})
  }
}
