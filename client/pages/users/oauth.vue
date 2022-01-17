<!--Page that handles OAuth functionality. Currently handling Google's OAuth redirects-->
<template>
  <v-app>
    <index></index>
    <v-overlay
      :value="overlay"
      opacity="0.9"
    >
      <div
          class="lds-ellipsis"
      >
        <div class="lds-ellipsis-div"></div>
        <div class="lds-ellipsis-div"></div>
        <div class="lds-ellipsis-div"></div>
        <div class="lds-ellipsis-div"></div>
      </div>
    </v-overlay>
  </v-app>
</template>

<script>

import api from '../../api/api'
import { mapMutations } from 'vuex'
import Index from '../index.vue'
import login from '../../mixins/login'

export default {
  name: 'OAuth',
  head: {
    title: 'OAuth',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: 'OAuth'
      }
    ]
  },
  mixins: [login],
  components: {
    Index
  },
  data () {
    return {
      overlay: false,
      successObject: {
        value: false,
        message: null
      },
      errorObject: {
        value: false,
        message: null
      }
    }
  },
  methods: {
    ...mapMutations(['changeClientPostOrderForm', 'changeLoginStatus', 'changeUserType', 'changeClient',
      'changeAccessToken', 'changeRefreshToken', 'changeEmail', 'changeLoginDialogContents', 'changeLoginDialog',
      'changeLoginMode', 'changeOrderPostingDone', 'changeUserType'
    ]),
    async processGoogleOAuth () {
      if (this.$route.query.code) {
        this.overlay = true
        const code = this.$route.query.code
        /* We are replacing the query code so as to prevent a person from copy-pasting.
        * We felt that this code could be used to access other unwanted platforms.
        * TODO: To confirm the validity of such allegations or thoughts */
        await this.$router.replace({ query: null })
        await api.postRequest('auth/v1/auth/google', { code: code })
          .then(res => {
            if (res.response === 'success' || res.message === 'success') {
              this.loginClient(res)
            } else {
              this.changeLoginDialogContents({
                key: 'dialogTitle',
                subKey: null,
                val: res.message
              })
              this.overlay = false
            }
          })
          .catch(err => {
            this.overlay = false
            console.log(err)
          })
      } else {
        if (this.$route.fullPath !== '/') {
          this.$router.push('/')
        }
      }
    },
    loginClient (res) {
      this.loginCurrentUser(res)
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
  },
  mounted () {
    this.processGoogleOAuth()
  }
}
</script>

<style scoped lang="scss">

@import '../../styles/general/general';

.lds-ellipsis-div {
  background-color: white;
}

</style>
