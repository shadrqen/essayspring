const state = () => ({
  viewport_code: '',
  pageLoaded: false
})

const getters = {
  getViewPortCode: (state: any) => state.viewport_code,
  pageLoaded: (state: any) => state.pageLoaded
}

const actions = {}

const mutations = {
  changeViewPortCode: (state: any, val: string) => {
    state.viewport_code = val
  },
  changePageLoaded: (state: any, val: boolean) => {
    state.pageLoaded = val
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
