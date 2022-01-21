<!--Component to help user confirm an order's details before proceeding to checkout-->
<template>
  <v-card
    class="elevation-0"
    flat
  >
    <!--    Form that loads only when this component has been called or reached on the stepper-->
    <!--    This helps to ensure that local variables have been initialized prior to rendering some elements on -->
    <!--    the DOM-->
    <v-form
      v-if="pageReached"
      ref="clientPostOrderForm"
    >
      <!--      The left and right margins are dynamically assigned depending on the xl status of the screen-->
      <v-row
        :style="xl ? 'margin-left: 12vw; margin-right: 11vw;' : ''"
        no-gutters
      >
        <v-col
          class="main-col"
          cols="12"
          lg="4"
          md="6"
          sm="6"
          xl="4"
        >
          <v-card
            class="main-card"
            flat
            style=" height: 410px"
          >
            <v-card-title class="grey lighten-4">
              <span class="card-title">Paper Summary</span>
            </v-card-title>
            <v-card-text id="paper-summary-card-text">
              <label>Topic</label>
              <p
                :class="paperSummaryTextClass"
                v-text="clientPostOrderForm.topic"
              />
              <label>Number of pages</label>
              <p
                :class="paperSummaryTextClass"
                v-text="clientPostOrderForm.pageCount"
              />
              <label>Deadline</label>
              <p
                :class="paperSummaryTextClass"
              >
                <template v-if="deadline">
                  <assignment-deadline
                    :deadline="deadline"
                    color="black"
                  />
                </template>
              </p>
              <label>Subject</label>
              <p
                :class="paperSummaryTextClass"
                v-text="clientPostOrderForm.paperSubject ? disciplines.filter(discipline => discipline.id === clientPostOrderForm.paperSubject)[0].discipline : null"
              />
              <label>Selected Writer</label>
              <p
                :class="paperSummaryTextClass"
              >
                {{ clientPostOrderForm.selectedWriter.name || 'No writer selected' }}
              </p>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col
          class="main-col"
          cols="12"
          lg="4"
          md="6"
          sm="6"
          xl="4"
        >
          <v-card
            class="main-card"
            flat
            style=" height: 410px"
          >
            <v-card-title class="grey lighten-4">
              <span class="card-title">Some Extras</span>
            </v-card-title>
            <v-card-text>
              <v-list
                three-line
              >
                <v-list-item-group
                  v-model="settings"
                  active-class=""
                  multiple
                >
                  <!--                  Looping through the extra services-->
                  <v-list-item
                    v-for="(extra, key) in extraOrderServices"
                    :key="key"
                    class="extras-list-item"
                    @click="updateExtras(extra.id, extra.type, extra.price, extra.Currency.currencyCode)"
                  >
                    <template>
                      <v-list-item-action>
                        <v-checkbox
                          :input-value="clientPostOrderForm.paymentSummary.extrasList.some(outerExtra => outerExtra.type === extra.type)"
                          color="#007991"
                        />
                      </v-list-item-action>

                      <v-list-item-content class="extras-list-item-content">
                        <v-list-item-title>
                          <span class="extras-list-item-content-item-title">
                            {{ extra.type }}
                          </span>
                          <b class="extras-list-item-content-title-amount"> {{ extra.Currency.currencyCode }}
                            {{ extra.price }} </b>
                        </v-list-item-title>
                        <v-list-item-subtitle> {{ extra.description }}</v-list-item-subtitle>
                      </v-list-item-content>
                    </template>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col
          cols="12"
          lg="4"
          md="6"
          sm="6"
          xl="4"
        >
          <v-card
            :style="{ 'height': mainClassHeight }"
            class="main-card"
            flat
          >
            <v-card-title class="grey lighten-4">
              <span class="card-title">Payment Summary</span>
            </v-card-title>
            <v-card-text>
              <v-list
                flat
              >
                <v-list-item-group>
                  <v-list-item class="payment-summary-list-item">
                    <v-list-item-action id="payment-summary-list-action-title">
                      <v-list-item-title>
                        <span>Paper Price</span><br>
                      </v-list-item-title>
                    </v-list-item-action>
                    <v-list-item-content>
                      <span class="text-end text-xl-end text-lg-end text-md-end text-sm-end">
                        {{ clientPostOrderForm.paymentSummary.currencyCode }}
                        {{ clientPostOrderForm.paymentSummary.paperPrice }}
                      </span>
                      <br>
                      <span
                        id="payment-summary-list-content-multiplication"
                        class="text-end text-xl-end text-lg-end text-md-end text-sm-end"
                      >
                        {{ clientPostOrderForm.paymentSummary.currencyCode }}
                        {{ pricePerPage }} * {{ clientPostOrderForm.pageCount }}
                      </span>
                    </v-list-item-content>
                  </v-list-item>
                  <v-divider v-if="clientPostOrderForm.paymentSummary.extrasList.length > 0" />
                  <v-list-item
                    v-if="clientPostOrderForm.paymentSummary.extrasList.length > 0"
                    id="extras-summary-list-item"
                  >
                    <v-list-item-content id="extras-summary-list-action-title">
                      <v-list-item-title style="display: block; width: 100%">
                        <div
                          class="text-left text-xl-end text-lg-end text-md-start text-sm-start"
                          style="float: left;"
                        >
                          Extras
                        </div>
                        <div
                          class="text-end text-xl-end text-lg-end text-md-end text-sm-end"
                          style="float: right"
                        >
                          {{ clientPostOrderForm.paymentSummary.currencyCode }} {{ clientPostOrderForm.paymentSummary.extrasTotalPrice }}
                        </div>
                      </v-list-item-title>
                      <div
                        v-for="(extra, key) in clientPostOrderForm.paymentSummary.extrasList"
                        :key="key"
                        style="display: block"
                      >
                        <div style="float: left; margin-top: 5px; margin-bottom: 5px; font-size: 14px; color: grey">
                          {{ extra.type }}
                        </div>
                        <div style="float: right; margin-top: 5px; margin-bottom: 5px; font-size: 14px; color: grey">
                          {{ extra.currencyCode }} {{ extra.price }}
                        </div>
                      </div>
                    </v-list-item-content>
                  </v-list-item>
                  <v-divider v-if="clientPostOrderForm.paymentSummary.extrasList.length > 0" />
                  <v-list-item class="payment-summary-list-item">
                    <v-list-item-action>
                      <v-list-item-title>
                        <b>Total Price</b>
                      </v-list-item-title>
                    </v-list-item-action>
                    <v-list-item-content>
                      <span class="text-end text-xl-end text-lg-end text-md-end text-sm-end">
                        <b>
                          {{ clientPostOrderForm.paymentSummary.currencyCode }}
                          {{ clientPostOrderForm.paymentSummary.totalPrice }}
                        </b>
                      </span>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item class="payment-summary-list-item">
                    <v-list-item-content>
                      <span
                        id="payment-summary-list-item-funds-will-remain"
                        class="grey--text text--darken-1 text-caption text-xl-caption text-lg-caption text-md-caption text-sm-caption"
                      >
                        The funds will remain in your account until you release them
                      </span>
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
              <alert-message
                :error="errorObject"
                :success="successObject"
              />
              <v-btn
                class="payment-btn"
                outlined
                @click="proceedToNextLevel()"
              >
                <v-icon
                  color="white"
                >
                  shopping_cart
                </v-icon>
                <span
                  class="text-subtitle-1 text-xl-subtitle-1 text-lg-subtitle-1
                    text-md-subtitle-1 text-sm-subtitle-1"
                >Proceed to Checkout</span>
              </v-btn>
              <p
                id="proceed-to-checkout-caption"
                class="text-caption text-xl-caption text-lg-caption text-md-caption text-sm-caption"
              >
                By clicking "Proceed to Checkout", you agree to our terms of service.
              </p>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-form>
    <slot name="back-btn" />
    <v-overlay
      :value="overlay"
      opacity="0.9"
    >
      <div class="lds-ellipsis">
        <div />
        <div />
        <div />
        <div />
      </div>
    </v-overlay>
  </v-card>
</template>

<script>

import { mapGetters, mapMutations } from 'vuex'
import api from '@/api/api.ts'
import { bus } from '@/plugins/bus'
import TimeMixin from '@/mixins/time'
import AssignmentDeadline from '@/components/client/AssignmentDeadline'
import AlertMessage from '@/components/general/AlertMessage'

export default {
  name: 'CheckOrder',
  components: {
    AssignmentDeadline,
    AlertMessage
  },
  data () {
    return {
      paperSummaryTextClass: 'black--text text-subtitle-1 text-xl-subtitle-1 text-lg-subtitle-1 text-md-subtitle-1 text-sm-subtitle-1 mt-n1',
      extras_checkbox_font_size: {
        xs: '12px',
        sm: '16px',
        md: '18px',
        lg: '20px',
        xl: '20px'
      },
      settings: [],
      mainClassHeight: '410px',
      pageReached: false,
      overlay: false,
      errorObject: {
        value: false,
        message: null
      },
      successObject: {
        value: false,
        message: null
      }
    }
  },
  computed: {
    ...mapGetters({
      extraOrderServices: 'extraOrderServices',
      clientPostOrderForm: 'clientPostOrderForm',
      disciplines: 'disciplines',
      timeAmPm: 'timeAmPm'
    }),
    pricePerPage () {
      const pricePP = this.clientPostOrderForm.paymentSummary.totalPrice / this.clientPostOrderForm.pageCount
      return Math.round(pricePP * 100) / 100
    },
    deadline () {
      return TimeMixin.deadline(this.clientPostOrderForm.deadlineDate, this.clientPostOrderForm.deadlineTime)
    },
    xl () {
      let val
      switch (this.$vuetify.breakpoint.name) {
        case 'xl':
          val = true
          break
        default:
          val = false
      }
      return val
    }
  },
  methods: {
    ...mapMutations(['changeClientPostOrderForm', 'resetRegistrationState', 'resetUserState']),
    async proceedToNextLevel () {
      this.overlay = true
      await this.savePaymentDetails()
        .then(res => {
          switch (res.response) {
            case 'success':
              this.changeClientPostOrderForm({
                key: 'orderSavingProgress',
                subKey: 'payment',
                val: true,
                option: null
              })
              this.$emit('progress-to-next-level', 4)
              break
            default:
              this.errorObject.message = 'Failed to save. Kindly try again'
              this.errorObject.value = true
              setTimeout(() => {
                this.errorObject.value = false
                this.errorObject.message = null
              }, 2000)
              break
          }
          this.overlay = false
        })
        .catch(() => {
          this.overlay = false
          this.errorObject.message = 'Failed to save. Kindly try again'
          this.errorObject.value = true
          setTimeout(() => {
            this.errorObject.value = false
            this.errorObject.message = null
          }, 2000)
        })
    },
    async savePaymentDetails () {
      return await api.postRequest('orders/v1/save_order_payment_details', this.clientPostOrderForm)
        .then(res => {
          return res
        })
        .catch(error => {
          return Promise.reject(error)
        })
    },
    updateExtras (id, type, price, currencyCode) {
      price = Number(price)
      /* If the chosen extra already exists in the extras list, remove it */
      if (this.clientPostOrderForm.paymentSummary.extrasList.some(extra => extra.id === id)) {
        const index = this.clientPostOrderForm.paymentSummary.extrasList.map(function (e) { return e.id }).indexOf(id)
        if (index > -1) {
          this.clientPostOrderForm.paymentSummary.extrasList.splice(index, 1)
          /* The chosen extras list determines the length of the third column in the payment summary
          * As the list grows, there is need to update the column height so as to accommodate the growing items and
          * vice versa */
          this.updatePaymentSummaryHeight()
          this.clientPostOrderForm.paymentSummary.extrasTotalPrice -= price
          this.clientPostOrderForm.paymentSummary.totalPrice -= price
        }
      } else {
        /* Else add the target extra service to the extrasList */
        this.clientPostOrderForm.paymentSummary.extrasList.push({ id: id, type: type, price: price, currencyCode: currencyCode })
        this.updatePaymentSummaryHeight()
        this.clientPostOrderForm.paymentSummary.extrasTotalPrice += price
        this.clientPostOrderForm.paymentSummary.totalPrice = this.clientPostOrderForm.paymentSummary.extrasTotalPrice + this.clientPostOrderForm.paymentSummary.paperPrice
      }
      /* Update the payment summaries */
      this.changeClientPostOrderForm({
        key: 'paymentSummary',
        subKey: 'extrasList',
        val: this.clientPostOrderForm.paymentSummary.extrasList,
        option: null
      })
      this.changeClientPostOrderForm({
        key: 'paymentSummary',
        subKey: 'extrasTotalPrice',
        val: this.clientPostOrderForm.paymentSummary.extrasTotalPrice,
        option: null
      })
      this.changeClientPostOrderForm({
        key: 'paymentSummary',
        subKey: 'totalPrice',
        val: this.clientPostOrderForm.paymentSummary.totalPrice,
        option: null
      })
    },
    /* Function to update the total price once this component is loaded.
    * This is important because the paper price is selected in another component.
    * We therefore need to confirm that the total price is up-to date because there are situations where the
    * user comes to this level or component and decides to go to the first stage and edit the paper price.
    * When he comes back, the total price might have changed.
    * NOTE: The paper price and total price were separated because of such issues.
    * FIXME: To clarify or sort this functionality to sync both components at the same time */
    updateTotalPrice () {
      let extrasPrice = 0
      if (this.clientPostOrderForm.paymentSummary.extrasList.length > 0) {
        this.clientPostOrderForm.paymentSummary.extrasList.forEach(extra => {
          extrasPrice += Number(extra.price)
        })
      }
      const totalPrice = this.clientPostOrderForm.paymentSummary.paperPrice + extrasPrice
      this.changeClientPostOrderForm({
        key: 'paymentSummary',
        subKey: 'totalPrice',
        val: totalPrice,
        option: null
      })
    },
    updatePaymentSummaryHeight () {
      switch (this.clientPostOrderForm.paymentSummary.extrasList.length) {
        case 0:
          this.mainClassHeight = '410px'
          break
        case 1:
          this.mainClassHeight = '480px'
          break
        case 2:
          this.mainClassHeight = '520px'
          break
        case 3:
          this.mainClassHeight = '560px'
          break
        default:
          this.mainClassHeight = '410px'
          break
      }
    },
    loadStates () {
      /* FIXME
      * the updateTotalPrice() function updates extras even if the extras are already
      * included in the total price - this is after login, i.e. an order that a client
      * is picking up from last time */
      this.updateTotalPrice()
      this.updatePaymentSummaryHeight()
      this.pageReached = true
    }
  },
  /* Here we are using the created hook because we want access to the component instance and we have
  * no concern at the moment for manipulating the DOM */
  created () {
    /* FIXME: To remove such listeners */
    bus.$on('updatePricesOnCheckOrder', () => {
      this.loadStates()
    })
    this.loadStates()
  }
}
</script>

<style lang="scss" scoped>

@import "../../styles/general/general";

@import "../../styles/general/variables";

@import "../../styles/mixins/general";

.check-box{
  ::v-deep label{
    font-size: 16px !important;
    color: #414040;
    margin-left: -5px;
  }
}

.main-card{
  border: 1px solid $primaryDarkGreenBlueColor;
}

.extras-price{
  font-size: 13px;
  color: black;
  float: right;
  margin-top: 22px
}

.main-col{
  padding-right: 10px;
  padding-bottom: 10px
}

.extras-list-item{
  margin-left: -18px;
  padding-bottom: 20px;
  .extras-list-item-content{
    margin-left: -25px;
    .extras-list-item-content-item-title{
      float: left;
      font-size: 16px
    }
    .extras-list-item-content-title-amount{
      float: right;
      font-size: 13px
    }
  }
}

.payment-summary-list-item{
  margin-left: -18px;
  cursor: default;
}

#extras-summary-list-item {
  @extend .payment-summary-list-item;
  margin-top: 20px;
  margin-bottom: 20px;
}

#payment-summary-list-content-multiplication{
  color: grey;
  font-size: 13px;
  margin-top: 10px
}

.card-title{
  font-size: 20px;
  color: $primaryDarkGreenBlueColor;
}

#paper-summary-card-text{
  padding-top: 10px
}

#payment-summary-list-action-title{
  margin-top: -18px
}

#extras-summary-list-action-title{
  margin-top: -18px
}

#proceed-to-checkout-caption{
  padding-top: 15px
}

#payment-summary-list-item-funds-will-remain{
  padding-top: 10px;
  padding-bottom: 10px
}

.payment-btn{
  @include darkGreenBlueBtnConfig(100%, white, $paymentButtonColor);
  height: 40px !important;
  .v-icon{
    padding-right: 20px;
  }
}

.sc-chat-window .opened {
  max-height: 500px !important;
  bottom: 20px !important;
}

</style>
