// eslint-disable-next-line no-unused-vars
import { mount, shallowMount, createLocalVue } from '@vue/test-utils'

import Vuex from 'vuex'

// import sinon from 'sinon'

// eslint-disable-next-line no-unused-vars
import Vuetify from 'vuetify'

// eslint-disable-next-line no-unused-vars
import NavBar from '@/components/general/NavBar.vue'

const localVue = createLocalVue()

localVue.use(Vuex)
localVue.use(Vuetify)

const vuetify = new Vuetify()

// eslint-disable-next-line no-undef
describe('It shows the correct items on the navbar', () => {
  // eslint-disable-next-line no-unused-vars
  let wrapper, getters, mutations, store
  // eslint-disable-next-line no-undef
  beforeEach(() => {
    getters = {
      loginStatus: () => false,
      getViewPortCode: () => 'lg',
      reportProblemDialog: () => false,
      loginDialog: () => false
    }
    mutations = {
      // eslint-disable-next-line no-undef
      changeLoginDialog: jest.fn()
    }
    store = new Vuex.Store({
      getters,
      mutations
    })
    wrapper = shallowMount(NavBar, {
      store,
      localVue,
      vuetify,
      mocks: {}
    })
  })
  // eslint-disable-next-line no-undef
  it('renders navbar', () => {
    /* Assert */
    // eslint-disable-next-line no-undef
    expect(wrapper.exists()).toBe(true)
  })
  // eslint-disable-next-line no-undef
  it('renders correct title', () => {
    /* Arrange */
    // eslint-disable-next-line no-undef
    const title = wrapper.find('.toolbar_title')

    /* Assert */
    // eslint-disable-next-line no-undef
    expect(title.text()).toMatch('EssaySpring')
  })
  // eslint-disable-next-line no-undef
  it('renders correct navbar items', () => {
    /* Arrange */
    // eslint-disable-next-line no-undef
    const howItWorks = wrapper.find('.toolbar_items:nth-of-type(1)')
    const faq = wrapper.find('.toolbar_items:nth-of-type(2)')
    const about = wrapper.find('.toolbar_items:nth-of-type(3)')
    const login = wrapper.find('.toolbar_items:nth-of-type(4)')

    /* Assert */
    // eslint-disable-next-line no-undef
    expect(howItWorks.text()).toMatch('How It Works')
    // eslint-disable-next-line no-undef
    expect(faq.text()).toMatch('FAQ')
    // eslint-disable-next-line no-undef
    expect(about.text()).toMatch('About')
    // eslint-disable-next-line no-undef
    expect(login.text()).toMatch('Log In')
  })
})
