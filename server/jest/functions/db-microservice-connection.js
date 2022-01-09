'use strict'

const axios = require('axios')

const dbMicroService = `http://${process.env.URL}:3050/v1/check`
const origin = 'http://localhost:3100:lspauidg'

axios.defaults.headers.common['x-allowed-origin'] = origin

module.exports = async () => {
  return await axios
    .get(dbMicroService)
    .then(response => {
      return response.data
    })
    .catch(error => {
      console.log(error.message)
      return error
    })
}
