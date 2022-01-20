// eslint-disable-next-line no-unused-vars
import { createLocalVue, shallowMount } from '@vue/test-utils'

import flushPromises from 'flush-promises'

import Vuex from 'vuex'

// import sinon from 'sinon'
// eslint-disable-next-line no-unused-vars
import Vuetify from 'vuetify'

// eslint-disable-next-line no-unused-vars
import Dialogs from '@/components/general/Dialogs.vue'

import VueRouter from 'vue-router'

const localVue = createLocalVue()

localVue.use(Vuex)
localVue.use(Vuetify)
localVue.use(VueRouter)
const router = new VueRouter()

const vuetify = new Vuetify()
class FacebookLogin {
  // eslint-disable-next-line no-undef
  fbInitSdk () {
    // eslint-disable-next-line no-undef
    return jest.fn()
  }
}

// eslint-disable-next-line no-undef
describe('Can log in', () => {
  // eslint-disable-next-line no-unused-vars
  let wrapper, getters, mutations, store
  // eslint-disable-next-line no-undef
  beforeEach(() => {
    getters = {
      loginStatus: () => false,
      getViewPortCode: () => 'lg',
      reportProblemDialog: () => false,
      loginDialog: () => true,
      loginDialogContents: () => {
        return {
          dialogTitle: 'Log in to your account',
          dialogContent: {
            submitEmail: true,
            login: false,
            notification: false,
            notificationMessage: null,
            loginInfo: null,
            clientLogin: false,
            setPassword: false
          }
        }
      }
    }
    mutations = {
      // eslint-disable-next-line no-undef
      changeLoginDialog: jest.fn(),
      // eslint-disable-next-line no-undef
      changeLoginDialogContents: jest.fn()
    }
    store = new Vuex.Store({
      getters,
      mutations
    })
    wrapper = shallowMount(Dialogs, {
      store,
      localVue,
      vuetify,
      router,
      data () {
        return {
          loginForm: {
            email: 'a@b.c',
            password: 'dfdfdfY66dg',
            gotStarted: false
          }
        }
      },
      propsData: {
        viewport_code: 'lg'
      },
      mocks: { FacebookLogin }
    })
  })
  // eslint-disable-next-line no-undef
  it('can log in', async () => {
    const loginEmailText = wrapper.find('#loginEmail')
    /* Act */
    // await login.trigger('click')

    /* Assert */
    // eslint-disable-next-line no-undef
    expect(loginEmailText.exists()).toBe(true)

    await loginEmailText.trigger('keyup.center')

    const submitEmail = await wrapper.vm.submitEmail()

    // eslint-disable-next-line no-undef
    wrapper.vm.$refs.submitEmailForm.validate = () => jest.fn()

    await flushPromises()

    // eslint-disable-next-line no-undef
    expect(submitEmail).toBeCalled()
  })
})
