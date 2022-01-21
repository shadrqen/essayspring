<template>
  <v-card
    class="hero_image rounded-0"
    flat
  >
    <v-card-text>
      <v-container>
        <v-row no-gutters>
          <v-col
            cols="12"
            lg="5"
            md="5"
            sm="4"
            xl="5"
          >
            <p
              id="sit_back_relax"
              :class="text_h5"
            >
              {{ mainHero }}
            </p>
            <p
              id="we_offer_exemplary_service"
              :class="text_sub_title_1"
            >
              {{ subHero }}
              <br>
              {{ subHeroNewLine }}
            </p>
            <slot name="image" />
          </v-col>
          <v-col
            cols="12"
            lg="2"
            md="1"
            sm="1"
            xl="2"
          />
          <v-col
            cols="12"
            lg="5"
            md="6"
            sm="7"
            xl="5"
          >
            <slot name="login_register" />
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'HeroImage',
  props: {
    mainHero: {
      type: String,
      required: true
    },
    subHero: {
      type: String,
      required: true
    },
    subHeroNewLine: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      break_point_name: null,
      client_post_order_card_text_padding: null,
      text_caption: null,
      text_h5: null,
      text_sub_title_1: null,
      text_button: null
    }
  },
  async fetch () {
    this.client_post_order_card_text_padding = '50px'
    this.text_caption = 'text-caption text-xl-caption text-lg-caption text-lg-caption text-md-caption text-sm-caption'
    this.text_h5 = 'text-h5 text-xl-h4 text-lg-h4 text-md-h5 text-sm-h5'
    this.text_sub_title_1 = 'text-subtitle-1 text-xl-h6 text-lg-subtitle-1 text-md-subtitle-1 text-sm-subtitle-1'
    this.text_button = 'text-button text-xl-button text-lg-button text-md-button text-sm-button'
  },
  methods: {}
}
</script>

<style lang="scss" scoped>

@import '../../styles/general/general';

@import '../../styles/mixins/general';

.hero_image {
  background-color: $primaryLightGreyColor;

  #sit_back_relax {
    line-height: 150%;
    color: black;
  }
  #we_offer_exemplary_service{
    padding-top: 20px;
    padding-bottom: 20px;
    line-height: 200%;
  }
}
</style>
