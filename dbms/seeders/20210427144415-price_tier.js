'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    return queryInterface.bulkInsert({ tableName: 'price_tier', schema: 'payments'}, [
      {
        tier: 'Tier1',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        tier: 'Tier2',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        tier: 'Tier3',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        tier: 'Tier4',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete({ tableName: 'price_tier', schema: 'payments' }, null, {})
  }
}
