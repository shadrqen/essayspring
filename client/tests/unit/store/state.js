const state = () => {
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

export default state
