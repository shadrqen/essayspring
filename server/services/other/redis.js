'use strict'

const { createClient } = require('redis')

let redisPort, redisHost

if (process.env && process.env.NODE_ENV === 'production') {
  redisHost = process.env.REDIS_HOST
  redisPort = process.env.REDIS_PORT
} else {
  redisHost = process.env.URL
  redisPort = '6379'
}

let client

(async () => {
  client = createClient({
    url: `redis://${redisHost}:${redisPort}`
  })

  client.on('error', (err) => console.log('Redis Client Error', err))

  await client.connect()
})()

// Currently using the default options without specifyin the host and port

module.exports = client
