<template>
  <v-app>
    <order-now-bar title="About Us" />
    <v-container>
      <div
        class="text-center text-xl-center text-lg-center text-md-center text-sm-center"
        :style="xl ? 'margin-left: 13vw; margin-right: 15vw;' : ''"
      >
        <span style="font-size: 18px">Who We Are</span>
      </div>
      <div :style="xl ? 'margin-left: 13vw; margin-right: 15vw;' : ''">
        <p>
          <a href="/">EssaySpring</a> is an academic writing assistance company. We provide our help to the
          numerous clients looking for a professional writing service.
        </p><p>
          Our care for our customers,
          aspiration for constant perfection, and focus on developing trustworthy relations are what make EssaySpring
          the best provider for quality yet affordable orders by a carefully selected group of professional
          writers.
        </p>
      </div>
      <div :style="xl ? 'margin-left: 13vw; margin-right: 15vw;' : ''">
        <p>
          Our company’s long-term goal is to become the quality standard in the market of custom
          academic writing services. In particular, we strive for:
        </p><ul>
          <li>Development of high-quality products</li>
          <li>Writing authentic, non-plagiarized papers</li><li>Timely delivery of customers’ orders</li>
          <li>Providing our writers with a variety of options for professional development</li>
          <li>Creating a positive public image.</li>
        </ul>
        <br>
        <p>
          We seek to gain our customers’ support in achieving these goals through teamwork. We also aspire to maintain
          the win-win system of responsibilities between the company and the writers’ team. Such a close
          partnership helps EssaySpring maintain the top position among the world enterprises.
        </p><p>
          Our company
          appreciates its customers and values our continued partnership through understanding and following the common
          principles of the company. Our progress is demonstrated through:
        </p><ul>
          <li>Innovation</li>
          <li>Collaboration</li><li>Mutual respect</li><li>Development</li><li>Quality.</li>
        </ul>
      </div>
    </v-container>
  </v-app>
</template>

<script>

import OrderNowBar from '@/components/general/OrderNowBar'

export default {
  name: 'About',
  head: {
    title: 'About Us',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: 'About EssaySpring'
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
    window.scrollTo(0, 0)
  }
}
</script>

<style scoped lang="scss">

</style>
