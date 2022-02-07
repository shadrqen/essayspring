/**
* @test-cases
 * 1.  If correct email and password is provided
 *      i. Expect login to be called
 *      ii.
 * 2.  If either of the two is not specified, show error and don’t proceed
 * 3.  If wrong email format is used, show error
 * */

import { createLocalVue, shallowMount } from '@vue/test-utils'

import flushPromises from 'flush-promises'

import Vuex from 'vuex'

import axios from 'axios'

import MockAdapter from 'axios-mock-adapter'

// import sinon from 'sinon'
import Vuetify from 'vuetify'

import Dialogs from '@/components/general/BaseDialogs.vue'

import VueRouter from 'vue-router'

import { bus } from '@/plugins/bus.js'

/**
 * Mocking modules
 */

/* eslint-disable no-undef */
const mock = new MockAdapter(axios)

jest.mock('@/services/facebook-login.js')

jest.mock('@/mixins/login.js')

jest.mock('@/plugins/bus.js', () => ({
  bus: {
    $on: jest.fn(),
    $off: jest.fn(),
    $emit: jest.fn()
  }
}))

/**
 * Declaring constants and variables
 */

const BACKEND_URL = `http://${process.env.URL}:3100`

const localVue = createLocalVue()

/* eslint-enable no-undef */

localVue.use(Vuex)
localVue.use(Vuetify)
localVue.use(VueRouter)
const router = new VueRouter()

const vuetify = new Vuetify()
/* eslint-disable no-undef */
describe('Login Service -> Log in user', () => {
  let wrapper, getters, mutations, store, spyOnSubmitEmail, spyOnSetAlertMessages
  let submitEmailButton

  afterAll(() => mock.restore())

  beforeEach(() => {
    spyOnSubmitEmail = jest.spyOn(Dialogs.methods, 'submitEmail')
    spyOnSetAlertMessages = jest.spyOn(Dialogs.methods, 'setAlertMessages')
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
    submitEmailButton = wrapper.find('[data-test-id="login-email-button"]')
  })

  /*
* Declaring shared functions */
  const submitEmailSetup = async (submitContext = {}) => {
    mock.onPost(`${BACKEND_URL}/${submitContext.url}`).reply(200, submitContext.response)
    await wrapper.setData({ loginForm: { email: submitContext.email, password: null, gotStarted: false } })
    await submitEmailButton.vm.$emit('click')
  }

  afterEach(() => {
    spyOnSubmitEmail.mockRestore()
  })

  describe('When a valid email is provided', () => {
    describe('If a user is new', () => {
      it('Expect login to be called', async () => {
        /* Act */
        /* All we want is to know whether the submitLogin function was called, so we set the validate function
        * as false to stop further processing */
        wrapper.vm.$refs.submitEmailForm.validate = () => false
        await submitEmailButton.vm.$emit('click')

        /* Assert */
        expect(spyOnSubmitEmail).toHaveBeenCalledTimes(1)
      })
      it('Expect the registerClient event to be fired', async () => {
        /* Arrange */
        const email = 'new@user.com'
        wrapper.vm.$refs.submitEmailForm.validate = () => true
        const mockSubmitEmailSuccess = {
          accountExists: false
        }

        /* Act */
        await submitEmailSetup({
          response: mockSubmitEmailSuccess,
          email: email,
          url: 'auth/v1/submit_login_email'
        })
        // Wait for the event firing promise to be resolved
        await flushPromises()

        /* Assert */
        expect(wrapper.vm.loginForm.email).toBe('new@user.com')
        expect(bus.$emit).toHaveBeenCalledWith('registerClient', true, email)
      })
    })
    describe('If a user already exists', () => {
      it('Expect login to be called', async () => {
        /* Act */
        /* All we want is to know whether the submitLogin function was called, so we set the validate function
        * as false to stop further processing */
        wrapper.vm.$refs.submitEmailForm.validate = () => false
        await submitEmailButton.vm.$emit('click')

        /* Assert */
        expect(spyOnSubmitEmail).toHaveBeenCalledTimes(1)
      })

      it('Expect user with a set password to be prompted to enter password', async () => {
        /* Arrange */
        const email = 'existing@user.setpass'
        wrapper.vm.$refs.submitEmailForm.validate = () => true
        const mockSubmitEmailSuccess = {
          accountExists: true,
          type: 'Client',
          canLogIn: true,
          shouldSetPass: false
        }

        /* Act */
        await submitEmailSetup({
          response: mockSubmitEmailSuccess,
          email: email,
          url: 'auth/v1/submit_login_email'
        })

        /* Assert */
        expect(wrapper.vm.loginForm.email).toBe(email)
        expect(wrapper.vm.submitEmailOngoing).toBe(true)

        // Flush all pending resolved promise handlers (ensure submit email finishes before asserting below)
        await flushPromises()

        expect(mutations.changeLoginDialogContents).toHaveBeenCalledTimes(2)
        expect(mutations.changeLoginDialogContents).toHaveBeenCalledWith({}, {
          key: 'dialogContent',
          subKey: 'submitEmail',
          val: false,
          option: null
        })
      })

      it('Expect user with no set password to be prompted to set password', async () => {
        /* Arrange */
        const email = 'existing@user.nopass'
        wrapper.vm.$refs.submitEmailForm.validate = () => true
        const mockSubmitEmailSuccess = {
          accountExists: true,
          type: 'Client',
          canLogIn: false,
          shouldSetPass: true
        }

        /* Act */
        await submitEmailSetup({
          response: mockSubmitEmailSuccess,
          email: email,
          url: 'auth/v1/submit_login_email'
        })

        /* Assert */
        expect(wrapper.vm.loginForm.email).toBe(email)
        expect(wrapper.vm.submitEmailOngoing).toBe(true)

        // Flush all pending resolved promise handlers (ensure submit email finishes before asserting below)
        await flushPromises()

        expect(mutations.changeLoginDialogContents).toHaveBeenCalledTimes(3)
        expect(mutations.changeLoginDialogContents).toHaveBeenCalledWith({}, {
          key: 'dialogContent',
          subKey: 'notification',
          val: true,
          option: null
        })
      })

      it('Expect user who is not of type "Client" to notified why can\'t log in', async () => {
        /* Arrange */
        const email = 'existing@user.notclient'
        wrapper.vm.$refs.submitEmailForm.validate = () => true
        const mockSubmitEmailSuccess = {
          accountExists: true,
          type: 'NonClient',
          canLogIn: false,
          shouldSetPass: false
        }

        /* Act */
        await submitEmailSetup({
          response: mockSubmitEmailSuccess,
          email: email,
          url: 'auth/v1/submit_login_email'
        })

        /* Assert */
        expect(wrapper.vm.loginForm.email).toBe(email)
        expect(wrapper.vm.submitEmailOngoing).toBe(true)

        // Flush all pending resolved promise handlers (ensure submit email finishes before asserting below)
        await flushPromises()

        expect(spyOnSetAlertMessages).toHaveBeenCalledTimes(1)
        expect(spyOnSetAlertMessages).toHaveBeenCalledWith('Email already used as a writer! Kindly use another email')
        spyOnSetAlertMessages.mockRestore()
      })
    })
  })
  describe('When an invalid email is provided', () => {
    it('Expect login to be called', async () => {
      /* Act */
      /* All we want is to know whether the submitLogin function was called, so we set the validate function
      * as false to stop further processing */
      wrapper.vm.$refs.submitEmailForm.validate = () => false
      await submitEmailButton.vm.$emit('click')

      /* Assert */
      expect(spyOnSubmitEmail).toHaveBeenCalledTimes(1)
    })
    it('Expect form validation to fail', async () => {
      /* Act */
      wrapper.vm.$refs.submitEmailForm.validate = () => false
      await submitEmailButton.vm.$emit('click')

      /* Assert */
      /* Because submitEmailForm.validate() is false, the request will not enter the submitEmail function
      * Therefore, submitEmailOngoing should be false because it's initial value is false */
      expect(wrapper.vm.submitEmailOngoing).toBe(false)
    })
  })
})
/* eslint-enable no-undef */
