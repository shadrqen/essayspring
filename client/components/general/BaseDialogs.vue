<!--Component that holds the primary dialogs in the navigation bar - for now.-->
<!--TODO: To include other dialogs from other components so as to have one dialog component-->
<template>
  <v-app>
    <!--    There are two dialogs, for now. The login and the report problem dialogs.-->
    <!--    The login dialog has been specifically customized to handle different scenarios that range-->
    <!--    from prompting user to submit email, enter password, change password to even displaying just-->
    <!--    notifications. Every field in this dialog is dynamic, including the title-->
    <v-dialog
      v-model="loginDialog"
      :fullscreen="viewportCode === 'xs'"
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
            v-text="loginDialogContents.dialogTitle"
          />
          <v-spacer />
          <v-toolbar-items>
            <v-btn
              dark
              icon
              @click="closeLoginDialog"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <!--          FIXME: Find a way to notify the user that we are logging him as a client, and not a writer-->
        <v-card-text style="padding-bottom: 20px">
          <template v-if="loginDialogContents.dialogContent.submitEmail">
            <v-form
              ref="submitEmailForm"
              @submit.prevent=""
            >
              <br>
              <v-text-field
                id="loginEmail"
                v-model="loginForm.email"
                :rules="validate.emailField"
                class="text-field"
                data-test-id="login-email-field"
                flat
                label="Enter your email"
                solo
                type="email"
                @keyup.enter="submitEmail"
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
                :disabled="submitEmailOngoing"
                data-test-id="login-email-button"
                outlined
                @click="submitEmail"
              >
                <div
                  v-if="submitEmailOngoing"
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
                > Continue </span>
              </v-btn>
              <div>
                <p class="text-caption text-xl-caption text-lg-caption text-md-caption text-sm-caption pt-3">
                  By clicking "Continue", you agree to our
                  <span
                    class="tos_privacy"
                    @click="openTermsOfServiceOrPrivacy('/general/terms-and-conditions')"
                  >Terms of Service</span>
                  and <span
                    class="tos_privacy"
                    @click="openTermsOfServiceOrPrivacy('/general/privacy-policy')"
                  >Privacy Policy</span>.
                  We'll occasionally send you promo and account related emails.
                </p>
              </div>
              <div>
                <h4 id="or-login-separator">
                  OR
                </h4>
              </div>
              <div class="pt-6">
                <v-btn
                  id="continue_with_google"
                  :disabled="disableLoginGoogle"
                  outlined
                  @click="loginGoogle"
                >
                  <div
                    v-if="disableLoginGoogle"
                    class="lds-ellipsis"
                  >
                    <div style="background: #007991" />
                    <div style="background: #007991" />
                    <div style="background: #007991" />
                    <div style="background: #007991" />
                  </div>
                  <div v-else>
                    <div style="float: left;">
                      <v-img
                        :src="require('~/assets/google.png')"
                        max-height="26"
                        max-width="26"
                      />
                    </div>
                    <div style="margin-top: 3px; margin-left: 30px">
                      <b class="text-body-2 text-xl-body-2 text-lg-body-2 text-md-body-2 text-sm-body-2">
                        Continue with Google </b>
                    </div>
                  </div>
                </v-btn>
              </div>
              <div style="padding-top: 20px">
                <!--                  <div class="fb-login-button" data-width="" data-size="large" data-button-type="continue_with" data-layout="default" data-auto-logout-link="false" data-use-continue-as="false"></div>-->
                <v-btn
                  id="continue_with_facebook"
                  :disabled="disableLoginFacebook"
                  class="mb-2"
                  outlined
                  @click="loginFacebook"
                >
                  <div
                    v-if="disableLoginFacebook"
                    class="lds-ellipsis"
                  >
                    <div style="background: #007991" />
                    <div style="background: #007991" />
                    <div style="background: #007991" />
                    <div style="background: #007991" />
                  </div>
                  <div v-else>
                    <div style="float: left;">
                      <v-img
                        :src="require('~/assets/facebook.png')"
                        max-height="26"
                        max-width="26"
                      />
                    </div>
                    <div style="margin-top: 3px; margin-left: 30px">
                      <b class="text-body-2 text-xl-body-2 text-lg-body-2 text-md-body-2 text-sm-body-2">
                        Continue with Facebook </b>
                    </div>
                  </div>
                </v-btn>
              </div>
            </v-form>
          </template>
          <template v-if="loginDialogContents.dialogContent.setPassword">
            <v-form
              ref="changePasswordForm"
              @submit.prevent=""
            >
              <v-text-field
                id="otpCode"
                v-model="setPasswordForm.otpCode"
                :rules="validate.optCodeField"
                class="mt-2"
                label="OTP Code"
                @keyup.enter="setPassword"
              />
              <v-text-field
                id="setPassword"
                v-model="setPasswordForm.password"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="validate.registerPasswordField"
                :type="showPassword ? 'text' : 'password'"
                label="Password"
                style="padding-bottom: 10px"
                @click:append="showPassword = !showPassword"
                @keyup.enter="setPassword"
              />
              <v-text-field
                id="setPasswordRepeat"
                v-model="setPasswordForm.repeatPassword"
                :append-icon="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="validate.repeatPasswordField"
                :type="showConfirmPassword ? 'text' : 'password'"
                label="Confirm Password"
                style="padding-bottom: 10px"
                @keyup="checkPasswordSimilarity"
                @click:append="showConfirmPassword = !showConfirmPassword"
                @keyup.enter="setPassword"
              />
              <alert-message
                :error="errorObject"
                :success="successObject"
                class="mt-4"
              />
              <div class="mt-4">
                <v-alert
                  :value="true"
                  dense
                  dismissible
                  text
                  type="success"
                >
                  {{ emailNotification }}
                </v-alert>
              </div>
              <v-row>
                <v-spacer />
                <v-btn
                  id="resendCodeBtn"
                  ref="resendCode"
                  :disabled="resendCodeOngoing"
                  class="mr-3 mb-3"
                  outlined
                  @click="resendCode"
                >
                  <div
                    v-if="resendCodeOngoing"
                    class="lds-ellipsis"
                  >
                    <div style="background: #007991" />
                    <div style="background: #007991" />
                    <div style="background: #007991" />
                    <div style="background: #007991" />
                  </div>
                  <span
                    v-else
                    class="text-body-2 text-xl-body-2 text-lg-body-2 text-md-body-1 text-sm-body-2"
                  > Resend Code  </span>
                </v-btn>
              </v-row>
              <v-btn
                id="changePasswordBtn"
                ref="setPassword"
                :disabled="setPasswordOngoing"
                outlined
                @click="setPassword"
              >
                <div
                  v-if="setPasswordOngoing"
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
                > Submit  </span>
              </v-btn>
            </v-form>
          </template>
          <template v-if="loginDialogContents.dialogContent.login">
            <v-form
              ref="loginForm"
              @submit.prevent=""
            >
              <br>
              <div
                class="mb-6"
              >
                <v-chip
                  id="userEmailLoginChip"
                  color="#007991"
                  outlined
                  @click="goBackToSubmitEmail"
                >
                  <v-icon>person</v-icon>
                  {{ loginForm.email }}
                  <v-icon>expand_more</v-icon>
                </v-chip>
              </div>
              <v-text-field
                id="loginPassword"
                v-model="loginForm.password"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showPassword ? 'text' : 'password'"
                class="text-field"
                data-test-id="login-form-password"
                flat
                label="Password"
                solo
                style="padding-bottom: 10px"
                @click:append="showPassword = !showPassword"
                @keyup.enter="startLoggingIn(false)"
              />
              <span
                v-if="passwordRequired"
                style="color: red; font-size: 13px"
              >
                Password is required
              </span>
              <br>
              <alert-message
                :error="errorObject"
                :success="successObject"
              />
              <v-alert
                v-if="loginDialogContents.dialogTitle === 'Kindly log in by email'"
                :value="true"
                dismissible
                text
                type="error"
              >
                {{ loginDialogContents.dialogTitle }}
              </v-alert>
              <v-btn
                id="login_btn"
                :disabled="loginOngoing"
                class="mt-2"
                outlined
                @click="startLoggingIn(false)"
              >
                <div
                  v-if="loginOngoing"
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
                > Log In </span>
              </v-btn>
              <v-divider class="mt-8 mb-n3" />
              <v-row class="mt-3 mb-n4">
                <v-col
                  class="text-start text-xl-start text-lg-start text-sm-start text-md-start"
                  cols="6"
                  lg="5"
                  md="5"
                  sm="5"
                  xl="5"
                >
                  <span
                    id="forgotPassword"
                    @click="forgotPassword"
                  >
                    <template
                      v-if="forgotPasswordOngoing"
                      class="lds-ellipsis"
                    >
                      <v-progress-linear
                        color="#007991"
                        indeterminate
                      />
                    </template>
                    <template v-else>
                      Forgot password?
                    </template>
                  </span>
                </v-col>
                <v-col>
                  <span
                    style="cursor: pointer"
                    @click="redirect_to_url('privacy_policy')"
                  >Privacy</span>
                </v-col>
                <v-col class="text-end text-xl-end text-lg-end text-sm-end text-md-end">
                  <span
                    style="cursor: pointer"
                    @click="redirect_to_url('terms_and_conditions')"
                  >Terms</span>
                </v-col>
              </v-row>
            </v-form>
          </template>
          <template v-if="loginDialogContents.dialogContent.notification">
            <p
              class="text-h4 text-md-h6 text-sm-h5"
              style="margin-top: 20px;"
              v-text="loginDialogContents.dialogContent.notificationMessage"
            />
          </template>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="reportProblemDialog"
      eager
      max-width="700"
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
            v-text="'Report Problem'"
          />
          <v-spacer />
          <v-toolbar-items>
            <v-btn
              dark
              icon
              @click="closeReportProblemDialog"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-form
          ref="reportProblemForm"
          @submit.prevent=""
        >
          <v-card-text class="mt-2">
            <template v-if="reportProblemSucceeded">
              <success-check-mark :show="reportProblemSucceeded" />
            </template>
            <template v-else>
              <v-textarea
                v-model="problemForm.description"
                class="text-area"
                flat
                height="220"
                no-resize
                placeholder="Describe problem"
                solo
              />
              <div
                class="text_field mt-6"
                @click="pickFile"
                @drop="uploadFile"
                @dragover.prevent
                @drop.prevent
              >
                <input
                  id="problemFile"
                  ref="image"
                  accept=".pdf, .jpg, .jpeg, .png, .doc, .docx, video/*, audio/*"
                  style="display: none"
                  type="file"
                  @change="uploadFile"
                >
                <span v-if="supportingFileUploading">
                  <v-progress-circular
                    :size="30"
                    color="#007991"
                    indeterminate
                  />
                </span>
                <span v-else>
                  <v-icon>cloud_upload</v-icon>
                  Drag file here or click to upload
                </span>
              </div>
              <div
                v-if="problemForm.supportingFiles.length > 0"
                class="mt-4"
              >
                <div
                  v-for="(file, key) in problemForm.supportingFiles"
                  :key="key"
                  style="font-size: 15px; color: #403d3d;"
                >
                  <v-chip
                    class="ma-2"
                    close
                    @click:close="removeFile(file)"
                  >
                    {{ file.originalName }}
                  </v-chip>
                </div>
              </div>
            </template>
          </v-card-text>
          <v-divider />
          <v-card-actions>
            <v-row no-gutters>
              <v-col v-bind="attrs12">
                <alert-message
                  :error="errorObject"
                  :success="successObject"
                />
              </v-col>
              <v-col v-bind="attrs12">
                <v-spacer />
                <v-btn
                  id="submit-problem-btn"
                  :disabled="reportProblemBtnDisabled"
                  outlined
                  @click="submitProblem"
                >
                  <div
                    v-if="reportProblemOngoing"
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
                    <v-icon>mdi-check-circle-outline</v-icon> Submit
                  </span>
                </v-btn>
              </v-col>
            </v-row>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>

import { mapGetters, mapMutations } from 'vuex'
import Validation from '../../plugins/Validation'
import api from '../../api/api'
import { bus } from '../../plugins/bus'
import FacebookLogin from '../../services/facebook-login'
import registrationMixin from '../../mixins/registration'
import login from '../../mixins/login'

export default {
  name: 'GeneralDialogs',
  components: {
    SuccessCheckMark: () => import('../../components/general/SuccessCheckMark'),
    AlertMessage: () => import('../../components/general/AlertMessage')
  },
  mixins: [login],
  props: {
    viewportCode: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      validate: Validation,
      successObject: {
        value: false,
        message: null
      },
      errorObject: {
        value: false,
        message: null
      },
      disableLoginGoogle: false,
      disableLoginFacebook: false,
      loginOngoing: false,
      forgotPasswordOngoing: false,
      forgottenPassword: false,
      clientIsSettingPassword: false,
      clientIsChangingPassword: false,
      resendCodeOngoing: false,
      submitEmailOngoing: false,
      loginForm: {
        email: '',
        password: '',
        gotStarted: false
      },
      setPasswordForm: {
        email: null,
        otpCode: null,
        password: null,
        repeatPassword: null
      },
      problemForm: {
        supportingFiles: [],
        description: null
      },
      emailNotification: 'A verification code has been sent to your email. Kindly check to proceed within 10 minutes' +
        ' before expiry. Please check the SPAM folder if you can\'t see the email.',
      setPasswordOngoing: false,
      passwordRequired: false,
      reportProblemSucceeded: false,
      supportingFileUploading: false,
      reportProblemBtnDisabled: false,
      reportProblemOngoing: false,
      attrs12: {
        cols: 12,
        sm: 12,
        md: 12,
        lg: 12,
        xl: 12
      },
      showPassword: false,
      showConfirmPassword: false
    }
  },
  computed: {
    ...mapGetters({
      loginDialog: 'loginDialog',
      loginDialogContents: 'loginDialogContents',
      clientPostOrderForm: 'clientPostOrderForm',
      email: 'email',
      clientGotStarted: 'clientGotStarted',
      reportProblemDialog: 'reportProblemDialog'
    })
  },
  mounted () {
    FacebookLogin.fbInitSdk()
    bus.$on('updateLoginForm', val => {
      this.loginForm.email = val
    })
  },
  methods: {
    ...mapMutations([
      'changeLoginDialog',
      'changeLoginDialogContents',
      'changeLoginStatus',
      'changeAccessToken',
      'changeRefreshToken',
      'changeEmail',
      'changeClient',
      'changeClientPostOrderForm',
      'changeLoginMode',
      'changeOrderPostingDone',
      'changeClientGotStarted',
      'changeReportProblemDialog'
    ]),
    closeLoginDialog () {
      this.changeLoginDialog(false)
    },
    closeReportProblemDialog () {
      this.changeReportProblemDialog(false)
    },
    async setPassword () {
      if (this.$refs.changePasswordForm.validate()) {
        if (this.setPasswordForm.password === this.setPasswordForm.repeatPassword) {
          this.loginForm.email = this.loginForm.email || this.clientPostOrderForm.email
          this.setPasswordOngoing = true
          this.setPasswordForm.email = this.loginForm.email
          let endpoint
          if (this.forgottenPassword) {
            endpoint = 'reset_password'
          } else {
            endpoint = 'set_client_password'
          }
          await api.postRequest('auth/v1/'.concat(endpoint), this.setPasswordForm)
            .then(res => {
              if (res.status && res.message === 'Password updated') {
                this.changeLoginDialogContents({
                  key: 'dialogTitle',
                  subKey: null,
                  val: 'Password updated!'
                })
                this.changeLoginDialogContents({
                  key: 'dialogContent',
                  subKey: 'setPassword',
                  val: false,
                  option: null
                })
                this.changeLoginDialogContents({
                  key: 'dialogContent',
                  subKey: 'notificationMessage',
                  val: 'Password updated successfully'
                })
                this.changeLoginDialogContents({
                  key: 'dialogContent',
                  subKey: 'notification',
                  val: true,
                  option: null
                })
                setTimeout(() => {
                  this.changeLoginDialogContents({
                    key: 'dialogContent',
                    subKey: 'notification',
                    val: false,
                    option: null
                  })
                  this.changeLoginDialogContents({
                    key: 'dialogContent',
                    subKey: 'login',
                    val: true,
                    option: null
                  })
                }, 3000)
                this.setPasswordOngoing = false
              } else {
                this.setPasswordOngoing = false
                this.errorObject = {
                  value: true,
                  message: res.message
                }
                setTimeout(() => {
                  this.errorObject = {
                    value: false,
                    message: null
                  }
                }, 3000)
              }
            })
            .catch(() => {
              this.setPasswordOngoing = false
              this.errorObject = {
                value: true,
                message: 'Failed to set password'
              }
              setTimeout(() => {
                this.errorObject = {
                  value: false,
                  message: null
                }
              }, 3000)
            })
        } else {
          this.setPasswordOngoing = false
          this.errorObject = {
            value: true,
            message: 'Passwords don\'t match'
          }
          setTimeout(() => {
            this.errorObject = {
              value: false,
              message: null
            }
          }, 3000)
        }
      }
    },
    /* TODO: To use a module to do this */
    checkPasswordSimilarity () {
      const passwordsNotSimilar = this.setPasswordForm.password.length === this.setPasswordForm.repeatPassword.length &&
        this.setPasswordForm.password !== this.setPasswordForm.repeatPassword
      if (passwordsNotSimilar) {
        this.setPasswordOngoing = false
        this.errorObject = {
          value: true,
          message: 'Passwords don\'t match'
        }
        setTimeout(() => {
          this.errorObject = {
            value: false,
            message: null
          }
        }, 3000)
      } else {
        setTimeout(() => {
          this.errorObject = {
            value: false,
            message: null
          }
        }, 3000)
      }
    },
    async loginUser (payload) {
      bus.$emit('changeNavOverlay', true)
      this.loginOngoing = true
      await api.postRequest('auth/v1/login_user', payload)
        .then(res => {
          if (res.message === 'success') {
            this.loginCurrentUser(res)
            /* Important to note here is the fact that there is need to resume an order that was
            * pending completion by a client. The role of the orderPostingStep is to determine whether a
            * client had a pending order on his last log in or not. If the status of the variable is finished,
            * then we are ascertained that there is no pending order */
            if (res.orderPostingStep && res.orderPostingStep === 'Finished') {
              /* The clientGotStarted variable determines whether a client clicked on the 'Get Started' button
              * on the home to log in. This is because there are two ways of loggin a user in - the 'Get Started'
              * button and the Login button. A person who logs in through the 'Get Started' button needs
              * to be handled differently from that who logged in as evident below */
              if (this.clientGotStarted) {
                if (this.clientPostOrderForm.type && this.clientPostOrderForm.type === 'public') {
                  this.$router.push('/client/place-order')
                } else {
                  this.$router.push('/client/writers')
                }
                this.changeClientGotStarted(false)
                bus.$emit('changeNavOverlay', false)
              } else {
                this.changeOrderPostingDone(true)
                if (this.clientPostOrderForm.type && this.clientPostOrderForm.type === 'public') {
                  this.$router.push('/client/place-order')
                } else {
                  this.$router.push('/client/writers')
                }
                bus.$emit('changeNavOverlay', false)
              }
            } else {
              /* That's why we push the response as a parameter to the route below. The response contains
              * details about the last order that is unfinished - which needs to be resumed from */
              if (this.clientPostOrderForm.type && this.clientPostOrderForm.type === 'public') {
                this.$router.push({
                  name: 'client-place-order',
                  params: {
                    response: JSON.stringify(res)
                  }
                })
              } else {
                this.$router.push('/client/writers')
              }
              bus.$emit('changeNavOverlay', false)
            }
          } else {
            bus.$emit('changeNavOverlay', false)
            this.loginOngoing = false
            this.errorObject = {
              value: true,
              message: res.message
            }
            setTimeout(() => {
              this.errorObject = {
                value: false,
                message: null
              }
            }, 3000)
          }
        })
        .catch(() => {
          this.loginOngoing = false
          bus.$emit('changeNavOverlay', false)
        })
    },
    async startLoggingIn (isClient) {
      this.loginForm.gotStarted = this.clientGotStarted
      /* TODO: To confirm why the client is being logged in without a password */
      if (isClient) {
        await this.loginUser({
          userType: 'Client',
          email: this.loginForm.email
        })
      } else {
        if (this.$refs.loginForm.validate()) {
          if ([null, ''].includes(this.loginForm.password)) {
            this.passwordRequired = true
            setTimeout(() => {
              this.passwordRequired = false
            }, 2000)
          } else {
            await this.loginUser(this.loginForm)
          }
        }
      }
    },
    async submitProblem () {
      if (this.problemForm.description) {
        this.reportProblemOngoing = true
        this.reportProblemBtnDisabled = true
        await api.postRequest('users/v1/report_problem', this.problemForm)
          .then(response => {
            if (response) {
              this.reportProblemSucceeded = true
              this.reportProblemOngoing = false
              setTimeout(() => {
                this.reportProblemSucceeded = false
                this.changeReportProblemDialog(false)
                this.problemForm.description = null
                this.problemForm.supportingFiles = []
              }, 2000)
            } else {
              this.reportProblemBtnDisabled = false
              this.reportProblemOngoing = false
              this.errorObject.message = 'Failed to report the problem. Try again'
              this.errorObject.value = true
              setTimeout(() => {
                this.errorObject.message = null
                this.errorObject.value = false
              }, 3000)
            }
          })
          .catch(() => {
            this.errorObject.message = 'Failed to report the problem. Try again'
            this.errorObject.value = true
            setTimeout(() => {
              this.errorObject.message = null
              this.errorObject.value = false
            }, 3000)
            this.reportProblemBtnDisabled = false
            this.reportProblemOngoing = false
          })
      } else {
        this.errorObject.message = 'Kindly provide a description of the error'
        this.errorObject.value = true
        setTimeout(() => {
          this.errorObject.message = null
          this.errorObject.value = false
        }, 3000)
      }
    },
    async submitEmail () {
      if (this.$refs.submitEmailForm.validate()) {
        this.submitEmailOngoing = true
        await api.postRequest('auth/v1/submit_login_email', this.loginForm)
          .then(async res => {
            /* TODO: To harmonize the return object to remove redundancy (check object below)
            * {
                accountExists: true,
                type: 'Client',
                canLogIn: true,
                shouldSetPass: false
              }
            * */
            if (res.accountExists) {
              if (res.type === 'Client' && res.canLogIn) {
                this.changeLoginDialogContents({
                  key: 'dialogContent',
                  subKey: 'submitEmail',
                  val: false,
                  option: null
                })
                this.changeLoginDialogContents({
                  key: 'dialogContent',
                  subKey: 'login',
                  val: true,
                  option: null
                })
                if (process.env.NODE_ENV !== 'test') {
                  setTimeout(() => {
                    document.getElementById('loginPassword').focus()
                    document.getElementById('loginPassword').select()
                  }, 0)
                }
              } else if (res.type === 'Client' && res.shouldSetPass) {
                this.clientIsSettingPassword = true
                this.clientIsChangingPassword = false
                this.shouldSetPass(res.message)
              } else if (res.type === 'NonClient') {
                this.setAlertMessages('Email already used as a writer! Kindly use another email')
              } else {
                await this.startLoggingIn(true)
              }
              this.submitEmailOngoing = false
            } else {
              bus.$emit('registerClient', true, this.loginForm.email)
              setTimeout(() => {
                this.submitEmailOngoing = false
              }, 2000)
            }
          })
          .catch(() => {
            this.setAlertMessages('Error submitting email address. Kindly try again')
            this.submitEmailOngoing = false
          })
      }
    },
    /* Setting a password means changing the login dialog to allow a user to change a password.
    * As hinted in other areas, it involves switching off some options while turning on others
    * in the state. */
    shouldSetPass (message) {
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
    },
    openTermsOfServiceOrPrivacy (url) {
      if (this.$route.fullPath !== url) {
        this.$router.push(url)
      }
      this.changeLoginDialog(false)
    },
    async loginGoogle () {
      this.disableLoginGoogle = true
      await api.getRequest('auth/v1/google-api-url')
        .then(async response => {
          if (response.status) {
            location.href = response.url
          } else {
            this.disableLoginGoogle = false
          }
        })
        .catch(() => {
          this.disableLoginGoogle = false
        })
    },
    async loginFacebook () {
      this.disableLoginFacebook = true
      await FacebookLogin.checkLoginStatus()
        .then(res => {
          if (res.response === 'success' || res.message === 'success') {
            this.loginClient(res)
          } else {
            this.disableLoginFacebook = false
            this.errorObject.message = res.message
            this.errorObject.value = true
            setTimeout(() => {
              this.errorObject = {
                value: false,
                message: null
              }
            }, 3000)
          }
        })
        .catch(loginError => {
          if (loginError.message === 'User cancelled login or did not fully authorize') {
            this.errorObject.message = 'Failed! Please try again!'
            this.errorObject.value = true
            setTimeout(() => {
              this.errorObject = {
                value: false,
                message: null
              }
            }, 3000)
          }
          this.disableLoginFacebook = false
        })
    },
    async resendCode () {
      this.resendCodeOngoing = true
      let intention
      if (this.clientIsSettingPassword) {
        intention = 'set'
      } else if (this.clientIsChangingPassword) {
        intention = 'change'
      }
      await api.postRequest('auth/v1/resend_code', { email: this.loginForm.email, intention: intention })
        .then(response => {
          if (response.success) {
            this.changeLoginDialogContents({
              key: 'dialogContent',
              subKey: 'setPassword',
              val: false,
              option: null
            })
            this.changeLoginDialogContents({
              key: 'dialogContent',
              subKey: 'notification',
              val: true,
              option: null
            })
            this.resendCodeOngoing = false
            this.shouldSetPass(response.message)
          } else {
            this.errorObject = {
              value: true,
              message: 'Failed to send code. Kindly try again'
            }
            setTimeout(() => {
              this.errorObject = {
                value: false,
                message: null
              }
            }, 3000)
            this.resendCodeOngoing = false
          }
        })
        .catch(() => {
          this.resendCodeOngoing = false
          this.errorObject = {
            value: true,
            message: 'Failed to send code. Kindly try again'
          }
          setTimeout(() => {
            this.errorObject = {
              value: false,
              message: null
            }
          }, 3000)
        })
    },
    goBackToSubmitEmail () {
      this.changeLoginDialogContents({
        key: 'dialogContent',
        subKey: 'submitEmail',
        val: true,
        option: null
      })
      this.changeLoginDialogContents({
        key: 'dialogContent',
        subKey: 'login',
        val: false,
        option: null
      })
    },
    async forgotPassword () {
      this.forgotPasswordOngoing = true
      await api.postRequest('auth/v1/forgot_password', { email: this.loginForm.email })
        .then(response => {
          if (response.success) {
            this.clientIsSettingPassword = false
            this.clientIsChangingPassword = true
            this.forgottenPassword = true
            this.changeLoginDialogContents({
              key: 'dialogContent',
              subKey: 'login',
              val: false,
              option: null
            })
            this.shouldSetPass(response.message)
            this.forgotPasswordOngoing = false
          } else {
            this.errorObject = {
              value: true,
              message: 'Failed to send code. Kindly try again'
            }
            setTimeout(() => {
              this.errorObject = {
                value: false,
                message: null
              }
            }, 3000)
            this.forgotPasswordOngoing = false
          }
        })
        .catch(() => {
          this.errorObject = {
            value: true,
            message: 'Failed to send code. Kindly try again'
          }
          setTimeout(() => {
            this.errorObject = {
              value: false,
              message: null
            }
          }, 3000)
          this.forgotPasswordOngoing = false
        })
    },
    /* Changing the dialog content looks long and untidy. Plans are currently underway to make the property
    * a bit clearer and cleaner  */
    redirect_to_url (link) {
      /* Checking whether the clicked url is redundant */
      if (link === '/') {
        if (this.$route.fullPath !== link) {
          this.$router.push(link)
        }
        this.navbarIcon = false
      } else {
        if (link === 'close_nav_dialog') {
          this.navbarIcon = false
        } else {
          const linkWithHash = '/' + link // so as to use in the if statement below
          if (this.$route.fullPath !== linkWithHash) {
            if (link === 'login') {
              this.changeLoginDialogContents({
                key: 'dialogTitle',
                subKey: null,
                val: 'Log in to your account'
              })
              this.changeLoginDialogContents({
                key: 'dialogContent',
                subKey: 'submitEmail',
                val: true
              })
              this.changeLoginDialogContents({
                key: 'dialogContent',
                subKey: 'login',
                val: false
              })
              this.changeLoginDialogContents({
                key: 'dialogContent',
                subKey: 'notification',
                val: false
              })
              this.changeLoginDialogContents({
                key: 'dialogContent',
                subKey: 'setPassword',
                val: false
              })
              this.changeLoginDialog(true)
              setTimeout(() => {
                if (!['xs', 'sm'].includes(this.viewportCode)) {
                  document.getElementById('loginEmail').focus()
                  document.getElementById('loginEmail').select()
                }
              }, 0)
            } else {
              this.$router.push(link)
              this.navbarIcon = false
            }
          }
        }
      }
    },
    removeFile (file) {
      const index = this.problemForm.supportingFiles.map(function (e) {
        return e.fileUrl
      }).indexOf(file.fileUrl)
      if (index > -1) {
        this.problemForm.supportingFiles.splice(index, 1)
      }
    },
    pickFile () {
      this.$refs.image.click()
    },
    async uploadFile (e) {
      const files = e.target.files || e.dataTransfer.files
      /* The function only accepts a given set of file types indicated on the confirmFileMimeType function */
      if (registrationMixin.confirmFileMimeType(e)) {
        if (!files.length) { return }
        this.supportingFileUploading = true
        const file = document.getElementById('problemFile').files[0]
        const fileForm = new FormData()
        fileForm.append('file', file)
        await api.postRequest('users/v1/upload_file', fileForm)
          .then(res => {
            if (!res.error) {
              this.problemForm.supportingFiles.push({
                fileUrl: res.filename,
                originalName: file.name
              })
            }
            this.supportingFileUploading = false
          })
          .catch(() => {
            this.supportingFileUploading = false
          })
      } else {
        alert('File format not supported')
      }
    },
    setAlertMessages (message) {
      this.errorObject.message = message
      this.errorObject.value = true
      setTimeout(() => {
        this.errorObject.message = null
        this.errorObject.value = false
      }, 3000)
    }
  }
}
</script>

<style lang="scss" scoped>

@import '../../styles/general/general';

@import "../../styles/mixins/general";

#submit_email_btn, #changePasswordBtn{
  @include darkGreenBlueBtnConfig(100%, white, $primaryDarkGreenBlueColor);
}

#login_btn{
  @include darkGreenBlueBtnConfig(100%, white, $primaryDarkGreenBlueColor);
}

#continue_with_facebook{
  @include commonBtnConfig('auto', 100%, #1877f2, white)
}

#continue_with_google{
  @include commonBtnConfig('auto', 100%, rgb(0 97 235), white)
}

#continue_with_google2 {
  @include commonBtnConfig('auto', 100%, white, #4283E8);
  margin-bottom: 20px;
}

#submit-problem-btn {
  @include darkGreenBlueBtnConfig(100%, white, $primaryDarkGreenBlueColor);
}

#resendCodeBtn {
  @include darkGreenBlueBtnConfig(auto, $primaryDarkGreenBlueColor, white);
}

#forgotPassword{
  position: relative;
  cursor: pointer;
  color: $footerColor;
}

#userEmailLoginChip{
  cursor: pointer;
}

#userEmailChip {
  cursor: pointer;
}

#or-login-separator {
  overflow: hidden;
  text-align: center;
}

#or-login-separator:before,
#or-login-separator:after {
  background-color: #e0e0e0;
  content: "";
  display: inline-block;
  height: 1px;
  position: relative;
  vertical-align: middle;
  width: 50%;
}

#or-login-separator:before {
  right: 0.5em;
  margin-left: -50%;
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
    top: 25px;
    padding: 20px;
    font-size: 14px;
    color: #cac8c8;
  }
}

#or-login-separator:after {
  left: 0.5em;
  margin-right: -50%;
}

.tos_privacy {
  text-decoration: underline;
  cursor: pointer
}

</style>
