<template>
  <v-card>
    <v-container>
      <v-row
        :style="xl ? 'margin-left: 13vw; margin-right: 15vw;' : ''"
        no-gutters
      >
        <v-col
          cols="6"
          lg="6"
          md="6"
          sm="6"
          xl="6"
        >
          <span style="font-size: 18px; font-weight: normal"> {{ title }} </span>
        </v-col>
        <v-col
          class="text-end text-xl-end text-lg-end text-md-end text-sm-end"
          cols="6"
          lg="6"
          md="6"
          sm="6"
          xl="6"
        >
          <v-btn
            id="order_now_btn"
            to="/client/place-order"
          >
            <span class="text-subtitle-2 text-xl-subtitle-2 text-lg-subtitle-2 text-md-subtitle-2 text-sm-subtitle-2">Order Now</span>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
export default {
  name: 'OrderNowBar',
  props: {
    title: {
      type: String,
      required: true
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
  }
}
</script>

<style lang="scss" scoped>

@import "../../styles/mixins/general";

.v-card{
  background-color: $primaryLightGreyColor;
  #order_now_btn{
    @include darkGreenBlueBtnConfig('auto', white, $primaryDarkGreenBlueColor);
  }
}
</style>
