const MQTT = require('mqtt')
let options, mqttUrl

if (process.env.NODE_ENV === 'production') {
  mqttUrl = process.env.MQTT_URL || 'mqtt://localhost'
  options = {
    port: process.env.MQTT_PORT || 1883,
    clientId: process.env.POD_NAME || 'cid',
    username: process.env.MQTT_WS_USERNAME || 'user',
    password: process.env.MQTT_WS_PASS || 'pass',
    keepalive: 1000,
    connectTimeout: 30 * 1000,
    reconnectPeriod: 1000,
    clean: false,
    debug: false
  }
} else {
  mqttUrl = process.env.DEV_MQTT_URL || 'mqtt://localhost'
  options = {
    port: process.env.DEV_MQTT_PORT || 1883,
    clientId: process.env.DEV_MQTT_WS_CLIENT_ID || 'cid',
    username: process.env.DEV_MQTT_WS_USERNAME || 'user',
    password: process.env.DEV_MQTT_WS_PASS || 'pass',
    clean: true,
    debug: true
  }
}

/* Connect to the MQTT broker - which is responsible for submitting messages from one client to another
* through topics. It has superior benefits from, say, web sockets or socket.io. One major benefits, for
* example is the ability to perform under extreme/constrained networking connections.
* Secondly, it has QOS - quality of service. QOS guarantees that a message is received by the recipient
* depending on whether it is level 0, 1 or 2 (which is the highest) */
const CLIENT = MQTT.connect(mqttUrl, options)

CLIENT.on('connect', function () {
  console.log('MQTT client connected successfully')
})

CLIENT.on('close', function () {
  console.log('MQTT client disconnected')
})

// handle errors
CLIENT.on('error', function (error) {
  console.log("Can't connect" + error)
})

module.exports = CLIENT
