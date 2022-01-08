// const tableName = 'client'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // await queryInterface.sequelize.transaction(async transaction => {
    //   const table = { schema: 'client', tableName: tableName }
    //   await queryInterface.addColumn(table, 'facebookId', {
    //     type: Sequelize.STRING(30)
    //   }, { transaction })
    // })
  },

  down: async (queryInterface, Sequelize) => {
    // await queryInterface.sequelize.transaction(async transaction => {
    //   const table = { schema: 'client', tableName: tableName }
    //   await queryInterface.removeColumn(table, 'facebookId', { transaction })
    // })
  }
}
