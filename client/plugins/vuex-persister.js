import SecureLocalStorage from 'secure-ls'
import VuexPersister from 'vuex-persister'
const SECURE_LOCAL_STORAGE = new SecureLocalStorage({ encodingType: 'aes' })

export default ({ store }) => {
  new VuexPersister({
    storage: {
      getItem: (key) => SECURE_LOCAL_STORAGE.get(key),
      setItem: (key, value) => SECURE_LOCAL_STORAGE.set(key, value),
      removeItem: (key) => SECURE_LOCAL_STORAGE.remove(key),
      length: SECURE_LOCAL_STORAGE.getAllKeys().length,
      clear: () => SECURE_LOCAL_STORAGE.clear(),
      key: (key) => null
    }
  }).persist(store)
}
