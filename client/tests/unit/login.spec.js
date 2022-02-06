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

/**
 * Mocking modules
 */

/* eslint-disable no-undef */
const mock = new MockAdapter(axios)

jest.mock('@/services/facebook-login.js')

jest.mock('@/mixins/login.js')

/**
 * Declaring constants and variables
 */

const BACKEND_URL = `http://${process.env.URL}:3100`

const spyOnSubmitEmail = jest.spyOn(Dialogs.methods, 'submitEmail')

const localVue = createLocalVue()

/* eslint-enable no-undef */

localVue.use(Vuex)
localVue.use(Vuetify)
localVue.use(VueRouter)
const router = new VueRouter()

const vuetify = new Vuetify()
/* eslint-disable no-undef */
describe('Login Service -> Log in user', () => {
  let wrapper, getters, mutations, store

  afterAll(() => mock.restore())

  beforeEach(() => {
    // mock.restore()
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

  describe('When a valid email is provided', () => {
    describe('If a user is new', () => {
      // it('Expect login to be called', async () => {
      //   /* Arrange */
      //   const submitEmailButton = wrapper.find('[data-test-id="login-email-button"]')
      //
      //   /* Act */
      //   /* All we want is to know whether the submitLogin function was called, so we set the validate function
      //   * as false to stop further processing */
      //   wrapper.vm.$refs.submitEmailForm.validate = () => false
      //   await submitEmailButton.vm.$emit('click')
      //
      //   /* Assert */
      //   expect(spyOnSubmitEmail).toHaveBeenCalledTimes(1)
      // })
      //
      // it('Expect use to be registered', async () => {
      //   /* Arrange */
      //   const loginFormEmail = wrapper.find('[data-test-id="login-email-button"]')
      //   wrapper.vm.$refs.submitEmailForm.validate = () => true
      //   const mockSubmitEmailSuccess = {
      //     accountExists: true,
      //     type: 'Client',
      //     canLogIn: true,
      //     orderPostingStep: 'Finished'
      //   }
      //
      //   /* Act */
      //   mock.onPost(`${BACKEND_URL}/auth/v1/submit_login_email`).reply(200, mockSubmitEmailSuccess)
      //   await wrapper.setData({ loginForm: { email: 'me@you.com', password: null, gotStarted: false } })
      //   await loginFormEmail.vm.$emit('click')
      //
      //   /* Assert */
      //   expect(wrapper.vm.loginForm.email).toBe('me@you.com')
      //   expect(wrapper.vm.submitEmailOngoing).toBe(true)
      //
      //   // Flush all pending resolved promise handlers (ensure submit email finishes before asserting below)
      //   await flushPromises()
      //
      //   expect(mutations.changeLoginDialogContents).toHaveBeenCalledTimes(2)
      //   expect(mutations.changeLoginDialogContents).toHaveBeenCalledWith({}, {
      //     key: 'dialogContent',
      //     subKey: 'submitEmail',
      //     val: false,
      //     option: null
      //   })
      // })
      //
      // it('Expect new user to be logged in automatically', async () => {
      //   /* Arrange */
      //   const loginFormEmail = wrapper.find('[data-test-id="login-email-button"]')
      //   wrapper.vm.$refs.submitEmailForm.validate = () => true
      //   const mockSubmitEmailSuccess = {
      //     accountExists: true,
      //     type: 'Client',
      //     canLogIn: true,
      //     orderPostingStep: 'Finished'
      //   }
      //
      //   /* Act */
      //   mock.onPost(`${BACKEND_URL}/auth/v1/submit_login_email`).reply(200, mockSubmitEmailSuccess)
      //   await wrapper.setData({ loginForm: { email: 'me@you.com', password: null, gotStarted: false } })
      //   await loginFormEmail.vm.$emit('click')
      //
      //   /* Assert */
      //   expect(wrapper.vm.loginForm.email).toBe('me@you.com')
      //   expect(wrapper.vm.submitEmailOngoing).toBe(true)
      //
      //   // Flush all pending resolved promise handlers (ensure submit email finishes before asserting below)
      //   await flushPromises()
      //
      //   expect(mutations.changeLoginDialogContents).toHaveBeenCalledTimes(2)
      //   expect(mutations.changeLoginDialogContents).toHaveBeenCalledWith({}, {
      //     key: 'dialogContent',
      //     subKey: 'submitEmail',
      //     val: false,
      //     option: null
      //   })
      // })
    })
    describe('If a user already exists', () => {
      it('Expect login to be called', async () => {
        /* Arrange */
        const submitEmailButton = wrapper.find('[data-test-id="login-email-button"]')

        /* Act */
        /* All we want is to know whether the submitLogin function was called, so we set the validate function
        * as false to stop further processing */
        wrapper.vm.$refs.submitEmailForm.validate = () => false
        await submitEmailButton.vm.$emit('click')

        /* Assert */
        expect(spyOnSubmitEmail).toHaveBeenCalledTimes(1)
      })

      it('Expect existing user with a set password to be prompted to enter password', async () => {
        /* Arrange */
        const loginFormEmail = wrapper.find('[data-test-id="login-email-button"]')
        wrapper.vm.$refs.submitEmailForm.validate = () => true
        const mockSubmitEmailSuccess = {
          accountExists: true,
          type: 'Client',
          canLogIn: true,
          orderPostingStep: 'Finished',
          shouldSetPass: false
        }

        /* Act */
        mock.onPost(`${BACKEND_URL}/auth/v1/submit_login_email`).reply(200, mockSubmitEmailSuccess)
        await wrapper.setData({ loginForm: { email: 'existing@user.setpass', password: null, gotStarted: false } })
        await loginFormEmail.vm.$emit('click')

        /* Assert */
        expect(wrapper.vm.loginForm.email).toBe('existing@user.setpass')
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

      it('Expect existing user with no set password to be prompted to set password', async () => {
        /* Arrange */
        const loginEmail = wrapper.find('[data-test-id="login-email-button"]')
        wrapper.vm.$refs.submitEmailForm.validate = () => true
        const mockSubmitEmailSuccess = {
          accountExists: true,
          type: 'Client',
          canLogIn: false,
          orderPostingStep: 'Finished',
          shouldSetPass: true
        }

        /* Act */
        mock.onPost(`${BACKEND_URL}/auth/v1/submit_login_email`).reply(200, mockSubmitEmailSuccess)
        await wrapper.setData({ loginForm: { email: 'existing@user.nopass', password: null, gotStarted: false } })
        await loginEmail.vm.$emit('click')

        /* Assert */
        expect(wrapper.vm.loginForm.email).toBe('existing@user.nopass')
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
    })
  })
})
/* eslint-enable no-undef */
