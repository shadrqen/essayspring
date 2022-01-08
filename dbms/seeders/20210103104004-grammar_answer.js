'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert({ tableName: 'grammar_answer', schema: 'writer' }, [
      {
        questionId: 1,
        answer: 'had been finishing, appeared',
        answerLetter: 'A',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        questionId: 1,
        answer: 'has finished, had appeared',
        answerLetter: 'B',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        questionId: 1,
        answer: 'has been finishing, appears',
        answerLetter: 'C',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        questionId: 1,
        answer: 'was finishing, had appeared',
        answerLetter: 'D',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        questionId: 2,
        answer: 'was, seen',
        answerLetter: 'A',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        questionId: 2,
        answer: 'is, saw',
        answerLetter: 'B',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        questionId: 2,
        answer: 'was, had been seeing',
        answerLetter: 'C',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        questionId: 2,
        answer: 'is, has seen ',
        answerLetter: 'D',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        questionId: 3,
        answer: 'will still be, must be disposed of, can be turned into, will be stored',
        answerLetter: 'A',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        questionId: 3,
        answer: 'still would be, has been disposed of, must be turned into, is stored',
        answerLetter: 'B',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        questionId: 3,
        answer: 'still will be, can be disposed in, must be turned into, will store',
        answerLetter: 'C',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        questionId: 3,
        answer: 'would still be, must be disposed in, can be turned into, will be stored',
        answerLetter: 'D',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        questionId: 4,
        answer: '---, an, the, a',
        answerLetter: 'A',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        questionId: 4,
        answer: 'the, ---, the, a',
        answerLetter: 'B',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        questionId: 4,
        answer: 'the, an, ---, an',
        answerLetter: 'C',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        questionId: 4,
        answer: 'an, ---, a, a',
        answerLetter: 'D',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        questionId: 5,
        answer: '---, the, ---, the, provides',
        answerLetter: 'A',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        questionId: 5,
        answer: '---, ---, a, ---, provide',
        answerLetter: 'B',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        questionId: 5,
        answer: 'the, the, the, the, provides',
        answerLetter: 'C',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        questionId: 5,
        answer: 'the, the, a, the, provides',
        answerLetter: 'D',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        questionId: 6,
        answer: 'would grow, have existed, will not have changed, will look',
        answerLetter: 'A',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        questionId: 6,
        answer: 'would have grown, existed, would not have changed, would look',
        answerLetter: 'B',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        questionId: 6,
        answer: 'could have grown, exist, will not change, look',
        answerLetter: 'C',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        questionId: 6,
        answer: 'would grow, exist, would have changed, would looked',
        answerLetter: 'D',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        questionId: 7,
        answer: 'was not driving, would not run in, would not be at',
        answerLetter: 'A',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        questionId: 7,
        answer: 'were not driving, would not have run to, would not have been in',
        answerLetter: 'B',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        questionId: 7,
        answer: 'had not driven, would not run into, would not be at',
        answerLetter: 'C',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        questionId: 7,
        answer: 'had not driven, would not have run into, would not have been in',
        answerLetter: 'D',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        questionId: 8,
        answer: 'was four hours when, on, for, wanted to',
        answerLetter: 'A',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        questionId: 8,
        answer: 'has been four hours since, on, for, want to',
        answerLetter: 'B',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        questionId: 8,
        answer: 'has had four hours since, at, to, want to',
        answerLetter: 'C',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        questionId: 8,
        answer: 'has been four hours since, at, to, wanted to',
        answerLetter: 'D',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        questionId: 9,
        answer: 'in, at, mediocre',
        answerLetter: 'A',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        questionId: 9,
        answer: 'for, at, commonplace',
        answerLetter: 'B',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        questionId: 9,
        answer: 'with, in, plodding',
        answerLetter: 'C',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        questionId: 9,
        answer: 'at, in, pedestrian',
        answerLetter: 'D',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        questionId: 10,
        answer: 'Once being at university, at, popular within, at',
        answerLetter: 'A',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        questionId: 10,
        answer: 'Once being in university, at, popular for, in',
        answerLetter: 'B',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        questionId: 10,
        answer: 'Once at university, in, popular with, in',
        answerLetter: 'C',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        questionId: 10,
        answer: 'Once in university, in, popular within, at',
        answerLetter: 'D',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        questionId: 11,
        answer: ' - A spokesman insisted',
        answerLetter: 'A',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        questionId: 11,
        answer: ' - there had been no security problems',
        answerLetter: 'B',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        questionId: 11,
        answer: ' - neither of',
        answerLetter: 'C',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        questionId: 11,
        answer: ' - held secret information',
        answerLetter: 'D',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        questionId: 12,
        answer: ' - A lot of people',
        answerLetter: 'A',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        questionId: 12,
        answer: ' - sit around',
        answerLetter: 'B',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        questionId: 12,
        answer: ' - jobs founded',
        answerLetter: 'C',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        questionId: 12,
        answer: ' - the main town',
        answerLetter: 'D',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        questionId: 13,
        answer: ' - All EU countries agreed to',
        answerLetter: 'A',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        questionId: 13,
        answer: ' - the new regulations on',
        answerLetter: 'B',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        questionId: 13,
        answer: ' - but so far only',
        answerLetter: 'C',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        questionId: 13,
        answer: ' - German have done so',
        answerLetter: 'D',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        questionId: 14,
        answer: ' - an absolutely old building',
        answerLetter: 'A',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        questionId: 14,
        answer: ' - was totally renovated',
        answerLetter: 'B',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        questionId: 14,
        answer: ' - did not have to do much decorating',
        answerLetter: 'C',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        questionId: 14,
        answer: ' - I moved in',
        answerLetter: 'D',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        questionId: 15,
        answer: ' - some discussion along the day',
        answerLetter: 'A',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        questionId: 15,
        answer: ' - before my descent from the mountain',
        answerLetter: 'B',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        questionId: 15,
        answer: ' - but I never imagined ',
        answerLetter: 'C',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        questionId: 15,
        answer: ' - the conditions would be',
        answerLetter: 'D',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        questionId: 16,
        answer: ' - On the bus on the way back',
        answerLetter: 'A',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        questionId: 16,
        answer: ' - I got to talking to',
        answerLetter: 'B',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        questionId: 16,
        answer: ' - was concerned learning ',
        answerLetter: 'C',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        questionId: 16,
        answer: ' - it got very cold in the hills',
        answerLetter: 'D',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        questionId: 17,
        answer: ' - changing someone\'s hairdo',
        answerLetter: 'A',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        questionId: 17,
        answer: ' - would also extract teeth',
        answerLetter: 'B',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        questionId: 17,
        answer: ' - you could say that an old-fashioned barber ',
        answerLetter: 'C',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        questionId: 17,
        answer: ' - Jack of all trades',
        answerLetter: 'D',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        questionId: 18,
        answer: ' - be felt by alive',
        answerLetter: 'A',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        questionId: 18,
        answer: ' - through sight (apparitions)',
        answerLetter: 'B',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        questionId: 18,
        answer: ' - smell (fragrances and odors) ',
        answerLetter: 'C',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        questionId: 18,
        answer: ' - sometimes they can just be sensed',
        answerLetter: 'D',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        questionId: 19,
        answer: ' - With advance notice',
        answerLetter: 'A',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        questionId: 19,
        answer: ' - having thought about your agenda',
        answerLetter: 'B',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        questionId: 19,
        answer: ' - prepared presentations',
        answerLetter: 'C',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        questionId: 19,
        answer: ' - coming up with solutions to problems',
        answerLetter: 'D',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        questionId: 20,
        answer: ' - For his amazement and his admiration',
        answerLetter: 'A',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        questionId: 20,
        answer: ' - he had once hoped to kiss',
        answerLetter: 'B',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        questionId: 20,
        answer: ' - her untimely death',
        answerLetter: 'C',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        questionId: 20,
        answer: ' - at once in front of him',
        answerLetter: 'D',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        questionId: 21,
        answer: 'flush left, bolded, and uppercase',
        answerLetter: 'A',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        questionId: 21,
        answer: 'flush left, underlined, and lowercase',
        answerLetter: 'B',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        questionId: 21,
        answer: 'centered, bolded, and title case',
        answerLetter: 'C',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        questionId: 22,
        answer: '"&"',
        answerLetter: 'A',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        questionId: 22,
        answer: '"and"',
        answerLetter: 'B',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        questionId: 22,
        answer: 'whatever you like',
        answerLetter: 'C',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        questionId: 23,
        answer: 'require a URL or DOI',
        answerLetter: 'A',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        questionId: 23,
        answer: 'do not require a URL or DOI',
        answerLetter: 'B',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        questionId: 23,
        answer: 'require DOI',
        answerLetter: 'C',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        questionId: 24,
        answer: 'italicized',
        answerLetter: 'A',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        questionId: 24,
        answer: 'bolded and italicized',
        answerLetter: 'B',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        questionId: 24,
        answer: 'underlined',
        answerLetter: 'C',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        questionId: 25,
        answer: '"Bibliography"',
        answerLetter: 'A',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        questionId: 25,
        answer: '"Bibliography" or "References"',
        answerLetter: 'B',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        questionId: 25,
        answer: '"References"',
        answerLetter: 'C',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete({ tableName: 'grammar_answer', schema: 'writer' }, null, {})
  }
}
