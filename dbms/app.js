/* Importing modules */
const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const fs = require('fs')

/* Cross Origin Resource Sharing */
const cors = require('cors')

require('dotenv').config()

/* Instantiating the app */
const app = express()

/* Allowed CORS */
const originNetwork = 'https://api.essayspring.com/'

const corsOptions = {
  origin: originNetwork,
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

/* Enabling CORS in the app */
app.use(cors(corsOptions))

/* Importing models */
const models = require('./models')

/* Function that checks the connection to the database */
function authenticateDB () {
  models.sequelize.authenticate()
    .then(() => {
      console.log('Connection to the database has been established successfully')
    })
    .catch(err => {
      console.error('Unable to connect to the database:', err.original)
    })
}

/* The above function is called after 30 seconds, to allow the database to start - in case both
* the database and this microservice are started at the same time */
setTimeout(authenticateDB, 30000)

/* Importing the various routes for each sub-module */
const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users/user')
const ordersRouter = require('./routes/order')
const paymentsRouter = require('./routes/payment')
const logsRouter = require('./routes/logs')

/* view engine setup */
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')
app.use(express.static(path.join(__dirname, 'public')))

/* Create a logs directory in case it does not exist
* The directory holds the application logs */
let dir
let absoluteDirPath
if (process.env.NODE_ENV && process.env.NODE_ENV === 'production') {
  dir = '/static/logs'
  absoluteDirPath = dir.concat('/access.log')
} else {
  dir = __dirname.concat('/../static/ds/logs')
  absoluteDirPath = __dirname.concat('/../static/ds/logs/access.log')
  if (!fs.existsSync(__dirname.concat('/../static/'))) {
    fs.mkdirSync(__dirname.concat('/../static/'), (err) => {
      if (err) {
        console.error('Error creating static directory! ', err)
      } else {
        console.log('Static directory created successfully!')
      }
    })
  }
  if (!fs.existsSync(__dirname.concat('/../static/ds'))) {
    fs.mkdirSync(__dirname.concat('/../static/ds'), (err) => {
      if (err) {
        console.error('Error creating static ds directory! ', err)
      } else {
        console.log('Static ds directory created successfully!')
      }
    })
  }
  if (!fs.existsSync(__dirname.concat('/../static/ws'))) {
    fs.mkdirSync(__dirname.concat('/../static/ws'), (err) => {
      if (err) {
        console.error('Error creating static ws directory! ', err)
      } else {
        console.log('Static ws directory created successfully!')
      }
    })
  }
}

/* Creating the logs directory */
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, (err) => {
    if (err) {
      console.error('Error creating logs directory! ', err)
    } else {
      console.log('Logs directory created successfully!')
    }
  })
}

/* Create a write stream (in append mode) */
const accessLogStream = fs.createWriteStream(absoluteDirPath, { flags: 'a' })
/* Setup the logger using the combined format that takes the following shape
* :remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status
* :res[content-length] ":referrer" ":user-agent" */
/* Pass the stream as the options parameter */
app.use(logger('combined', { stream: accessLogStream }))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use('/v1', indexRouter)
app.use('/users/v1', usersRouter)
app.use('/orders/v1', ordersRouter)
app.use('/payments/v1', paymentsRouter)
app.use('/logs/v1', logsRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})
// error handler
app.use(function (err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}
  /* Send the error back to the request origin */
  res.status(500).send('I\'m lost.')
})
module.exports = app
