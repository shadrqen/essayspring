'use strict'

const { exec } = require('child_process')

class Migrator {
    static migrateDB = async () => {
      try {
        exec('npx sequelize-cli db:migrate')
        return true
      } catch (e) {
        return Promise.reject(e)
      }
    }
}

module.exports = Migrator
