'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert({ tableName: 'administrative_role', schema: 'admin' }, [
      {
        role: 'Editing/formatting',
        roleCode: 'EF',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        role: 'Payments',
        roleCode: 'PMNT',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        role: 'Accounts',
        roleCode: 'ACNT',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete({ tableName: 'administrative_role', schema: 'admin' }, null, {})
  }
}
