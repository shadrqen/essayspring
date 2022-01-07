<!--Component to allow a client to add funds to his/her wallet-->
<template>
  <v-card>
    <v-row no-gutters>
      <v-col
          cols="12" xl="6" offset-xl="3" lg="6" offset-lg="3" md="6" offset-md="3" sm="8" offset-sm="2"
          v-if="orderForm.addFunds.notYetPaid"
      >
        <v-form ref="orderPaymentForm">
          <h5 class="text-h6 text-lg-h5 text-md-h5 text-sm-h5" id="header">Pay via MPESA</h5>
          <span class="grey--text text--darken-2">You will receive an STK push on your phone. Kindly enter your pin to complete the transaction</span>
          <br>
          <br>
          <label class="text_field_label">Mobile number</label>
          <v-text-field
            flat
            class="text-field"
            label="Mobile number"
            :rules="validation.mobileNumberField"
            solo
            v-model="paymentForm.mobile"></v-text-field>
          <br>
          <span v-if="mobileRequired" style="color: red; font-size: 14px">
            Mobile number is required
          </span>
          <span v-if="mobileFormatRequired" style="color: red; font-size: 14px">
            Format is e.g. 254700111222
          </span>
          <v-row no-gutters>
            <v-col cols="6" xl="6" lg="6" md="6" sm="6">
              <slot name="back-btn"></slot>
            </v-col>
            <v-col cols="6" xl="6" lg="6" md="6" sm="6" class="text-end">
              <v-btn
                  id="pay-now-btn"
                  outlined
                  @click="validateMobile"
              >
                <span
                    class="text-subtitle-1 text-xl-subtitle-1 text-lg-subtitle-1
                    text-md-subtitle-1 text-sm-subtitle-1"
                >
                  Pay now
                  <v-icon>mdi-send-check-outline</v-icon>
                </span>
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-col>
      <v-dialog
          v-model="confirmPaymentDialog"
          eager
          max-width="300"
      >
        <v-card>
          <v-toolbar color="#344754" flat short>
            <v-toolbar-title class="text-subtitle-1 text-xl-subtitle-1 text-lg-subtitle-1 text-md-subtitle-1
            text-sm-subtitle-1 white--text" v-text="'Confirm phone number'">
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn
                  icon
                  dark
                  @click="confirmPaymentDialog = !confirmPaymentDialog"
              >
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-toolbar-items>
          </v-toolbar>
          <v-card-text class="mt-2">
            <v-form ref="initiatePaymentForm" v-on:submit.prevent="">
              <v-row no-gutters>
                <v-col v-bind="attrs12" class="mt-4">
                  <v-text-field
                      flat
                      class="text-field"
                      label="Mobile number"
                      :rules="validation.mobileNoField"
                      solo
                      @keyup.enter="payNow"
                      v-model="paymentForm.mobile"></v-text-field>
                </v-col>
              </v-row>
            </v-form>
            <v-divider></v-divider>
            <v-row no-gutters>
              <v-col v-bind="attrs6" class="text-end">
                <v-btn
                    id="initiate_payment"
                    class="mt-6"
                    outlined
                    @click="payNow"
                >
                <span
                    class="text-subtitle-1 text-xl-subtitle-1 text-lg-subtitle-1
                    text-md-subtitle-1 text-sm-subtitle-1"
                >
                  Initiate payment
                </span>
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-row>
    <overlay-loader :overlay="overlay"></overlay-loader>
  </v-card>
</template>

<script>

import OverlayLoader from '../../components/general/OverlayLoader'
import api from '../../api/api.ts'
import { mapGetters, mapMutations } from 'vuex'
import Validation from '../../plugins/Validation.ts'
import Socket from '../../sockets'

export default {
  name: 'AddFunds',
  data () {
    return {
      paymentForm: {
        email: null,
        mobile: '',
        orderId: null,
        totalAmount: 0,
        currencyCode: null
      },
      validation: Validation,
      numOfOrderPaymentChecks: 0,
      overlay: {
        value: false,
        loading: false,
        success: {
          value: false,
          message: null
        },
        error: {
          value: false,
          message: null
        }
      },
      mobileRequired: false,
      mobileFormatRequired: false,
      confirmPaymentDialog: false,
      attrs6: {
        cols: 6,
        xl: 6,
        lg: 6,
        md: 6,
        sm: 6
      },
      attrs12: {
        cols: 12,
        xl: 12,
        lg: 12,
        md: 12,
        sm: 12
      },
      errorsOnDialog: false,
      client: false
    }
  },
  components: {
    OverlayLoader
  },
  computed: {
    ...mapGetters({
      orderForm: 'clientPostOrderForm',
      email: 'email'
    })
  },
  methods: {
    ...mapMutations(['resetClientPostOrderForm', 'changeClientPostOrderForm', 'changeWholeClientPostOrderForm',
      'changeOrderPostingDone']),
    async payNow () {
      if (this.$refs.initiatePaymentForm.validate()) {
        if (this.validateMobile()) {
          this.confirmPaymentDialog = false
          this.overlay.loading = true
          this.overlay.value = true
          await api.postRequest('payments/v1/mpesa/stk_push', this.paymentForm)
            .then(async res => {
              /* If status is true, meaning that the STK Push request was successful */
              if (res.status) {
                /* There is also a possibility that an order was already paid for
                * This happens when a user requests an STK Push and is sent
                * The user pays for the order but the socket connection fails to update the payment
                * The overlay loader continues, until maybe a user refreshes the page.
                * After doing this, the user will be prompted to pay because the socket didn't update the paid stratus
                * In case a user submits the phone number again, the STK Push request will return as successful
                * but with the message being 'OrderAlreadyPaid'.
                * In this case, the user will be shown an error that it has already been paid, before being
                * redirected to the orders page */
                if (res.message === 'OrderAlreadyPaid') {
                  this.overlay.error.message = 'Order is already paid for!'
                  this.overlay.loading = false
                  this.overlay.error.value = true
                  setTimeout(async () => {
                    await this.clientRedirectToOrders()
                  }, 2000)
                } else {
                  /* In case of a successful STK Push with a topic sent back as a response, create an MQTT socket
                  * connection to listen to the response from M-PESA */
                  if (res.topic) {
                    await Socket.createConnection()
                    /* Subscribe to the sent topic - which is unique to every STK Push request */
                    this.client = await Socket.doSubscribe(res.topic)
                    /* In case of an update from M-PESA, respond to each message */
                    this.client.on('message', (topic, message) => {
                      const parsedMessage = JSON.parse(message)
                      switch (parsedMessage.paymentStatus) {
                        case 'Success':
                        {
                          this.overlay.loading = false
                          this.overlay.success.message = true
                          this.overlay.success.value = true
                          setTimeout(async () => {
                            this.changeClientPostOrderForm({
                              key: 'addFunds',
                              subKey: 'paymentSuccessful',
                              val: true,
                              option: null
                            })
                            this.changeClientPostOrderForm({
                              key: 'addFunds',
                              subKey: 'notYetPaid',
                              val: false,
                              option: null
                            })
                            await this.resetOverlayState()
                          }, 1600)
                          break
                        }
                        case 'User cancelled':
                          this.showPaymentErrorStatusMessage('Payment cancelled! Try again')
                          break
                        case 'Processing payment':
                          this.showPaymentErrorStatusMessage('A similar transaction is already underway! Kindly wait')
                          break
                        case 'Success with balance':
                          this.showPaymentErrorStatusMessage('Payment successful, albeit with a balance!')
                          break
                        case 'Pending payment':
                          this.showPaymentErrorStatusMessage('Payment not received! Kindly try again')
                          break
                        case 'Failed':
                          this.showPaymentErrorStatusMessage('Payment failed! Kindly try again')
                          break
                        default:
                          this.showPaymentErrorStatusMessage('Payment failed! Kindly try again')
                          break
                      }
                    })
                  }
                }
              } else {
                this.overlay.error.message = res.message
                this.overlay.loading = false
                this.overlay.error.value = true
                setTimeout(async () => {
                  await this.resetOverlayState()
                }, 2000)
              }
            })
            .catch(() => {
              this.overlay.error.message = 'Failed! Try again'
              this.overlay.loading = false
              this.overlay.error.value = true
              setTimeout(async () => {
                await this.resetOverlayState()
              }, 2000)
            })
        } else {
          this.confirmPaymentDialog = false
          this.overlay.loading = false
          this.overlay.value = false
        }
      }
    },
    showPaymentErrorStatusMessage (message) {
      this.overlay.error.message = message
      this.overlay.loading = false
      this.overlay.error.value = true
      setTimeout(async () => {
        this.changeClientPostOrderForm({
          key: 'addFunds',
          subKey: 'paymentFailed',
          val: true,
          option: null
        })
        await this.resetOverlayState()
      }, 2000)
    },
    validateMobile () {
      if (this.$refs.orderPaymentForm.validate()) {
        if (!this.paymentForm.mobile) {
          this.mobileRequired = true
          setTimeout(() => {
            this.mobileRequired = false
          }, 3000)
          return false
        } else if (String(this.paymentForm.mobile).length !== 12 || this.paymentForm.mobile.slice(0, 3) !== '254') {
          /* The mobile number needs to start with 254 at the moment because we are only covering Kenya */
          this.mobileFormatRequired = true
          setTimeout(() => {
            this.mobileFormatRequired = false
          }, 3000)
          return false
        } else {
          this.paymentForm.email = this.email
          this.paymentForm.orderId = this.orderForm.orderId
          this.paymentForm.totalAmount = this.orderForm.paymentSummary.totalPrice
          this.paymentForm.currencyCode = this.orderForm.paymentSummary.currencyCode
          if (!this.confirmPaymentDialog) {
            this.confirmPaymentDialog = true
          }
          return true
        }
      } else {
        return false
      }
    },
    async clientRedirectToOrders () {
      /* The order posting state is used to indicate whether a user has finished posting an order
      (through successful payment ofcourse) or not */
      this.changeOrderPostingDone(true)
      const defaultForm = {
        level: 1,
        orderPostingStep: 1,
        email: '',
        paperSubject: '',
        topic: '',
        pageCount: 1,
        wordCount: 1,
        deadlineDate: '',
        deadlineTime: '',
        studyLevel: '',
        citationStyleId: '',
        serviceType: 'Writing',
        supportingFiles: [],
        instructions: '',
        orderId: 0,
        selectedWriter: {
          name: '',
          email: '',
          totalPrice: 0,
          cpp: 0,
          currencyCode: ''
        },
        paymentSummary: {
          totalPrice: 0,
          extrasList: [],
          extrasTotalPrice: 0
        },
        orderSavingProgress: {
          details: false,
          payment: false
        },
        addFunds: {
          paymentSuccessful: false,
          paymentFailed: false,
          notYetPaid: true
        }
      }
      /* Changing the whole order posting state to the above default
      * This is to allow the user to begin afresh next time he/she wants to post another order.
      * FIXME: To make the above object reusable */
      this.changeWholeClientPostOrderForm(defaultForm)
      /* We need to change/set the order posting email so as not to prompt the user to do this once again */
      this.changeClientPostOrderForm({
        key: 'email',
        subKey: null,
        val: this.email,
        option: null
      })
      this.resetOverlayState()
      await this.$router.push('/client/orders')
    },
    async getClientMobile () {
      return await api.getRequest('auth/v1/get_mobile')
        .then(res => {
          this.paymentForm.mobile = res || ''
        })
        /* TODO: To add an error-handling feature */
        /* Otherwise do nothing, for now */
        .catch(() => {})
    },
    resetOverlayState () {
      this.overlay = {
        value: false,
        loading: false,
        success: {
          value: false,
          message: null
        },
        error: {
          value: false,
          message: null
        }
      }
    }
  },
  created () {
    this.getClientMobile()
  }
}
</script>

<style scoped lang="scss">

@import "../../styles/mixins/general";

#header{
  margin-bottom: 10px !important;
}

#pay-now-btn{
  @include darkGreenBlueBtnConfig(auto, white, $paymentButtonColor);
  margin-top: 28px;
}
#initiate_payment{
  @include darkGreenBlueBtnConfig(200%, white, $paymentButtonColor);
  margin-top: 28px;
}
</style>
