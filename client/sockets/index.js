/* The main MQTT socket module */
import mqtt from 'mqtt'
import api from '../api/api'

export default {
  connection: {
    host: null,
    port: 0,
    endpoint: '/mqtt',
    clean: true, // Reserved session <----------------> connectTimeout: 60000, // Time out ----------- reconnectPeriod: 4000, // Reconnection interval,
    connectTimeout: 60000, // Time out
    reconnectPeriod: 4000, // Reconnection interval
    clientId: null,
    username: null,
    password: null
  },

  writerBids: [],
  qosList: [
    { label: 0, value: 0 },
    { label: 1, value: 1 },
    { label: 2, value: 2 }
  ],
  client: null,
  subscription: {
    topic: null,
    qos: 0
  },
  subscribeSuccess: false,
  async getWebSocketCredentials () {
    return await api.getRequest('ws/v1/ws_wc_creds')
      .then(res => res)
      .catch(err => Promise.reject(err))
  },
  async connectSocket () {
    return await this.getWebSocketCredentials()
      .then(creds => {
        this.connection.clientId = creds.cid
        this.connection.username = creds.user
        this.connection.password = creds.pass
        let protocol
        if (process.env.NODE_ENV === 'production') {
          this.connection.host = creds.host
          this.connection.port = creds.port
          protocol = 'wss'
        } else {
          this.connection.host = process.env.URL
          this.connection.port = 9090
          protocol = 'ws'
        }
        const { host, port, endpoint, ...options } = this.connection
        const connectUrl = `${protocol}://${host}:${port}${endpoint}`
        this.client = mqtt.connect(connectUrl, options)
      })
      .catch(error => {
        throw new Error(error)
      })
  },
  // Create connection
  async createConnection () {
    // Index string, and specify the connection method used through protocol
    // ws unencrypted WebSocket connection
    // wss encrypted WebSocket connection
    // mqtt unencrypted TCP connection
    // mqtts encrypted TCP connection
    // wxs WeChat mini app connection
    // alis Alipay mini app connection
    try {
      await this.connectSocket()
    } catch (error) {
      console.log('Connect error', error)
    }
    this.client.on('connect', () => {
      console.log('Connection succeeded!')
    })
    this.client.on('error', error => {
      console.log('Connection failed', error)
    })
    this.client.on('close', () => {
      console.log('Client is disconnected.')
    })
  },
  async doSubscribe (_topic) {
    this.subscription.topic = _topic
    const { topic, qos } = this.subscription
    await this.client.subscribe(topic, { qos }, (error, res) => {
      if (error) {
        console.log('Failed to subscribe to the topic: ', error)
      }
      this.subscribeSuccess = true
      console.log('Subscribed to the topic successfully')
    })
    return this.client
  },
  doUnSubscribe () {
    const { topic } = this.subscription
    this.client.unsubscribe(topic, error => {
      if (error) {
        console.log('Unsubscribe error', error)
      }
    })
  },
  doPublish () {
    const { topic, qos, payload } = this.publication
    this.client.publish(topic, payload, qos, error => {
      if (error) {
        console.log('Publish error', error)
      }
    })
  },
  destroyConnection () {
    if (this.client.connected) {
      try {
        this.client.end()
        this.client = {
          connected: false
        }
        console.log('Successfully disconnected!')
      } catch (error) {
        console.log('Disconnect failed', error.toString())
      }
    }
  }
}
