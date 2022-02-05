/**
* @test-cases
 * 1.  If correct email and password is provided
 *      i. Expect login to be called
 *      ii.
 * 2.  If either of the two is not specified, show error and don’t proceed
 * 3.  If wrong email format is used, show error
 * */

import { createLocalVue, shallowMount } from '@vue/test-utils'

// import flushPromises from 'flush-promises'

import Vuex from 'vuex'

import axios from 'axios'

import MockAdapter from 'axios-mock-adapter'

// import sinon from 'sinon'
import Vuetify from 'vuetify'

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

/* eslint-disable no-undef */
const mock = new MockAdapter(axios)

jest.mock('@/services/facebook-login.js')

jest.mock('@/mixins/login.js')

// jest.mock('axios', () => {
//   return {
//     post: Promise.resolve({ data: mockLoginSuccessful }),
//     interceptors: {
//       request: { use: () => jest.fn(), eject: jest.fn() },
//       response: { use: () => jest.fn(), eject: jest.fn() }
//     },
//     defaults: {
//       headers: {
//         common: {
//           Access: '',
//           Refresh: ''
//         }
//       }
//     }
//   }
// })

/* eslint-enable no-undef */

const localVue = createLocalVue()

localVue.use(Vuex)
localVue.use(Vuetify)
localVue.use(VueRouter)
const router = new VueRouter()

const vuetify = new Vuetify()
/* eslint-disable no-undef */
describe('Login Service -> Log in user', () => {
  let wrapper, getters, mutations, store

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

      changeLoginDialog: jest.fn(),

      changeLoginDialogContents: jest.fn(),

      changeLoginStatus: jest.fn()
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
      propsData: {
        viewportCode: 'lg'
      }
    })
  })

  describe('When the correct email and password is provided', () => {
    it('Expect login to be called', async () => {
      /* Arrange */
      const submitEmailButton = wrapper.find('[data-test-id="login-email-button"]')
      wrapper.vm.$refs.submitEmailForm.validate = () => true

      /* Act */
      await submitEmailButton.vm.$emit('click')

      /* Assert */
      expect(wrapper.vm.submitEmailOngoing).toBe(true)
    })

    it('Expect user to submit email successfully', async () => {
      /* Arrange */
      const submitEmailButton = wrapper.find('[data-test-id="login-email-button"]')
      wrapper.vm.$refs.submitEmailForm.validate = () => true
      const mockLoginSuccessful = {
        accountExists: true,
        type: 'Client',
        canLogIn: true,
        orderPostingStep: 'Finished'
      }
      mock.onPost('/auth/v1/submit_login_email').reply(200, mockLoginSuccessful)

      /* Act */
      await wrapper.setData({ loginForm: { email: 'me@you.com', password: null, gotStarted: false } })
      await submitEmailButton.vm.$emit('click')

      /* Assert */
      expect(wrapper.vm.loginForm.email).toBe('me@you.com')
      expect(wrapper.vm.submitEmailOngoing).toBe(true)
    })
  })
})
/* eslint-enable no-undef */
