import api from '../api/api'
export default {
  methods: {
    async loginCurrentUser (res, loginMode) {
      const email = res.email
      this.changeClient({ key: 'regUpdateSuccessful', val: true })
      this.changeClient({ key: 'isNew', val: res.isNew })
      this.changeAccessToken(res.accessToken)
      this.changeRefreshToken(res.refreshToken)
      console.log('\n\n\n before \n\n\n')
      this.changeLoginStatus(true)
      console.log('\n\n\n after \n\n\n')
      this.changeLoginDialog(false)
      this.changeEmail(email)
      /* TODO: To return this functionality later */
      // this.changeLoginMode(loginMode)
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
        await this.$router.push('/client/orders')
        this.overlay = false
      } else {
        await this.$router.push({
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
