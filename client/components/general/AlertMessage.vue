<template>
  <div>
    <v-alert
      :value="success.value"
      dense
      dismissible
      text
      type="success"
    >
      {{ success.message }}
    </v-alert>
    <v-alert
      :value="error.value"
      dismissible
      text
      type="error"
    >
      {{ error.message }}
    </v-alert>
  </div>
</template>

<script>

export default {
  name: 'AlertMessage',
  props: {
    success: {
      type: Object,
      required: true
    },
    error: {
      type: Object,
      required: true
    }
  }
}
</script>
