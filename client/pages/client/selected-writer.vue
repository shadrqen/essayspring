<!--Page to show a selected writer plus other actions that can be done on a writer-->
<template>
  <v-app>
    <client-only>
      <nav-drawer />
      <v-card
        class="ma-4"
        v-if="writer"
      >
        <v-card-title>
          <v-icon
            style="cursor: pointer"
            class="mr-2"
            @click="$router.push('/client/writers')"
          >
            chevron_left
          </v-icon>
          Writer &#8470; {{ client.selectedWriter }}
          <v-spacer />
          <v-chip
            class="ma-2"
            v-if="connectionNotConfirmed"
            color="teal lighten-1"
            text-color="white"
            style="cursor: pointer"
            @click="confirmWriterApprovalDialog = true"
          >
            <v-avatar left>
              <v-icon color="white">
                mdi-check-decagram-outline
              </v-icon>
            </v-avatar>
            Approve Writer
          </v-chip>
        </v-card-title>
        <v-divider />
        <v-card-text>
          <v-row no-gutters>
            <v-col
              v-bind="attrs"
              v-for="(item, key) in headers"
              :key="key"
            >
              <v-list
                subheader
                three-line
              >
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>{{ item.text }}</v-list-item-title>
                    <v-list-item-subtitle>
                      <template v-if="item.subValue">
                        {{ writer[item.value][item.subValue] }}
                      </template>
                      <template v-else>
                        <template v-if="item.value === 'WriterOrder'">
                          {{ ordersDone() }}
                        </template>
                        <template v-else>
                          {{ writer[item.value] }}
                        </template>
                      </template>
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-col>
          </v-row>
          <alert-message
            v-if="bodyAlertObject"
            :success="successObject"
            :error="errorObject"
          />
        </v-card-text>
      </v-card>
      <v-dialog
        v-model="confirmWriterApprovalDialog"
        eager
        max-width="600"
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
              v-text="'Approve Writer'"
            />
            <v-spacer />
            <v-toolbar-items>
              <v-btn
                icon
                dark
                @click="confirmWriterApprovalDialog = !confirmWriterApprovalDialog"
              >
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-toolbar-items>
          </v-toolbar>
          <v-card-text class="mt-5">
            <div class="text-h6">
              By clicking <b>"Approve"</b>, you confirm that you know the writer in question, and invited him/her
            </div>
          </v-card-text>
          <v-divider />
          <v-card-actions>
            <v-row no-gutters>
              <v-col v-bind="attrs12">
                <alert-message
                  :success="successObject"
                  :error="errorObject"
                />
              </v-col>
              <v-col
                v-bind="attrs12"
                class="text-end"
              >
                <v-btn
                  class="my-2"
                  id="approve-writer-btn"
                  outlined
                  @click="approveWriter"
                  :disabled="approveWriterBtnDisabled"
                >
                  <div
                    v-if="approveWriterOngoing"
                    class="lds-ellipsis"
                  >
                    <div />
                    <div />
                    <div />
                    <div />
                  </div>
                  <span
                    v-else
                    class="text-subtitle-1 text-xl-subtitle-1 text-lg-subtitle-1 text-md-subtitle-1 text-sm-subtitle-1"
                  >
                    <v-icon>mdi-check-circle-outline</v-icon> Approve
                  </span>
                </v-btn>
              </v-col>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </client-only>
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
  </v-app>
</template>

<script>

import { mapGetters } from 'vuex'
import api from '@/api/api'
// import registrationMixin from '@/mixins/registration'
import NavDrawer from '@/components/general/NavDrawer'
import authMixin from '../../utils/auth'

export default {
  name: 'SelectedWriter',
  head: {
    title: 'Selected Writer',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: 'Selected Writer. Essay Writing Service - Freelance Academic Writing Assistance EssaySpring.com - EssaySpring.com'
      }
    ]
  },
  components: {
    NavDrawer,
    AlertMessage: () => import('../../components/general/AlertMessage')
  },
  data () {
    return {
      headers: [
        { text: 'Surname', value: 'surname', subValue: null },
        { text: 'Other Names', value: 'otherNames', subValue: null },
        { text: 'Phone Number', value: 'mobileNo', subValue: null },
        { text: 'Member Since', value: 'createdAt', subValue: null },
        { text: 'Orders Done', value: 'WriterOrder', subValue: null }
      ],
      confirmWriterApprovalDialog: false,
      approveWriterBtnDisabled: false,
      approveWriterOngoing: false,
      writer: {},
      bodyAlertObject: false,
      revisionInstructions: [],
      revisionSupportingFiles: [],
      orderPapers: [],
      supportingFiles: [],
      submissionChecklist: [],
      overlay: false,
      rating: 0,
      attrs: {
        cols: 12,
        sm: 6,
        md: 4,
        lg: 4,
        xl: 4
      },
      attrs12: {
        cols: 12,
        sm: 12,
        md: 12,
        lg: 12,
        xl: 12
      },
      errorObject: {
        value: false,
        message: null
      },
      successObject: {
        value: false,
        message: null
      },
      loadingOrder: false,
      attrs6: {
        cols: 12,
        xl: 6,
        lg: 6,
        md: 6,
        sm: 6
      },
      connectionNotConfirmed: false,
      writerOrders: []
    }
  },
  computed: {
    ...mapGetters(['client', 'getViewPortCode'])
  },
  methods: {
    ordersDone () {
      if (this.writerOrders.length > 0) {
        return this.writerOrders.length
      } else {
        return 0
      }
    },
    async getWriter () {
      this.overlay = true
      await api.postRequest('users/v1/get_selected_writer', {
        writerId: this.client.selectedWriter
      })
        .then(response => {
          this.writer = response.writer
          this.connectionNotConfirmed = !response.writer.ClientWriter[0].connectionConfirmed
          this.writerOrders = response.writer.WriterOrder
          this.overlay = false
        })
        .catch(() => {
          this.bodyAlertObject = true
          this.errorObject = {
            message: 'Failed to load writer details',
            value: true
          }
          setTimeout(() => {
            this.errorObject = {
              message: null,
              value: false
            }
            this.bodyAlertObject = false
          }, 2000)
          this.overlay = false
        })
    },
    async approveWriter () {
      this.approveWriterOngoing = true
      this.approveWriterBtnDisabled = true
      await api.postRequest('users/v1/approve_personal_writer', {
        writerId: this.client.selectedWriter
      })
        .then(writerConfirmed => {
          this.approveWriterOngoing = false
          if (writerConfirmed.confirmed) {
            this.successObject = {
              message: 'Approved Writer Successfully',
              value: true
            }
            setTimeout(() => {
              this.successObject = {
                message: null,
                value: false
              }
              this.approveWriterBtnDisabled = false
              this.confirmWriterApprovalDialog = false
            }, 2000)
            this.getWriter()
          } else {
            this.errorObject = {
              message: writerConfirmed.message,
              value: true
            }
            setTimeout(() => {
              this.errorObject = {
                message: null,
                value: false
              }
            }, 2000)
          }
        })
        .catch(() => {
          this.errorObject = {
            message: 'Failed to approve writer',
            value: true
          }
          setTimeout(() => {
            this.errorObject = {
              message: null,
              value: false
            }
          }, 2000)
          this.approveWriterBtnDisabled = false
          this.approveWriterOngoing = false
        })
    }
  },
  created () {
    if (process.env.VUE_ENV === 'client') {
      if (!authMixin.tokenIsValid()) {
        this.$router.push('/')
      }
    }
    this.getWriter()
  },
  mounted () {
    document.body.scrollTop = 0 // For Safari
    document.documentElement.scrollTop = 0 // For Chrome, Firefox, IE and Opera
  }
}
</script>

<style lang="scss" scoped>

@import "../../styles/general/general";
@import "../../styles/mixins/general";

#request-payment {
  @include darkGreenBlueBtnConfig(auto, white, $paymentButtonColor);
  margin-top: 28px;
}

.lds-local {
  background-color: #007991 !important;
}

.word-doc {
  width: 100%;
  height: 100%;
}

#the-canvas {
  //direction: ltr;
  //width: 100%;
}

#prev, #next {
  text-transform: none;
  cursor: pointer;
}

.order-paper-action {
  cursor: pointer;
}

#revision_order_btn {
  @include darkGreenBlueBtnConfig(auto, white, #B71C1C);
}

#confirm_order_btn, #approve-writer-btn {
  @include darkGreenBlueBtnConfig(100%, white, $primaryDarkGreenBlueColor);
}

#rate-writer-btn {
  @include darkGreenBlueBtnConfig(100%, white, $primaryDarkGreenBlueColor);
}

#submit-revision-btn {
  @include darkGreenBlueBtnConfig(100%, white, $primaryDarkGreenBlueColor);
}

.text-area{
  height: 202px;
  ::v-deep label {
    color: #989696;
  }
}

.text_field {
  border: 1px dashed $primaryDarkGreenBlueColor;
  border-radius: 5px;
  height: 82px;
  cursor: pointer;
  text-align: center;
  vertical-align: middle;
  span{
    position: relative;
    top: 23px;
    padding: 20px;
    font-size: 14px;
    color: #cac8c8;
  }
}

</style>
