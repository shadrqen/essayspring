<template>
  <v-overlay
    :value="loading"
    opacity="0.9"
  >
    <div class="lds-ellipsis">
      <div />
      <div />
      <div />
      <div />
    </div>
  </v-overlay>
</template>

<script>

export default {
  name: 'Loading',
  data () {
    return {
      loading: false
    }
  },
  methods: {
    start () {
      this.loading = true
    },
    finish () {
      this.loading = false
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../styles/general/alert";
</style>
