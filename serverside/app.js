/* Importing modules */
const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')

/* Cross Origin Resource Sharing */
const cors = require('cors')
const fs = require('fs')

// const ipGeoBlock = require('node-ipgeoblock')

require('dotenv').config()

/* importing routers */
const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users/user')
const authRouter = require('./routes/users/auth')
const ordersRouter = require('./routes/order')
const paymentsRouter = require('./routes/payment')
const wsRouter = require('./routes/ws')

/* Instantiating the express application */
const app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')
app.use(express.static(path.join(__dirname, 'public')))
/* Create a logs directory in case it does not exist
* The directory holds the application logs */
let absoluteDirPath, dir, originNetwork
if (process.env.NODE_ENV && process.env.NODE_ENV === 'production') {
  dir = '/static/logs'
  absoluteDirPath = dir.concat('/access.log')
  originNetwork = 'https://essayspring.com'
} else {
  dir = __dirname.concat('/../static/ws/logs')
  absoluteDirPath = __dirname.concat('/../static/ws/logs/access.log')
  originNetwork = process.env.WC_DEV_URL
}
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
/* Import the users router that hosts all urls associated to the user */
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

const corsOptions = {
  origin: originNetwork,
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
/* Enabling CORS in the app */
app.use(cors(corsOptions))

/* Setting the app to use the imported routers */
app.use('/v1', indexRouter)
app.use('/users/v1', usersRouter)
app.use('/auth/v1', authRouter)
app.use('/orders/v1', ordersRouter)
app.use('/payments/v1', paymentsRouter)
app.use('/ws/v1', wsRouter)

/* Setting the timezone */
process.env.TZ = 'Africa/Nairobi'

// app.use(ipGeoBlock({
//   geolite2: './public/GeoLite2-Country_20210309/GeoLite2-Country.mmdb',
//   allowedCountries: ['KE']
// }))

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}
  console.log('404...', err.message, req.originalUrl)
  // return the 404 error page
  res.status(500).send('I\'m lost')
})

module.exports = app
