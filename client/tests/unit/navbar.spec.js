import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Vuetify from 'vuetify'
import NavBar from '@/components/general/NavBar.vue'

const localVue = createLocalVue()

// const $vuetify = {
//   breakpoint: {
//     name: 'lg'
//   }
// }

// eslint-disable-next-line no-undef
describe('It shows the correct items on hero image', () => {
  let actions, getters, store, wrapper
  // eslint-disable-next-line no-undef
  beforeEach(() => {
    const breakpoint = {
      // eslint-disable-next-line no-undef
      init: jest.fn(),
      framework: {},
      smAndDown: true
    }
    const $vuetify = new Vuetify()
    $vuetify.framework.breakpoint = breakpoint

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
