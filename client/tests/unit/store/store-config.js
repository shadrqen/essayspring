import actions from './actions'
import getters from './getters'
import mutations from './mutations'
import state from './state'

import Vuex from 'vuex'

export default new Vuex.Store({
  actions,
  getters,
  mutations,
  state
})
