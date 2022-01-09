import createPersistedState from 'vuex-persistedstate'

import SecureLS from 'secure-ls'
var ls = new SecureLS({ isCompression: false })

export default ({ store, req }) => {
  createPersistedState({
    storage: {
      getItem: (key) => ls.get(key),
      setItem: (key, value) => ls.set(key, value),
      removeItem: (key) => ls.remove(key)
    }
  })(store)
}
