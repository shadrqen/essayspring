'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert({ tableName: 'assignment_type', schema: 'general' }, [
      {
        category: 1,
        tier: 4,
        type: 'Essay(any type)',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        category: 1,
        tier: 2,
        type: 'Admission Essay',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        category: 1,
        tier: 4,
        type: 'Annotated Bibliography',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        category: 1,
        tier: 4,
        type: 'Article Review',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        category: 1,
        tier: 4,
        type: 'Book / Movie Review',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        category: 1,
        tier: 4,
        type: 'Business Plan',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        category: 1,
        tier: 4,
        type: 'Case Study',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        category: 1,
        tier: 4,
        type: 'Creative Writing',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        category: 1,
        tier: 4,
        type: 'Critical Thinking / Review',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        category: 1,
        tier: 4,
        type: 'Literature Review',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        category: 1,
        tier: 2,
        type: 'Presentation or Speech',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        category: 1,
        tier: 4,
        type: 'Reflective Writing',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        category: 1,
        tier: 4,
        type: 'Report',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        category: 1,
        tier: 3,
        type: 'Research Paper',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        category: 1,
        tier: 4,
        type: 'Research Proposal',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        category: 1,
        tier: 3,
        type: 'Term Paper',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        category: 1,
        tier: 3,
        type: 'Thesis / Dissertation',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        category: 1,
        tier: 4,
        type: 'Other',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        category: 2,
        tier: 4,
        type: 'Homework Assignment (Any Type)',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        category: 2,
        tier: 3,
        type: 'Biology Assignment',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        category: 2,
        tier: 2,
        type: 'Chemistry Assignment',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        category: 2,
        tier: 1,
        type: 'Engineering Assignment',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        category: 2,
        tier: 4,
        type: 'Geography Assignment',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        category: 2,
        tier: 2,
        type: 'Math Assignment',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        category: 2,
        tier: 2,
        type: 'Physics Assignment',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        category: 2,
        tier: 2,
        type: 'Statistics Assignment',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        category: 2,
        tier: 3,
        type: 'Other Assignment',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        category: 3,
        tier: 2,
        type: 'Multiple choice questions',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        category: 3,
        tier: 2,
        type: 'Short Answer Questions',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        category: 3,
        tier: 4,
        type: 'Word Problems',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete({ tableName: 'assignment_type', schema: 'general' }, null, {})
  }
}
