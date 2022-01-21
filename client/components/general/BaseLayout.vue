<template>
  <v-app id="mainapp">
    <header>
      <slot name="header" />
    </header>
    <main>
      <slot />
    </main>
    <footer>
      <slot name="footer" />
    </footer>
  </v-app>
</template>

<script>
export default {
  name: 'BaseLayout'
}
</script>

<style scoped></style>
