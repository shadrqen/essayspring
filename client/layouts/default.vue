<template>
  <!--    Implementing the Base Layout, which holds the format of the root App page -->
  <GeneralBaseLayout>
    <template #header>
      <GeneralNavBar />
    </template>
    <template #default>
      <v-main>
        <router-view />
      </v-main>
    </template>
    <template #footer>
      <GeneralFooter v-if="pageLoaded" />
    </template>
  </GeneralBaseLayout>
</template>

<script lang="js">
import Vue from 'vue'
import { mapMutations } from 'vuex'

export default Vue.extend({
  name: 'App',
  components: {
    GeneralFooter: () => import('../components/general/BaseFooter.vue')
  },
  data () {
    return {
      pageLoaded: false
    }
  },
  methods: {
    ...mapMutations({
      changeViewPortCode: 'changeViewPortCode'
    }),
    set_viewport_code () {
      let width = 0
      if (process.env.VUE_ENV === 'client') {
        width = window.innerWidth
      }
      switch (true) {
        case (width < 600):
          this.changeViewPortCode('xs')
          break
        case (width > 600 && width < 960):
          this.changeViewPortCode('sm')
          break
        case (width > 960 && width < 1264):
          this.changeViewPortCode('md')
          break
        case (width > 1264 && width < 1904):
          this.changeViewPortCode('lg')
          break
        case (width > 1904):
          this.changeViewPortCode('xl')
          break
      }
    }
  },
  mounted () {
    if (process.env.VUE_ENV === 'client') {
      window.addEventListener('resize', this.set_viewport_code)
      window.addEventListener('load', () => {
        this.pageLoaded = true
      })
    }
  },
  created () {
    this.set_viewport_code()
  }
})
</script>
