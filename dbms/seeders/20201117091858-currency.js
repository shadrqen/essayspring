'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert({ tableName: 'currency', schema: 'payments' }, [
      {
        currency: 'Kenya Shilling',
        currencyCode: 'KES',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        currency: 'Uganda Shilling',
        currencyCode: 'UGX',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        currency: 'Tanzania Shilling',
        currencyCode: 'TZS',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        currency: 'US Dollar',
        currencyCode: 'USD',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        currency: 'Pound Sterling',
        currencyCode: 'GBP',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        currency: 'Euro',
        currencyCode: 'EUR',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        currency: 'Yen',
        currencyCode: 'JPY',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        currency: 'Yuan Renminbi',
        currencyCode: 'CNY',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        currency: 'Canadian Dollar',
        currencyCode: 'CAD',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete({ tableName: 'currency', schema: 'payments' }, null, {})
  }
}
