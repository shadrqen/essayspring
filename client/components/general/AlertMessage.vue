<template>
  <div>
    <v-alert
        :value="success.value"
        dense
        text
        type="success"
        dismissible
    >
      {{ success.message }}
    </v-alert>
    <v-alert
        :value="error.value"
        text
        type="error"
        dismissible
    >
      {{ error.message }}
    </v-alert>
  </div>
</template>

<script>

export default {
  name: 'AlertMessage',
  props: ['success', 'error']
}
</script>
