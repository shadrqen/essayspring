import store from '../store'

export default {
  accessTokenValid () {
    const accessToken = store().getters.accessToken
    if (!accessToken) {
      store().commit('resetUserState')
      store().commit('resetRegistrationState')
      return false
    } else if (!accessToken || accessToken.split('.').length < 3) {
      store().commit('changeLoginStatus', false)
      return false
    } else {
      const dataAccessToken = JSON.parse(atob(accessToken.split('.')[1]))
      const expAccessToken = new Date(dataAccessToken.exp * 1000)
      const nowAccessToken = new Date()
      if (nowAccessToken < expAccessToken) {
        store().commit('changeLoginStatus', true)
        return true
      }
      store().commit('resetUserState')
      store().commit('resetRegistrationState')
      return false
    }
  },
  tokenIsValid () {
    const refreshToken = store().getters.refreshToken
    const accessToken = store().getters.accessToken
    if (!accessToken || accessToken.split('.').length < 3) {
      store().commit('resetUserState')
      store().commit('resetRegistrationState')
      store().commit('changeLoginStatus', false)
      return false
    } else {
      const dataAccessToken = JSON.parse(atob(accessToken.split('.')[1]))
      const expAccessToken = new Date(dataAccessToken.exp * 1000) // JS deals with dates in milliseconds since epoch
      const nowAccessToken = new Date()
      if (nowAccessToken < expAccessToken) {
        return true
      }
      const dataRefreshToken = JSON.parse(atob(refreshToken.split('.')[1]))
      const expRefreshToken = new Date(dataRefreshToken.exp * 1000) // JS deals with dates in milliseconds since epoch
      const nowRefreshToken = new Date()
      if (nowRefreshToken < expRefreshToken) {
        return true
      } else {
        store().commit('resetUserState')
        store().commit('resetRegistrationState')
        store().commit('changeLoginStatus', false)
        return false
      }
    }
  }
}
