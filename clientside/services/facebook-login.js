import api from '../api/api.ts'

class FacebookLogin {
  static async fbInitSdk () {
    window.fbAsyncInit = await function () {
      // eslint-disable-next-line no-undef
      FB.init({
        appId: '129179622525442',
        cookie: true,
        xfbml: true,
        version: 'v10.0'
      })

      // eslint-disable-next-line no-undef
      FB.AppEvents.logPageView()
    };

    (function (d, s, id) {
      var js; var fjs = d.getElementsByTagName(s)[0]
      if (d.getElementById(id)) { return }
      js = d.createElement(s); js.id = id
      js.src = 'https://connect.facebook.net/en_US/sdk.js'
      fjs.parentNode.insertBefore(js, fjs)
    }(document, 'script', 'facebook-jssdk'))
  }

  static async logInWithFacebook () {
    await FacebookLogin.fbInitSdk()
    return new Promise((resolve, reject) => {
      // eslint-disable-next-line no-undef
      FB.login(async function (response) {
        if (response.authResponse) {
          await api.postRequest('auth/v1/auth/facebook', { accessToken: response.authResponse.accessToken })
            .then(fbAuthResponse => {
              resolve(fbAuthResponse)
            })
            .catch(fbAuthError => {
              reject(fbAuthError)
            })
        } else {
          reject(new Error('User cancelled login or did not fully authorize'))
        }
      }, { scope: 'email' })
    })
  }

  static async checkLoginStatus () {
    return new Promise((resolve, reject) => {
      // eslint-disable-next-line no-undef
      FB.getLoginStatus(async function (response) {
        if (response.status === 'connected') {
          await FacebookLogin.logoutFacebook()
            .then(() => {})
            .catch(logoutError => {
              reject(logoutError)
            })
        }
        return await FacebookLogin.logInWithFacebook()
          .then(loginResponse => {
            resolve(loginResponse)
          })
          .catch(loginError => {
            reject(loginError)
          })
      })
    })
  }

  static async logoutFacebook () {
    return new Promise((resolve, reject) => {
      // eslint-disable-next-line no-undef
      FB.getLoginStatus(async function (response) {
        if (response.status === 'connected') {
          // eslint-disable-next-line no-undef
          FB.logout(function (innerResponse) {
            resolve(innerResponse)
          })
        }
        resolve(response)
      })
    })
  }
}

export default FacebookLogin
