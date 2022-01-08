'use strict'

const redis = require('redis')

let redisPort, redisHost

if (process.env && process.env.NODE_ENV === 'production') {
  redisHost = process.env.REDIS_HOST
  redisPort = process.env.REDIS_PORT
} else {
  redisHost = `${process.env.URL}`
  redisPort = '6379'
}

module.exports = redis.createClient(redisPort, redisHost)
