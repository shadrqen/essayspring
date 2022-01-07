<template>
  <v-app>
    <order-now-bar title="Cookie Policy"></order-now-bar>
    <v-container>
      <div class="row" :style="xl ? 'margin-left: 13vw; margin-right: 15vw;' : ''">
        <div class="text-block privacy-wrap">
          <p class="mt-6">
            <i>
              This Cookie Policy was last updated on 9th of November 2021.
            </i>
          </p>

          <p>
            This Cookie Policy (the “Policy”, the “Cookie Policy” or “Our Policy”) determines how we obtain, collect
            and use information on this website (“We”, the “Website” or “Our Website”) and in course of services
            provision via the Website (all of the above together referred to as the “Services”).
          </p>

          <p>
            <b>USE OF COOKIES</b>
          </p>

          <p>
            The Website may gather information about your general Internet use by using cookies. Where used, these cookies are downloaded to your computer automatically. A cookie is a file that is placed on your hard disk by a web page server. Cookies cannot be used to run programs or deliver viruses to your computer. Cookies are uniquely assigned to you, and can only be read by a web server in the domain that issued the cookie to you. The Website uses cookies to help you personalize your online experience.
          </p>

          <p>
            The Website may also gather information such as IP address, internal session ID, user's domain, type of Internet browser. Such information will not identify you personally: it is statistical data about Our visitors and their use of Our Website. This statistical data does not identify any personal details whatsoever.
          </p>

          <p>
            One of the primary purposes of cookies is to provide a convenience feature to save your time. The purpose of a cookie is to tell the web server that you have returned to a specific page. For example, if you personalize Our Website pages, or register with Our Website or Services, a cookie helps Us to recall your specific information on subsequent visits. This simplifies the process of recording your personal information. When you return to Our Website, the information you previously provided can be retrieved, so you can easily use the Website features that you customized.
          </p>

          <p>
            You have the ability to accept or decline cookies. Most web browsers automatically accept cookies, but you can usually modify your browser setting to decline cookies if you prefer. If you choose to decline cookies, you may not be able to fully experience the interactive features of the websites you visit.
          </p>

          <p>
            Third party links provided on Our Website may also use cookies, over which We have no control. Such cookies (if used) would be downloaded once you click on their advertisement banners on Our Website or visit their websites.
          </p>
        </div>
      </div>
    </v-container>
  </v-app>
</template>

<script>

import OrderNowBar from '@/components/general/OrderNowBar'

export default {
  name: 'CookiePolicy',
  head: {
    title: 'Cookie Policy - EssaySpring',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: 'Policies governing the use of cookies'
      }
    ]
  },
  components: {
    OrderNowBar
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
    document.body.scrollTop = 0 // For Safari
    document.documentElement.scrollTop = 0 // For Chrome, Firefox, IE and Opera
  }
}
</script>

<style scoped>

</style>
