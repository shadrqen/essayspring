const express = require('express')
const router = express.Router()

const migrator = require('../migrator')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.send('Migrator')
})

router.get('/migration/migrate/update', async function (req, res) {
  await migrator.migrateDB()
    .then(response => {
      res.status(200).json({ success: response })
    })
    .catch(error => {
      console.log(error)
      res.status(500).send(error)
    })
})

module.exports = router
