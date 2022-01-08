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
    return queryInterface.bulkInsert({ tableName: 'paper_discount', schema: 'payments' }, [
      {
        discount: 2,
        lowerLimit: 2,
        upperLimit: 4,
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        discount: 4,
        lowerLimit: 5,
        upperLimit: 9,
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        discount: 6,
        lowerLimit: 10,
        upperLimit: 15,
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        discount: 8,
        lowerLimit: 16,
        upperLimit: 20,
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        discount: 10,
        lowerLimit: 21,
        upperLimit: 50,
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        discount: 12,
        lowerLimit: 51,
        upperLimit: 70,
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        discount: 14,
        lowerLimit: 71,
        upperLimit: 100,
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
    return queryInterface.bulkDelete({
      tableName: 'paper_discount',
      schema: 'payments'
    }, null, {})
  }
}
