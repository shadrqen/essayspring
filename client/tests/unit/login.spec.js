/**
* @test-cases
 * 1.  If correct email and password is provided, log in user
 * 2.  If either of the two is not specified, show error and don’t proceed
 * 3.  If wrong email format is used, show error
 * */

// eslint-disable-next-line no-unused-vars
import { createLocalVue, shallowMount } from '@vue/test-utils'

import flushPromises from 'flush-promises'

import Vuex from 'vuex'

// import sinon from 'sinon'
// eslint-disable-next-line no-unused-vars
import Vuetify from 'vuetify'

// eslint-disable-next-line no-unused-vars
import Dialogs from '@/components/general/BaseDialogs.vue'

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
      },
      mocks: { FacebookLogin }
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

    // eslint-disable-next-line no-undef
    wrapper.vm.$refs.submitEmailForm.validate = () => true

    // const submitEmail = await wrapper.vm.submitEmail()

    await flushPromises()

    // eslint-disable-next-line no-undef
    // expect(submitEmail).toBeCalled()
    // expect(wrapper.vm.submitEmailOngoing).toBe(true)
  })
})
