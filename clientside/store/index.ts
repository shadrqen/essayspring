import Vuex from 'vuex'

import design from './modules/design'

import registration from './modules/registration'

import user from './modules/user'

import Vue from 'vue'

let store: any

if (process.env.NODE_ENV === 'test') {
  Vue.use(Vuex)
}

const initStore = () => {
  return store || (store = new Vuex.Store({
    state: () => ({}),
    actions: {},
    mutations: {},
    getters: {},
    modules: {
      design,
      registration,
      user
    }
  }))
}

export default initStore
