<template>
  <div>
    <v-navigation-drawer
      v-model="drawer"
      app
      clipped
    >
      <v-list>
        <v-divider />
        <v-list-item-group
          v-model="selectedItem"
          color="#007991"
        >
          <v-list-item
            v-for="(item, i) in items"
            :key="i"
            style="border-bottom: 1px solid #f1e9e9"
            @click="openLink(item.link)"
          >
            <v-list-item-icon>
              <v-icon
                color="#007991"
                v-text="item.icon"
              />
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="item.title" />
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>

import { mapGetters } from 'vuex'

export default {
  name: 'NavDrawer',
  props: {
    drawer: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      mini: true,
      selectedItem: null,
      items: [
        {
          title: 'My Orders',
          link: '/client/orders',
          icon: 'list'
        },
        {
          title: 'My Writers',
          link: '/client/writers',
          icon: 'mdi-account-group-outline'
        }
      ]
    }
  },
  computed: {
    ...mapGetters(['orderStatusTypes'])
  },
  methods: {
    openLink (link) {
      if (this.$route.fullPath !== link) {
        this.$router.push(link)
      }
    }
  }
}
</script>

<style scoped>

</style>
