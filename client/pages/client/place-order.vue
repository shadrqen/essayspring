<!--Page that allows user to post orders. It has four steps for public writers and two for private writers-->
<template>
  <v-app>
    <client-only>
      <template v-if="loginStatus">
        <payment-successful v-if="clientPostOrderForm.addFunds.paymentSuccessful"></payment-successful>
        <base-stepper v-if="clientPostOrderForm.addFunds.notYetPaid" :steps="clientPostOrderForm.type === 'private' ? stepsPrivate : stepsPublic"
                      :step-status="clientPostOrderForm.stepStatus" :level="clientPostOrderForm.level">
          <template #stepper-content-step-1>
            <place-order @progress-to-next-level="proceedToNextLevel"></place-order>
          </template>
          <template #stepper-content-step-2>
            <select-writer
              @progress-to-next-level="proceedToNextLevel"
              :getBids="getOrderBids"
              :invite-writer-dialog="inviteWriterDialog"
              @disable-writer-invite="disableWriterInvite">
              <template #back-btn>
                <v-row no-gutters>
                  <v-col cols="8" xl="8" lg="8" md="8" sm="8">
                    <v-btn
                      id="back_btn_step_2"
                      @click="proceedToNextLevel(1)"
                      outlined
                    >
                      <v-icon>keyboard_arrow_left
                      </v-icon>
                      <span
                        class="text-subtitle-1 text-xl-subtitle-1 text-lg-subtitle-1
                    text-md-subtitle-1 text-sm-subtitle-1"
                      >Back</span>
                    </v-btn>
                  </v-col>
                  <v-col cols="4" xl="4" lg="4" md="4" sm="4" class="right-0">
                    <v-btn
                      id="back_btn_step_2_"
                      @click="proceedToNextLevel(3)"
                      outlined
                      v-if="clientPostOrderForm.type === 'public'"
                    >
                      <span
                        class="text-subtitle-1 text-xl-subtitle-1 text-lg-subtitle-1
                    text-md-subtitle-1 text-sm-subtitle-1"
                      >Later</span>
                      <v-icon>keyboard_arrow_right
                      </v-icon>
                    </v-btn>
                    <v-btn
                      id="back_btn_step_2__"
                      @click="inviteWriterDialog = true"
                      outlined
                      v-else
                    >
                      <span
                        class="text-subtitle-1 text-xl-subtitle-1 text-lg-subtitle-1
                    text-md-subtitle-1 text-sm-subtitle-1 mr-1"
                      >Invite</span>
                      <v-icon>mdi-account-plus-outline
                      </v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
              </template>
            </select-writer>
          </template>
          <template #stepper-content-step-3 v-if="clientPostOrderForm.type === 'public'">
            <check-order @progress-to-next-level="proceedToNextLevel">
              <template #back-btn>
                <br>
                <v-row no-gutters>
                  <v-col cols="4" xl="4" lg="4" md="4" sm="4">
                    <v-btn
                      id="back_btn_step_3"
                      @click="proceedToNextLevel(2)"
                      outlined
                    >
                      <v-icon>keyboard_arrow_left
                      </v-icon>
                      <span
                        class="text-subtitle-1 text-xl-subtitle-1 text-lg-subtitle-1
                    text-md-subtitle-1 text-sm-subtitle-1"
                      >Back</span>
                    </v-btn>
                  </v-col>
                </v-row>
              </template>
            </check-order>
          </template>
          <template #stepper-content-step-4 v-if="clientPostOrderForm.type === 'public'">
            <add-funds @progress-to-next-level="proceedToNextLevel">
              <template #back-btn>
                <br>
                <v-row no-gutters>
                  <v-col cols="4" xl="4" lg="4" md="4" sm="4">
                    <v-btn
                      id="back_btn_step_4"
                      @click="proceedToNextLevel(3)"
                      outlined
                    >
                      <v-icon>keyboard_arrow_left
                      </v-icon>
                      <span
                        class="text-subtitle-1 text-xl-subtitle-1 text-lg-subtitle-1
                    text-md-subtitle-1 text-sm-subtitle-1"
                      >Back</span>
                    </v-btn>
                  </v-col>
                </v-row>
              </template>
            </add-funds>
          </template>
        </base-stepper>
      </template>
    </client-only>
  </v-app>
</template>

<script>

/* Didn't lazy-load because this is not rendered on initial loading of the application.
* It's an assumption that the page had been already rendered before, and that all
* that we are doing is to navigate from one component or page to another.
* However, I'll check the viability of this later */
import BaseStepper from '../../components/general/BaseStepper'
import PlaceOrder from '../../components/client/PlaceOrder'
import SelectWriter from '../../components/client/SelectWriter'
import CheckOrder from '../../components/client/CheckOrder'
import AddFunds from '../../components/client/AddFunds'
import { mapGetters, mapActions, mapMutations } from 'vuex'
import { bus } from '../../plugins/bus'
import PaymentSuccessful from '../../components/client/PaymentSuccessful'
import authMixin from '../../utils/auth'

export default {
  name: 'ClientPlaceOrder',
  head: {
    title: 'Customer Place Order',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: 'Place Your Order Within 2 minutes. Essay Writing Service - Freelance Academic Writing Assistance EssaySpring.com - EssaySpring.com'
      }
    ]
  },
  components: {
    BaseStepper,
    PlaceOrder,
    SelectWriter,
    CheckOrder,
    AddFunds,
    PaymentSuccessful
  },
  data () {
    return {
      stepsPublic: {
        step1: 'Place Order',
        step2: 'Select Writer',
        step3: 'Check Order',
        step4: 'Add Funds'
      },
      stepsPrivate: {
        step1: 'Place Order',
        step2: 'Select Writer'
      },
      getOrderBids: false,
      inviteWriterDialog: false,
      stateReloadCount: 0
    }
  },
  computed: {
    ...mapGetters({
      viewport_code: 'getViewPortCode',
      loginStatus: 'loginStatus',
      clientPostOrderForm: 'clientPostOrderForm',
      extraOrderServices: 'extraOrderServices',
      formsStateSet: 'formsStateSet',
      email: 'email',
      orderPostingDone: 'orderPostingDone'
    })
  },
  methods: {
    ...mapActions(['getDisciplines', 'getTime', 'getServiceType', 'getExtraServiceTypes',
      'getOrderStudyLevels', 'getCitationStyles', 'getOrderFormats',
      'getAssignmentTypes'
    ]),
    ...mapMutations(['changeClientPostOrderForm', 'changeWholeClientPostOrderForm', 'changeFormsStateSet',
      'changeClient', 'resetClientPostOrderForm', 'changeOrderPostingDone'
    ]),
    pickFile () {
      this.$refs.image.click()
    },
    async disableWriterInvite () {
      this.inviteWriterDialog = false
    },
    proceedToNextLevel (level) {
      this.changeClientPostOrderForm({
        key: 'level',
        subKey: null,
        val: level,
        option: null
      })
      if (level === 3) {
        if (this.clientPostOrderForm.orderAlreadyPaidFor) {
          this.changeOrderPostingDone(true)
          const email = this.clientPostOrderForm.email
          /* TODO: To maje the functionality below reusable by creating a mixin that would be inherited by all
          *  components that want to use it. This is because it is repetitive */
          const defaultForm = {
            type: 'public',
            level: 1,
            orderPostingStep: 1,
            email: '',
            paperSubject: '',
            assignmentType: '',
            topic: '',
            pageCount: 1,
            sources: 0,
            wordCount: 1,
            deadlineDate: '',
            deadlineTime: '',
            studyLevel: '',
            citationStyleId: '',
            serviceType: 'Writing',
            supportingFiles: [],
            instructions: '',
            orderId: 0,
            writerBids: [],
            selectedWriter: {
              name: '',
              id: ''
            },
            paymentSummary: {
              cpp: 0,
              currencyCode: '',
              paperPrice: 0,
              leastPaperPrice: 0,
              totalPrice: 0,
              discount: 0,
              extrasList: [],
              extrasTotalPrice: 0
            },
            orderSavingProgress: {
              details: false,
              payment: false
            },
            stepStatus: {
              step1: true,
              step2: true,
              step3: true,
              step4: true
            },
            addFunds: {
              paymentSuccessful: false,
              paymentFailed: false,
              notYetPaid: true
            }
          }
          this.changeWholeClientPostOrderForm(defaultForm)
          this.changeClientPostOrderForm({
            key: 'email',
            subKey: null,
            val: email,
            option: null
          })
          this.$router.push('/client/orders')
          setTimeout(() => {
            location.reload()
          }, 3000)
        }
        bus.$emit('updatePricesOnCheckOrder')
      } else if (level === 2 && this.clientPostOrderForm.type === 'public') {
        bus.$emit('changeBiddingMessage')
        this.getOrderBids = true
      }
      if (process.env.VUE_ENV === 'client') {
        window.scrollTo(0, 0)
      }
    },
    reGetStates () {
      setTimeout(() => {
        if (this.stateReloadCount < 300) {
          this.getStates()
        }
      }, 7000)
    },
    async getStates () {
      this.stateReloadCount += 1
      this.getOrderStudyLevels()
        .then(() => {})
        .catch(() => {
          this.reGetStates()
        })
      await this.getServiceType()
        .then(() => {})
        .catch(() => {
          this.reGetStates()
        })
      await this.getCitationStyles()
        .then(() => {})
        .catch(() => {
          this.reGetStates()
        })
      await this.getOrderFormats()
        .then(() => {})
        .catch(() => {
          this.reGetStates()
        })
      await this.getExtraServiceTypes()
        .then(() => {})
        .catch(() => {
          this.reGetStates()
        })
      await this.getDisciplines()
        .then(() => {})
        .catch(() => {
          this.reGetStates()
        })
      await this.getAssignmentTypes()
        .then(() => {})
        .catch(() => {
          this.reGetStates()
        })
      await this.getTime()
        .then(() => {})
        .catch(() => {
          this.reGetStates()
        })
      /* Start setting the states now */
      this.setStates()
    },
    setStates () {
      /* First check whether the form has already been initialized */
      if (!this.formsStateSet) {
        /* Check if there is a response object from the serverside so as to set the client state */
        if (this.$route.params.response === undefined) {
          /* Here, the url is accessed directly without passing data from the backend
          * This is to help in prefilling data when there is need, and avoiding when there is none e.g. there
          * is absolutely no need to keep reinitializing the client registration object more than once, maybe
          * just mutating specific parts of the object */
          this.changeFormsStateSet(true)
          /* Indicating that the necessary components to render the page have been loaded successfully */
          this.componentsLoaded = true
          /* Disabling the navigation overlay that is turned off when whole component (App.vue) is loading
          * FIXME: There is need to remove such event emitters and listeners so as to prevent memory leaking */
          bus.$emit('changeNavOverlay', false)
        } else {
          /* There is data from the backend, e.g. in the case of logging in of a client
          * Here, the data is first initialized before being used in the consequent lines
          * This clause is reached, or used in a case where a client initiated an order request, but did not
          * end up finishing the process of payment. He is then brought here so as to finish up */
          const res = JSON.parse(this.$route.params.response)
          /* Updating that the updating of the registration of the client has been successful */
          this.changeClient({ key: 'regUpdateSuccessful', val: true })
          /* Indicating that the client is not new to the system, and that he or she could be
          * a returning customer */
          this.changeClient({ key: 'isNew', val: false })
          /* Initializing the payment details so as to use the object to initialize the client registration object */
          const paymentDetails = {
            leastPaperPrice: 0,
            paperPrice: 0,
            totalPrice: 0,
            extrasList: [],
            discount: 0,
            extrasTotalPrice: 0,
            writerEmail: null,
            name: null,
            cpp: 0,
            currencyCode: null,
            writerId: null
          }
          /* Initializing the extras list arrays to be used again in the registration of the client session */
          const extrasList = []
          let extraList = []
          /* Checking whether the order in question has extras (such as Progressive delivery, dedicated support etc)
          * after which the list is then initialized using split because it is stored as a string separated by
          * commas in the database */
          if (res.orderPaymentDetails && res.orderPaymentDetails.extras) {
            extraList = res.orderPaymentDetails.extras.split(',')
          }
          /* Getting the specific order service type and pushing the same to the extras list. NB: The extras list
          * that we have is in form of mere ids e.g. [2,1,6,4]. So, we need to get the specific order service type
          * from the [extraOrderServices] object, which contains an array of objects such as 1-page abstract,
          * dedicated support etc */
          if (extraList.length > 0) {
            extraList.forEach(extra => {
              extrasList.push(this.extraOrderServices.filter(service => service.id === Number(extra))[0])
            })
            paymentDetails.extrasPriceIncluded = true
          }
          /* In case a person has order payment details, or in other words, in case a person has a pending order
          * whose payment details are recorded but he or she is yet to make the actual payment */
          if (res.orderPaymentDetails) {
            paymentDetails.paperPrice = res.orderPaymentDetails.totalPrice - res.orderPaymentDetails.extrasTotalPrice
            paymentDetails.leastPaperPrice = res.orderPaymentDetails.totalPrice - res.orderPaymentDetails.extrasTotalPrice
            paymentDetails.totalPrice = res.orderPaymentDetails.totalPrice
            paymentDetails.discount = res.paperDiscount
            paymentDetails.extrasList = extrasList
            paymentDetails.extrasTotalPrice = extraList.length > 0 ? res.orderPaymentDetails.extrasTotalPrice : 0
            paymentDetails.cpp = res.orderPaymentDetails.cpp
            paymentDetails.currencyCode = res.orderPaymentDetails.Currency.currencyCode
          }
          if (res.orderAssignment) {
            paymentDetails.writerId = res.orderAssignment.Writer.User.id
            paymentDetails.name = res.orderAssignment.Writer.surname + ' ' + res.orderAssignment.Writer.otherNames
          }
          /* Here now goes the updating of the client registration object. In case a person has a record that is
          * incomplete, or else tried to make an order but did not end up finishing the process. The finishing of
          * an order is through clearing the order bill */
          if (res.orderDetails) {
            /* FIXME: remove this whole object and only initialize the specific step that the client had reached
            *   after which the other steps can be initialized on the background */
            /* Initializing the whole client registration object, starting with the level of the  registration
            process */
            let level = null
            /* If order is paid, then go to level 2 */
            if (res.orderAlreadyPaidFor) {
              this.changeClientPostOrderForm({
                key: 'orderAlreadyPaidFor',
                subKey: null,
                val: true,
                option: null
              })
              level = 2
              if (this.clientPostOrderForm.type === 'public') {
                this.getOrderBids = true
              }
            } else {
              /* Check if the client had made */
              if (res.orderPostingStep.lastStep && res.orderPostingStep.lastStep < 4) {
                level = res.orderPostingStep.lastStep < 4 ? res.orderPostingStep.lastStep + 1 : res.orderPostingStep.lastStep
              } else {
                level = 1
              }
            }
            const clientPostOrderForm = {
              type: 'public',
              level: level,
              orderPostingStep: 1,
              email: this.email,
              paperSubject: res.orderDetails['Discipline.id'],
              assignmentType: res.orderDetails['AssignmentType.id'],
              topic: res.orderDetails.topic,
              pageCount: res.orderDetails.pageCount,
              sources: res.orderDetails.sources,
              wordCount: 1,
              deadlineDate: res.orderDetails.deadlineDate.split('T')[0],
              deadlineTime: res.orderDetails['TimeAmPm.id'],
              studyLevel: res.orderDetails['EducationLevel.id'],
              citationStyleId: res.orderDetails['CitationStyle.id'],
              serviceType: res.orderDetails['OrderServiceType.type'],
              supportingFiles: res.orderFiles,
              instructions: res.orderDetails.instructions,
              orderId: res.orderDetails.id,
              orderAlreadyPaidFor: res.orderAlreadyPaidFor,
              selectedWriter: {
                name: paymentDetails.name,
                id: paymentDetails.writerId
              },
              paymentSummary: {
                cpp: paymentDetails.cpp,
                currencyCode: paymentDetails.currencyCode,
                paperPrice: paymentDetails.paperPrice,
                leastPaperPrice: paymentDetails.leastPaperPrice,
                totalPrice: paymentDetails.totalPrice,
                discount: paymentDetails.discount,
                extrasList: paymentDetails.extrasList,
                extrasTotalPrice: paymentDetails.extrasTotalPrice
              },
              orderSavingProgress: {
                details: false,
                payment: false
              },
              stepStatus: {
                step1: true,
                step2: true,
                step3: true,
                step4: true
              },
              addFunds: {
                paymentSuccessful: false,
                paymentFailed: false,
                notYetPaid: true
              }
            }
            /* Mutating the client post order form */
            this.changeWholeClientPostOrderForm(clientPostOrderForm)
            /* In case the client is supposed to go to the second step of the order posting process, the below
            * statement calls the function that starts receiving bids to be initiated. It initiates the bidding
            * process by changing the [getOrderBids] variable, which is passed to the select writers function as
            * a prop. When the prop is true, or when it mutates to true (because there is a watcher), then the
            * function starts getting bids from writers */
            if (res.orderPostingStep && res.orderPostingStep.lastStep === 1) {
              if (this.clientPostOrderForm.type === 'public') {
                this.getOrderBids = true
                setTimeout(() => {
                  this.getOrderBids = false
                }, 500)
              }
            }
            /* Emitting an event to start updating prices on the third step of the order posting process - Check Order
            * FIXME: to remove such event emitters and other similar listeners. Remove the bus event from the main.js
            *  file */
            bus.$emit('updatePricesOnCheckOrder')
          }
          /* In case all is well, then redirect to the [/place-order] route, which is the client order posting
           * component. However, you have to check first and confirm that the current route is not [/place-order]
           * so as to avoid redundant routing. We are doing this before the removing the navigation overlay to ensure
           * that by the time we get to removing it, we are more assured that the [place-order] element will have
           * been loaded fully. */
          if (this.$route.fullPath !== '/client/place-order') {
            this.$router.push('/client/place-order')
          }
          /* After all that is done, you now need to indicate that the forms have been instantiated, and that the
          * components have been loaded */
          this.changeFormsStateSet(true)
          this.componentsLoaded = true
          /* FIXME: remove the bus event emitter
          *   This event changes the navigation overlay to false, basically removing the loader on the screen */
          bus.$emit('changeNavOverlay', false)
        }
      } else {
        if (this.orderPostingDone) {
          const email = this.clientPostOrderForm.email
          /* TODO: To remove this repetitive functionality */
          const defaultForm = {
            type: 'public',
            level: 1,
            orderPostingStep: 1,
            email: '',
            paperSubject: '',
            assignmentType: '',
            topic: '',
            pageCount: 1,
            sources: 0,
            wordCount: 1,
            deadlineDate: '',
            deadlineTime: '',
            studyLevel: '',
            citationStyleId: '',
            serviceType: 'Writing',
            supportingFiles: [],
            instructions: '',
            orderId: 0,
            orderAlreadyPaidFor: false,
            selectedWriter: {
              id: '',
              name: ''
            },
            paymentSummary: {
              cpp: 0,
              currencyCode: '',
              leastPaperPrice: 0,
              paperPrice: 0,
              totalPrice: 0,
              discount: 0,
              extrasList: [],
              extrasTotalPrice: 0
            },
            orderSavingProgress: {
              details: false,
              payment: false
            },
            stepStatus: {
              step1: true,
              step2: true,
              step3: true,
              step4: true
            },
            addFunds: {
              paymentSuccessful: false,
              paymentFailed: false,
              notYetPaid: true
            }
          }
          this.changeWholeClientPostOrderForm(defaultForm)
          this.changeOrderPostingDone(false)
          this.changeClientPostOrderForm({
            key: 'email',
            subKey: null,
            val: email,
            option: null
          })
        }
        this.componentsLoaded = true
      }
    }
  },
  created () {
    if (process.env.VUE_ENV === 'client') {
      if (!authMixin.tokenIsValid()) {
        this.$router.push('/')
      } else {
        /* Check if the level is  */
        if (this.clientPostOrderForm.level === 2 && this.clientPostOrderForm.type === 'public') {
          this.getOrderBids = true
          setTimeout(() => {
            this.getOrderBids = false
          }, 500)
        }
        this.getStates()
        if (process.env.VUE_ENV === 'client') {
          window.scrollTo(0, 0)
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">

@import "../../styles/mixins/general";

@import "../../styles/general/general";

#continue_btn_step_1, #continue_btn_step_3, #continue_btn_step_4 {
  @include darkGreenBlueBtnConfig(100%, white, $primaryDarkGreenBlueColor);
}

#back_btn_step_2, #back_btn_step_2_, #back_btn_step_2__, #back_btn_step_3, #back_btn_step_4 {
  @include darkGreenBlueBtnConfig(auto, $primaryDarkGreenBlueColor, white);
}

#continue_btn_step_2 {
  @extend #continue_btn_step_1;
}

.continue-btn-col {
  margin-right: 75px
}

.accept-btn {
  @include darkGreenBlueBtnConfig(auto, white, $paymentButtonColor)
}

</style>
