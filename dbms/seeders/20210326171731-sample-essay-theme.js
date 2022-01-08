'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert({ tableName: 'sample_essay_theme', schema: 'writer' }, [
      {
        topic: 'Employee motivation and organizational success',
        description: 'Describe the impacts of employee motivation on organizational success',
        subjectId: 2,
        educationLevelId: 5,
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        topic: 'Fallacies of distributed computing',
        description: 'Discuss the fallacies of distributed computing and their possible impacts',
        subjectId: 3,
        educationLevelId: 5,
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        topic: 'Article Review',
        description: 'What makes "Darkness Falls" by Patrick Hughes a unique artwork?',
        subjectId: 1,
        educationLevelId: 5,
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        topic: 'Article Review',
        description: 'Discuss the biblical symbols in "The Garden of Delights" by Hieronymus Bosch',
        subjectId: 1,
        educationLevelId: 5,
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        topic: 'Article Review',
        description: 'Discuss the depiction of the female body in the painting "The Three Graces" by Peter Paul Rubens',
        subjectId: 1,
        educationLevelId: 5,
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        topic: 'Article Review',
        description: 'Discuss the magic realism in the painting "La note bleu" by Eric Roux-Fontaine',
        subjectId: 1,
        educationLevelId: 5,
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        topic: 'Leadership and Management',
        description: 'Discuss the nature of the relationship between owners and employees.',
        subjectId: 2,
        educationLevelId: 5,
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        topic: 'Business and Management',
        description: 'Discuss how changes in the macro economy such as changes in GDP and inflation might impact\n' +
            'on the employment relationship.',
        subjectId: 2,
        educationLevelId: 5,
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        topic: 'Business and Management',
        description: 'Discuss the relationship between wages and worker effort.',
        subjectId: 2,
        educationLevelId: 5,
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        topic: 'Parallel and Distributed Computing',
        description: 'Discuss the similarities and differences between parallel and distributed computing.',
        subjectId: 3,
        educationLevelId: 5,
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        topic: 'Networking',
        description: 'Explain the process of accessing a website, right from the moment a user enters a domain name,' +
            ' including the HTTP handshake, up to point of getting a rendered page on the browser.',
        subjectId: 2,
        educationLevelId: 5,
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        topic: 'Economics',
        description: 'Discuss the types of monopoly.',
        subjectId: 4,
        educationLevelId: 5,
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        topic: 'Monopoly Markets',
        description: 'Can a monopoly market be harmful to the economy.',
        subjectId: 4,
        educationLevelId: 5,
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        topic: 'STEM vs STEAM Education',
        description: 'Is STEAM better than STEM? Explain.',
        subjectId: 5,
        educationLevelId: 5,
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        topic: 'Home-schooling and Traditional Schooling',
        description: 'Is home-schooling better than traditional schooling? Explain.',
        subjectId: 5,
        educationLevelId: 5,
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        topic: 'Principles of Engineering',
        description: 'Discuss the main principles of engineering and their impacts.',
        subjectId: 6,
        educationLevelId: 5,
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        topic: 'English and Literature',
        description: 'Discuss the main themes in "The Mantle of the Prophet: Religion and Politics in Iran" by Roy Mottahedeh.',
        subjectId: 7,
        educationLevelId: 5,
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        topic: 'Alzheimer\'s disease and dementia',
        description: 'Explain the difference between Alzheimer\'s disease and dementia.',
        subjectId: 8,
        educationLevelId: 5,
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        topic: 'Law',
        description: 'Explain the Dred Scott v. Sandford case of 1857 and its significance in the history of the ' +
            'United States.',
        subjectId: 9,
        educationLevelId: 5,
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        topic: 'Humanities',
        description: 'Explain the Dred Scott v. Sandford case of 1857 and its significance in the history of the ' +
            'United States.',
        subjectId: 10,
        educationLevelId: 5,
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        topic: 'Marketing',
        description: 'Discuss the impact of customer relationship management on organizational performance.',
        subjectId: 11,
        educationLevelId: 5,
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        topic: 'Calculus',
        description: 'Prove or disprove: composition of functions is commutative; that is g ◦ f = f ◦ g when\n' +
            'both sides are defined',
        subjectId: 12,
        educationLevelId: 5,
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        topic: 'Origin of the Universe',
        description: 'Using any theory of your choice, explain the origin of the Universe.',
        subjectId: 13,
        educationLevelId: 5,
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        topic: 'Nature',
        description: 'Is there inherent order in nature or is it all chaos and chance?',
        subjectId: 14,
        educationLevelId: 5,
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        topic: 'Democracy',
        description: 'Discuss the similarities and differences between a parliamentary and presidential democracy.',
        subjectId: 15,
        educationLevelId: 5,
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        topic: 'Human Memory',
        description: 'Discuss the factors that can influence the functioning of memory.',
        subjectId: 16,
        educationLevelId: 5,
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        topic: 'Evil',
        description: 'Why does God allow evil?',
        subjectId: 17,
        educationLevelId: 5,
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        topic: 'Society',
        description: 'Why do societies create effective and resilient institutions such as governments?',
        subjectId: 18,
        educationLevelId: 5,
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        topic: 'Rural-urban migration',
        description: '"Many people move from rural areas to live in cities. Some people think the impact this has on' +
            ' both rural areas and cities is positive. However, others believe the impact is negative." Discuss. ' +
            'Remember to give your personal view of the topic',
        subjectId: 19,
        educationLevelId: 5,
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete({ tableName: 'sample_essay_theme', schema: 'writer' }, null, {})
  }
}
