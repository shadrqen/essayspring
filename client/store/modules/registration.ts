// import router from '@/router'
import api from '../../api/api'
import { Dictionary } from 'vue-router/types/router'

/* A function that contains default state values
* It helps in resetting the state in store to its default after logging
* out, for example.
* TODO: To make it centralized */
const getDefaultRegistrationState = {
  disciplines: [],
  assignmentTypes: [],
  timeAmPm: [],
  serviceType: [],
  extraOrderServices: [],
  citationStyles: [],
  orderFormats: [],
  orderStudyLevels: [],
  academicCertifications: [],
  formsStateSet: false,
  orderPostingDone: false,
  stepStatus: {
    step1: true,
    step2: true,
    step3: true,
    step4: true
  },
  orderStatusTypes: [],
  clientPostOrderForm: {
    type: 'private',
    level: 1,
    orderPostingStep: 1,
    email: '',
    paperSubject: '',
    assignmentType: '',
    topic: '',
    pageCount: 1,
    sources: 0,
    wordCount: 1,
    deadlineDate: '',
    deadlineTime: '',
    studyLevel: '',
    citationStyleId: '',
    serviceType: 'Writing',
    supportingFiles: [],
    instructions: '',
    orderId: 0,
    writerBids: [],
    orderAlreadyPaidFor: false,
    selectedWriter: {
      name: '',
      id: ''
    },
    paymentSummary: {
      cpp: 0,
      currencyCode: '',
      paperPrice: 0,
      leastPaperPrice: 0,
      totalPrice: 0,
      discount: 0,
      extrasList: [],
      extrasTotalPrice: 0
    },
    orderSavingProgress: {
      details: false,
      payment: false
    },
    stepStatus: {
      step1: true,
      step2: true,
      step3: true,
      step4: true
    },
    addFunds: {
      paymentSuccessful: false,
      paymentFailed: false,
      notYetPaid: true
    }
  }
}

/* Initializing the state */
const state = () => ({
  disciplines: [],
  assignmentTypes: [],
  timeAmPm: [],
  serviceType: [],
  extraOrderServices: [],
  citationStyles: [],
  orderFormats: [],
  orderStudyLevels: [],
  academicCertifications: [],
  formsStateSet: false,
  orderPostingDone: false,
  stepStatus: {
    step1: true,
    step2: true,
    step3: true,
    step4: true
  },
  orderStatusTypes: [],
  clientPostOrderForm: {
    type: 'private',
    level: 1,
    orderPostingStep: 1,
    email: '',
    paperSubject: '',
    assignmentType: '',
    topic: '',
    pageCount: 1,
    sources: 0,
    wordCount: 1,
    deadlineDate: '',
    deadlineTime: '',
    studyLevel: '',
    citationStyleId: '',
    serviceType: 'Writing',
    supportingFiles: [],
    instructions: '',
    orderId: 0,
    writerBids: [],
    orderAlreadyPaidFor: false,
    selectedWriter: {
      name: '',
      id: ''
    },
    paymentSummary: {
      cpp: 0,
      currencyCode: '',
      paperPrice: 0,
      leastPaperPrice: 0,
      totalPrice: 0,
      discount: 0,
      extrasList: [],
      extrasTotalPrice: 0
    },
    orderSavingProgress: {
      details: false,
      payment: false
    },
    stepStatus: {
      step1: true,
      step2: true,
      step3: true,
      step4: true
    },
    addFunds: {
      paymentSuccessful: false,
      paymentFailed: false,
      notYetPaid: true
    }
  }
})

/* The getters. Help to access the state */
const getters = {
  disciplines: (state: any) => state.disciplines,
  assignmentTypes: (state: any) => state.assignmentTypes,
  timeAmPm: (state: any) => state.timeAmPm,
  serviceType: (state: any) => state.serviceType,
  extraOrderServices: (state: any) => state.extraOrderServices,
  citationStyles: (state: any) => state.citationStyles,
  orderFormats: (state: any) => state.orderFormats,
  orderStudyLevels: (state: any) => state.orderStudyLevels,
  orderPostingDone: (state: any) => state.orderPostingDone,
  academicCertifications: (state: any) => state.academicCertifications,
  formsStateSet: (state: any) => state.formsStateSet,
  stepStatus: (state: any) => state.stepStatus,
  orderStatusTypes: (state: any) => state.orderStatusTypes,
  clientPostOrderForm: (state: any) => state.clientPostOrderForm
}

/*
 * Actions are similar to mutations, the differences being that:
    - Instead of mutating the state, actions commit mutations.
    - Actions can contain arbitrary asynchronous operations.
*/
const actions = {
  /* An important feature of actions is the fact that we only get values from the backend once
  * Once the state has been initialized, then we no longer hit the backend */
  async getDisciplines ({ commit, state }: any) {
    if (state.disciplines.length === 0 || !Array.isArray(state.disciplines)) {
      return await api.getRequest('orders/v1/get_disciplines')
        .then((response: any) => {
          commit('changeDisciplines', Array.isArray(response) ? response : [])
          return true
        })
        .catch((error: any) => {
          return Promise.reject(error)
        })
    } else {
      return true
    }
  },
  async getAssignmentTypes ({ commit, state }: any) {
    console.log('\n\n\n states: ', state.assignmentTypes, '\n\n\n')
    if (state.assignmentTypes.length === 0 || !Array.isArray(state.assignmentTypes)) {
      return await api.getRequest('orders/v1/get_assignment_types')
        .then((response: any) => {
          commit('changeAssignmentTypes', Array.isArray(response) ? response : [])
          console.log('\n\n\n states: ', state.assignmentTypes, '\n\n\n')
          return true
        })
        .catch((error: any) => {
          // commit('changeAssignmentTypes', [{ name: 'a' }, { name: 'b' }])
          console.log('\n\n\n states: ', state.assignmentTypes, '\n\n\n')
          return Promise.reject(error)
        })
    } else {
      return true
    }
  },
  async getTime ({ commit, state }: any) {
    if (state.timeAmPm.length === 0 || !Array.isArray(state.timeAmPm)) {
      return await api.getRequest('orders/v1/get_time')
        .then((response: any) => {
          commit('changeTimeAmPm', Array.isArray(response) ? response : [])
          return true
        })
        .catch((error: any) => {
          return Promise.reject(error)
        })
    } else {
      return true
    }
  },
  async getServiceType ({ commit, state }: any) {
    if (state.serviceType.length === 0 || !Array.isArray(state.serviceType)) {
      return await api.postRequest('orders/v1/get_order_service_types', { extra: false })
        .then((response: any) => {
          commit('changeServiceType', Array.isArray(response) ? response : [])
          return true
        })
        .catch((error: any) => {
          return Promise.reject(error)
        })
    } else {
      return true
    }
  },
  async getExtraServiceTypes ({ commit, state }: any) {
    if (state.extraOrderServices.length === 0 || !Array.isArray(state.extraOrderServices)) {
      return await api.postRequest('orders/v1/get_order_service_types', { extra: true })
        .then((response: any) => {
          commit('changeExtraServiceTypes', Array.isArray(response) ? response : [])
          return true
        })
        .catch((error: any) => {
          return Promise.reject(error)
        })
    } else {
      return true
    }
  },
  async getCitationStyles ({ commit, state }: any) {
    if (state.citationStyles.length === 0 || !Array.isArray(state.citationStyles)) {
      return await api.getRequest('orders/v1/get_citation_styles')
        .then((response: any) => {
          commit('changeCitationStyles', Array.isArray(response) ? response : [])
          return true
        })
        .catch((error: any) => {
          return Promise.reject(error)
        })
    } else {
      return true
    }
  },
  async getOrderFormats ({ commit, state }: any) {
    if (state.orderFormats.length === 0 || !Array.isArray(state.orderFormats)) {
      return await api.getRequest('orders/v1/get_order_formats')
        .then((response: any) => {
          commit('changeOrderFormats', Array.isArray(response) ? response : [])
          return true
        })
        .catch((error: any) => {
          return Promise.reject(error)
        })
    } else {
      return true
    }
  },
  async getOrderStudyLevels ({ commit, state }: any) {
    const educationLevelsDetails = {
      academicInclined: false,
      orderInclined: true
    }
    if (state.orderStudyLevels.length === 0 || !Array.isArray(state.orderStudyLevels)) {
      return await api.postRequest('orders/v1/get_education_levels', educationLevelsDetails)
        .then((response: any) => {
          commit('changeOrderStudyLevels', Array.isArray(response) ? response : [])
          return true
        })
        .catch((error: any) => {
          return Promise.reject(error)
        })
    } else {
      return true
    }
  },
  async getOrderStatusTypes ({ commit, state }: any) {
    if (state.orderStatusTypes.length === 0 || !Array.isArray(state.orderStatusTypes)) {
      return await api.getRequest('orders/v1/get_order_status_types')
        .then((response: any) => {
          commit('changeOrderStatusTypes', Array.isArray(response) ? response : [])
          return true
        })
        .catch((error: any) => {
          return Promise.reject(error)
        })
    } else {
      return true
    }
  },
  async getAcademicCertifications ({ commit, state }: any) {
    if (state.academicCertifications.length === 0 || !Array.isArray(state.academicCertifications)) {
      return await api.getRequest('orders/v1/get_academic_certifications')
        .then((response: any) => {
          commit('changeAcademicCertifications', Array.isArray(response) ? response : [])
          return true
        })
        .catch((error: any) => {
          return Promise.reject(error)
        })
    } else {
      return true
    }
  }
}

/* The only way to change a Vuex state is by committing a mutation */
const mutations = {
  changeDisciplines: (state: any, val: number[]) => {
    state.disciplines = val
  },
  changeAssignmentTypes: (state: any, val: number[]) => {
    state.assignmentTypes = val
  },
  changeTimeAmPm: (state: any, val: number[]) => {
    state.timeAmPm = val
  },
  changeServiceType: (state: any, val: number[]) => {
    state.serviceType = val
  },
  changeExtraServiceTypes: (state: any, val: number[]) => {
    state.extraOrderServices = val
  },
  changeCitationStyles: (state: any, val: number[]) => {
    state.citationStyles = val
  },
  changeOrderFormats: (state: any, val: number[]) => {
    state.orderFormats = val
  },
  changeOrderStatusTypes: (state: any, val: number[]) => {
    state.orderStatusTypes = val
  },
  changeOrderStudyLevels: (state: any, val: number[]) => {
    state.orderStudyLevels = val
  },
  changeStepStatus: (state: any, { key, val }: any) => {
    state.stepStatus[key] = val
  },
  changeOrderPostingDone: (state: any, val: number[]) => {
    state.orderPostingDone = val
  },
  changeAcademicCertifications: (state: any, val: number[]) => {
    state.academicCertifications = val
  },
  changeFormsStateSet: (state: any, val: any) => {
    state.formsStateSet = val
  },
  changeWholeClientPostOrderForm: (state: any, val: any) => {
    state.clientPostOrderForm = val
  },
  resetClientPostOrderForm: (state: any) => {
    state.clientPostOrderForm = getDefaultRegistrationState.clientPostOrderForm
  },
  changeClientPostOrderForm: (state: any, { key, subKey, val, option }: any) => {
    if (subKey !== null) {
      state.clientPostOrderForm[key][subKey] = val
    } else {
      if (key === 'supportingFiles') {
        switch (option) {
          case 'push':
            state.clientPostOrderForm.supportingFiles.push(val)
            break
          case 'pop': {
            const index = state.clientPostOrderForm.supportingFiles.map(function (e: any) {
              return e.fileUrl
            }).indexOf(val)
            if (index > -1) {
              state.clientPostOrderForm.supportingFiles.splice(index, 1)
            }
            break
          }
          case 'default':
            break
        }
      } else {
        state.clientPostOrderForm[key] = val
      }
    }
  },
  resetRegistrationState: (state: any) => {
    const s: Dictionary<any> = getDefaultRegistrationState
    Object.keys(s).forEach(key => {
      state[key] = s[key]
    })
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
