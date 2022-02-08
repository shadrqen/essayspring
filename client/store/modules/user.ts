/* A function that contains default state values
* It helps in resetting the state in store to its default after logging
* out, for example */
import { Dictionary } from 'vue-router/types/router'
// import router from '@/router'

const getDefaultUserState = () => {
  return {
    email: null,
    loginStatus: false,
    accessToken: null,
    refreshToken: null,
    loginDialog: false,
    reportProblemDialog: false,
    loginMode: null,
    clientGotStarted: false,
    loginDialogContents: {
      dialogTitle: 'Log in to your account',
      dialogContent: {
        submitEmail: true,
        login: false,
        notification: false,
        notificationMessage: null,
        loginInfo: null,
        clientLogin: false,
        setPassword: false
      }
    },
    client: {
      isNew: true,
      regUpdateSuccessful: false,
      selectedOrder: null,
      selectedWriter: null
    }
  }
}

const state = () => ({
  email: null,
  loginStatus: false,
  accessToken: null,
  refreshToken: null,
  loginDialog: false,
  reportProblemDialog: false,
  loginMode: null,
  clientGotStarted: false,
  loginDialogContents: {
    dialogTitle: 'Log in to your account',
    dialogContent: {
      submitEmail: true,
      login: false,
      notification: false,
      notificationMessage: null,
      loginInfo: null,
      clientLogin: false,
      setPassword: false
    }
  },
  client: {
    isNew: true,
    regUpdateSuccessful: false,
    selectedOrder: null
  },
  initialUserState: getDefaultUserState()
})

/* The getters. Help to access the state */
const getters = {
  email: (state: any) => state.email,
  accessToken: (state: any) => state.accessToken,
  refreshToken: (state: any) => state.refreshToken,
  loginStatus: (state: any) => state.loginStatus,
  loginDialog: (state: any) => state.loginDialog,
  reportProblemDialog: (state: any) => state.reportProblemDialog,
  loginMode: (state: any) => state.loginMode,
  clientGotStarted: (state: any) => state.clientGotStarted,
  loginDialogContents: (state: any) => state.loginDialogContents,
  client: (state: any) => state.client
}

/*
 * Actions are similar to mutations, the differences being that:
    - Instead of mutating the state, actions commit mutations.
    - Actions can contain arbitrary asynchronous operations.
*/
const actions = {}

/* The only way to change a Vuex state is by committing a mutation */
const mutations = {
  changeLoginStatus: (state: any, val: any) => {
    state.loginStatus = val
  },
  changeEmail: (state: any, val: any) => {
    state.email = val
  },
  changeLoginDialog: (state: any, val: any) => {
    state.loginDialog = val
  },
  changeReportProblemDialog: (state: any, val: any) => {
    state.reportProblemDialog = val
  },
  changeLoginMode: (state: any, val: string) => {
    state.loginMode = val
  },
  changeAccessToken: (state: any, val: any) => {
    state.accessToken = val
  },
  changeRefreshToken: (state: any, val: any) => {
    state.refreshToken = val
  },
  changeClient: (state: any, { key, val }: any) => {
    state.client[key] = val
  },
  changeClientGotStarted: (state: any, val: any) => {
    state.clientGotStarted = val
  },
  changeLoginDialogContents: (state: any, { key, subKey, val }: any) => {
    if (subKey !== null) {
      state.loginDialogContents[key][subKey] = val
    } else {
      state.loginDialogContents[key] = val
    }
  },
  resetUserState: (state: any) => {
    const s: Dictionary<any> = getDefaultUserState()
    Object.keys(s).forEach(key => {
      state[key] = s[key]
    })
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
