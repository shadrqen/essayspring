const EXPRESS = require('express')
const ROUTER = EXPRESS.Router()
const USERS_SERVICE = require('../../services/users/user')
const {
  auth,
  decodeToken
} = require('../../services/users/auth')
const MULTER = require('multer')
const PATH = require('path')
const FILES_SYSTEM = require('fs')
const { logger } = require('../../services/logs/logger')

const FILE_LIMITS = {
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
if (!FILES_SYSTEM.existsSync(uploadsPath)) {
  FILES_SYSTEM.mkdirSync(uploadsPath, err => {
    if (err) {
      console.error('Error creating user uploads directory! ', err)
    } else {
      console.log('User uploads directory created successfully!')
    }
  })
}

const STORAGE = MULTER.diskStorage({
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
      await USERS_SERVICE.getUserByEmail(tokenData.message.sub)
        .then(userRes => {
          if (userRes) {
            user = userRes
          }
        })
        .catch((error) => {
          console.log(error)
        })
    }
    const RAND = Math.random() * (9999 - 1000) + 1000
    const RAND_NUM = Math.floor(RAND)
    if (user) {
      const FILE_PREFIX = String(RAND_NUM).concat(String(user.id))
      fileName = FILE_PREFIX.concat(String(Date.now()), String(user.id), PATH.extname(file.originalname))
    } else {
      fileName = String(RAND_NUM).concat(String(Math.floor((Math.random() * 1000) + 1)).concat(String(Date.now()), String(Math.floor((Math.random() * 1000) + 1)), PATH.extname(file.originalname)))
    }
    callback(null, fileName)
  }
})

const TYPES = ['image/png', 'image/jpeg', 'image/jpg', 'application/pdf', 'text/plain', 'video/mp4', 'video/mpg',
  'video/mpeg', 'video/avi', 'video/wmv', 'video/mov', 'video/rm', 'video/ram', 'video/swf', 'video/flv',
  'video/ogg', 'video/webm', 'audio/mp3', 'audio/mp4', 'audio/wav', 'audio/ogg', 'audio/mpeg',
  'text/csv', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel'
]

const FILE_FILTER = (req, file, cb) => {
  if (TYPES.includes(file.mimetype)) {
    cb(null, true)
  } else {
    cb(null, false)
    return cb(new Error('File format not allowed!'))
  }
}

const UPLOAD = MULTER({
  storage: STORAGE,
  limits: FILE_LIMITS,
  fileFilter: FILE_FILTER
}).single('file') // Field name and max count

/* GET home page. */
ROUTER.get('/', logger, auth, function (req, res, next) {
  res.json({ title: 'Users' })
})

ROUTER.post('/upload_file', logger, auth, UPLOAD, async (req, res) => {
  let fileName = null
  if (req.file.filename) {
    fileName = req.file.filename
  }
  res.json({ filename: fileName })
})

ROUTER.post('/report_problem', logger, auth, UPLOAD, async (req, res) => {
  await USERS_SERVICE.reportProblem(req)
    .then(response => {
      res.status(200).json(response)
    })
    .catch(error => {
      res.status(500).send(error)
    })
})

ROUTER.get('/get_writers', logger, auth, UPLOAD, async (req, res) => {
  await USERS_SERVICE.getWriters(req)
    .then(response => {
      res.status(200).json(response)
    })
    .catch(error => {
      res.status(500).send(error)
    })
})

ROUTER.post('/get_selected_writer', logger, auth, UPLOAD, async (req, res) => {
  await USERS_SERVICE.getSelectedWriter(req.body)
    .then(response => {
      res.status(200).json(response)
    })
    .catch(error => {
      res.status(500).send(error)
    })
})

ROUTER.post('/approve_personal_writer', logger, auth, UPLOAD, async (req, res) => {
  await USERS_SERVICE.approvePersonalWriter(req.body)
    .then(response => {
      res.status(200).json(response)
    })
    .catch(error => {
      res.status(500).send(error)
    })
})

module.exports = ROUTER
