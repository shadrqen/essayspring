<!--The index page of the application-->
<template>
  <v-app>
    <hero-image
      :textCaption="textCaption"
      :textH5="textH6"
      :textSubTitle1="textSubTitle1"
      :mainHero="mainHero"
      :mainHeroPub="mainHeroPub"
      :subHero="subHero"
      :subHeroPub="subHeroPub"
      :viewportCode="viewportCode"
      :pageFullyLoaded="pageFullyLoaded"
      :clientPostOrderCardTextPadding="clientPostOrderCardTextPadding"
    ></hero-image>
    <how-it-works :content="howItWorksPub" :contentPrivate="howItWorks" :viewport_size="viewportSize"></how-it-works>
    <our-benefits v-if="pageFullyLoaded" :content="ourBenefits"></our-benefits>
    <what-our-writers-say v-if="pageFullyLoaded" :what_they_say_title="whatTheySayTitle" :rating_text="ratingText" :rating="rating"
                          :time_rating_added="timeRatingAdded"></what-our-writers-say>
    <who-we-are v-if="pageFullyLoaded"></who-we-are>
  </v-app>
</template>

<script>

import HeroImage from '@/components/client/HeroImage'
import HowItWorks from '@/components/general/HowItWorks'
import { mapGetters, mapMutations } from 'vuex'
import authMixin from '../utils/auth'

export default {
  name: 'Index',
  head: {
    title: 'Essay Writing Service - Freelance Academic Writing Assistance EssaySpring.com - EssaySpring.com',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: 'Essay Writing Service - Freelance Academic Writing Assistance EssaySpring.com - EssaySpring.com'
      }
    ]
  },
  components: {
    HeroImage,
    HowItWorks,
    OurBenefits: () => import('@/components/general/OurBenefits'),
    WhatOurWritersSay: () => import('@/components/general/WhatTheySay'),
    WhoWeAre: () => import('@/components/general/WhoWeAre')
  },
  data () {
    return {
      howItWorks: [
        {
          step: 1,
          title: 'Get Started',
          text: 'Choose the subject of your paper, number of pages and\n' +
            ' specify the deadline. Indicate your paper instructions and attach files if applicable'
        },
        {
          step: 2,
          title: 'Send Invites',
          text: 'You will see a list of writers, starting with those who are best suited to handle \n' +
            ' the paper. Choose one that best satisfies your requirements'
        },
        {
          step: 3,
          title: 'Assign Orders',
          text: 'Keep track of the paper and have access to every bit throughout the writing process. \n' +
            ' Contact your writer and ask for change where necessary'
        },
        {
          step: 4,
          title: 'Manage Orders',
          text: 'Organize your orders, writers and finances round the clock'
        }
      ],
      howItWorksPub: [
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
      ],
      ourBenefits: [
        {
          title: 'Professional Writers',
          text: 'Get access to our team of experienced and trusted professional writers to assist \n' +
            ' in your coursework'
        },
        {
          title: 'High Quality',
          text: 'High standards are applied to achieve the highest quality possible of your paper'
        },
        {
          title: 'Time Saving',
          text: 'Get your order started in less than 2 minutes'
        },
        {
          title: 'Low Cost',
          text: 'Enjoy unbelievably low prices for your orders, ranging from writing, rewriting to editing.'
        },
        {
          title: 'Boost your Grade',
          text: 'Improve your performance by receiving the ideal responses to your coursework'
        },
        {
          title: '24/7 Support',
          text: 'Get access to instant support services every hour and day of the week'
        }
      ],
      whatTheySayTitle: 'What our Customers Say',
      ratingText: 'Excellent work from the writer. Did the paper in record time and in the highest quality possible.\n' +
        '                    I can recommend 100%, and will surely seek the same in future.',
      timeRatingAdded: '14 hours ago',
      rating: 10,
      textCaption: 'text-caption text-xl-caption text-lg-caption text-lg-caption text-md-caption text-sm-caption',
      textH5: 'text-h5 text-xl-h4 text-lg-h4 text-md-h5 text-sm-h5',
      textH6: 'text-h6 text-xl-h5 text-lg-h5 text-md-h6 text-sm-h6',
      textSubTitle1: 'text-subtitle-1 text-xl-h6 text-lg-subtitle-1 text-md-subtitle-1 text-sm-subtitle-1',
      mainHero: 'Manage your writers and orders professionally',
      mainHeroPub: 'Let our team of professional writers take care of your coursework',
      subHero: 'Your one-stop writing companion for managing writers and orders',
      subHeroPub: 'We offer exemplary service, no matter the type of paper. Simple and secure.',
      clientPostOrderCardTextPadding: '50px',
      viewportCode: null,
      pageFullyLoaded: false,
      viewportSize: 3
    }
  },
  /* As an SSR, it is important to use the asyncData attribute to initialize variables that might be quite
  * necessary and critical towards the initial loading of an application. This is because the data
  * attribute is not accessible on the serverside */
  async asyncData () {
    const textCaption = 'text-caption text-xl-caption text-lg-caption text-lg-caption text-md-caption text-sm-caption'
    const textH5 = 'text-h5 text-xl-h4 text-lg-h4 text-md-h5 text-sm-h5'
    const textSubTitle1 = 'text-subtitle-1 text-xl-h6 text-lg-subtitle-1 text-md-subtitle-1 text-sm-subtitle-1'
    const mainHero = 'Manage your writers and orders professionally'
    const subHero = 'Your one-stop writing companion for managing writers and orders'
    const howItWorks = [
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
    ]
    const ourBenefits = [
      {
        title: 'Professional Writers',
        text: 'Get access to our team of experienced and trusted professional writers to assist \n' +
          ' in your coursework'
      },
      {
        title: 'High Quality',
        text: 'High standards are applied to achieve the highest quality possible of your paper'
      },
      {
        title: 'Time Saving',
        text: 'Get your order started in less than 2 minutes'
      },
      {
        title: 'Low Cost',
        text: 'Enjoy unbelievably low prices for your orders, ranging from writing, rewriting to editing.'
      },
      {
        title: 'Boost your Grade',
        text: 'Improve your performance by receiving the ideal responses to your coursework'
      },
      {
        title: '24/7 Support',
        text: 'Get access to instant support services every hour and day of the week'
      }
    ]
    const whatTheySayTitle = 'What our Customers Say'
    const ratingText = 'Excellent work from the writer. Did the paper in record time and in the highest quality possible.\n' +
      'I can recommend 100%, and will surely seek the same in future.'
    const timeRatingAdded = '14 hours ago'
    const clientPostOrderCardTextPadding = '50px'
    const viewportCode = 'xs'
    const pageFullyLoaded = false
    const viewportSize = 3
    return {
      textCaption,
      textH5,
      textSubTitle1,
      mainHero,
      subHero,
      howItWorks,
      ourBenefits,
      whatTheySayTitle,
      ratingText,
      timeRatingAdded,
      clientPostOrderCardTextPadding,
      viewportCode,
      pageFullyLoaded,
      viewportSize
    }
  },
  computed: {
    ...mapGetters(['pageLoaded', 'clientPostOrderForm'])
  },
  watch: {
    pageLoaded () {
      this.pageFullyLoaded = this.pageLoaded
    }
  },
  created () {
    authMixin.tokenIsValid()
  },
  methods: {
    ...mapMutations(['changePageLoaded']),
    setViewportCode () {
      let width = 0
      if (process.env.VUE_ENV === 'client') {
        width = window.innerWidth
      }
      switch (true) {
        case (width < 600):
          this.viewportCode = 'xs'
          break
        case (width > 600 && width < 960):
          this.viewportCode = 'sm'
          break
        case (width > 960 && width < 1264):
          this.viewportCode = 'md'
          break
        case (width > 1264 && width < 1904):
          this.viewportCode = 'lg'
          break
        case (width > 1904):
          this.viewportCode = 'xl'
          break
      }
      this.setClientPostOrderCardTextPadding()
    },
    setClientPostOrderCardTextPadding () {
      switch (true) {
        case (this.viewportCode === 'xs'):
          this.clientPostOrderCardTextPadding = '20px'
          break
        case (this.viewportCode === 'sm'):
          this.clientPostOrderCardTextPadding = '30px'
          break
        case (this.viewportCode === 'md'):
          this.clientPostOrderCardTextPadding = '40px'
          break
        case (this.viewportCode === 'lg'):
          this.clientPostOrderCardTextPadding = '50px'
          break
        case (this.viewportCode === 'xl'):
          this.clientPostOrderCardTextPadding = '50px'
          break
      }
    }
  },
  mounted () {
    this.setViewportCode()
    if (process.env.VUE_ENV === 'client') {
      this.pageFullyLoaded = this.pageLoaded
      window.addEventListener('resize', this.setViewportCode)
      window.addEventListener('load', () => {
        this.changePageLoaded(true)
      })
    }
  }
}
</script>

<style scoped lang="scss">

</style>
