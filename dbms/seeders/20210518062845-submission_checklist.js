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
    return await queryInterface.bulkInsert({ tableName: 'submission_checklist', schema: 'orders' }, [
      {
        aspect: 'Page count',
        aspectDescription: 'The paper doesn\'t contain the right number of pages',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        aspect: 'Topic',
        aspectDescription: 'The paper fails to discuss the right topic',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        aspect: 'Instructions',
        aspectDescription: 'The paper doesn\'t follow the instructions fully',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        aspect: 'Deadline',
        aspectDescription: 'The submission is not on time',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        aspect: 'Sources',
        aspectDescription: 'The paper doesn\'t make use of at least a minimum of number of the prescribed sources',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        aspect: 'Formatting',
        aspectDescription: 'The paper doesn\'t follow the prescribed format',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        aspect: 'Type of service',
        aspectDescription: 'The paper doesn\'t adhere to the prescribed type of service',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        aspect: 'Other',
        aspectDescription: 'The paper fails to address another aspect(s), not defined above',
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
    return await queryInterface.bulkDelete({ tableName: 'submission_checklist', schema: 'orders' }, null, {})
  }
}
