import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import NavBar from '@/components/general/NavBar.vue'

const localVue = createLocalVue()

localVue.use(Vuex)

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

// eslint-disable-next-line no-undef
describe('It shows the correct items on hero image', () => {
  let actions, getters, store, wrapper
  beforeEach(() => {
    actions = {
      changeLoginDialog: jest.fn()
    }
    store = new Vuex.Store({
      actions
    })
    /* wrapper = shallowMount(NavBar, {
      store,
      localVue,
      mocks: {
        $store
      }
    }) */
    actions = {
      actionClick: jest.fn(),
      actionInput: jest.fn()
    }
    store = new Vuex.Store({
      actions
    })
  })
  it('not yet finished a test', () => {
    expect(1).toBe(1)
  })
  // it('renders hero image', () => {
  //   expect(wrapper.exists()).toBe(true)
  // })
})
