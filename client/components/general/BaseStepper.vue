<template>
  <v-stepper v-model="level" light :non-linear="true" class="elevation-0">
    <v-card class="elevation-0 rounded-0 main-card" height="50">
      <v-container>
<!--        The margins are a bit messy at the moment, that's why you see a lot of dynamic styling-->
<!--        FIXME: Add a cleaner way of dynamic styling for the stepper -->
        <v-stepper-header class="elevation-0" v-if="['xl', 'lg', 'md'].includes(viewport_code)" :style="xl ? 'margin-top: -23px; margin-left: 12vw; margin-right: 11vw;' : 'margin-top: -23px;'">
<!--          TODO: Also, add dynamic steps by using one array that is loopable-->
          <v-stepper-step
              step="1"
              :complete="level > 1"
              color="#007991"
          >
            {{ steps.step1 }}
          </v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step
              step="2"
              :complete="level > 2"
              color="#007991"
          >
            {{ steps.step2 }}
          </v-stepper-step>

<!--          We only have two steps above for a private writer-->

          <v-divider v-if="clientPostOrderForm.type === 'public'"></v-divider>

          <v-stepper-step
              step="3"
              :complete="level > 3"
              color="#007991"
              v-if="clientPostOrderForm.type === 'public'"
          >
            {{ steps.step3 }}
          </v-stepper-step>

          <v-divider v-if="clientPostOrderForm.type === 'public'"></v-divider>

          <v-stepper-step
              step="4"
              :complete="level > 4"
              color="#007991"
              v-if="clientPostOrderForm.type === 'public'"
          >
            {{ steps.step4 }}
          </v-stepper-step>
        </v-stepper-header>
<!--        We are using a progress circular for mobile devices-->
        <div v-if="['xs', 'sm'].includes(viewport_code)" style="margin-top: -6px;">
          <v-progress-circular size="40" rotate="270" :value="mobile_progress_value" color="#007991">
            <span style="font-size: 10px; color: black">{{ level }} of 4</span>
          </v-progress-circular>
          <span style="margin-top: 5px; margin-left: 10px" v-if="stepStatus.step3"> {{ mobile_step }} </span>
          <span style="margin-top: 5px; margin-left: 10px; color: red" v-else> <v-icon color="red">mdi-alert</v-icon> {{ mobile_step }} </span>
        </div>
      </v-container>
    </v-card>
    <v-container>
      <v-stepper-items :style="{ 'margin-right': stepper_item_margin_right }">
        <v-stepper-content step="1" style="margin-left: -42px;">
          <slot name="stepper-content-step-1"></slot>
        </v-stepper-content>
        <v-stepper-content step="2">
          <slot name="stepper-content-step-2"></slot>
        </v-stepper-content>
<!--        We only have two steps above for a private writer-->
        <v-stepper-content step="3" v-if="clientPostOrderForm.type === 'public'">
          <slot name="stepper-content-step-3"></slot>
        </v-stepper-content>
        <v-stepper-content step="4" v-if="clientPostOrderForm.type === 'public'">
          <slot name="stepper-content-step-4"></slot>
        </v-stepper-content>
      </v-stepper-items>
    </v-container>
  </v-stepper>
</template>

<script>

import { mapGetters } from 'vuex'

export default {
  name: 'ClientPlaceOrderBar',
  props: ['steps', 'level', 'type'],
  data () {
    return {
      stepper_item_margin_right: '68px'
    }
  },
  computed: {
    ...mapGetters({
      viewport_code: 'getViewPortCode',
      stepStatus: 'stepStatus',
      clientPostOrderForm: 'clientPostOrderForm'
    }),
    /* We only show a circle as the progress bar for mobile devices.
    * The circle is initially 25% full on the first step. The value grows according to the level as
    * in this function */
    mobile_progress_value () {
      return this.level * 25
    },
    mobile_step () {
      return this.steps['step' + this.level]
    },
    /* Screen is xl or not */
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
  watch: {
    level: function () {
      this.set_stepper_margin_right()
    }
  },
  methods: {
    set_stepper_margin_right () {
      const marginVsViewportVsLevel = {
        1: {
          xs: '-85px',
          sm: '-102px',
          md: '-84px',
          lg: '-82px',
          xl: '-69px'
        },
        2: {
          xs: 0,
          sm: 0,
          md: '-10px',
          lg: '-95px',
          xl: '-30px'
        },
        3: {
          xs: '0',
          sm: '0',
          md: '0',
          lg: '0',
          xl: '0'
        },
        4: {
          xs: '0',
          sm: '0',
          md: '0',
          lg: '0',
          xl: '0'
        }
      }
      this.stepper_item_margin_right = marginVsViewportVsLevel[this.level][this.viewport_code]
    }
  },
  created () {
    this.set_stepper_margin_right()
  },
  mounted () {
    window.addEventListener('resize', this.set_stepper_margin_right)
  }
}
</script>

<style scoped>

.main-card{
  box-shadow: 0 1px 5px grey !important;
}

</style>
