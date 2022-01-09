<template>
  <v-app id="mainapp">
    <header>
      <slot name="header"></slot>
    </header>
    <main>
      <slot></slot>
    </main>
    <footer>
      <slot name="footer"></slot>
    </footer>
  </v-app>
</template>

<script>
export default {
  name: 'BaseLayout'
}
</script>

<style scoped></style>
