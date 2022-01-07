<template>
  <v-card flat class="grey_background_card rounded-0">
    <v-container>
      <v-card-text>
        <v-row no-gutters id="our_benefits_row" :style="xl ? 'margin-left: 13vw; margin-right: 15vw;' : ''">
          <v-col cols="12" xl="12" lg="12" md="12" sm="12" class="text-center title_col">
            <span class="text-h5 text-xl-h5 text-lg-h5 text-lg-h5 text-md-h5 text-sm-h5">Our Benefits</span>
          </v-col>
          <v-col cols="12" xl="4" lg="4" md="4" sm="4" id="our_benefits_col" v-for="(process, id) in content"
                 :key="id">
            <v-card flat class="our_benefits_small_card">
              <v-card-text>
                <span class="text-subtitle-1 text-xl-subtitle-1 text-lg-subtitle-1 text-md-subtitle-1 text-sm-subtitle-1" id="sub_title">  {{ process.title }} </span>
                <br>
                <p class="our_benefits_paragraphs">
                  {{ process.text }}
                </p>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
    </v-container>
  </v-card>
</template>

<script>
export default {
  name: 'OurBenefits',
  props: ['content'],
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

.grey_background_card {
  border-bottom: 1px solid $greyBorderColor;
  #our_benefits_row{
    padding-bottom: 40px;
    #our_benefits_col{
      padding-right: 30px;
      padding-top: 40px;
      .our_benefits_small_card{
        background-color: white;
        height: 150px;
        border: 1px solid #e0e0e0;
        #sub_title{
          color: black;
        }
        .our_benefits_paragraphs {
          text-align: left;
          padding-right: 10px;
          padding-top: 10px;
          color: $faintBlackColor;
        }
      }
    }
  }
}

</style>
