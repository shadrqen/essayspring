/* Promise based HTTP client for the browser and node.js */
// @ts-ignore
import axios from 'axios'

import store from '../store'

/* The backend server's absolute url */
let url: any
// @ts-ignore
if (process.env.NODE_ENV === 'production') {
  url = 'https://api.essayspring.com/'
} else {
  // @ts-ignore
  url = `http://${process.env.URL}:3100/`
}

export default {
  setAxiosHeaders () {
    axios.defaults.headers.common.Access = store().getters.accessToken
    axios.defaults.headers.common.Refresh = store().getters.refreshToken

    /* An axios response interceptor to intercept responses and request for a refresh token in case of an expiry
    * of an access token (in case the refresh token is yet to expire) */
    axios.interceptors.response.use((response: any) => {
      /* Any status code that lie within the range of 2xx cause this function to trigger
      * Return the response data */
      return response
    }, error => {
      /* In case of an error, check the response and request for an access token refresh in case it has expired and is
      * still within the expiry of the refresh token */
      if (error.response && error.response.data) {
        if (error.response && error.response.data === 'TokenExpiredError: jwt expired') {
          store().commit('resetUserState')
          store().commit('resetRegistrationState')
          store().commit('changeLoginStatus', false)
          location.reload()
          // authTokenProcessor.tokenIsValid()
        } else if (error.response.data === 'TokenExpiredError') {
          return new Promise((resolve, reject) => {
            axios.get(url + 'auth/v1/refresh')
              .then((res: any) => {
                switch (res.data.response) {
                  case 'success':
                    store().commit('changeAccessToken', res.data.newAccess)
                    store().commit('changeRefreshToken', res.data.newRefresh)
                    axios.defaults.headers.common.Access = res.data.newAccess
                    axios.defaults.headers.common.Refresh = res.data.newRefresh
                    break
                  default:
                    break
                }
                resolve(res)
              })
              .catch((error: any) => {
                reject(error)
              })
          })
            .then((token: any) => {
              // New request with new token
              const config = error.config
              config.headers.Access = token.data.newAccess
              config.headers.Refresh = token.data.newRefresh
              return new Promise((resolve, reject) => {
                axios.request(config).then(finalResponse => {
                  resolve(finalResponse)
                }).catch((error) => {
                  reject(error)
                })
              })
            })
            .catch(error => {
              return Promise.reject(error)
            })
        } else if (error.response && error.response.data === 'JsonWebTokenError: jwt must be provided') {
          /* Reattach the tokens and resend the request */
          const config = error.config
          config.headers.Access = store().getters('accessToken')
          config.headers.Refresh = store().getters('refreshToken')
          return new Promise((resolve, reject) => {
            axios.request(config).then(finalResponse => {
              resolve(finalResponse)
            }).catch((error) => {
              reject(error)
            })
          })
        }
      }
      /* In case the error messages don't fall within the first two defined instances (expired access token and
      missing headers), the interceptor has no other option but to return the error to the calling function. In this
       case, it means that the interceptor won't play a role */
      return Promise.reject(error)
    })
  },
  /*
  * The api to handle post requests
  * It takes the specific url of the backend resource and the payload, if it exists
  * It resolves the response data or rejects with an error
  */
  async postRequest (path: any, payload: any) {
    this.setAxiosHeaders()
    return await axios
      .post(url + path, payload)
      .then(response => {
        return response.data
      })
      .catch(error => {
        return Promise.reject(error)
      })
  },
  /*
* The api to handle get requests
* It takes the specific url of the backend resource only
* It resolves the response data or rejects with an error
*/
  async getRequest (path: any) {
    this.setAxiosHeaders()
    return await axios
      .get(url + path)
      .then(response => {
        return response.data
      })
      .catch(error => {
        return Promise.reject(error)
      })
  },

  /* Function to set axios authentication headers */
  setAuthHeaders () {
    axios.defaults.headers.common.Access = store().getters.accessToken
    axios.defaults.headers.common.Refresh = store().getters.refreshToken
  }
}
