import store from '../store/index.ts'

export default {
  shouldSetPass (message) {
    store.commit('changeLoginDialogContents', {
      key: 'dialogContent',
      subKey: 'submitEmail',
      val: false,
      option: null
    })
    store.commit('changeLoginDialogContents', {
      key: 'dialogContent',
      subKey: 'notificationMessage',
      val: message
    })
    store.commit('changeLoginDialogContents', {
      key: 'dialogContent',
      subKey: 'notification',
      val: true,
      option: null
    })
    store.commit('changeLoginDialog', true)
    setTimeout(() => {
      store.commit('changeLoginDialogContents', {
        key: 'dialogContent',
        subKey: 'notification',
        val: false,
        option: null
      })
      store.commit('changeLoginDialogContents', {
        key: 'dialogTitle',
        subKey: null,
        val: 'Set your password'
      })
      store.commit('changeLoginDialogContents', {
        key: 'dialogContent',
        subKey: 'submitEmail',
        val: false,
        option: null
      })
      store.commit('changeLoginDialogContents', {
        key: 'dialogContent',
        subKey: 'setPassword',
        val: true,
        option: null
      })
    }, 5000)
  }
}
