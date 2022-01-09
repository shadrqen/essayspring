<template>
  <v-card flat>
    <v-container>
      <v-card-text>
        <v-row no-gutters id="what_they_say_row" :style="xl ? 'margin-left: 13vw; margin-right: 15vw;' : ''">
          <v-col cols="12" xl="12" lg="12" md="12" sm="12" class="text-center title_col">
            <span class="text-h5 text-xl-h5 text-lg-h5 text-lg-h5 text-md-h5 text-sm-h5"> {{ what_they_say_title }} </span>
          </v-col>
          <v-col cols="2" xl="2" lg="2" md="2" sm="2" id="left_arrow_col">
            <v-img :src="require('~/assets/icons/arrow_left.svg')" id="arrow_left"></v-img>
          </v-col>
          <v-col cols="8" xl="8" lg="8" md="8" sm="8" id="what_our_customers_say_col">
            <v-card id="what_they_say_small_card" outlined>
              <v-card-text>
                <client-only>
                  <p class="what_they_say_paragraphs">
                  <span id="what_they_say_small_card_quote">"</span>
                  <span id="what_they_say_small_card_span">
                    {{ rating_text }}
                  </span>
                  <br>
                  <v-row no-gutters id="what_they_say_small_card_row">
                    <v-col cols="12" xl="8" lg="8" md="8" sm="8">
                      <v-rating
                        length="10"
                        id="what_they_say_rating"
                        dense
                        readonly
                        v-model="rating"
                        background-color="#3474B4"
                        color="#007991"
                        small
                      ></v-rating>
                      <span id="what_they_say_rating_no"> {{ rating }}/10 </span>
                    </v-col>
                    <v-col cols="12" xl="2" lg="2" md="2" sm="2">
                      <v-spacer></v-spacer>
                      <span id="what_they_say_hours_ago"> {{ time_rating_added }} </span>
                    </v-col>
                  </v-row>
                </p>
                </client-only>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="2" xl="2" lg="2" md="2" sm="2" id="right_arrow_col">
            <v-img :src="require('~/assets/icons/arrow_right.svg')" id="arrow_right"></v-img>
          </v-col>
        </v-row>
      </v-card-text>
    </v-container>
  </v-card>
</template>

<script>
export default {
  name: 'WhatTheySay',
  props: ['what_they_say_title', 'rating_text', 'time_rating_added', 'rating'],
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

@import "../../styles/mixins/general";

@import "../../styles/general/general";

.title_col{
  padding-bottom: 40px;
}

#what_they_say_row{
  padding-bottom: 40px;
}

#what_they_say_small_card{
  padding-top: 20px;
  #what_they_say_small_card_quote{
    color: $primaryDarkGreenBlueColor;
    font-size: 60px;
  }
  #what_they_say_small_card_span{
    color: black;
    font-size: 16px;
  }
  #what_they_say_small_card_row{
    padding-top: 10px;
    #what_they_say_rating{
      display: inline-block;
    }
    #what_they_say_rating_no{
      color: $primaryDarkGreenBlueColor;
    }
    #what_they_say_hours_ago{
      float: right;
      color: #474747;
    }
  }
}

#left_arrow_col{
  padding-bottom: 40px;
    #arrow_left{
      cursor: pointer;
      width: 80px !important;
      color: #007991;
    }
}

#right_arrow_col{
  text-align: end;
  padding-bottom: 40px;
  #arrow_right{
    cursor: pointer;
    width: 80px;
    float: right
  }
}

</style>
