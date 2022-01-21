<template>
  <v-container>
    <v-card
      class="grey lighten-3"
      flat
    >
      <v-card-actions :class="titleClass">
        {{ title }}
      </v-card-actions>
      <v-card-subtitle
        id="header-subtitle"
        :class="subTitleClass"
      >
        {{ subTitle }}
      </v-card-subtitle>
    </v-card>
  </v-container>
</template>

<script>

import { mapGetters } from 'vuex'

export default {
  name: 'Header',
  props: {
    title: {
      type: String,
      required: true
    },
    subTitle: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      card_margin_right: {
        xs: 0,
        sm: 0,
        md: 0,
        lg: '88px',
        xl: '100px'
      },
      card_margin_left: {
        xs: '-60px',
        sm: '-60px',
        md: 0,
        lg: 0,
        xl: 0
      },
      titleClass: 'text-h6 text-xl-h5 text-lg-h5 text-md-h5 text-sm-h5',
      subTitleClass: 'text-body-2 text-xl-subtitle-2 text-lg-subtitle-2 text-md-subtitle-2 text-sm-subtitle-2'
    }
  },
  computed: {
    ...mapGetters({ viewport_code: 'getViewPortCode' })
  }
}
</script>

<style scoped>

#header-subtitle{
  margin-left: -7px;
  margin-top: -13px;
  font-size: 16px !important;
}

</style>
