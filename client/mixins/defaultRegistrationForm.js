export default {
  data () {
    return {
      defaultForm: {
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
  }
}
