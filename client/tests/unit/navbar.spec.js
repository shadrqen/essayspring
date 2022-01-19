// eslint-disable-next-line no-unused-vars
import { shallowMount, createLocalVue } from '@vue/test-utils'

import Vuex from 'vuex'

// eslint-disable-next-line no-unused-vars
import Vuetify from 'vuetify'

// eslint-disable-next-line no-unused-vars
import NavBar from '@/components/general/NavBar.vue'

/* Our  */
import store from './store/store-config'

const localVue = createLocalVue()

localVue.use(Vuex)
localVue.use(Vuetify)

const vuetify = new Vuetify()

// eslint-disable-next-line no-undef
describe('It shows the correct items on hero image', () => {
  // eslint-disable-next-line no-unused-vars
  let wrapper
  // eslint-disable-next-line no-undef
  beforeEach(() => {
    wrapper = shallowMount(NavBar, {
      store,
      localVue,
      vuetify,
      mocks: {}
    })
  })
  // eslint-disable-next-line no-undef
  it('renders hero image', () => {
    // eslint-disable-next-line no-undef
    expect(wrapper.exists()).toBe(true)
  })
  // eslint-disable-next-line no-undef
  it('renders hero image', () => {
    // eslint-disable-next-line no-undef
    expect(wrapper.exists()).toBe(true)
  })
})
