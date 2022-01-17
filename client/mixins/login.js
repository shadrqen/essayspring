import api from '../api/api'
export default {
  methods: {
    loginCurrentUser(res) {
      const email = res.email
      this.changeClient({ key: 'regUpdateSuccessful', val: true })
      this.changeClient({ key: 'isNew', val: res.isNew })
      this.changeAccessToken(res.accessToken)
      this.changeRefreshToken(res.refreshToken)
      this.changeUserType('Client')
      this.changeLoginStatus(true)
      this.changeLoginDialog(false)
      this.changeEmail(email)
      this.changeLoginMode('Google')
      this.changeClientPostOrderForm({
        key: 'email',
        subKey: null,
        val: email,
        option: null
      })
      api.setAuthHeaders()
      this.changeLoginDialogContents({
        key: 'dialogContent',
        subKey: 'clientLogin',
        val: false,
        option: null
      })
      if (res.orderPostingStep && res.orderPostingStep === 'Finished') {
        this.changeOrderPostingDone(true)
        this.$router.push('/client/orders')
        this.overlay = false
      } else {
        this.$router.push({
          path: '/client/place-order',
          params: {
            response: JSON.stringify(res)
          }
        })
      }
      this.overlay = false
    }
  }
}
