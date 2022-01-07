<template>
  <v-card flat id="how_it_works_card" class="rounded-0">
    <v-container>
      <v-card-text>
        <v-row no-gutters id="how_it_works_row" :style="xl ? 'margin-left: 13vw; margin-right: 15vw;' : ''">
          <v-col cols="12" xl="12" lg="12" md="12" sm="12" class="text-center title_col">
            <span class="text-h5 text-xl-h5 text-lg-h5 text-lg-h5 text-md-h5 text-sm-h5">How it Works</span>
          </v-col>
          <v-col cols="12" :xl="viewport_size" :lg="viewport_size" :md="viewport_size" :sm="viewport_size"
                 class="how_it_works_chips"
                 v-for="(process, id) in clientPostOrderForm.type && clientPostOrderForm.type === 'public' ? content : contentPrivate"
                 :key="id">
            <v-chip
                class="ma-2"
            >
              {{ process.step }}
            </v-chip>
            <span class="text-lg-body-1">  {{ process.title }} </span>
            <br>
            <p class="how_it_works_paragraphs">
              {{ process.text }}
            </p>
          </v-col>
        </v-row>
      </v-card-text>
    </v-container>
  </v-card>
</template>

<script>

import { mapGetters } from 'vuex'

export default {
  name: 'HowItWorkComponent',
  props: ['content', 'viewport_size', 'contentPrivate'],
  data () {
    return {}
  },
  computed: {
    ...mapGetters(['clientPostOrderForm']),
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

@import "../../styles/mixins/general";

@import "../../styles/general/general";

#how_it_works_card{
  border-top: 1px solid $greyBorderColor;

  #how_it_works_row{
    padding-bottom: 40px;
  }

  .how_it_works_paragraphs {
    text-align: left;
    padding-right: 10px;
    padding-top: 10px;
    color: $faintBlackColor;
    line-height: 200%;
  }

  .how_it_works_chips {
    padding-top: 40px;
  }

  .text-h5 {
    color: black;
  }

  .text-lg-body-1 {
    color: black;
  }
}

</style>
