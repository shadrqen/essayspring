'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert({ tableName: 'grammar_question', schema: 'writer' }, [
      {
        instruction: 'Choose the word or phrase that best completes the sentence.',
        question: 'James _____________ some papers in the living room when Jane _____________.',
        correctAnswerId: 1,
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        instruction: 'Choose the word or phrase that best completes the sentence.',
        question: 'That _____________ the second time Peter _____________ his bride look shy and uncomfortable.',
        correctAnswerId: 8,
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        instruction: 'Choose the word or phrase that best completes the sentence.',
        question: 'Nuclear waste _____________ radioactive after 10,000 years, so it _____________ carefully; the ' +
            'most dangerous waste _____________ glass which _____________ in deep underground mines.',
        correctAnswerId: 12,
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        instruction: 'Choose the word or phrase that best completes the sentence.',
        question: 'Researchers have discovered that _____________ Earth\'s surface is entirely covered ' +
            'with _____________ ice, but scientists believe that beneath _____________ frozen layer lies _____________' +
            ' river.',
        correctAnswerId: 14,
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        instruction: 'Choose the word or phrase that best completes the sentence.',
        question: 'Many people have speculated on _____________ reasons for _____________ western population ' +
            'movements in the European subcontinent during _____________ 16th century, but none of _____________' +
            ' historical records identified so far _____________ an answer.',
        correctAnswerId: 19,
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        instruction: 'Choose the word or phrase that best completes the sentence.',
        question: 'The general view is that perhaps dinosaurs brains _____________ larger, but if they _____________' +
            ' today, dinosaurs _____________ very much in general, and, _____________ much the same.',
        correctAnswerId: 22,
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        instruction: 'Choose the word or phrase that best completes the sentence.',
        question: 'If you _____________ so fast, you _____________ a tree, and you _____________ this mess now.',
        correctAnswerId: 28,
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        instruction: 'Choose the word or phrase that best completes the sentence.',
        question: 'It _____________ I started working _____________ my project; at this point, I absolutely have to ' +
            'ask _____________ help if I _____________ finish it today.',
        correctAnswerId: 30,
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        instruction: 'Choose the word or phrase that best completes the sentence.',
        question: 'You are not allowed to drive _____________ such a high speed _____________ the _____________ area.',
        correctAnswerId: 36,
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        instruction: 'Choose the word or phrase that best completes the sentence.',
        question: '_____________, she also became interested _____________ student politics and, _____________ ' +
            'her fellow students, was elected University President _____________ her second year.',
        correctAnswerId: 40,
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        instruction: 'Identify the one underlined expression (A, B, C or D) that must be changed to correct the ' +
            'sentence.',
        question: '__A spokesman insisted__ that __there had been no security problems__ as __neither of__' +
            ' the computers __held secret information__.',
        correctAnswerId: 43,
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        instruction: 'Identify the one underlined expression (A, B, C or D) that must be changed to correct the ' +
            'sentence.',
        question: '__A lot of people__ just __sit around__ all day -- there are no __jobs founded__ outside ' +
            '__the main town__.',
        correctAnswerId: 47,
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        instruction: 'Identify the one underlined expression (A, B, C or D) that must be changed to correct the ' +
            'sentence.',
        question: '__All EU countries agreed to__ implement __the new regulations on__ recycling plastic, ' +
            '__but so far only__ Ukraine and __German have done so__.',
        correctAnswerId: 52,
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        instruction: 'Identify the one underlined expression (A, B, C or D) that must be changed to correct the ' +
            'sentence.',
        question: 'The flat is in __an absolutely old building__ which __was totally renovated__ last year; ' +
            'fortunately, I __did not have to do much decorating__ when I __moved in__.',
        correctAnswerId: 56,
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        instruction: 'Identify the one underlined expression (A, B, C or D) that must be changed to correct the ' +
            'sentence.',
        question: 'There was __some discussion along the day__ as to whether the snow would arrive __before my ' +
            'descent from the mountain__, __but I never imagined__ how hard __the conditions would be__.',
        correctAnswerId: 57,
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        instruction: 'Identify the one underlined expression (A, B, C or D) that must be changed to correct the ' +
            'sentence.',
        question: '__On the bus on the way back__ to the hotel, __I got to talking to__ a local woman and __was' +
            ' concerned learning__ that __it got very cold in the hills__ at night.',
        correctAnswerId: 61,
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        instruction: 'Identify the one underlined expression (A, B, C or D) that must be changed to correct the ' +
            'sentence.',
        question: 'As well as __changing someone\'s hairdo__, a barber __would also extract teeth__ and perform' +
            ' other minor surgeries, so __you could say that an old-fashioned barber__ really was __Jack of all trades__.',
        correctAnswerId: 68,
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        instruction: 'Identify the one underlined expression (A, B, C or D) that must be changed to correct the ' +
            'sentence.',
        question: 'Ghosts can __be felt by alive__ in a number of ways: __through sight (apparitions)__, sound' +
            ' (voices), __smell (fragrances and odors)__, touch, and __sometimes they can just be sensed__.',
        correctAnswerId: 69,
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        instruction: 'Identify the one underlined expression (A, B, C or D) that must be changed to correct the ' +
            'sentence.',
        question: '__With advance notice__, participants will come to your meeting __having thought about your ' +
            'agenda__, read through the background papers, __prepared presentations__, and __coming up with solutions ' +
            'to problems__.',
        correctAnswerId: 76,
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        instruction: 'Identify the one underlined expression (A, B, C or D) that must be changed to correct the ' +
            'sentence.',
        question: '__For his amazement and his admiration__, the figure of the woman __he had once hoped to kiss__ ' +
            'before __her untimely death__ appeared __at once in front of him__.',
        correctAnswerId: 77,
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        instruction: null,
        question: 'In the APA style, a Level 1 heading should be:',
        correctAnswerId: 83,
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        instruction: null,
        question: 'In the references section in the Chicago style, for multiple-author entries you should use:',
        correctAnswerId: 85,
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        instruction: null,
        question: 'In every formatting style, online sources:',
        correctAnswerId: 87,
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        instruction: null,
        question: 'In the MLA style, titles of published works (books, journals, films, etc) mentioned in the text' +
            ' have to be:',
        correctAnswerId: 90,
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        instruction: null,
        question: 'In the Chicago style, you should label the reference list as:',
        correctAnswerId: 94,
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete({ tableName: 'grammar_question', schema: 'writer' }, null, {})
  }
}
