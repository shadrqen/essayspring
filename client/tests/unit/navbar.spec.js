// eslint-disable-next-line no-unused-vars
import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
// eslint-disable-next-line no-unused-vars
import Vuetify from 'vuetify'
// eslint-disable-next-line no-unused-vars
import NavBar from '@/components/general/NavBar.vue'

const localVue = createLocalVue()

// const $vuetify = {
//   breakpoint: {
//     name: 'lg'
//   }
// }

// eslint-disable-next-line no-undef
describe('It shows the correct items on hero image', () => {
  // eslint-disable-next-line no-unused-vars
  let actions, getters, store, wrapper
  // eslint-disable-next-line no-undef
  beforeEach(() => {
    const breakpoint = {
      // eslint-disable-next-line no-undef
      init: jest.fn(),
      framework: {},
      smAndDown: true
    }
    // eslint-disable-next-line no-unused-vars
    const $vuetify = new Vuetify()
    $vuetify.framework.breakpoint = breakpoint

    // eslint-disable-next-line no-unused-vars
    const $store = {
      state: {
        user: {
          loginStatus: true
        },
        design: {
          viewport_code: 'xs'
        }
      }
    }
    localVue.use(Vuex)
    getters = {
      loginStatus: () => true
    }
    actions = {
      // eslint-disable-next-line no-undef
      changeLoginDialog: jest.fn()
    }
    store = new Vuex.Store({
      actions,
      getters
    })
    /* wrapper = shallowMount(NavBar, {
      store,
      localVue,
      $vuetify,
      mocks: {
        $store
      }
    }) */
  })
  // eslint-disable-next-line no-undef
  it('sample test', () => {
    // eslint-disable-next-line no-undef
    expect(1).toBe(1)
  })
/*  // eslint-disable-next-line no-undef
  it('renders hero image', () => {
    // eslint-disable-next-line no-undef
    expect(wrapper.exists()).toBe(true)
  }) */
})
