'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert({ tableName: 'mpesa_result_codes', schema: 'payments' }, [
      {
        resultCode: 0,
        resultDesc: 'Success',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        resultCode: 1,
        resultDesc: 'Insufficient Funds',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        resultCode: 2,
        resultDesc: 'Less Than Minimum Transaction Value',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        resultCode: 3,
        resultDesc: 'More Than Maximum Transaction Value',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        resultCode: 4,
        resultDesc: 'Would Exceed Daily Transfer Limit',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        resultCode: 5,
        resultDesc: 'Would Exceed Minimum Balance',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        resultCode: 6,
        resultDesc: 'Unresolved Primary Party',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        resultCode: 7,
        resultDesc: 'Unresolved Receiver Party',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        resultCode: 8,
        resultDesc: 'Would Exceed Maximum Balance', /* TODO: to check whether the right word is <Maxiumum> or <Maximum> */
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        resultCode: 11,
        resultDesc: 'Debit Account Invalid',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        resultCode: 12,
        resultDesc: 'Credit Account Invalid', /* TODO: to check whether the right word is <Invaliud> or <Invalid> */
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        resultCode: 13,
        resultDesc: 'Unresolved Debit Account',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        resultCode: 14,
        resultDesc: 'Unresolved Credit Account',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        resultCode: 15,
        resultDesc: 'Duplicate Detected',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        resultCode: 17,
        resultDesc: 'Internal Failure',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        resultCode: 20,
        resultDesc: 'Unresolved Initiator',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        resultCode: 26,
        resultDesc: 'Traffic blocking condition in place',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        resultCode: 1032,
        resultDesc: 'Request cancelled by user',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        resultCode: 1037,
        resultDesc: 'DS timeout',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete({ tableName: 'mpesa_result_codes', schema: 'payments' }, null, {})
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
}
