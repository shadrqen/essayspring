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
      max-width="400"
      persistent
      eager
      :fullscreen="viewport_code === 'xs'"
    >
      <v-card>
        <v-toolbar color="#344754" flat short>
          <v-toolbar-title class="text-subtitle-1 text-xl-subtitle-1 text-lg-subtitle-1 text-md-subtitle-1
            text-sm-subtitle-1 white--text" v-text="loginDialogContents.dialogTitle">
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn
              icon
              dark
              @click="closeLoginDialog"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <!--          FIXME: Find a way to notify the user that we are logging him as a client, and not a writer-->
        <v-card-text style="padding-bottom: 20px">
          <template v-if="loginDialogContents.dialogContent.submitEmail">
            <v-form ref="submitEmailForm" v-on:submit.prevent="">
              <br>
              <v-text-field
                type="email"
                flat
                solo
                class="text-field"
                label="Enter your email"
                :rules="validate.emailField"
                id="loginEmail"
                v-model="loginForm.email"
                @keyup.enter="submitEmail"
              ></v-text-field>
              <br>
              <alert-message v-if="successObject.value || errorObject.value" class="mt-4" :success="successObject"
                             :error="errorObject"></alert-message>
              <v-btn
                outlined
                id="submit_email_btn"
                @click="submitEmail"
                :disabled="submitEmailOngoing"
                ref="continueEmail"
              >
                <div v-if="submitEmailOngoing" class="lds-ellipsis">
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
                <span v-else class="text-body-2 text-xl-body-2 text-lg-body-2 text-md-body-1 text-sm-body-2"> Continue </span>
              </v-btn>
              <div>
                <p class="text-caption text-xl-caption text-lg-caption text-md-caption text-sm-caption pt-3">
                  By clicking "Continue", you agree to our
                  <span class="tos_privacy" @click="openTermsOfServiceOrPrivacy('/general/terms-and-conditions')">Terms of Service</span>
                  and <span class="tos_privacy" @click="openTermsOfServiceOrPrivacy('/general/privacy-policy')">Privacy Policy</span>.
                  We'll occasionally send you promo and account related emails.
                </p>
              </div>
              <div>
                <h4 id="or-login-separator">OR</h4>
              </div>
              <div class="pt-6">
                <v-btn
                  outlined
                  id="continue_with_google"
                  :disabled="disableLoginGoogle"
                  @click="loginGoogle">
                  <div v-if="disableLoginGoogle" class="lds-ellipsis">
                    <div style="background: #007991"></div>
                    <div style="background: #007991"></div>
                    <div style="background: #007991"></div>
                    <div style="background: #007991"></div>
                  </div>
                  <div v-else>
                    <div style="float: left;">
                      <v-img max-height="26" max-width="26" :src="require('~/assets/google.png')"></v-img>
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
                  outlined
                  :disabled="disableLoginFacebook"
                  @click="loginFacebook"
                  class="mb-2"
                >
                  <div v-if="disableLoginFacebook" class="lds-ellipsis">
                    <div style="background: #007991"></div>
                    <div style="background: #007991"></div>
                    <div style="background: #007991"></div>
                    <div style="background: #007991"></div>
                  </div>
                  <div v-else>
                    <div style="float: left;">
                      <v-img max-height="26" max-width="26" :src="require('~/assets/facebook.png')"></v-img>
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
            <v-form ref="changePasswordForm" v-on:submit.prevent="">
              <v-text-field
                class="mt-2"
                label="OTP Code"
                :rules="validate.optCodeField"
                id="otpCode"
                v-model="setPasswordForm.otpCode"
                @keyup.enter="setPassword"
              ></v-text-field>
              <v-text-field
                id="setPassword"
                style="padding-bottom: 10px"
                label="Password"
                :rules="validate.registerPasswordField"
                :type="showPassword ? 'text' : 'password'"
                v-model="setPasswordForm.password"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="showPassword = !showPassword"
                @keyup.enter="setPassword"
              ></v-text-field>
              <v-text-field
                id="setPasswordRepeat"
                style="padding-bottom: 10px"
                label="Confirm Password"
                :rules="validate.repeatPasswordField"
                :type="showConfirmPassword ? 'text' : 'password'"
                v-model="setPasswordForm.repeatPassword"
                :append-icon="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="showConfirmPassword = !showConfirmPassword"
                @keyup="checkPasswordSimilarity"
                @keyup.enter="setPassword"
              ></v-text-field>
              <alert-message class="mt-4" :success="successObject" :error="errorObject"></alert-message>
              <div class="mt-4">
                <v-alert
                  :value="true"
                  dense
                  text
                  type="success"
                  dismissible
                >
                  {{ emailNotification }}
                </v-alert>
              </div>
              <v-row>
                <v-spacer></v-spacer>
                <v-btn
                  id="resendCodeBtn"
                  outlined
                  @click="resendCode"
                  :disabled="resendCodeOngoing"
                  ref="resendCode"
                  class="mr-3 mb-3"
                >
                  <div v-if="resendCodeOngoing" class="lds-ellipsis">
                    <div style="background: #007991"></div>
                    <div style="background: #007991"></div>
                    <div style="background: #007991"></div>
                    <div style="background: #007991"></div>
                  </div>
                  <span v-else class="text-body-2 text-xl-body-2 text-lg-body-2 text-md-body-1 text-sm-body-2"> Resend Code  </span>
                </v-btn>
              </v-row>
              <v-btn
                outlined
                id="changePasswordBtn"
                @click="setPassword"
                :disabled="setPasswordOngoing"
                ref="setPassword"
              >
                <div v-if="setPasswordOngoing" class="lds-ellipsis">
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
                <span v-else
                      class="text-body-2 text-xl-body-2 text-lg-body-2 text-md-body-1 text-sm-body-2"> Submit  </span>
              </v-btn>
            </v-form>
          </template>
          <template v-if="loginDialogContents.dialogContent.login">
            <v-form ref="loginForm" v-on:submit.prevent="">
              <br>
              <div
                class="mb-6"
              >
                <v-chip
                  color="#007991"
                  outlined
                  id="userEmailLoginChip"
                  @click="goBackToSubmitEmail"
                >
                  <v-icon>person</v-icon>
                  {{ loginForm.email }}
                  <v-icon>expand_more</v-icon>
                </v-chip>
              </div>
              <v-text-field
                flat
                solo
                class="text-field"
                id="loginPassword"
                style="padding-bottom: 10px"
                label="Password"
                :type="showPassword ? 'text' : 'password'"
                v-model="loginForm.password"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="showPassword = !showPassword"
                @keyup.enter="startLoggingIn(false)"
              ></v-text-field>
              <span v-if="passwordRequired" style="color: red; font-size: 13px">
                    Password is required
                  </span>
              <br>
              <alert-message :success="successObject" :error="errorObject"></alert-message>
              <v-alert
                :value="true"
                text
                type="error"
                v-if="loginDialogContents.dialogTitle === 'Kindly log in by email'"
                dismissible
              >
                {{ loginDialogContents.dialogTitle }}
              </v-alert>
              <v-btn
                outlined
                id="login_btn"
                @click="startLoggingIn(false)"
                :disabled="loginOngoing"
                class="mt-2"
              >
                <div v-if="loginOngoing" class="lds-ellipsis">
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
                <span v-else
                      class="text-body-2 text-xl-body-2 text-lg-body-2 text-md-body-1 text-sm-body-2"> Log In </span>
              </v-btn>
              <v-divider class="mt-8 mb-n3"></v-divider>
              <v-row class="mt-3 mb-n4">
                <v-col
                  class="text-start text-xl-start text-lg-start text-sm-start text-md-start"
                  xl="5"
                  lg="5"
                  md="5"
                  sm="5"
                  cols="6"
                >
                     <span
                       id="forgotPassword"
                       @click="forgotPassword"
                     >
                       <template v-if="forgotPasswordOngoing" class="lds-ellipsis">
                         <v-progress-linear
                           indeterminate
                           color="#007991"
                         ></v-progress-linear>
                      </template>
                       <template v-else>
                         Forgot password?
                       </template>
                    </span>
                </v-col>
                <v-col>
                  <span style="cursor: pointer" @click="redirect_to_url('privacy_policy')">Privacy</span>
                </v-col>
                <v-col class="text-end text-xl-end text-lg-end text-sm-end text-md-end">
                  <span style="cursor: pointer" @click="redirect_to_url('terms_and_conditions')">Terms</span>
                </v-col>
              </v-row>
            </v-form>
          </template>
          <template v-if="loginDialogContents.dialogContent.notification">
            <p v-text="loginDialogContents.dialogContent.notificationMessage" style="margin-top: 20px;"
               class="text-h4 text-md-h6 text-sm-h5">
            </p>
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
        <v-toolbar color="#344754" flat short>
          <v-toolbar-title class="text-subtitle-1 text-xl-subtitle-1 text-lg-subtitle-1 text-md-subtitle-1
            text-sm-subtitle-1 white--text" v-text="'Report Problem'">
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn
              icon
              dark
              @click="closeReportProblemDialog"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-form ref="reportProblemForm" v-on:submit.prevent="">
          <v-card-text class="mt-2">
            <template v-if="reportProblemSucceeded">
              <success-check-mark :show="reportProblemSucceeded"></success-check-mark>
            </template>
            <template v-else>
              <v-textarea
                flat
                height="220"
                class="text-area"
                no-resize
                placeholder="Describe problem"
                solo
                v-model="problemForm.description"
              ></v-textarea>
              <div
                class="text_field mt-6"
                @click="pickFile"
                @dragover.prevent @drop.prevent
                @drop="uploadFile"
              >
                <input
                  type="file"
                  style="display: none"
                  ref="image"
                  id="problemFile"
                  accept=".pdf, .jpg, .jpeg, .png, .doc, .docx, video/*, audio/*"
                  @change="uploadFile"
                >
                <span v-if="supportingFileUploading">
                        <v-progress-circular
                          :size="30"
                          color="#007991"
                          indeterminate
                        ></v-progress-circular>
                      </span>
                <span v-else>
                <v-icon>cloud_upload</v-icon>
                Drag file here or click to upload
              </span>
              </div>
              <div v-if="problemForm.supportingFiles.length > 0" class="mt-4">
                <div
                  style="font-size: 15px; color: #403d3d;"
                  v-for="(file, key) in problemForm.supportingFiles"
                  :key="key"
                >
                  <v-chip
                    @click:close="removeFile(file)"
                    class="ma-2"
                    close
                  >
                    {{ file.originalName }}
                  </v-chip>
                </div>
              </div>
            </template>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-row no-gutters>
              <v-col v-bind="attrs12">
                <alert-message :success="successObject" :error="errorObject"></alert-message>
              </v-col>
              <v-col v-bind="attrs12">
                <v-spacer></v-spacer>
                <v-btn
                  outlined
                  id="submit-problem-btn"
                  :disabled="reportProblemBtnDisabled"
                  @click="submitProblem"
                >
                  <div v-if="reportProblemOngoing" class="lds-ellipsis">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                  <span
                    v-else
                    class="text-subtitle-1 text-xl-subtitle-1 text-lg-subtitle-1 text-md-subtitle-1 text-sm-subtitle-1">
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
  name: 'Dialogs',
  props: ['viewport_code'],
  components: {
    SuccessCheckMark: () => import('../../components/general/SuccessCheckMark'),
    AlertMessage: () => import('../../components/general/AlertMessage')
  },
  mixins: [login],
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
    /* TODO: To restore the function on test */
    if (process.env.NODE_ENV !== 'test') {
      FacebookLogin.fbInitSdk()
    }
    bus.$on('updateLoginForm', val => {
      this.loginForm.email = val
    })
    /*
    watch: {
      loginDialog () {
        if (this.loginDialog === ) {
          setTimeout(() => {
            if (!['xs', 'sm'].includes(this.viewport_code)) {
              document.getElementById('loginEmail').focus()
              document.getElementById('loginEmail').select()
            }
          }, 0)
        }
      }
    },
     */
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
      'changeReportProblemDialog',
      'changeUserType'
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
      console.log('\n\n\n outside :', this.$refs.submitEmailForm[0].validate(), ' \n\n\n')
      if (this.$refs.submitEmailForm.validate()) {
        console.log('\n\n\n here \n\n\n')
        this.submitEmailOngoing = true
        await api.postRequest('auth/v1/submit_login_email', this.loginForm)
          .then(async res => {
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
                setTimeout(() => {
                  document.getElementById('loginPassword').focus()
                  document.getElementById('loginPassword').select()
                }, 0)
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
                if (!['xs', 'sm'].includes(this.viewport_code)) {
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

<style scoped lang="scss">

@import '../../styles/general/general';

@import "../../styles/mixins/general";

</style>
