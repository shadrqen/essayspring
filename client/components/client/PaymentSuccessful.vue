<!--Component to show success message after a client has paid for an order.-->
<!--It is kind of a conglatulatory message so as to appreciate his/her believe in the services-->
<template>
  <v-app>
    <v-row no-gutters>
      <v-col
          v-bind="attrs"
          style="display: flex; justify-content: center;"
      >
        <v-card elevation="4" class="ma-2 mt-6" :min-width="minWidth" max-height="630">
          <v-card-text class="mt-16 text-center">
            <img alt="success-icon" height="60" width="60" :src="require('@/assets/done.png')" />
            <div class="mt-4" id="payment-successful-div">
              <template v-if="clientPostOrderForm.type === 'public'">
                Payment successful
              </template>
              <template v-else>
                Order Placement Successful
              </template>
            </div>
            <div class="mt-2 mb-10" id="thank-you">Thank you for being awesome!</div>
            <div class="mt-13 mb-13">
              <v-chip id="open-my-orders-chip" @click="redirectToOrders">
                <b id="open-my-orders-b">Open my orders</b> <v-icon>keyboard_arrow_right</v-icon>
              </v-chip>
            </div>
            <v-divider></v-divider>
            <div class="mt-13">
              Payment is made through
            </div>
            <img alt="success-icon" height="60" width="60" :src="require('@/assets/mpesa.png')" />
            <div>Support: <b>support@essayspring.com</b></div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-app>
</template>

<script>

import { mapGetters, mapMutations } from 'vuex'
import DefaultFormMixin from '../../mixins/defaultRegistrationForm'

export default {
  name: 'PaymentSuccessful',
  mixins: [DefaultFormMixin],
  data () {
    return {
      attrs: {
        cols: 12,
        xl: 6,
        'offset-xl': 3,
        lg: 6,
        'offset-lg': 3,
        md: 6,
        'offset-md': 3,
        sm: 8,
        'offset-sm': 2
      },
      subtitleClass: 'text-subtitle-1 text-xl-subtitle-1 text-lg-subtitle-1 text-md-subtitle-1 ' +
          'text-sm-subtitle-1 white--text',
      minWidth: null
    }
  },
  computed: {
    ...mapGetters(['getViewPortCode', 'clientPostOrderForm'])
  },
  watch: {
    /* Watcher function to determine the minimum width of the card above. This is to adjust it according to the size
    * of the screen.
    * TODO: To make this a computed property */
    getViewPortCode () {
      this.setNewViewPortCode()
    }
  },
  methods: {
    ...mapMutations(['changeOrderPostingDone', 'changeWholeClientPostOrderForm', 'changeClientPostOrderForm']),
    setNewViewPortCode () {
      switch (this.getViewPortCode) {
        case 'xs':
          this.minWidth = '80vw'
          break
        case 'sm':
          this.minWidth = '55vw'
          break
        case 'md':
          this.minWidth = '40vw'
          break
        case 'lg':
        case 'xl':
          this.minWidth = '28vw'
          break
        default:
          this.minWidth = '25vw'
          break
      }
    },
    async redirectToOrders () {
      this.changeOrderPostingDone(true)
      const email = this.clientPostOrderForm.email
      /* Resetting the registration state */
      this.changeWholeClientPostOrderForm(this.defaultForm)
      /* Before setting the client email. This is important because we need it when the client wants to post another order */
      this.changeClientPostOrderForm({
        key: 'email',
        subKey: null,
        val: email,
        option: null
      })
      await this.$router.push('/client/orders')
      /* We reload the page because there have been times when the state that is reset above fails to reset
      * successfully. When a user wants to post another order, he/she is redirected to the same order.
      * TODO: To find a better solution to this */
      setTimeout(() => {
        location.reload()
      }, 3000)
    }
  },
  mounted () {
    window.scrollTo(0, 0)
    this.setNewViewPortCode()
  }
}
</script>

<style scoped>

#payment-successful-div {
  font-size: 20px;
  color: black;
  /*color: #1aab83*/
}

#thank-you {
  font-size: 15px;
}

#open-my-orders-chip {
  cursor: pointer;
  height: 45px;
  background-color: #f0f3f5;
}

#open-my-orders-b {
  color: #708697;
  font-size: 14px;
}

</style>
