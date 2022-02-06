/**
 * TODO: To ensure the following best practices for clean code are adhered to throughout the repo
 * - JSDocs
 * - remove commented out code
 * - 2 or fewer function arguments (otherwise use object)
 * - FIXME: (currently here) functions should do one thing
 * - function names should say what they do
 * - const to use CAPITAL_LETTERS
 * - functions should be one level of abstraction
 * - don't use flags as function parameters e.g. function (name, temp) { if (temp) {doSomething} else {doSomethingElse} } just split the two ifs to two functions
 * - favor functional programming over imperative
 * - encapsulate conditionals
 * - avoid negative conditionals especially as function names
 * - avoid conditionals where you can */

import axios from 'axios'

import store from '../store'

/**
 * The backend api absolute url
 * @type {string}
 */
const BACKEND_URL = process.env.NODE_ENV === 'production' ? 'https://api.essayspring.com/' : `http://${process.env.URL}:3100/`

/**
 * An axios response interceptor to intercept responses and request for a refresh token in case of an expiry
 * of an access token (in case the refresh token is yet to expire)
 * @returns { Object|void } either a response (from the backend) or an error. Can also return void in other
 * circumstances
 */
axios.interceptors.response.use((response: any) => {
  /* Any status code that lie within the range of 2xx cause this function to trigger
  * Return the response data */
  return response
}, error => {
  /* In case of an error, check the response and request for an access token refresh in case it has expired and is
  * still within the expiry of the refresh token */
  if (error.response && error.response.data) {
    switch (error.response.data) {
      case 'TokenExpiredError: jwt expired':
        clearUserSession()
        break
      case 'TokenExpiredError':
        return refreshToken(error.config)
      case 'JsonWebTokenError: jwt must be provided':
        return resendRequestAfterRefresh(error.config, null)
    }
  }
  /* In case the error messages don't fall within the first two defined instances (expired access token and
  missing headers), the interceptor has no other option but to return the error to the calling function. In this
   case, it means that the interceptor won't play a role */
  return Promise.reject(error)
})

/**
 * Resets the global state of the application to the initial state and reloads the current page
 * @return {void}
 */
function clearUserSession () {
  store().commit('resetUserState')
  store().commit('resetRegistrationState')
  store().commit('changeLoginStatus', false)
  location.reload()
}

/**
 * Refreshes tokens and returns a new request after appending the new tokens
 * @param {Object} errorConfig - An error object after a failed request
 * @return {Object} - A response (success, error) object from the api after resending a request
 */
function refreshToken (errorConfig: any) {
  return new Promise((resolve, reject) => {
    axios.get(BACKEND_URL + 'auth/v1/refresh')
      .then((res: any) => {
        if (res.data.response === 'success') {
          updateAuthorizationTokens(res.data)
        }
        resolve(res)
      })
      .catch((error: any) => {
        reject(error)
      })
  })
    .then((token: any) => {
      return resendRequestAfterRefresh(errorConfig, token)
    })
    .catch(error => {
      return Promise.reject(error)
    })
}

/**
 * Resends a request once a token has been refreshed and returns response from server
 * @param {Object} errorConfig - Error object from the http request
 * @param {Object} token - Authentication and refresh tokens
 * @returns {Object} - A response (success, error) object from the api backend
 */
function resendRequestAfterRefresh (errorConfig: any, token: any) {
  const CONFIG = errorConfig
  /* There are times when a resend request does not have authorization tokens attached to the config
  * During such incidents, the tokens will have already been set on the Vuex store.
  * Therefore, there won't be a token (from the server). We would just need to re-attach the tokens
  * from the Vuex store */
  if (token) {
    CONFIG.headers.Access = token.data.newAccess
    CONFIG.headers.Refresh = token.data.newRefresh
  } else {
    CONFIG.headers.Access = store().getters('accessToken')
    CONFIG.headers.Refresh = store().getters('refreshToken')
  }
  return new Promise((resolve, reject) => {
    axios.request(CONFIG).then(finalResponse => {
      resolve(finalResponse)
    }).catch((error) => {
      reject(error)
    })
  })
}

/**
 * Updates the access and refresh tokens through the store (Vuex), and also sets the new tokens on the
 * axios headers
 * @param {Object} tokens - The new access and refresh tokens
 * @return {void}
 */
function updateAuthorizationTokens (tokens: any) {
  store().commit('changeAccessToken', tokens.newAccess)
  store().commit('changeRefreshToken', tokens.newRefresh)
  axios.defaults.headers.common.Access = tokens.newAccess
  axios.defaults.headers.common.Refresh = tokens.newRefresh
}

export default {
  setAxiosHeaders () {
    axios.defaults.headers.common.Access = store().getters.accessToken
    axios.defaults.headers.common.Refresh = store().getters.refreshToken
  },
  /**
   *
   * @param urlPath - the specific url of the backend resource
   * @param payload - Request body
   * @returns {Object} - The request response (success, error)
   */
  async postRequest (urlPath: string, payload: any) {
    this.setAxiosHeaders()
    return await axios
      .post(BACKEND_URL + urlPath, payload)
      .then(response => {
        return response.data
      })
      .catch(error => {
        return Promise.reject(error)
      })
  },
  /**
   * The function to handle get requests
   * @param {string} urlPath - the specific url of the backend resource
   * @returns {Object} - The request response (success, error)
   */
  async getRequest (urlPath: string) {
    this.setAxiosHeaders()
    return await axios
      .get(BACKEND_URL + urlPath)
      .then(response => {
        return response.data
      })
      .catch(error => {
        return Promise.reject(error)
      })
  },
  setAuthHeaders () {
    axios.defaults.headers.common.Access = store().getters.accessToken
    axios.defaults.headers.common.Refresh = store().getters.refreshToken
  }
}
