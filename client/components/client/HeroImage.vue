<!--The hero image of the application.-->
<template>
  <v-card
    class="hero_image rounded-0"
    flat
  >
    <v-card-text>
      <v-container>
        <v-row
          :style="screenIsXL ? 'margin-left: 13vw; margin-right: 15vw;' : ''"
          no-gutters
        >
          <v-col
            cols="12"
            lg="5"
            md="5"
            sm="4"
            xl="5"
          >
            <p
              id="sit_back_relax"
              :class="textH5"
            >
              {{ clientPostOrderForm.type && clientPostOrderForm.type === 'private' ? mainHeroPub : mainHero }}
            </p>
            <p
              id="we_offer_exemplary_service"
              :class="textSubTitle1"
            >
              {{ clientPostOrderForm.type && clientPostOrderForm.type === 'private' ? subHeroPub : subHero }}
              <br>
              {{ subHeroNewLine }}
            </p>
            <client-only>
              <v-row
                v-if="viewportCode !== 'xs'"
                justify="center"
              >
                <v-img
                  :height="clientPostOrderForm.type && clientPostOrderForm.type === 'private' ? null : 300"
                  :src="require('~/assets/exams.svg')"
                  class="mt-4"
                >
                  <template v-slot:placeholder>
                    <v-row
                      align="center"
                      class="fill-height ma-0"
                      justify="center"
                    >
                      <v-progress-circular
                        color="teal darken-3"
                        indeterminate
                      />
                    </v-row>
                  </template>
                </v-img>
              </v-row>
            </client-only>
          </v-col>
          <v-col
            cols="12"
            lg="2"
            md="1"
            sm="1"
            xl="2"
          />
          <v-col
            cols="12"
            lg="5"
            md="6"
            sm="7"
            xl="5"
          >
            <v-card
              id="client_post_order_card"
              flat
            >
              <v-card-title
                id="client_post_order_card_title"
                :class="textH5"
                :style="{ 'padding-left': clientPostOrderCardTextPadding,
                          'padding-right': clientPostOrderCardTextPadding}"
              >
                <template v-if="clientPostOrderForm.type && clientPostOrderForm.type === 'private'">
                  Boost Your Grades
                </template>
                <template v-else>
                  Unlock Your Potential
                </template>
              </v-card-title>
              <br v-if="clientPostOrderForm.type && clientPostOrderForm.type === 'private'">
              <v-form
                ref="clientPostOrderForm"
                @submit.prevent=""
              >
                <v-card-text
                  id="client_post_order_card_text"
                  :style="{ 'padding-left': clientPostOrderCardTextPadding,
                            'padding-right': clientPostOrderCardTextPadding,
                            'padding-bottom': clientPostOrderCardTextPadding}"
                  class="mt-n4"
                >
                  <label class="text_field_label">Email</label>
                  <v-text-field
                    v-model="clientPostOrderForm.email"
                    :rules="validate.emailField"
                    class="text-field"
                    flat
                    label="Enter your email address"
                    solo
                    type="email"
                    @keyup.enter="proceedToPlaceOrder"
                  />
                  <!--                  It is broken down into two instances: Public and private-->
                  <!--                  The public instance allows a client to specify order details-->
                  <template v-if="clientPostOrderForm.type && clientPostOrderForm.type === 'private'">
                    <template v-if="pageFullyLoaded">
                      <br>
                      <label class="text_field_label">Assignment Type</label>
                      <v-select
                        v-model="clientPostOrderForm.assignmentType"
                        :items="assignmentTypes"
                        :rules="validate.assignmentTypeField"
                        chips
                        class="text-field"
                        data-cy="assignment-type-input-hero"
                        deletable-chips
                        discipline-input
                        flat
                        item-text="type"
                        item-value="id"
                        label="Select the assignment type"
                        solo
                      />
                      <br>
                      <label class="text_field_label">Number of pages</label>
                      <br>
                      <v-btn-toggle
                        v-model="toggleNumOfPages"
                        mandatory
                        style="width: 100%"
                      >
                        <v-btn
                          :disabled="clientPostOrderForm.pageCount === 1"
                          class="num-of-pages-buttons"
                          outlined
                          @click="changePageCount('remove')"
                        >
                          <v-icon>remove</v-icon>
                        </v-btn>
                        <v-text-field
                          v-model="clientPostOrderForm.pageCount"
                          class="num-of-pages-text-field"
                          flat
                          solo
                          @keypress="validateNumOfPages"
                        />
                        <v-btn
                          id="num-of-pages-buttons-client-add-hero"
                          class="num-of-pages-buttons"
                          outlined
                          @click="changePageCount('add')"
                        >
                          <v-icon>add</v-icon>
                        </v-btn>
                      </v-btn-toggle>
                      <span
                        v-if="numOfPagesError.status"
                        id="numOfPagesError"
                      > {{ numOfPagesError.message }} </span>
                      <br>
                      <br>
                      <label class="text_field_label">
                        Deadline:
                        <assignment-deadline
                          :deadline="orderDeadline"
                          color="#007991"
                        />
                      </label>
                      <v-row no-gutters>
                        <v-col
                          cols="6"
                          lg="6"
                          md="6"
                          sm="6"
                          xl="6"
                        >
                          <v-menu
                            ref="deadline_date_menu"
                            v-model="deadlineDateMenu"
                            :close-on-content-click="false"
                            max-width="400"
                            offset-y
                            transition="scale-transition"
                          >
                            <template v-slot:activator="{ on }">
                              <v-text-field
                                v-model="clientPostOrderForm.deadlineDate"
                                :rules="validate.deadlineDate"
                                append-icon="mdi-calendar"
                                class="text-field"
                                color="#007991"
                                flat
                                label="Date"
                                readonly
                                solo
                                v-bind="attrs"
                                v-on="on"
                              />
                            </template>
                            <v-date-picker
                              v-model="clientPostOrderForm.deadlineDate"
                              :min="currentDate"
                              color="#007991"
                              no-title
                              @input="deadlineDateMenu = false"
                            />
                          </v-menu>
                        </v-col>
                        <v-col
                          cols="1"
                          lg="1"
                          md="1"
                          sm="1"
                          xl="1"
                        />
                        <v-col
                          cols="5"
                          lg="5"
                          md="5"
                          sm="5"
                          xl="5"
                        >
                          <v-select
                            id="deadline-time"
                            v-model="clientPostOrderForm.deadlineTime"
                            :disabled="!clientPostOrderForm.deadlineDate"
                            :items="filteredTimeInAmPm"
                            :rules="validate.deadlineTime"
                            append-icon="schedule"
                            class="text-field"
                            color="#007991"
                            data-cy="deadline-time-input-hero"
                            flat
                            item-text="time"
                            item-value="id"
                            label="Time"
                            solo
                            style="height: 50px"
                          />
                        </v-col>
                        <br v-if="clientPostOrderForm.type && clientPostOrderForm.type === 'private'">
                      </v-row>
                    </template>
                    <template v-else>
                      <br>
                      <label class="text_field_label">Assignment Type</label>
                      <v-text-field
                        class="text-field"
                        flat
                        label="Select the assignment type"
                        solo
                        type="text"
                      />
                      <br>
                      <label class="text_field_label">Number of pages</label>
                      <br>
                      <v-text-field
                        class="text-field"
                        flat
                        label="Number of pages"
                        solo
                        type="text"
                      />
                      <br>
                      <label class="text_field_label" />
                      Deadline:
                      <v-text-field
                        class="text-field"
                        flat
                        label="Deadline date"
                        solo
                        type="text"
                      />
                      <v-row no-gutters>
                        <v-col
                          cols="12"
                          lg="12"
                          md="12"
                          sm="12"
                          xl="12"
                        >
                          <p
                            id="by_clicking_paragraph2"
                            :class="textCaption"
                          >
                            By clicking "Get Started", you agree to our Terms of Service and Privacy Policy. You also
                            agree
                            to receive bonuses, discounts and promotional materials.
                          </p>
                        </v-col>
                      </v-row>
                    </template>
                  </template>
                  <!--                  While the private instance only requires an email address-->
                  <template>
                    <v-row no-gutters>
                      <v-col
                        id="continue_btn_col"
                        cols="12"
                        lg="12"
                        md="12"
                        sm="12"
                        xl="12"
                      >
                        <v-btn
                          id="continue_btn"
                          @click="proceedToPlaceOrder()"
                        >
                          <span
                            class="text-subtitle-1 text-xl-subtitle-1 text-lg-subtitle-1
              text-md-subtitle-1 text-sm-subtitle-1"
                          >Get Started</span>
                          <v-icon color="white">
                            keyboard_arrow_right
                          </v-icon>
                        </v-btn>
                      </v-col>
                      <v-col
                        cols="12"
                        lg="12"
                        md="12"
                        sm="12"
                        xl="12"
                      >
                        <p
                          :class="textCaption"
                          class="by_clicking_paragraph"
                        >
                          By clicking "Get Started", you agree to our Terms of Service and Privacy Policy. You also
                          agree
                          to receive bonuses, discounts and promotional materials.
                        </p>
                      </v-col>
                    </v-row>
                  </template>
                </v-card-text>
              </v-form>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
    <!--    Overlay loader-->
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

/* The validation rules for the form */
import Validation from '../../plugins/Validation.ts'

/* A shared registration mixin that contains the number of pages checker function among others */
import registrationMixin from '../../mixins/registration'

/* A Time utility that holds the central application date and time to ensure uniformity (queries the date and time
from the backend to ensure that all clients have the correct date and times) */
import Time from '../../utils/time'

import { mapGetters, mapActions, mapMutations } from 'vuex'

import { bus } from '@/plugins/bus'
import api from '@/api/api.ts'

import AssignmentDeadline from '@/components/client/AssignmentDeadline'
import TimeMixin from '@/mixins/time'
import DeadlineTimeDisabler from '../../mixins/deadlineTimeDisabler'
import login from '../../mixins/login'

export default {
  name: 'HeroImageClient',
  components: {
    AssignmentDeadline
  },
  mixins: [DeadlineTimeDisabler, login],
  props: {
    textCaption: {
      type: String,
      required: true
    },
    textH5: {
      type: String,
      required: true
    },
    textSubTitle1: {
      type: String,
      required: true
    },
    subHero: {
      type: String,
      required: true
    },
    mainHero: {
      type: String,
      required: true
    },
    clientPostOrderCardTextPadding: {
      type: String,
      required: true
    },
    viewportCode: {
      type: String,
      required: true
    },
    pageFullyLoaded: {
      type: Boolean,
      required: true
    },
    mainHeroPub: {
      type: String,
      required: true
    },
    subHeroPub: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      subHeroNewLine: '',
      breakPointName: null,
      toggleNumOfPages: undefined,
      numOfPages: 1,
      deadlineDateMenu: false,
      formFields: ['email', 'assignmentType', 'pageCount', 'deadlineDate', 'deadlineTime'],
      numOfPagesError: {
        status: false,
        message: ''
      },
      validate: Validation,
      currentDate: null,
      overlay: false,
      statesLoaded: {
        time: false,
        disciplines: false
      },
      stateReloadCount: 0,
      registerClientCalled: false,
      disabledTimes: [],
      break_point_name: null,
      attrs: {
        class: 'mb-6',
        boilerplate: true,
        elevation: 2
      }
    }
  },
  computed: {
    screenIsXL () {
      let val
      switch (this.$vuetify.breakpoint.name) {
        case 'xl':
          val = true
          break
        default:
          val = false
      }
      return val
    },
    ...mapGetters({
      assignmentTypes: 'assignmentTypes',
      time: 'timeAmPm',
      clientPostOrderForm: 'clientPostOrderForm',
      client: 'client',
      loginStatus: 'loginStatus'
    }),
    filteredTimeInAmPm () {
      return this.time.map(item => {
        return {
          id: item.id,
          time: item.time,
          disabled: this.disabledTimes.includes(item)
        }
      })
    },
    orderDeadline () {
      if (this.clientPostOrderForm.deadlineTime) {
        const TARGET_DEADLINE_TIME = this.time.filter(time => time.id === this.clientPostOrderForm.deadlineTime)[0].time
        const TIME_IN_24HRS = TimeMixin.deadlineHoursAmPm(TARGET_DEADLINE_TIME)
        return TimeMixin.deadline(this.clientPostOrderForm.deadlineDate, TIME_IN_24HRS)
      } else {
        return null
      }
    }
  },
  watch: {
    deadlineDateMenu () {
      if (!this.deadlineDateMenu) {
        this.disablePossibleDeadlineTimes()
      }
    }
  },
  mounted () {
    if (this.clientPostOrderForm.type === 'private') {
      /* We only get the states if the type of client is public */
      this.getStates()
    }
    const DATE_TIME = new Time.DateTime()
    this.currentDate = DATE_TIME.date()
    bus.$on('registerClient', (val, email) => {
      if (!this.registerClientCalled) {
        this.registerClientCalled = true
        if (val) {
          this.registerClient(true, email)
        }
      }
    })
    this.disablePossibleDeadlineTimes()
  },
  methods: {
    ...mapActions({
      getAssignmentTypes: 'getAssignmentTypes',
      getTime: 'getTime',
      getServiceType: 'getServiceType',
      getExtraServiceTypes: 'getAssignmentTypes',
      getOrderStudyLevels: 'getOrderStudyLevels'
    }),
    ...mapMutations({
      changeClientPostOrderForm: 'changeClientPostOrderForm',
      changeLoginStatus: 'changeLoginStatus',
      changeClient: 'changeClient',
      changeAccessToken: 'changeAccessToken',
      changeRefreshToken: 'changeRefreshToken',
      changeEmail: 'changeEmail',
      changeLoginDialogContents: 'changeLoginDialogContents',
      changeLoginDialog: 'changeLoginDialog',
      changeClientGotStarted: 'changeClientGotStarted'
    }),
    async proceedToPlaceOrder () {
      if (this.$refs.clientPostOrderForm.validate()) {
        const ORDER_DETAILS_SAVED = await this.processOrderDetails()
        if (ORDER_DETAILS_SAVED) {
          if (this.loginStatus) {
            if (this.clientPostOrderForm.type && this.clientPostOrderForm.type === 'private') {
              await this.$router.push('/client/place-order')
            } else {
              await this.$router.push('/client/writers')
            }
          } else {
            this.overlay = true
            await this.registerClient(false, this.clientPostOrderForm.email)
          }
        }
      }
    },
    async processOrderDetails () {
      this.overlay = true
      const VALIDATE_PAGE_COUNT = registrationMixin.validateNumOfPages(this.clientPostOrderForm.pageCount)
      if (VALIDATE_PAGE_COUNT.status) {
        return await this.saveOrderDetails()
      } else {
        return this.showPageValidationError(VALIDATE_PAGE_COUNT.message)
      }
    },
    /**
     * Saves the order details in the vuex state
     * @returns {Promise<boolean>} - The value of the 'processOrderDetails' function - which is a parent function.
     * It is true because this function is in itself handling a successful page count validation
     */
    async saveOrderDetails () {
      /* Loop through the form-fields and save their values on the state */
      await this.formFields.forEach(field => {
        this.changeClientPostOrderForm({
          key: field,
          subKey: null,
          val: this.clientPostOrderForm[field],
          option: null
        })
      })
      return true
    },
    /**
     * Displays the error that arises from the page count validation
     * @param {string} validationError
     * @returns {boolean} - The value of the 'processOrderDetails' function - which is a parent function.
     * It is false because this function is in itself handling an error in page count validation
     */
    showPageValidationError (validationError) {
      this.numOfPagesError.status = true
      this.numOfPagesError.message = validationError
      this.overlay = false
      setTimeout(() => {
        this.numOfPagesError.status = false
        this.numOfPagesError.message = ''
      }, 3000)
      this.overlay = false
      return false
    },
    /* TODO: To move the register functionality to a mixin to remove the use of the event bus */
    /**
     * Registers a user
     * @param {boolean} calledFromBaseDialog - The function can be called in two ways, one from within this component
     * and secondly by triggering the 'registerClient' event from the base dialog. This helps determine the page to
     * redirect user to.
     * @param {string} email - User email address
     * @returns {void}
     */
    async registerClient (calledFromBaseDialog, email) {
      await api.postRequest('auth/v1/register_user', {
        userType: 'Client',
        email: email,
        loginType: 'Email'
      })
        .then(async registerUserResponse => {
          const REGISTRATION_STATUS = registerUserResponse.response
          /* There are two options here:
          * 1. The user is new. He/she is therefore registered before getting access tokens to proceed
          * 2. The user is not new, here should be prompted to log in */
          /* Option 2: Prompt the 'not new' user to log in in case an account already exists */
          /* FIXME: How can a user who is not new find himself/herself here? (like scenarios)? */
          if (REGISTRATION_STATUS === 'success' && !registerUserResponse.isNew) {
            await this.submitExistingUserEmail(email)
          } else {
            this.overlay = false
            this.setClientSessionVariables({
              calledFromBaseDialog: calledFromBaseDialog,
              registerUserResponse: REGISTRATION_STATUS
            })
          }
        })
        .catch(error => {
          return Promise.reject(error)
        })
    },
    /**
     * In case a user who wants to register already has his or here email registered, submit the email for login
     * @param {string} email - User email
     * @returns {void}
     */
    async submitExistingUserEmail (email) {
      await api.postRequest('auth/v1/submit_login_email', {
        email: email
      })
        .then(async loginResponse => {
          /* On logging in, there are two scenarios:
          * 1. The user is a client
          * 2. The user is not a client - could be a writer. Mind you both writers and clients share the platform */
          /* In the first case, there are two more scenarios:
          * 1. The user has already set a password before
          * 2. The user had registered and was given access tokens for the first time and therefore is yet to
          * set his/her password */
          /* IMPORTANT: Once a user has signed up or registered for an account with us, he/she is not prompted
          * to create a password first. The password creation comes the second time he/she wants to log in. */
          /* TODO: To combine the 'canLogIn, shouldSetPass' etc. functionality with that in BaseDialogs */
          if (loginResponse.type === 'Client' && loginResponse.canLogIn) {
            this.promptUserToEnterPassword(email)
          } else if (loginResponse.type === 'Client' && loginResponse.shouldSetPass) {
            /* In this case, a user is registered but is yet to set the password. So we show him/her the option
            * to set the password on the login dialog by calling the function below */
            this.shouldSetPass(loginResponse.message)
            this.overlay = false
          } else if (loginResponse.type === 'NonClient') {
            this.showNonClientNotification(email)
          }
        })
        .catch(() => {
          /* Close the overlay and log the error
          * TODO: To handle the error */
          this.overlay = false
        })
    },
    /**
     * Prompts the user to sign in. This is done by opening a dialog that will prompt the user to enter the password.
     * The form that we are using to sign in is in another component. That's why we are using the
     * updateLoginForm listener to prompt that element to update the email in the form to prevent
     * the user from entering again, yet we already have his/her email address
     * @param {string} email - Client email
     * @returns {void}
     */
    promptUserToEnterPassword (email) {
      /* For clients who have already set their passwords and logged in by clicking the 'Get Started' button */
      this.changeClientGotStarted(true)
      /* TODO: To remove this event and use a mixin instead */
      setTimeout(() => {
        bus.$emit('updateLoginForm', email)
      }, 500)
      /* Here, we're now changing the contents of the login dialog in the state.
      * We start by disabling the submitEmail option (for cases when a user is prompted to enter
      * the email address before going ahead to enter the password) */
      this.changeLoginDialogContents({
        key: 'dialogContent',
        subKey: 'submitEmail',
        val: false,
        option: null
      })
      /* And turn on the login option. Here, the user has already submitted the email address and
      * is now being prompted to put the password */
      this.changeLoginDialogContents({
        key: 'dialogContent',
        subKey: 'login',
        val: true,
        option: null
      })
      this.overlay = false
      this.changeLoginDialog(true)
    },
    /**
     * shows existing users a notification why they are not allowed to log in here as clients.
     * This is because there are two other separate sub-systems for other users.
     * This one is specifically for users who are of type client
     * @param {string} email - Client email
     * @returns {void}
     */
    showNonClientNotification (email) {
      /* Here, all we do is update the login form with the email address that we have here */
      setTimeout(() => {
        bus.$emit('updateLoginForm', email)
      }, 500)
      this.changeLoginDialogContents({
        key: 'dialogContent',
        subKey: 'login',
        val: false,
        option: null
      })
      /* And display the contents of the submit email option of the dialog.
      * IMPORTANT: The login dialog is customized for different scenarios. It is a dialog that
      * can be used to exclusively:
      * 1. Prompt a user to enter the email address
      * 2. Enter a password
      * 3. Show notifications
      * 4. Prompt a user to change/set the password
      *
      * Because of such, it was designed to take in the structure below:
      *       dialogTitle: 'Log in to your account',
              dialogContent: {
                submitEmail: true,
                login: false,
                notification: false,
                notificationMessage: null,
                loginInfo: null,
                clientLogin: false,
                setPassword: false
              }
      *
      * As evident, we have the title, which has a default - but can be changed depending on the 4
      * scenarios above.
      *The content has various options, with case 1 being taken care of by the
      * 'submitEmail' option while case is handled by the 'login' option. Case 3 and 4 are handled
      * by the 'notification' and 'setPassword' option.
      * FIXME: Make these options to be one, with its value changing. For example we can have a variable
      *  named option that can either be 'login', 'notification' or 'setPassword' et
      * */
      this.changeLoginDialogContents({
        key: 'dialogContent',
        subKey: 'submitEmail',
        val: true,
        option: null
      })
      /* Disable the overlay and display the login dialog */
      this.overlay = false
      this.changeLoginDialog(true)
    },
    /**
     * Shows the user a notification to set a password and then prompts him/her to do so 5 seconds later
     * @param {string} message - Notification to show to user
     * @returns {void}
     */
    shouldSetPass (message) {
      this.showSetPassNotification(message)
      this.showSetPasswordDialog()
    },
    /**
     * Shows user the notification that he/she needs to set a password. The login dialog can accommodate
     * various interfaces - logging  in, setting passwords and showing notifications
     * @param {string} message - Notification to show to user
     * @returns {void}
     */
    showSetPassNotification (message) {
      this.changeLoginDialogContents({
        key: 'dialogContent',
        subKey: 'submitEmail',
        val: false,
        option: null
      })
      this.changeLoginDialogContents({
        key: 'dialogContent',
        subKey: 'notificationMessage',
        val: message
      })
      this.changeLoginDialogContents({
        key: 'dialogContent',
        subKey: 'notification',
        val: true,
        option: null
      })
      this.changeLoginDialog(true)
    },
    showSetPasswordDialog () {
      setTimeout(() => {
        this.changeLoginDialogContents({
          key: 'dialogContent',
          subKey: 'notification',
          val: false,
          option: null
        })
        this.changeLoginDialogContents({
          key: 'dialogTitle',
          subKey: null,
          val: 'Set your password'
        })
        this.changeLoginDialogContents({
          key: 'dialogContent',
          subKey: 'submitEmail',
          val: false,
          option: null
        })
        this.changeLoginDialogContents({
          key: 'dialogContent',
          subKey: 'setPassword',
          val: true,
          option: null
        })
      }, 5000)
      /* FIXME: As hinted earlier, there is need to harmonize the loginDialogsContent state to make it more dynamic
      * by introducing one field whose values will be dynamic as opposed to the many boolean options */
    },
    /**
     * This function is the one that logs in the user after successfully logging in on the back-end
     * Mind you this is a stateless authentication but with a client session. The function sets the client
     * session variables
     * @param {{registerUserResponse, calledFromBaseDialog}} clientDetails - Client details
     * @returns {void}
     */
    setClientSessionVariables (clientDetails) {
      switch (clientDetails.registerUserResponse) {
        /* We only act on the success option */
        case 'success':
          this.loginCurrentUser(clientDetails.registerUserResponse, 'Email')
          /* TODO: To confirm the role of the redirected variable */
          if (clientDetails.calledFromBaseDialog) {
            if (this.$route.fullPath !== '/') {
              this.$router.push('/')
            }
          } else {
            if (this.clientPostOrderForm.type && this.clientPostOrderForm.type === 'private') {
              this.$router.push('/client/place-order')
            } else {
              this.$router.push('/client/writers')
            }
          }
          this.overlay = false
          this.registerClientCalled = false
          break
        default:
          break
      }
    },
    /**
     * Adds or removes number of pages
     * @param {string} sign - Either 'remove' or 'add'
     * @returns {void}
     */
    changePageCount (sign) {
      const VALIDATE_PAGE_COUNT = registrationMixin.validateNumOfPages(this.clientPostOrderForm.pageCount)
      if (VALIDATE_PAGE_COUNT.status) {
        this.clientPostOrderForm.pageCount = VALIDATE_PAGE_COUNT.number
        switch (sign) {
          case 'add':
            this.clientPostOrderForm.pageCount += 1
            break
          case 'remove':
            this.clientPostOrderForm.pageCount -= 1
            break
          default:
            break
        }
        this.changeClientPostOrderForm({ key: 'pageCount', subKey: null, val: this.clientPostOrderForm.pageCount, option: null })
      } else {
        this.numOfPagesError.status = true
        this.numOfPagesError.message = VALIDATE_PAGE_COUNT.message
        setTimeout(() => {
          this.numOfPagesError.status = false
          this.numOfPagesError.message = ''
        }, 3000)
      }
    },
    validateNumOfPages () {
      setTimeout(() => {
        const VALIDATE_PAGE_COUNT = registrationMixin.validateNumOfPages(this.clientPostOrderForm.pageCount)
        if (!VALIDATE_PAGE_COUNT.status) {
          this.numOfPagesError.status = true
          this.numOfPagesError.message = VALIDATE_PAGE_COUNT.message
          setTimeout(() => {
            this.numOfPagesError.status = false
            this.numOfPagesError.message = ''
          }, 3000)
        }
      }, 0)
    },
    /* There have been few scenarios where initial attempts to get some states from the backend microservice failed
    * but succeeded after a refresh of the page. To counter this, this function makes several retries after every
    * 5 seconds to try and get the states again in case of an error. It does this until a given count is reached
    * before stopping. Mind you the real maximum count would be anywhere between 100/4 or thereabout  */
    reGetStates () {
      if (process.env && process.env.NODE_ENV === 'production') {
        setTimeout(() => {
          if (this.stateReloadCount < 100) {
            this.getStates()
          }
        }, 5000)
      }
      /* The reasoning behind the timeout was to try and buy time before the issue that could have
      * happened at the back-end to be resolved
      * TODO: To confirm the issue with the backend micro-service in as far as this is concerned so as to remove
      * this functionality */
    },
    /* Gets required states such as disciplines and time. The two states, for example, are needed to
    * make the hero image to function properly */
    async getStates () {
      this.stateReloadCount += 1
      this.getAssignmentTypes()
        .then(res => {
          this.statesLoaded.disciplines = res
        })
        .catch(() => {
          /* In case of failure, try re-getting the same */
          this.reGetStates()
        })
      this.getTime()
        .then(res => {
          this.statesLoaded.time = res
        })
        .catch(() => {
          this.reGetStates()
        })
    }
  }
}
</script>

<style lang="scss" scoped>

@import '../../styles/general/general';

@import '../../styles/mixins/general';

#client_post_order_card {
  background-color: white !important;
  border: 1px solid $primaryDarkGreenBlueColor;
  #client_post_order_card_text {
    #continue_btn_col {
      padding-top: 30px;
      #continue_btn {
        @include darkGreenBlueBtnConfig(100%, white, $primaryDarkGreenBlueColor);
      }
    }
    .by_clicking_paragraph{
      padding-top: 40px;
      line-height: 180%;
    }
  }

  .num-of-pages-text-field{
    border: 1px solid $primaryDarkGreenBlueColor;
    height: 50px;
    border-radius: 0;
    ::v-deep input{
      text-align: center !important;
    }
  }

  .num-of-pages-buttons{
    height: 50px;
    border: 1px solid $primaryDarkGreenBlueColor !important;
    @include darkGreenBlueBtnConfig(33.3333%, $primaryDarkGreenBlueColor, white);
    .v-icon {
      color: $primaryDarkGreenBlueColor !important;
    }
    span{
      color: black;
    }
  }

  #numOfPagesError {
    color: red;
    font-size: 14px;
  }
}

.hero_image {
  background-color: $primaryLightGreyColor;

  #sit_back_relax {
    line-height: 150%;
    color: black;
  }
  #we_offer_exemplary_service{
    padding-top: 20px;
    padding-bottom: 20px;
    line-height: 200%;
  }
}

</style>
