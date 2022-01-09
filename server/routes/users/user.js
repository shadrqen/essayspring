const express = require('express')
const router = express.Router()
const userService = require('../../services/users/user')
const {
  auth,
  decodeToken
} = require('../../services/users/auth')
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const { logger } = require('../../services/logs/logger')

const fileLimits = {
  files: 1, // allow only 1 file per request
  fieldSize: 5 * 1024 * 1024, // 10 MB (max file size),
  fileSize: 50 * 1024 * 1024,
  fieldNameSize: 3000
}

let uploadsPath = null
if (process.env.NODE_ENV && process.env.NODE_ENV === 'production') {
  uploadsPath = '/static/uploads'
} else {
  uploadsPath = __dirname.concat('/../../../static/ws/uploads')
}
if (!fs.existsSync(uploadsPath)) {
  fs.mkdirSync(uploadsPath, err => {
    if (err) {
      console.error('Error creating user uploads directory! ', err)
    } else {
      console.log('User uploads directory created successfully!')
    }
  })
}

const Storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, uploadsPath)
  },
  filename: async function (req, file, callback) {
    let tokenData = null
    let fileName = null
    let user = null
    await decodeToken(req.headers.access)
      .then(tokenDetails => {
        if (tokenDetails) {
          tokenData = tokenDetails
        }
      })
      .catch(() => {})
    if (tokenData) {
      await userService.getUserByEmail(tokenData.message.sub)
        .then(userRes => {
          if (userRes) {
            user = userRes
          }
        })
        .catch((error) => {
          console.log(error)
        })
    }
    const rand = Math.random() * (9999 - 1000) + 1000
    const randNum = Math.floor(rand)
    if (user) {
      const filePrefix = String(randNum).concat(String(user.id))
      fileName = filePrefix.concat(String(Date.now()), String(user.id), path.extname(file.originalname))
    } else {
      fileName = String(randNum).concat(String(Math.floor((Math.random() * 1000) + 1)).concat(String(Date.now()), String(Math.floor((Math.random() * 1000) + 1)), path.extname(file.originalname)))
    }
    callback(null, fileName)
  }
})

const types = ['image/png', 'image/jpeg', 'image/jpg', 'application/pdf', 'text/plain', 'video/mp4', 'video/mpg',
  'video/mpeg', 'video/avi', 'video/wmv', 'video/mov', 'video/rm', 'video/ram', 'video/swf', 'video/flv',
  'video/ogg', 'video/webm', 'audio/mp3', 'audio/mp4', 'audio/wav', 'audio/ogg', 'audio/mpeg',
  'text/csv', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel'
]

const fileFilter = (req, file, cb) => {
  if (types.includes(file.mimetype)) {
    cb(null, true)
  } else {
    cb(null, false)
    return cb(new Error('File format not allowed!'))
  }
}

const upload = multer({
  storage: Storage,
  limits: fileLimits,
  fileFilter: fileFilter
}).single('file') // Field name and max count

/* GET home page. */
router.get('/', logger, auth, function (req, res, next) {
  res.json({ title: 'Users' })
})

router.post('/upload_file', logger, auth, upload, async (req, res) => {
  let fileName = null
  if (req.file.filename) {
    fileName = req.file.filename
  }
  res.json({ filename: fileName })
})

router.post('/report_problem', logger, auth, upload, async (req, res) => {
  await userService.reportProblem(req)
    .then(response => {
      res.status(200).json(response)
    })
    .catch(error => {
      res.status(500).send(error)
    })
})

router.get('/get_writers', logger, auth, upload, async (req, res) => {
  await userService.getWriters(req)
    .then(response => {
      res.status(200).json(response)
    })
    .catch(error => {
      res.status(500).send(error)
    })
})

router.post('/get_selected_writer', logger, auth, upload, async (req, res) => {
  await userService.getSelectedWriter(req.body)
    .then(response => {
      res.status(200).json(response)
    })
    .catch(error => {
      res.status(500).send(error)
    })
})

router.post('/approve_personal_writer', logger, auth, upload, async (req, res) => {
  await userService.approvePersonalWriter(req.body)
    .then(response => {
      res.status(200).json(response)
    })
    .catch(error => {
      res.status(500).send(error)
    })
})

module.exports = router
