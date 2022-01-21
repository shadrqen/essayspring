<!--2nd component in the client order posting step that allows client to select writers either from the public-->
<!--pool or private writers-->
<template>
  <v-card
    :style="xl ? 'margin-top: -7px; margin-left: 12vw;' : 'margin-top: -7px'"
    flat
  >
    <label class="text-subtitle-1 text-xl-h5 text-lg-h5 text-md-h5 text-sm-h5 blinking-message">
      {{ selectWritersMainTitle }}
    </label>
    <br>
    <br>
    <v-form ref="clientPostOrderForm">
      <v-container>
        <v-row no-gutters>
          <v-col
            v-for="(writer, key) in writerBids"
            :key="key"
            v-bind="attrs"
          >
            <v-card
              class="writer-proposal"
              flat
              max-width="350"
              min-width="250"
            >
              <v-list-item>
                <!--                For now we are showing a static avatar of writers-->
                <!--                TODO: To add dynamic images of writers-->
                <v-list-item-avatar
                  color="grey darken-3"
                  size="55"
                >
                  <v-img :src="require('~/assets/images/avatars/my.png')" />
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title style="font-size: 14px; font-weight: bold">
                    {{ writer.Writer.surname }} {{ writer.Writer.otherNames }}
                    <v-icon style="cursor: pointer; float: right">
                      close
                    </v-icon>
                  </v-list-item-title>
                  <v-list-item-subtitle style="font-size: 12px; margin-top: -10px">
                    Done {{ writer.Writer.WriterOrder.length }} Papers
                    <br>
                    <v-row no-gutters>
                      <v-col
                        cols="1"
                        lg="1"
                        md="1"
                        sm="1"
                        xl="1"
                      >
                        <span style="color: black"> {{ rating }} </span>
                      </v-col>
                      <v-col
                        cols="6"
                        lg="6"
                        md="6"
                        sm="6"
                        xl="6"
                      >
                        <v-rating
                          id="our_benefits_rating"
                          v-model="rating"
                          background-color="#F2A737"
                          color="#F2A737"
                          dense
                          length="5"
                          readonly
                          x-small
                        />
                      </v-col>
                      <v-col
                        v-if="clientPostOrderForm.type === 'public'"
                        cols="5"
                        lg="5"
                        md="5"
                        sm="5"
                        xl="5"
                      >
                        <span style="color: #FF3400">{{ clientPostOrderForm.paymentSummary.currencyCode }} {{ clientPostOrderForm.paymentSummary.totalPrice }}</span>
                      </v-col>
                    </v-row>
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-card-subtitle
                v-if="clientPostOrderForm.type === 'public'"
                :ref="`cardSubtitle${key}`"
                :style="{
                  'overflow': 'hidden',
                  'white-space': writerQuoteWhiteSpace(key),
                  'text-overflow': 'ellipsis',
                  'width': '200px'
                }"
              >
                <!--                We are also showing a static message from a writer-->
                <!--                TODO: To add dynamic messages from writers-->
                Hello Prof, I can do your order in record time, with the highest quality possible
              </v-card-subtitle>
              <v-icon
                v-if="clientPostOrderForm.type === 'public'"
                class="mt-n10"
                style="position: absolute; right: 0; cursor: pointer"
                @click="expandWriterQuote(key)"
              />
              <!--          TODO: To find a way of integrating the code below without having to use v-html
              because it could lead to XSS attacks
              "writerQuoteWhiteSpace(key) === 'nowrap' ? 'expand_more' : 'expand_less'" -->
              <span class="mx-16" />
              <v-card-actions>
                <v-btn
                  class="chat-btn"
                  outlined
                  @click="openChat"
                >
                  Chat
                </v-btn>
                <v-spacer />
                <v-btn
                  class="accept-btn"
                  outlined
                  @click="acceptBid(writer)"
                >
                  <template v-if="clientPostOrderForm.type === 'public'">
                    Accept
                  </template>
                  <template v-else>
                    Assign
                  </template>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
          <v-col
            v-if="clientPostOrderForm.type === 'public' || (clientPostOrderForm.type === 'private' && writerBids.length === 0)"
            style="padding-right: 15px; padding-bottom: 15px"
            v-bind="attrs"
          >
            <v-skeleton-loader
              type="list-item-avatar, divider, list-item, actions"
              width="300"
            />
          </v-col>
        </v-row>
      </v-container>
      <overlay-loader :overlay="overlay" />
    </v-form>
    <br>
    <slot name="back-btn" />
    <slot name="next-btn" />
    <v-dialog
      v-model="inviteWriterDialog"
      :fullscreen="viewport_code === 'xs'"
      eager
      max-width="400"
      persistent
    >
      <v-card>
        <v-toolbar
          color="#344754"
          flat
          short
        >
          <v-toolbar-title
            class="text-subtitle-1 text-xl-subtitle-1 text-lg-subtitle-1 text-md-subtitle-1
            text-sm-subtitle-1 white--text"
            v-text="'Enter email address'"
          />
          <v-spacer />
          <v-toolbar-items>
            <v-btn
              dark
              icon
              @click="disableWriterInvite"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card-text style="padding-bottom: 20px">
          <v-form
            ref="inviteWriterForm"
            @submit.prevent=""
          >
            <br>
            <v-text-field
              id="loginEmail"
              v-model="inviteWriterForm.email"
              :rules="validate.emailField"
              class="text-field"
              flat
              label="Enter email address"
              solo
              type="email"
              @keyup.enter="inviteWriter"
            />
            <br>
            <alert-message
              v-if="successObject.value || errorObject.value"
              :error="errorObject"
              :success="successObject"
              class="mt-4"
            />
            <v-btn
              id="submit_email_btn"
              ref="continueEmail"
              :disabled="inviteWriterOngoing"
              outlined
              @click="inviteWriter"
            >
              <div
                v-if="inviteWriterOngoing"
                class="lds-ellipsis"
              >
                <div />
                <div />
                <div />
                <div />
              </div>
              <span
                v-else
                class="text-body-2 text-xl-body-2 text-lg-body-2 text-md-body-1 text-sm-body-2"
              > Send Invitation </span>
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
    <div class="text-center">
      <v-snackbar
        v-model="snackbar"
        :timeout="timeout"
        color="teal"
        elevation="24"
        right
        top
      >
        {{ text }}

        <template>
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
  </v-card>
</template>

<script>

import { mapGetters, mapMutations } from 'vuex'
import api from '../../api/api.ts'
import { bus } from '../../plugins/bus'
import OverlayLoader from '../general/OverlayLoader.vue'
import Socket from '../../sockets'

import Validation from '../../plugins/Validation'

import CloseIcon from '../../assets/close-icon.png'
import OpenIcon from '../../assets/logo-no-bg.svg'
import FileIcon from '../../assets/file.svg'
import CloseIconSvg from '../../assets/close.svg'

export default {
  name: 'SelectWriter',
  components: {
    OverlayLoader,
    AlertMessage: () => import('../../components/general/AlertMessage')
  },
  props: {
    getBids: {
      type: Boolean,
      required: true,
      default: false
    },
    inviteWriterDialog: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  data () {
    return {
      inviteWriterOngoing: false,
      inviteWriterForm: {
        email: null
      },
      successObject: {
        value: false,
        message: null
      },
      errorObject: {
        value: false,
        message: null
      },
      validate: Validation,
      rating: 0,
      attrs: {
        class: 'mb-6',
        elevation: 2
      },
      text: null,
      snackbar: false,
      timeout: 15000,
      temp: false,
      firstBidLoaded: false,
      orderBidInterval: null,
      writerQuoteWhiteSpaceNormal: [],
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
        },
        attrs: {
          cols: 12,
          xl: 4,
          lg: 4,
          md: 4,
          sm: 6
        }
      },
      writerBids: [],
      client: null,
      icons: {
        open: {
          img: OpenIcon,
          name: 'default'
        },
        close: {
          img: CloseIcon,
          name: 'default'
        },
        file: {
          img: FileIcon,
          name: 'default'
        },
        closeSvg: {
          img: CloseIconSvg,
          name: 'default'
        }
      },
      participants: [], // the list of all the participant of the conversation. `name` is the user name, `id` is used to establish the author of a message, `imageUrl` is supposed to be the user avatar.
      messageList: [
        { type: 'text', author: 'me', data: { text: 'Say yes!' } },
        { type: 'text', author: 'user1', data: { text: 'No.' } }
      ], // the list of the messages to show, can be paginated and adjusted dynamically
      newMessagesCount: 0,
      isChatOpen: false, // to determine whether the chat window should be open or closed
      showTypingIndicator: '', // when set to a value matching the participant.id it shows the typing indicator for the specific user
      colors: {
        header: {
          bg: '#007991',
          text: '#ffffff'
        },
        launcher: {
          bg: '#007991'
        },
        messageList: {
          bg: '#ffffff'
        },
        sentMessage: {
          bg: '#3474B4',
          text: '#ffffff'
        },
        receivedMessage: {
          bg: '#eaeaea',
          text: '#222222'
        },
        userInput: {
          bg: '#f4f7f9',
          text: '#565867'
        }
      }, // specifies the color scheme for the component
      alwaysScrollToBottom: false, // when set to true always scrolls the chat to the bottom when new events are in (new message, user starts typing...)
      messageStyling: true, // enables *bold* /emph/ _underline_ and such (more info at github.com/mattezza/msgdown)
      selectWritersMainTitle: null,
      selectWritersMainTitleChanged: false
    }
  },
  computed: {
    ...mapGetters({
      clientPostOrderForm: 'clientPostOrderForm',
      viewport_code: 'getViewPortCode'
    }),
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
  watch: {
    getBids () {
      if (this.getBids) {
        this.getOrderBids()
      }
    }
  },
  mounted () {
    this.selectWritersMainTitle = this.clientPostOrderForm.type === 'public' ? 'Writers who best meet your requirements' : 'Your Writers'
    if (this.clientPostOrderForm.type === 'public') {
      if (this.getBids) {
        this.getOrderBids()
      }
      bus.$on('getOrderBids', () => {
        this.getOrderBids()
      })
      bus.$on('changeBiddingMessage', () => {
        this.selectWritersMainTitle = 'Writers who best meet your requirements'
        setTimeout(() => {
          if (this.writerBids.length === 0) {
            this.selectWritersMainTitle = 'Still working out to get the best writers'
          }
        }, 15000)
        setTimeout(() => {
          if (this.writerBids.length === 0) {
            this.selectWritersMainTitle = 'Almost there, just a moment'
          }
        }, 30000)
      })
    } else {
      this.getPersonalWriters()
    }
    document.body.scrollTop = 0 // For Safari
    document.documentElement.scrollTop = 0 // For Chrome, Firefox, IE and Opera
  },
  methods: {
    ...mapMutations(['changeClientPostOrderForm']),
    /* This function will be key once the ellipsis functionality is complete */
    ellipsisActive (key) {
      return this.$refs['cardSubtitle' + key][0].offsetWidth < this.$refs['cardSubtitle' + key][0].scrollWidth
    },
    /* This function returns the type of white space - whether it is normal or nowrap (in CSS) */
    writerQuoteWhiteSpace (quoteId) {
      if (this.writerQuoteWhiteSpaceNormal.includes(quoteId)) {
        return 'normal'
      } else {
        return 'nowrap'
      }
    },
    /* Ellipsis, as seen above is the omission of one or more words.
    * Here, we are omitting words from writer's bidding quote and only showing a given character limit.
    * However, a client should be able to expand the quote so as to see the full message from the writer.
    * That is the basis of the function below. */
    expandWriterQuote (quoteId) {
      if (this.writerQuoteWhiteSpaceNormal.includes(quoteId)) {
        const index = this.writerQuoteWhiteSpaceNormal.indexOf(quoteId)
        if (index > -1) {
          this.writerQuoteWhiteSpaceNormal.splice(index, 1)
        }
      } else {
        this.writerQuoteWhiteSpaceNormal.push(quoteId)
      }
    },
    async getOrderBids () {
      await api.postRequest('orders/v1/get_order_bids', { orderId: this.clientPostOrderForm.orderId })
        .then(res => {
          if (res.connectionStarted) {
            this.createSocketConnection()
          }
        })
        .catch(() => {})
    },
    async getPersonalWriters () {
      await api.getRequest('orders/v1/get_personal_writers')
        .then(res => {
          this.writerBids = res
        })
        .catch(() => {})
    },
    async acceptBid (writer) {
      if (this.$refs.clientPostOrderForm.validate()) {
        this.overlay.loading = true
        this.overlay.value = true
        this.changeClientPostOrderForm({
          key: 'selectedWriter',
          subKey: 'name',
          val: writer.Writer.surname.concat(' ', writer.Writer.otherNames),
          option: null
        })
        this.changeClientPostOrderForm({
          key: 'selectedWriter',
          subKey: 'id',
          val: writer.Writer.User.id,
          option: null
        })
        await this.linkOrderToWriter()
          .then(res => {
            if (res.statusUpdated) {
              this.overlay.loading = false
              this.overlay.success.message = true
              this.overlay.success.value = true
              setTimeout(async () => {
                window.scrollTo(0, 0)
                this.resetOverlay()
                if (this.clientPostOrderForm.type === 'public') {
                  this.$emit('progress-to-next-level', 3)
                } else {
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
                }
              }, 1600)
            } else {
              this.overlay.error.message = 'Failed to select writer! Try again'
              this.overlay.loading = false
              this.overlay.error.value = true
              setTimeout(async () => {
                this.resetOverlay()
              }, 3000)
            }
          })
          .catch(() => {
            this.overlay.error.message = 'Failed to select writer! Try again'
            this.overlay.loading = false
            this.overlay.error.value = true
            setTimeout(async () => {
              this.resetOverlay()
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
    },
    async linkOrderToWriter () {
      return await api.postRequest('orders/v1/update_order_status', {
        orderId: this.clientPostOrderForm.orderId,
        writerId: this.clientPostOrderForm.selectedWriter.id,
        type: this.clientPostOrderForm.type
      })
        .then(response => {
          return response
        })
        .catch(error => {
          return Promise.reject(error)
        })
    },
    /* We use MQTT to listen to events. In this case, we are subscribing to a unique topic that gives the user
    * or client the ability to get bids instantly from writers. As a writer bids, he/she sends a message on
    * the topic that the client has subscribed to */
    async createSocketConnection () {
      await Socket.createConnection()
      await api.postRequest('orders/v1/order_bids/ws/topic', { orderId: this.clientPostOrderForm.orderId })
        .then(async topic => {
          this.client = await Socket.doSubscribe(topic.topic)
          this.client.on('message', (topic, message) => {
            const parsedMessage = JSON.parse(message)
            this.writerBids = parsedMessage.bids
          })
        })
    },
    /* The functions below are part of a feature to allow clients to chat with writers before assigning an order
    * TODO: To finish up on this functionality */
    /*
    sendMessage (text) {
      if (text.length > 0) {
        this.newMessagesCount = this.isChatOpen ? this.newMessagesCount : this.newMessagesCount + 1
        this.onMessageWasSent({ author: 'support', type: 'text', data: { text } })
      }
    },
    onMessageWasSent (message) {
      // called when the user sends a message
      this.messageList = [...this.messageList, message]
    },
    openChat () {
      // called when the user clicks on the fab button to open the chat
      this.isChatOpen = true
      this.newMessagesCount = 0
    },
    closeChat () {
      // called when the user clicks on the botton to close the chat
      this.isChatOpen = false
    },
    handleScrollToTop () {
      // called when the user scrolls message list to top
      // leverage pagination for loading another page of messages
    },
    handleOnType () {
      console.log('Emit typing event')
    },
    editMessage (message) {
      const m = this.messageList.find(m => m.id === message.id)
      m.isEdited = true
      m.data.text = message.data.text
    },
     */
    /* Public writers apply for their accounts before being vetted and approved.
    * Private writers, on the other hand, are invited by their employers without vetting.
    * The function below does that */
    async inviteWriter () {
      if (this.$refs.inviteWriterForm.validate()) {
        this.inviteWriterOngoing = true
        await api.postRequest('orders/v1/send_writer_invite', this.inviteWriterForm)
          .then(res => {
            if (res.success || res.message === 'Invitation already exists!') {
              this.text = 'You will get an email notification once the writer has registered successfully!'
              this.snackbar = true
              this.$emit('disable-writer-invite')
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
    disableWriterInvite () {
      this.$emit('disable-writer-invite')
    }
  }
}
</script>

<style lang="scss" scoped>

@import "../../styles/mixins/general";

.writer-proposal{
  border: 0.1px solid #bfbdbd;
}

.accept-btn{
  @include darkGreenBlueBtnConfig(auto, white, $paymentButtonColor)
}

.chat-btn {
  @include darkGreenBlueBtnConfig(auto, $primaryDarkGreenBlueColor, white)
}
//
//.blinking-message {
//  animation: blinking-message 2s alternate infinite;
//}
//
//@keyframes blinking-message {
//  50% { opacity: 0.2; }
//}

</style>
