<!--The overlay component that shows an animated click for success and cross for failure-->
<template>
  <v-overlay
    :value="overlay.value"
    opacity="0.9"
  >
    <div
      v-if="overlay.loading"
      class="lds-ellipsis"
    >
      <div />
      <div />
      <div />
      <div />
    </div>
    <svg
      v-if="overlay.success.value"
      class="checkmark"
      viewBox="0 0 52 52"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        class="checkmark__circle"
        cx="26"
        cy="26"
        fill="none"
        r="25"
      />
      <path
        class="checkmark__check"
        d="M14.1 27.2l7.1 7.2 16.7-16.8"
        fill="none"
      />
    </svg>
    <div
      v-if="overlay.error.value"
      style="background-color: white; border-radius: 10px"
    >
      <v-alert
        :value="true"
        text
        type="error"
      >
        {{ overlay.error.message }}
      </v-alert>
    </div>
  </v-overlay>
</template>

<script>

export default {
  name: 'Loader',
  props: {
    overlay: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../styles/general/alert";
</style>
