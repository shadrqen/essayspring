<template>
  <div>
    <v-app-bar
      app
      class="app_bar elevation-1"
      clipped-left
      dark
      dense
      fixed
      height="60%"
    >
      <template v-if="!!localLoginStatus">
        <v-container :style="xl ? 'margin-left: 15vw; margin-right: 15vw;' : ''">
          <v-row no-gutters>
            <v-col lg="6" md="6" sm="6" xl="6" xs="4">
              <v-toolbar-title
                :class="'mt-1 toolbar_title ' + iconTitleClass"
                @click="redirect_to_url('/')"
              >EssaySpring
              </v-toolbar-title>
            </v-col>
            <v-spacer></v-spacer>
            <v-col lg="6" md="6" sm="6" style="justify-content: center" xl="6" xs="8">
              <client-only>
                <v-row class="toolbar_row mt-1">
                  <v-spacer></v-spacer>
                  <v-toolbar-items>
                    <div class="text-center">
                      <v-menu
                        offset-y
                      >
                        <template v-slot:activator="{ on }">
                    <span
                      style="cursor:pointer;"
                      v-on="on"
                    >
                      <v-chip
                        id="userEmailChip"
                        outlined
                      >
                        <v-icon>person</v-icon>
                        <span :class="emailClass">{{ formattedEmail }}</span>
                        <v-icon>expand_more</v-icon>
                      </v-chip>
                    </span>
                        </template>
                        <v-card>
                          <v-list
                            dense
                          >
                            <v-list-item-group
                              v-model="selectedItem"
                              active-class="red--text"
                            >
                              <v-list-item
                                v-for="(item, i) in clientItems"
                                :key="i"
                                @click="actOnNavBarClientItems(item.action)"
                              >
                                <v-list-item-icon>
                                  <v-icon v-text="item.icon"></v-icon>
                                </v-list-item-icon>
                                <v-list-item-content style="padding-right: 30px">
                                  <v-list-item-title v-text="item.text"></v-list-item-title>
                                </v-list-item-content>
                              </v-list-item>
                              <v-list-item
                                id="logoutUser"
                                class="logoutUser"
                                @click="logoutClient()"
                              >
                                <v-list-item-icon>
                                  <v-icon v-text="'mdi-logout'"></v-icon>
                                </v-list-item-icon>
                                <v-list-item-content style="padding-right: 30px">
                                  <v-list-item-title v-text="'Logout'"></v-list-item-title>
                                </v-list-item-content>
                              </v-list-item>
                            </v-list-item-group>
                          </v-list>
                        </v-card>
                      </v-menu>
                    </div>
                  </v-toolbar-items>
                </v-row>
              </client-only>
            </v-col>
          </v-row>
        </v-container>
      </template>
      <template v-else>
        <v-container :style="xl ? 'margin-left: 15vw; margin-right: 15vw;' : ''">
          <v-row no-gutters>
            <v-col lg="6" md="6" sm="6" xl="6" xs="4">
              <v-toolbar-title :class="'toolbar_title ' + iconTitleClass" @click="redirect_to_url('/')">EssaySpring
              </v-toolbar-title>
            </v-col>
            <v-spacer></v-spacer>
            <v-col lg="6" md="6" sm="6" style="justify-content: center" xl="6" xs="8">
              <v-row class="toolbar_row mt-1">
                <v-toolbar-items v-if="['md', 'lg', 'xl'].includes(viewport_code)" class="toolbar_items"
                                 @click="redirect_to_url('/general/how-it-works')">How It Works
                </v-toolbar-items>
                <v-spacer></v-spacer>
                <v-toolbar-items v-if="['md', 'lg', 'xl'].includes(viewport_code)" class="toolbar_items"
                                 @click="redirect_to_url('/general/faq')">FAQ
                </v-toolbar-items>
                <v-spacer></v-spacer>
                <v-toolbar-items v-if="['md', 'lg', 'xl'].includes(viewport_code)" class="toolbar_items"
                                 @click="redirect_to_url('/general/about')">About
                </v-toolbar-items>
                <v-spacer></v-spacer>
                <v-toolbar-items v-if="inner_width>=300 && localLoginStatus === false" class="toolbar_items">
                <span id="login_span" @click="redirect_to_url('login')">
                  Log In
                </span>
                </v-toolbar-items>
                <v-spacer></v-spacer>
                <v-toolbar-items v-if="['xs', 'sm'].includes(viewport_code) && localLoginStatus === false">
                  <v-app-bar-nav-icon id="app_bar_nav_icon" @click="navbarIcon = !navbarIcon"></v-app-bar-nav-icon>
                </v-toolbar-items>
              </v-row>
            </v-col>
          </v-row>
        </v-container>
        <v-row v-if="show_navbar_dialog()" app no-gutters style="position: absolute; top: 0; left: 0; width: 100%;">
          <v-col v-for="(url, id) in navbarUrls" :key="id" cols="12" lg="2" md="2" sm="2" xl="2">
            <v-card class="rounded-0 navbar_link_card" light @click="redirect_to_url(url.url)">
              <v-card-text v-if="url.icon" class="white--text text-center">
                <v-icon color="white">{{ url.icon }}</v-icon>
              </v-card-text>
              <v-card-text v-else class="white--text text-center"> {{ url.text }}</v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </template>
      <client-only>
        <general-dialogs v-if="reportProblemDialog || loginDialog" :viewport_code="viewport_code"></general-dialogs>
      </client-only>
    </v-app-bar>
    <v-overlay
      :value="overlay"
      opacity="0.9"
    >
      <div
        class="lds-ellipsis"
      >
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </v-overlay>
  </div>
</template>

<script>

import { mapGetters, mapMutations } from 'vuex'
import FacebookLogin from '../../services/facebook-login'
import { bus } from '../../plugins/bus'

export default {
  name: 'NavBar',
  components: {
    GeneralDialogs: () => import('../../components/general/Dialogs')
  },
  data () {
    return {
      inner_width: 0,
      navbarIcon: false,
      navbarUrls: [
        { text: 'How it Works', icon: '', url: '/general/how-it-works' },
        { text: 'FAQ', icon: '', url: '/general/faq' },
        { text: 'About', icon: '', url: '/general/about' },
        { text: 'Log In', icon: '', url: 'login' },
        { text: '', icon: 'mdi-close', url: 'close_nav_dialog' }
      ],
      selectedItem: null,
      clientItems: [
        { text: 'My Orders', icon: 'list', action: '/client/orders' },
        { text: 'My Writers', icon: 'mdi-account-group-outline', action: '/client/writers' },
        { text: 'Report Problem', icon: 'report', action: 'report' }
      ],
      menu: false,
      iconTitleClass: 'text-subtitle-1 text-xl-h6 text-lg-h6 text-md-h6\n' +
          'text-sm-subtitle-1 font-weight-regular',
      emailClass: 'text-caption text-xl-body-2 text-lg-body-2 text-md-body-2\n' +
          'text-sm-body-2 font-weight-regular',
      /* TODO: To find out why I initially used this.$store.state.user.loginStatus */
      localLoginStatus: this.loginStatus,
      viewport_code: null,
      overlay: false
    }
  },
  async fetch () {
    this.localLoginStatus = null
    this.inner_width = 300
    this.viewport_code = 'xs'
  },
  computed: {
    /* TODO: To remove object getters and replace with list in cases where we're not changing the
    *   names */
    ...mapGetters({
      loginStatus: 'loginStatus',
      loginDialog: 'loginDialog',
      viewportCode: 'getViewPortCode',
      email: 'email',
      loginMode: 'loginMode',
      reportProblemDialog: 'reportProblemDialog',
      clientPostOrderForm: 'clientPostOrderForm'
    }),
    formattedEmail () {
      if (this.viewport_code === 'xs') {
        return this.email.split('@')[0]
      } else {
        return this.email
      }
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
  watch: {
    /* TODO: To remove this watcher */
    loginStatus () {
      this.localLoginStatus = this.loginStatus
    }
  },
  methods: {
    ...mapMutations(['changeLoginDialog', 'resetUserState', 'resetRegistrationState', 'changeLoginDialogContents',
      'changeReportProblemDialog', 'changeClientPostOrderForm']),
    /* Function to determine whether to show the navbar dialog or not */
    show_navbar_dialog () {
      return this.navbarIcon && ['xs', 'sm'].includes(this.viewport_code)
    },
    /* Function to open links after clicking one in the navbar */
    /* Function works to redirect requests to the requested clicked link */
    /* TODO: To remove this function in favour of inline links */
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
            } else {
              this.$router.push(link)
              this.navbarIcon = false
            }
          }
        }
      }
    },
    /* I am using the window innerwidth in the toolbar ( particularly for the login link ) */
    set_window_inner_width () {
      if (process.browser) {
        this.viewport_code = this.$store.state.design.viewport_code
        this.inner_width = window.innerWidth
      }
    },
    async logoutClient () {
      if (this.loginMode === 'Facebook') {
        await FacebookLogin.logoutFacebook()
      }
      this.resetRegistrationState()
      this.resetUserState()
      location.reload()
    },
    actOnNavBarClientItems (action) {
      switch (action) {
        case 'logoutClient':
          this.logoutClient()
          break
        case 'report':
          this.changeReportProblemDialog(true)
          break
        default:
          if (this.$route.fullPath !== action) {
            this.$router.push(action)
          }
          break
      }
    }
  },
  mounted () {
    this.changeLoginDialog(false)
    if (process.browser) {
      window.addEventListener('resize', this.set_window_inner_width)
    }
    bus.$on('changeNavOverlay', val => {
      this.overlay = val
    })
    bus.$on('changeNavOverlay', val => {
      this.overlay = val
    })
  },
  created () {
    /* TODO: To find out why I initially used this.$store.state.user.loginStatus */
    this.localLoginStatus = this.loginStatus
    this.viewport_code = this.viewportCode
    this.set_window_inner_width()
  }
}
</script>

<style lang="scss">

@import '../../styles/general/general';

@import "../../styles/mixins/general";

#add_funds_btn{
  //@include darkGreenBlueBtnConfig(100%, auto, white, $paymentButtonColor)
  @include darkGreenBlueBtnConfig(auto, $primaryDarkGreenBlueColor, white)
}

.app_bar{
  //background-image: linear-gradient(to right, #283e51, #13547a);
  background-image: linear-gradient(to right, #283e51, #007991);
  //background-image: linear-gradient(to right, #3474B4, #007991);
  //background-image: linear-gradient(to right, #155799,#159957);
  //background-color: #007991 !important;
  //background-color: #3474B4 !important;
  .toolbar_row{
    //padding-top: 3%;
    .toolbar_items{
      @include sharedBtnProperties();
      #login_span{
        color: white;
        border-radius: 5px;
        text-transform: none;
        box-shadow: none;
      }
    }
  }
  .toolbar_title{
    @include sharedBtnProperties();
  }
  .navbar_link_card {
    cursor: pointer;
    height: 100%;
    background-color: #007991 !important;
    &:hover{
      background-color: #283e51 !important;
    }
  }
}

.v-toolbar{
  background-color: $footerColor;
}

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
