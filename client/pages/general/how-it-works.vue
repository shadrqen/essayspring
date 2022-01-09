<template>
  <v-app>
    <order-now-bar title="How it Works"></order-now-bar>
    <how-it-works-component :content="how_it_works" :contentPrivate="how_it_works_private" :viewport_size="12"></how-it-works-component>
  </v-app>
</template>

<script>

import OrderNowBar from '@/components/general/OrderNowBar'
import HowItWorksComponent from '@/components/general/HowItWorks'

export default {
  name: 'HowItWorks',
  head: {
    title: 'How it Works',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: 'How posting of orders works'
      }
    ]
  },
  components: {
    OrderNowBar,
    HowItWorksComponent
  },
  data () {
    return {
      how_it_works_private: [
        {
          step: 1,
          title: 'Get Started',
          text: 'Create an account with us by providing your email address alone.'
        },
        {
          step: 2,
          title: 'Send Invites',
          text: 'Invite your writers by sending them invites. The writers will then register under your account.'
        },
        {
          step: 3,
          title: 'Assign Orders',
          text: 'Assign and reassign any number of orders to your writers seamlessly.'
        },
        {
          step: 4,
          title: 'Manage Orders',
          text: 'Organize your orders, writers and finances round the clock'
        }
      ],
      how_it_works: [
        {
          step: 1,
          title: 'Place Order',
          text: 'Choose the subject of your paper, number of pages and\n' +
              ' specify the deadline. Indicate your paper instructions and attach files if applicable'
        },
        {
          step: 2,
          title: 'Choose Writer',
          text: 'You will see a list of writers, starting with those who are best suited to handle \n' +
              ' the paper. Choose one that best satisfies your requirements'
        },
        {
          step: 3,
          title: 'Track Your Order',
          text: 'Keep track of the paper and have access to every bit throughout the writing process. \n' +
              ' Contact your writer and ask for change where necessary'
        },
        {
          step: 4,
          title: 'Receive Paper',
          text: 'Counter-check your finished paper and release the remaining balance when you are \n' +
              ' satisfied. Kindly give feedback so as to help better our services to best satisfy your \n' +
              ' interests and needs.'
        }
      ]
    }
  }
}
</script>

<style scoped>

</style>
