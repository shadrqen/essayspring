<template>
  <v-app>
    <v-card flat>
      <br>
      <v-btn
        v-if="buttonType === 'outline'"
        id="outline-btn"
        outlined
      >
        <span
          class="text-subtitle-1 text-xl-subtitle-1 text-lg-subtitle-1
          text-md-subtitle-1 text-sm-subtitle-1"
        >{{ buttonText }}</span>
        <v-icon
          color="white"
        >
          keyboard_arrow_right
        </v-icon>
      </v-btn>
      <v-btn
        v-else-if="buttonType === 'filled'"
        id="filled-btn"
        @click="triggerParentMethod"
      >
        <span
          class="text-subtitle-1 text-xl-subtitle-1 text-lg-subtitle-1
          text-md-subtitle-1 text-sm-subtitle-1"
        >{{ buttonText }}</span>
        <v-icon
          color="white"
        >
          keyboard_arrow_right
        </v-icon>
      </v-btn>
    </v-card>
  </v-app>
</template>

<script>

export default {
  name: 'ColoredButton',
  props: {
    buttonType: {
      type: String,
      required: true
    },
    buttonText: {
      type: String,
      required: true
    },
    parentEvent: {
      type: String,
      required: true
    }
  },
  methods: {
    triggerParentMethod () {
      this.$emit(this.parentEvent)
    }
  }
}
</script>

<style lang="scss" scoped>

@import "../../styles/mixins/general";

#outline-btn {
  @include darkGreenBlueBtnConfig(auto, $primaryDarkGreenBlueColor, white)
}

#filled-btn {
  float: right;
  @include darkGreenBlueBtnConfig(auto, white, $primaryDarkGreenBlueColor)
}

</style>
