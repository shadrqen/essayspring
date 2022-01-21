<template>
  <v-card
    id="who_we_are_card"
    class="rounded-0"
  >
    <v-container>
      <v-card-text>
        <v-row
          id="who_we_are_row"
          no-gutters
          :style="xl ? 'margin-left: 12vw; margin-right: 17vw;' : ''"
        >
          <v-col
            cols="12"
            xl="12"
            lg="12"
            md="12"
            sm="12"
            class="text-center title_col"
          >
            <span class="text-h5 text-xl-h5 text-lg-h5 text-lg-h5 text-md-h5 text-sm-h5 white--text">Who we are</span>
          </v-col>
          <v-col
            id="who_we_are_col"
            cols="12"
            xl="12"
            lg="12"
            md="12"
            sm="12"
          >
            <span
              id="sub_title"
              class="text-subtitle-1 text-xl-subtitle-1 text-lg-subtitle-1 text-md-subtitle-1 text-sm-subtitle-1 white--text"
            >
              EssaySpring is an academic writing assistance company. We provide our help to the numerous clients looking for a
              professional writing service.

              Our company’s long-term goal is to become the quality standard in the market of custom academic writing services.

              Our company appreciates its customers and values our continued partnership through understanding and following the common principles of the company.
            </span>
          </v-col>
        </v-row>
      </v-card-text>
    </v-container>
  </v-card>
</template>

<script>
export default {
  name: 'WhoWeAre',
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
  }
}
</script>

<style scoped lang="scss">

@import "../../styles/general/general";

@import "../../styles/mixins/general";

#who_we_are_card{
  background-color: $primaryDarkGreenBlueColor;
  //background-image: linear-gradient(to right, #3474B4, #007991);
  #who_we_are_row{
    padding-bottom: 40px;
    #who_we_are_col{
      padding-top: 40px;
    }
  }
}

</style>
