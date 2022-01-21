<template>
  <v-app>
    <order-now-bar title="FAQs" />
    <v-container class="mt-2">
      <v-row
        justify="center"
        :style="xl ? 'margin-left: 11vw; margin-right: 15vw;' : ''"
      >
        <v-expansion-panels
          popout
          focusable
          flat
        >
          <v-expansion-panel
            id="expansion_panel"
            class="rounded-0"
            v-for="(item,i) in qas"
            :key="i"
          >
            <v-expansion-panel-header> {{ item.question }} </v-expansion-panel-header>
            <v-expansion-panel-content>
              {{ item.answer }}
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>

import OrderNowBar from '@/components/general/OrderNowBar'

export default {
  name: 'FAQ',
  head: {
    title: 'FAQs',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: 'Questions and answers about our products and/or services'
      }
    ]
  },
  components: {
    OrderNowBar
  },
  data () {
    return {
      qas: [
        {
          question: 'How does this service work?',
          answer: 'Describe your writing requirements and then post your job. Writers that are interested in ' +
            'completing this job will then have the opportunity to bid on your project. To help you make your ' +
            'decision, you will have the opportunity to check their previous experience, ratings, and feedback. ' +
            'Once you choose the writer you deem most suitable for the job, you will deposit payment for the order.' +
            ' The writer will then complete the assignment and deliver the finished product to you.'
        },
        {
          question: 'Why choose us?',
          answer: 'All of our writers have been carefully screened to ensure that they have the highest degree of ' +
            'expertise, credibility, and professionalism.\n' +
            'At essayspring.com, you can be confident in your paper being delivered as a well-written, accurate, and ' +
            'error-free product. It will be a unique product, completely free of any sort of plagiarism.\n' +
            'Your confidentiality will be respected in the utmost, and you can rest easy knowing that any personal ' +
            'information you provide to us will not be disclosed.\n' +
            'You will have the opportunity to work with a wide variety of professional writers who are more than ' +
            'capable of meeting your academic writing needs.'
        },
        {
          question: 'How do I get started?',
          answer: 'There will be categories of writing for you to choose from. Pick the one that best fits your ' +
            'academic writing requirement.\n' +
            'Once you have chosen the category, you will need to write your job description. Please be ' +
            'descriptive - this helps the writers choose jobs that they can fulfill well.\n' +
            'You will be able to leave your contact email for writers who are interested in your project to ' +
            'place their bids on.\n' +
            'You can take the time to review the ratings and feedback on previously completed work by the ' +
            'writer prior to choosing them.\n' +
            'Choose the writer that best suits your need, and then make your payment based on this, which ' +
            'will be held until the job has been satisfactory completed.'
        },
        {
          question: 'How long can it take me to successfully place an order?',
          answer: 'You can take as little as 2 minutes to place your order successfully'
        },
        {
          question: 'How about if an order is unsatisfactory?',
          answer: 'Once you have accepted your academic writing provider you can discuss the details of the ' +
            'assignment further with them.\n' +
            'When the assignment has been completed you can review and ask for any revisions you think are' +
            ' necessary.\n' +
            'Once the job has been completed to your satisfaction you can then release the payment.\n' +
            'Money that has been released for a completed project is not refundable.\n' +
            'Detailed information is stated in Terms of Use.'
        },
        {
          question: 'Can a paper be plagiarised?',
          answer: 'We know that academic writing submissions must be totally free of plagiarism. Our writers ' +
            'are also aware of the importance of this. To ensure that this does not happen our qualified staff ' +
            'will check all submissions by writers through the use of several forms of software designed to check' +
            ' for plagiarism. You can take be sure that we take great care in preventing dishonesty and will not' +
            ' tolerate writers who attempt to pass off plagiarized essays.'
        },
        {
          question: 'Is my data safe?',
          answer: 'Confidentiality is as important to us as it is to you. To ensure it we have implemented high ' +
            'quality security measures. All of your personal data is safe on our secure servers. Your information ' +
            'will never be disseminated to third parties in any way, shape or form.'
        },
        {
          question: 'I want to get started as a writer, how do I go about it?',
          answer: 'If you are a qualified academic writer who wants to earn good money for your skills, ' +
            'then we\'d be delighted to have you on our team. Please visit writeray.com to register.'
        }
      ]
    }
  },
  computed: {
    xl () {
      let val
      switch (this.$vuetify.breakpoint.name) {
        case 'xl':
          val = true
          break
        default:
          val = false
      }
      return val
    }
  },
  mounted () {
    window.scrollTo(0, 0)
  }
}
</script>

<style lang="scss" scoped>

.v-expansion-panel{
  border-bottom: 1px solid #e9e8e8;
  .v-expansion-panel-header{
    //color: #007991;
    font-size: 17px;
    height: 70px;
    &:hover{
      background-color: #a2a2a2;
    }
  }
}

</style>
