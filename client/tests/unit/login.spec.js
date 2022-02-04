/**
* @test-cases
 * 1.  If correct email and password is provided, log in user
 * 2.  If either of the two is not specified, show error and don’t proceed
 * 3.  If wrong email format is used, show error
 * */

// eslint-disable-next-line no-unused-vars
import { createLocalVue, shallowMount } from '@vue/test-utils'

// import flushPromises from 'flush-promises'

import Vuex from 'vuex'

// import axios from 'axios'

// import mockApi from '@/api/api.ts'

// import sinon from 'sinon'
// eslint-disable-next-line no-unused-vars
import Vuetify from 'vuetify'

// eslint-disable-next-line no-unused-vars
import Dialogs from '@/components/general/BaseDialogs.vue'

import VueRouter from 'vue-router'

/**
 * Declaring constants and variables
 */
/* const mockLoginSuccessful = {
  accountExists: true,
  type: 'Client',
  canLogIn: true
} */

/**
 * Mocking modules
 */
// eslint-disable-next-line no-undef
jest.mock('@/services/facebook-login.js')

// eslint-disable-next-line no-undef
jest.mock('@/api/api.ts', () => {
  return {
    // eslint-disable-next-line no-undef
    postRequest: () => {
      return {
        // eslint-disable-next-line no-undef
        then: () => jest.fn(),
        // eslint-disable-next-line no-undef
        catch: () => jest.fn()
      }
    },
    // eslint-disable-next-line no-undef
    setAuthHeaders: () => jest.fn()
  }
})

// eslint-disable-next-line no-undef
jest.mock('axios', () => {
  const mockLoginSuccessful = {
    data: {
      accountExists: true,
      type: 'Client',
      canLogIn: true
    }
  }
  // eslint-disable-next-line no-undef
  return {
    // eslint-disable-next-line no-undef
    post: jest.fn(() => mockLoginSuccessful),
    interceptors: {
      // eslint-disable-next-line no-undef
      request: { use: () => jest.fn(), eject: jest.fn() },
      // eslint-disable-next-line no-undef
      response: { use: () => jest.fn(), eject: jest.fn() }
    }
  }
})

const localVue = createLocalVue()

localVue.use(Vuex)
localVue.use(Vuetify)
localVue.use(VueRouter)
const router = new VueRouter()

const vuetify = new Vuetify()

// eslint-disable-next-line no-undef
describe('Login Service -> Log in user', () => {
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
      }
    })
  })
  // eslint-disable-next-line no-undef
  it('When the correct email and password is provided, expect user to be logged in successfully', async () => {
    const loginEmailText = wrapper.find('#loginEmail')
    /* Act */
    // await login.trigger('click')

    /* Assert */
    // eslint-disable-next-line no-undef
    expect(loginEmailText.exists()).toBe(true)

    await loginEmailText.trigger('keyup.center')

    wrapper.vm.$refs.submitEmailForm.validate = () => true

    // await wrapper.vm.submitEmail()

    // Wait until the DOM updates.
    // await flushPromises()

    // eslint-disable-next-line no-undef

    // eslint-disable-next-line no-undef
    // expect(mockApi.postRequest()).toHaveBeenCalledTimes(1)

    // const submitEmail = await wrapper.vm.submitEmail()

    // await flushPromises()

    // eslint-disable-next-line no-undef
    // expect(submitEmail).toBeCalled()
    // expect(wrapper.vm.submitEmailOngoing).toBe(true)
  })
})
