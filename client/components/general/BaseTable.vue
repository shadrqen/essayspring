<!--The primary table component-->
<!--Currently accommodating orders and writers-->
<template>
  <v-card :class="selectedOrder ? '' : 'my-3'" elevation="5">
      <v-card-title style="background-color: #f3f1f1" v-if="!selectedOrder">
        <v-app-bar-nav-icon color="#007991" v-if="mini" @click.stop="turnOnOffDrawer"></v-app-bar-nav-icon>
        <div>
          {{ tableData.title }}
        </div>
        <v-spacer></v-spacer>
        <v-btn
            id="invite-writer-btn"
            outlined
            @click="inviteWriterDialog = true"
            v-if="currentUrl === '/client/writers'"
        >
          <v-icon>mdi-account-plus-outline
          </v-icon>
          <span
              class="text-subtitle-1 text-xl-subtitle-1 text-lg-subtitle-1
              text-md-subtitle-1 text-sm-subtitle-1 ml-1"
          >Invite Writer</span>
        </v-btn>
        <v-btn
            id="new-order-btn"
            outlined
            @click="postNewOrder"
            :disabled="postNewOrderOngoing"
            v-else
        >
          <div v-if="postNewOrderOngoing" class="lds-ellipsis">
            <div style="background: #007991"></div>
            <div style="background: #007991"></div>
            <div style="background: #007991"></div>
            <div style="background: #007991"></div>
          </div>
          <span
            v-else>
            <v-icon>mdi-plus
            </v-icon>
            <span
              class="text-subtitle-1 text-xl-subtitle-1 text-lg-subtitle-1
                text-md-subtitle-1 text-sm-subtitle-1"
            >New Order</span>
          </span>
        </v-btn>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text class="mt-n4">
        <slot name="table-filters"></slot>
        <v-simple-table
            fixed-header
        >
          <template v-slot:default>
            <thead>
            <tr>
              <th
                  v-for="(header, headerKey) in tableData.headers"
                  :key="headerKey"
                  class="text-left"
              >
                <b> {{ header.text }} </b>
              </th>
            </tr>
            </thead>
            <tbody>
            <template v-if="tableData.items.length > 0">
<!--              TODO: To add a better dynamic functionality to switch between cases -->
              <template v-if="currentUrl === '/client/orders'">
<!--                Here, we loop through the table items-->
                <tr
                  v-for="(item, itemKey) in tableData.items"
                  :key="itemKey"
                  @click="openOrder(item.id)"
                  :style="selectedOrder ? '' : 'cursor: pointer'"
                >
<!--                  While here we loop through table headers-->
                  <td
                    v-for="(itemHeader, itemHeaderKey) in tableData.headers"
                    :key="itemHeaderKey"
                  >
<!--                    Important to note is that there are items that have subValues while others don't-->
<!--                    Example. Item.pageCount does not have a SubValue but Item.Currency.CurrencyCode has-->
<!--                    SubValue in this case is the third layer of an object-->
                    <template v-if="itemHeader.subValue">
<!--                 There are also scenarios where an item is an array denoted by the itemHeader being an isAnArray-->
<!--                      Here, we need to access the item in a manner as an array should-->
                      <div v-if="itemHeader.isAnArray" style="color: #007991;">
                          {{
                            item[itemHeader.value][0] ? item[itemHeader.value][0].Currency.currencyCode.concat(' ', String(Math.floor(item[itemHeader.value][0][itemHeader.subValue]))) : null
                          }}
                      </div>
                      <div v-else>
                        {{ item[itemHeader.value] ? item[itemHeader.value][itemHeader.subValue] : null }}
                      </div>
                    </template>
                    <template v-else>
<!--                      There are also scenarios where we need to call functions such as in processing deadline-->
                      <div v-if="itemHeader.text === 'DEADLINE'">
                        <deadline
                          :deadline="deadline_(item.deadlineDate, deadlineHours(item.TimeAmPm.time))"></deadline>
                      </div>
                      <div v-else>
                        {{ item[itemHeader.value] ? item[itemHeader.value] : null }}
                      </div>
                    </template>
                  </td>
                </tr>
              </template>
              <template v-else>
                <tr
                  v-for="(item, itemKey) in tableData.items"
                  :key="itemKey"
                  @click="openSelectedWriter(item.Writer.id)"
                  :style="selectedOrder ? '' : 'cursor: pointer'"
                >
                  <td
                    v-for="(itemHeader, itemHeaderKey) in tableData.headers"
                    :key="itemHeaderKey"
                  >
                    <template v-if="itemHeader.subValue">
                        {{ item[itemHeader.value] ? item[itemHeader.value][itemHeader.subValue] : null }}
                    </template>
                    <template v-else>
                      <template v-if="itemHeader.value === 'WriterOrder'">
                        {{ item.Writer }}
                      </template>
                      <template v-else-if="itemHeader.value === 'connectionConfirmed'">
                        <span v-if="item[itemHeader.value]">
                          <v-icon color="green">mdi-check-decagram</v-icon>
                        </span>
                        <span v-else>
                          <v-icon color="red">mdi-close-circle-outline</v-icon>
                        </span>
                      </template>
                      <template v-else>
                        {{ item[itemHeader.value] ? item[itemHeader.value] : null }}
                      </template>
                    </template>
                  </td>
                </tr>
              </template>
            </template>
            <template v-else>
              <div class="ma-3">
                No records found
              </div>
            </template>
            </tbody>
          </template>
        </v-simple-table>
      </v-card-text>
    <v-dialog
      v-model="inviteWriterDialog"
      max-width="400"
      persistent
      eager
      :fullscreen="getViewPortCode === 'xs'"
    >
      <v-card>
        <v-toolbar color="#344754" flat short>
          <v-toolbar-title class="text-subtitle-1 text-xl-subtitle-1 text-lg-subtitle-1 text-md-subtitle-1
            text-sm-subtitle-1 white--text" v-text="'Enter email address'">
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn
              icon
              dark
              @click="inviteWriterDialog = !inviteWriterDialog"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card-text style="padding-bottom: 20px">
          <v-form ref="inviteWriterForm" v-on:submit.prevent="">
            <br>
            <v-text-field
              type="email"
              flat
              solo
              class="text-field"
              label="Enter email address"
              :rules="validate.emailField"
              id="loginEmail"
              v-model="inviteWriterForm.email"
              @keyup.enter="inviteWriter"
            ></v-text-field>
            <br>
            <alert-message v-if="successObject.value || errorObject.value" class="mt-4" :success="successObject"
                           :error="errorObject"></alert-message>
            <v-btn
              outlined
              id="submit_email_btn"
              @click="inviteWriter"
              :disabled="inviteWriterOngoing"
              ref="continueEmail"
            >
              <div v-if="inviteWriterOngoing" class="lds-ellipsis">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
              <span v-else
                    class="text-body-2 text-xl-body-2 text-lg-body-2 text-md-body-1 text-sm-body-2"> Send Invitation </span>
            </v-btn>
            <div>
              <p class="text-caption text-xl-caption text-lg-caption text-md-caption text-sm-caption pt-3">
                By clicking "Continue", you confirm that you're linking your account to the said writer
              </p>
            </div>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="inviteWriterPromptDialog"
      max-width="400"
      persistent
      eager
      :fullscreen="getViewPortCode === 'xs'"
    >
      <v-card>
        <v-toolbar color="#344754" flat short>
          <v-toolbar-title class="text-subtitle-1 text-xl-subtitle-1 text-lg-subtitle-1 text-md-subtitle-1
            text-sm-subtitle-1 white--text" v-text="'Writer Action'">
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn
              icon
              dark
              @click="inviteWriterPromptDialog = !inviteWriterPromptDialog"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card-text style="padding-bottom: 20px">
          <v-form ref="promptInviteWriterForm" v-on:submit.prevent="">
            <br>
            <p v-text="inviteWriterNotification" style="margin-top: 20px;"
               class="text-h4 text-md-h6 text-sm-h5">
            </p>
            <br>
            <alert-message v-if="successObject.value || errorObject.value" class="mt-4" :success="successObject"
                           :error="errorObject"></alert-message>
            <v-btn
              outlined
              @click="launchInviteWriter"
              :disabled="launchInviteWriterOngoing"
              ref="continueEmail"
              v-if="inviteWriterNotification === 'Kindly invite at least one writer and approve to continue'"
            >
              <div v-if="launchInviteWriterOngoing" class="lds-ellipsis">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
              <span v-else
                    class="text-body-2 text-xl-body-2 text-lg-body-2 text-md-body-1 text-sm-body-2"> Invite Writers </span>
            </v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
    <div class="text-center">
      <v-snackbar
        v-model="snackbar"
        :timeout="timeout"
        top
        right
        color="teal"
        elevation="24"
      >
        {{ text }}

        <template v-slot:action="{ attrs }">
          <v-btn
            color="white"
            text
            v-bind="attrs"
            @click="snackbar = false"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </template>
      </v-snackbar>
    </div>
    <overlay-loader :overlay="overlay"></overlay-loader>
    </v-card>
</template>

<script>

import { mapGetters, mapMutations } from 'vuex'
import { deadline, deadlineHoursAmPm } from '@/mixins/time'
import Deadline from '@/components/client/Deadline'
import api from '../../api/api'
import Validation from '../../plugins/Validation'
import { bus } from '@/plugins/bus'

export default {
  name: 'BaseTable',
  components: {
    Deadline,
    OverlayLoader: () => import('../../components/general/OverlayLoader'),
    AlertMessage: () => import('../../components/general/AlertMessage')
  },
  props: ['tableData', 'selectedOrder', 'drawer'],
  data () {
    return {
      loading: false,
      currentUrl: null,
      validate: Validation,
      postNewOrderOngoing: false,
      snackbar: false,
      timeout: 15000,
      text: null,
      inviteWriterForm: {
        email: null
      },
      writerPendingApproval: false,
      noWriter: false,
      inviteWriterDialog: false,
      inviteWriterPromptDialog: false,
      inviteWriterNotification: null,
      inviteWriterOngoing: false,
      launchInviteWriterOngoing: false,
      successObject: {
        value: false,
        message: null
      },
      errorObject: {
        value: false,
        message: null
      },
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
      }
    }
  },
  computed: {
    ...mapGetters(['clientPostOrderForm', 'getViewPortCode']),
    mini () {
      let val
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
          val = true
          break
        case 'sm':
          val = true
          break
        case 'md':
          val = true
          break
        case 'lg':
          val = false
          break
        case 'xl':
          val = false
          break
      }
      return val
    }
  },
  methods: {
    ...mapMutations(['changeClient', 'changeOrderPostingDone', 'changeClientPostOrderForm',
      'resetClientPostOrderForm']),
    deadline_ (deadlineDate, deadlineTime) {
      return deadline(deadlineDate, deadlineTime)
    },
    deadlineHours (deadlineTime) {
      return deadlineHoursAmPm(deadlineTime)
    },
    turnOnOffDrawer () {
      bus.$emit('mutateDrawer')
    },
    openOrder (itemId) {
      this.changeClient({ key: 'selectedOrder', val: itemId })
      this.$router.push('/client/selected-order')
    },
    openSelectedWriter (itemId) {
      this.changeClient({ key: 'selectedWriter', val: itemId })
      this.$router.push('/client/selected-writer')
    },
    launchInviteWriter () {
      this.inviteWriterPromptDialog = false
      this.inviteWriterDialog = true
    },
    async postNewOrder () {
      /* First check whether the client has any writers */
      this.postNewOrderOngoing = true
      await api.getRequest('users/v1/get_writers')
        .then(response => {
          // this.postNewOrderOngoing = false
          const atLeastOneActiveWriter = response.writers.filter(writer => writer.connectionConfirmed)
          if (atLeastOneActiveWriter.length > 0) {
            const email = this.clientPostOrderForm.email
            this.resetClientPostOrderForm()
            this.changeClientPostOrderForm({
              key: 'email',
              subKey: null,
              val: email,
              option: null
            })
            this.$router.push('/client/place-order')
            /* Disabled the reloading of the page after wanting to start a new order, for now */
            /* TODO: To confirm whether this has negative impacts on the user experience */
            /* setTimeout(() => {
              location.reload()
            }, 2000) */
          } else {
            if (atLeastOneActiveWriter.length === 0 && response.writers.length > 0) {
              this.inviteWriterNotification = 'Kindly approve at least one writer to continue'
            } else {
              this.inviteWriterNotification = 'Kindly invite at least one writer and approve to continue'
            }
            this.inviteWriterPromptDialog = true
            this.postNewOrderOngoing = false
          }
        })
        .catch(() => {
          this.postNewOrderOngoing = false
        })
    },
    /* Writer invitations are only for private writers */
    async inviteWriter () {
      if (this.$refs.inviteWriterForm.validate()) {
        this.inviteWriterOngoing = true
        await api.postRequest('orders/v1/send_writer_invite', this.inviteWriterForm)
          .then(res => {
            if (res.success || res.message === 'Invitation already exists!') {
              this.text = 'You will get an email notification once the writer has registered successfully!'
              this.snackbar = true
              this.inviteWriterDialog = false
              this.overlay.value = true
              this.overlay.loading = false
              this.overlay.success.message = true
              this.overlay.success.value = true
              setTimeout(async () => {
                window.scrollTo(0, 0)
                this.resetOverlay()
                this.inviteWriterOngoing = false
                this.inviteWriterForm.email = null
              }, 2500)
            } else {
              this.inviteWriterOngoing = false
              this.errorObject.message = res.message
              this.errorObject.value = true
              setTimeout(() => {
                this.errorObject.message = null
                this.errorObject.value = false
              }, 3000)
            }
          })
          .catch(() => {
            this.inviteWriterOngoing = false
            this.errorObject.message = 'Failed to send invite'
            this.errorObject.value = true
            setTimeout(() => {
              this.errorObject.message = null
              this.errorObject.value = false
            }, 3000)
          })
      }
    },
    resetOverlay () {
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
  mounted () {
    this.currentUrl = window.location.pathname
  }
}
</script>

<style lang="scss" scoped>

@import "../../styles/general/general";

@import "../../styles/mixins/general";

#new-order-btn {
  @include darkGreenBlueBtnConfig(auto, $primaryDarkGreenBlueColor, white)
}

#invite-writer-btn {
  @extend #new-order-btn;
}

#app{
  @include darkGreenBlueBtnConfig(100%, white, $primaryDarkGreenBlueColor);
}

.data-table {
  cursor: pointer;
}

</style>
